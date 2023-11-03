import { locales } from "@/constants/locale.constant";
import { NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";

interface Props {
    children: React.ReactNode;
    params: { locale: string };
}

export async function generateStaticParams() {
    return locales.map((locale) => ({ locale: locale.locale }));
}

export async function generateMetadata({ params: { locale } }: Props) {
    return {
        // title: t('LocaleLayout.title'),
        title: "Agent Hub",
    };
}

export default async function RootLayout({ children, params }: Props) {
    let messages;
    try {
        messages = (await import(`@/i18n/${params.locale}/message.json`))
            .default;
    } catch (error) {
        notFound();
    }

    return (
        <html lang={params.locale}>
            <head />
            <body>
                <NextIntlClientProvider locale={params.locale}>
                    {children}
                </NextIntlClientProvider>
            </body>
        </html>
    );
}
