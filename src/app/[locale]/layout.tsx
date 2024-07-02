import { NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";
import { LangCode } from "@/models/management/cms/language.interface";
import { set } from "lodash";
import { getTranslationFe } from "@/server/fe";
import { LanguageProvider } from "./store/providers/LanguageProvider";
import LangContainer from "./containers/LangContainer";
import { NextAuthProvider } from "@/providers/NextAuthProvider";
import { locales } from "@/constants/locale.constant";
import Header from "./_components/commons/Header";
import Footer from "./_components/commons/Footer";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import { FeBookingProvider } from "./store/providers/BookingProvider";
import ModalAuth from "./(auth)/_components/ModalAuth";

interface Props {
    children: React.ReactNode;
    params: { locale: LangCode };
}

export async function generateStaticParams() {
    return locales.map((locale) => ({ locale: locale.key }));
}

export async function generateMetadata({ params: { locale } }: Props) {
    // const t = await getTranslations({ locale, namespace: "String" });
    // console.log(t("passwordConfirm.label"));
    return {
        title: "Agent Hub",
    };
}

export default async function RootClientLayout({
    children,
    params: { locale },
}: Props) {
    let translationKeys;
    try {
        translationKeys = await getTranslationFe(locale);
    } catch (error) {
        // console.log(error);
        notFound();
    }

    const messageObject = translationKeys?.result?.reduce<{
        [key: string]: string;
    }>((acc, item) => ({ ...acc, [item.keyName]: item.name }), {});

    const output = Object.entries(messageObject || {}).reduce(
        (acc, [key, value]) => set(acc, key, value),
        {},
    );

    /**
     * Session next auth
     */

    const session = await getServerSession(authOptions);

    return (
        <NextIntlClientProvider locale={locale} messages={output}>
            <NextAuthProvider session={session}>
                <LanguageProvider>
                    <FeBookingProvider>
                        <LangContainer />
                        <Header />
                        {children}
                        <Footer />
                        <ModalAuth />
                    </FeBookingProvider>
                </LanguageProvider>
            </NextAuthProvider>
        </NextIntlClientProvider>
    );
}
