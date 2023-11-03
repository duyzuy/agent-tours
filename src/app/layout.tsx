import type { Metadata } from "next";
import { Inter } from "next/font/google";
import config from "@/configs";
import ThemeProvider from "@/providers/ThemeProvider";

const inter = Inter({ subsets: ["latin"] });
import "@/styles/globals.scss";
export const metadata: Metadata = {
    metadataBase: new URL(config.DOMAIN_ROOT),
    openGraph: {
        title: "Agent Hub",
        description: "Agent Hub - Cổng đặt tours",
        // url: 'https://nextjs.org',
        // siteName: 'Next.js',
        // locale: 'en_US',
        type: "website",
    },
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html>
            <body className={inter.className}>
                <ThemeProvider>{children}</ThemeProvider>
            </body>
        </html>
    );
}
