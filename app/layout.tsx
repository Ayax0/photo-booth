import "./_globals.scss";
import { Poppins } from "next/font/google";

const poppins = Poppins({ weight: ["100", "300", "500", "700"], subsets: ["latin"] });

export const metadata = {
    title: "Foto Box",
    description: "created by Simon Gander",
};

interface IRootProps {
    children: React.ReactNode;
}

export default function RootLayout({ children }: IRootProps) {
    return (
        <html lang="de">
            <body className={poppins.className}>{children}</body>
        </html>
    );
}
