import type { Metadata } from "next";
import { Mulish, Alegreya } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import { cookies } from "next/headers";

const mulish = Mulish({
    subsets: ["latin"],
    variable: "--font-mulish",
});
const alegreya = Alegreya({
    subsets: ["latin"],
    variable: "--font-alegreya",
});

export const metadata: Metadata = {
    title: "Red Social Next App",
    description: "Generated by create next app",
};





export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const loggedUsername = (await cookies()).get("SocialUsername")
    return (
        <html lang="en" className={`${mulish.variable} ${alegreya.variable}`}>
            <body suppressHydrationWarning>                
                <Navbar loggedUsername={loggedUsername?.value}></Navbar>
                {children}
            </body>
        </html>
    );
}
