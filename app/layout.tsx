import { ThemeProvider } from "./components/theme-provider";
import { PinProvider } from "@/components/pin-provider";
import { Geist, Geist_Mono } from "next/font/google";
import ThemeSwitch from "@/components/theme-switch";
import Regenerate from "@/components/regenerate";
import Navigation from "@/components/navigation";
import Separator from "@/components/separator";
import Sidebar from "@/components/sidebar";
import type { Metadata } from "next";
import "@/globals.css";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Pinboard",
    description: "Your private mini-Pinterest. Pin images, collect ideas and get inspired, all local in the browser, no account needed. Fast, beautiful, privacy-first.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <ThemeProvider>
                <body className={`${geistSans.variable} ${geistMono.variable} relative flex min-h-screen w-screen items-stretch justify-center overflow-hidden bg-neutral-100 text-neutral-900 antialiased dark:bg-[#111111] dark:text-neutral-100`}>
                    <Sidebar>
                        <ThemeSwitch />
                        <Separator />
                        <Navigation />
                        <Separator />
                        <Regenerate />
                    </Sidebar>
                    <main className="gradient-top gradient-bottom relative flex h-screen w-full flex-1 items-start justify-center overflow-hidden rounded-xl">
                        <PinProvider>{children}</PinProvider>
                    </main>
                </body>
            </ThemeProvider>
        </html>
    );
}
