import type { Metadata } from "next";
import config from "@/configs";

export const metadata: Metadata = {
    metadataBase: new URL(config.DOMAIN_ROOT),
    openGraph: {
        title: "Agent Hub",
        description: "Agent Hub - Cấu hình hệ thống",
        // url: 'https://nextjs.org',
        // siteName: 'Next.js',
        // locale: 'en_US',
        type: "website",
    },
};

export default function ConfigurationLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
