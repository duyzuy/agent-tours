import { locales } from "@/constants/locale.constant";
import { NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";
import Header from "./_components/commons/Header";
import Footer from "./_components/commons/Footer";
import { LangCode } from "@/models/management/cms/language.interface";
import { set } from "lodash";
import { getTranslationFe } from "@/server/fe";
import ServiceWorker from "./_components/ServiceWorker";
import PureClient from "@/components/admin/PureClient";

interface Props {
    children: React.ReactNode;
    params: { locale: LangCode };
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
    let translationKeys;

    try {
        // messages = (await import(`@/i18n/${params.locale}/message.json`))
        //     .default;

        translationKeys = await getTranslationFe(params.locale);
    } catch (error) {
        notFound();
    }

    const message = translationKeys?.result?.reduce<{
        [key: string]: string;
    }>((acc, item) => ({ ...acc, [item.keyName]: item.name }), {});

    const output = Object.entries(message || {}).reduce(
        (acc, [key, value]) => set(acc, key, value),
        {},
    );

    //"a.b.c" => [a,b,c] => {a: {b: {c: 1}}}
    return (
        <NextIntlClientProvider locale={params.locale} messages={output}>
            <Header />
            {children}
            <PureClient>
                <ServiceWorker />
            </PureClient>
            <Footer />
        </NextIntlClientProvider>
    );
}
