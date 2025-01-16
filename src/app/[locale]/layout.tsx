import { unstable_setRequestLocale } from "next-intl/server";
import { AbstractIntlMessages, NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";
import { LangCode } from "@/models/management/cms/language.interface";
import { set } from "lodash";

import { LanguageProvider } from "@/store/providers/LanguageProvider";

import LangContainer from "@/containers/LangContainer";
import { NextAuthProvider } from "@/providers/NextAuthProvider";
import { locales } from "@/constants/locale.constant";
import Header from "./_components/commons/Header";
import Footer from "./_components/commons/Footer";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";

import { FeBookingProvider } from "@/store/providers/BookingProvider";
import ModalAuth from "./(auth)/_components/ModalAuth";

import { ModalManagerProvider } from "@/store/providers/ModalManagerProvider";
import { getTranslationFe } from "../../actions/feTranslations";
import { SITE_NAME } from "@/configs/site";
import ThemeProvider from "@/providers/ThemeProvider";
import { RQClientProvider } from "@/providers/RQClientProvider";

const timeZone = "Asia/Bangkok";
interface Props {
  children: React.ReactNode;
  params: { locale: LangCode };
}

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale: locale.key }));
}

export async function generateMetadata({ params: { locale } }: Props) {
  return {
    title: `Agent Hub | ${SITE_NAME}`,
  };
}

export default async function RootClientLayout({ children, params: { locale } }: Props) {
  unstable_setRequestLocale(locale);

  let messages: AbstractIntlMessages | undefined;
  try {
    const translationsResponse = await getTranslationFe(locale);

    const messageObject = translationsResponse?.result?.reduce<{
      [key: string]: string;
    }>((acc, item) => ({ ...acc, [item.keyName]: item.name }), {});

    messages = Object.entries(messageObject || {}).reduce((acc, [key, value]) => set(acc, key, value), {});
  } catch (error) {
    notFound();
  }

  /**
   * Session next auth
   */

  const session = await getServerSession(authOptions);

  return (
    <html lang={locale}>
      <body suppressHydrationWarning={true}>
        <ThemeProvider>
          <RQClientProvider>
            <NextIntlClientProvider locale={locale} messages={messages} timeZone={timeZone}>
              <NextAuthProvider session={session}>
                <LanguageProvider>
                  <FeBookingProvider>
                    <ModalManagerProvider>
                      <LangContainer />
                      <Header />
                      {children}
                      <Footer />
                      <ModalAuth />
                    </ModalManagerProvider>
                  </FeBookingProvider>
                </LanguageProvider>
              </NextAuthProvider>
            </NextIntlClientProvider>
          </RQClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
