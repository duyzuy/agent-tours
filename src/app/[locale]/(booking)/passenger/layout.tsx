import type { Metadata, ResolvingMetadata } from "next";
import { LangCode } from "@/models/management/cms/language.interface";

interface Props {
    children: React.ReactNode;
    params: { locale: LangCode };
}

export async function generateMetadata(
    { params }: Props,
    parent: ResolvingMetadata,
): Promise<Metadata> {
    const locale = params.locale;
    // optionally access and extend (rather than replace) parent metadata

    return {
        title:
            locale === LangCode.VI ? "Thông tin hành khách" : "Passenger info",
        openGraph: {
            title:
                locale === LangCode.VI
                    ? "Thông tin hành khách"
                    : "Passenger info",
            description:
                locale === LangCode.VI
                    ? "Nhập thông tin hành khách"
                    : "Fill-in passenger information",
        },
    };
}
export default function PassengerLayout({
    children,
    params: { locale },
}: Props) {
    return <>{children}</>;
}
