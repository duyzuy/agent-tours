import { unstable_setRequestLocale } from "next-intl/server";
import { AbstractIntlMessages, NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";
import { set } from "lodash";
import { LangCode } from "@/models/management/cms/language.interface";
import { locales } from "@/constants/locale.constant";

import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import { getTranslationFe } from "../../actions/feTranslations";
import { SITE_NAME } from "@/configs/site";
import ThemeProvider from "@/lib/ThemeProvider";
import { RQClientProvider } from "@/lib/RQClientProvider";
import { NextSessionProvider } from "@/lib/NextSessionProvider";
import { AppProvider } from "@/store/appContext";
import AuthModal from "@/modules/fe/auth/components/AuthModal";
import LocalizationContainer from "@/modules/fe/localization/LocalizationContainer";
import Header from "./_components/commons/Header";
import Footer from "./_components/commons/Footer";
import HeaderV2 from "./_components/commons/HeaderV2";

const timeZone = "Asia/Bangkok";

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale: locale.key }));
}

export async function generateMetadata({ params: { locale } }: Props) {
  return {
    title: `Agent Hub | ${SITE_NAME}`,
  };
}
interface Props {
  children: React.ReactNode;
  params: Record<string, any> & { locale: LangCode };
  customer_auth: React.ReactNode;
}
export default async function RootClientLayout({ children, params, customer_auth }: Props) {
  const { locale } = params;
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
        <AppProvider>
          <ThemeProvider>
            <RQClientProvider>
              <NextIntlClientProvider locale={locale} messages={messages} timeZone={timeZone}>
                <NextSessionProvider session={session}>
                  {/* <Header /> */}
                  <HeaderV2 params={params} />
                  {children}
                  {customer_auth}
                  <Footer />
                  <AuthModal />
                  <LocalizationContainer />
                  {/* <ServiceWorker /> */}
                </NextSessionProvider>
              </NextIntlClientProvider>
            </RQClientProvider>
          </ThemeProvider>
        </AppProvider>
      </body>
    </html>
  );
}
