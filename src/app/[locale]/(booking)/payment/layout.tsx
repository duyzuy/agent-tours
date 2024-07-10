import type { Metadata, ResolvingMetadata } from "next";
import { LangCode } from "@/models/management/cms/language.interface";
import { unstable_setRequestLocale } from "next-intl/server";

interface Props {
  children: React.ReactNode;
  params: { locale: LangCode };
}

export async function generateMetadata({ params }: Props, parent: ResolvingMetadata): Promise<Metadata> {
  const locale = params.locale;
  // optionally access and extend (rather than replace) parent metadata

  return {
    title: locale === LangCode.VI ? "Thanh toán" : "Payment",
    openGraph: {
      title: locale === LangCode.VI ? "Thanh toán" : "Payment",
      description: locale === LangCode.VI ? "Thông tin thanh toán" : "Payment information",
    },
  };
}
export default function PaymentLayout({ children, params: { locale } }: Props) {
  unstable_setRequestLocale(locale);
  return <>{children}</>;
}
