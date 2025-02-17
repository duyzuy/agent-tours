import type { Metadata } from "next";
import config from "@/configs";
import ThemeProvider from "@/lib/ThemeProvider";
import { RQClientProvider } from "@/lib/RQClientProvider";
import dynamic from "next/dynamic";

const ThemeProviderDynamic = dynamic(() => import("@/lib/ThemeProvider"), { ssr: false });

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

export default function PortalLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body suppressHydrationWarning={true}>
        <ThemeProviderDynamic>
          <RQClientProvider>{children}</RQClientProvider>
        </ThemeProviderDynamic>
      </body>
    </html>
  );
}
