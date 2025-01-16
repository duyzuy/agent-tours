import { unstable_setRequestLocale } from "next-intl/server";
import { LangCode } from "@/models/management/cms/language.interface";

interface Props {
  children: React.ReactNode;
  params: { locale: LangCode };
}

export async function generateMetadata({ params: { locale } }: Props) {
  // const t = await getTranslations({ locale, namespace: "String" });
  // console.log(t("passwordConfirm.label"));
  return {
    title: "Order",
  };
}

export default async function OrderLayout({ children, params: { locale } }: Props) {
  unstable_setRequestLocale(locale);
  return <>{children}</>;
}
