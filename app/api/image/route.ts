import fs from "fs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const blob = await req.blob();
    const array = await blob.arrayBuffer();
    const buffer = Buffer.from(array);
    console.log(buffer);
    const uid = Date.now();
    fs.writeFileSync(`./public/${uid}.jpeg`, buffer);
    return NextResponse.json({ uid });
}
