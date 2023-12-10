import type { Metadata } from "next";

import config from "@/configs";
import ThemeProvider from "@/providers/ThemeProvider";

import { RQClientProvider } from "@/providers/RQClientProvider";
import { Inter } from "next/font/google";

import "@/styles/globals.scss";
const inter = Inter({ subsets: ["latin"] });

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
        <html suppressHydrationWarning={true}>
            <body className={inter.className} suppressHydrationWarning={true}>
                <ThemeProvider>
                    <RQClientProvider>{children}</RQClientProvider>
                </ThemeProvider>
            </body>
        </html>
    );
}
