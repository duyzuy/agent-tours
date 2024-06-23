import { LangCode } from "@/models/management/cms/language.interface";
import { locales } from "@/constants/locale.constant";
import { authOptions } from "@/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { CLIENT_LINKS } from "@/constants/client/clientRouter.constant";
interface Props {
    children: React.ReactNode;
    params: { locale: LangCode };
}

export async function generateMetadata({ params: { locale } }: Props) {
    // const t = await getTranslations({ locale, namespace: "String" });
    // console.log(t("passwordConfirm.label"));
    return {
        title: "Customer",
    };
}

export default async function CustomerLayout({
    children,
    params: { locale },
}: Props) {
    const session = await getServerSession(authOptions);

    if (!session) {
        redirect(`/${CLIENT_LINKS.CustomerLogin}`); // Navigate to the new post page
    }

    return <>{children}</>;
}
