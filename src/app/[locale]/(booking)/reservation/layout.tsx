import type { Metadata, ResolvingMetadata } from "next";
import { LangCode } from "@/models/management/cms/language.interface";

interface Props {
  children: React.ReactNode;
  params: { locale: LangCode };
}

export async function generateMetadata({ params }: Props, parent: ResolvingMetadata): Promise<Metadata> {
  const locale = params.locale;
  // optionally access and extend (rather than replace) parent metadata

  return {
    title: locale === LangCode.VI ? "Thông tin đặt chỗ" : "Reservation",
    openGraph: {
      title: locale === LangCode.VI ? "Thông tin đặt chỗ" : "Reservation",
      description: locale === LangCode.VI ? "Thông tin đặt chỗ" : "Reservation",
    },
  };
}
export default function PaymentLayout({ children, params: { locale } }: Props) {
  return <>{children}</>;
}
