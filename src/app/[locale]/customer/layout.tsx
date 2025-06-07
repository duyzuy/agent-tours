import { unstable_setRequestLocale } from "next-intl/server";
import { LangCode } from "@/models/management/cms/language.interface";
import CustomerSidebar from "./_components/CustomerSidebar";
import dynamic from "next/dynamic";
import { Suspense } from "react";

const DynamicCustomerAuth = dynamic(() => import("../(auth)/CustomerAuthorized"), {
  loading(loadingProps) {
    return <>loading</>;
  },
});
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
  return (
    <Suspense fallback="loading...">
      <DynamicCustomerAuth>
        <div className="my-account py-6 lg:py-12 bg-gray-100">
          <div className="container mx-auto px-4 md:px-6 lg:px-8">
            <div className="my-account-inner flex flex-wrap items-start">
              <CustomerSidebar className="w-full md:w-4/12 lg:w-3/12 bg-white rounded-lg overflow-hidden md:mb-0 mb-6 lg:sticky top-3" />
              <div className="w-full md:w-8/12 lg:w-9/12 md:pl-6 lg:pl-8">
                <div className="bg-white rounded-lg px-3 lg:px-6 py-4 lg:py-8">{children}</div>
              </div>
            </div>
          </div>
        </div>
      </DynamicCustomerAuth>
    </Suspense>
  );
}
