import { unstable_setRequestLocale } from "next-intl/server";
import { LangCode } from "@/models/management/cms/language.interface";
import { locales } from "@/constants/locale.constant";
import { authOptions } from "@/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { CLIENT_LINKS } from "@/constants/client/clientRouter.constant";
import CustomerSidebar from "./_components/CustomerSidebar";
interface Props {
  children: React.ReactNode;
  params: { locale: LangCode };
}

export async function generateMetadata({ params: { locale } }: Props) {
  unstable_setRequestLocale(locale);
  // const t = await getTranslations({ locale, namespace: "String" });
  // console.log(t("passwordConfirm.label"));
  return {
    title: "Customer",
  };
}

export default async function CustomerLayout({ children, params: { locale } }: Props) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect(`/${CLIENT_LINKS.CustomerLogin}`); // Navigate to the new post page
  }

  return (
    <div className="my-account py-6 lg:py-12 bg-gray-100">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="my-account-inner flex flex-wrap">
          <CustomerSidebar
            username={session?.user?.name ?? ""}
            className="w-full md:w-4/12 lg:w-3/12 bg-white rounded-lg overflow-hidden md:mb-0 mb-6"
          />
          <div className="w-full md:w-8/12 lg:w-9/12 md:pl-6 lg:pl-8">
            <div className="bg-white rounded-lg px-6 py-8">{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
