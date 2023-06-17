import { writeFileSync } from "fs";
import { PDFDocument, PageSizes } from "pdf-lib";
import printer from "pdf-to-printer";

export default defineEventHandler(async (event) => {
    const body = await readBody<string>(event);
    const base64 = body.split(";base64,").pop() || "";
    const buffer = Buffer.from(base64, "base64");

    const pdf = await PDFDocument.create();
    const page = pdf.addPage();
    page.setWidth(PageSizes.A6[1]);
    page.setHeight(PageSizes.A6[0]);

    const image = await pdf.embedPng(buffer);
    page.drawImage(image, { width: page.getWidth(), height: page.getHeight() });

    try {
        writeFileSync(`./public/images/${new Date().toLocaleTimeString("de-CH").replaceAll(":", "-")}.jpeg`, base64, "base64");
        writeFileSync("./public/current.pdf", await pdf.save());
        await printer.print("./public/current.pdf", { printer: "OneNote (Desktop)" });
        return "ok";
    } catch (error) {
        console.log(error);
        throw createError({ statusCode: 500, statusMessage: "server error" });
    }
});
