import { locales } from "@/constants/locale.constant";
import { NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";
import Header from "./_components/commons/Header";
import Footer from "./_components/commons/Footer";

interface Props {
    children: React.ReactNode;
    params: { locale: string };
}

export async function generateStaticParams() {
    return locales.map((locale) => ({ locale: locale.key }));
}

export async function generateMetadata({ params: { locale } }: Props) {
    return {
        // title: t('LocaleLayout.title'),
        title: "Agent Hub",
    };
}

export default async function RootClientLayout({ children, params }: Props) {
    let messages;
    try {
        messages = (await import(`@/i18n/${params.locale}/message.json`))
            .default;
    } catch (error) {
        notFound();
    }

    return (
        <NextIntlClientProvider locale={params.locale}>
            <Header />
            {children}
            <Footer />
        </NextIntlClientProvider>
    );
}
