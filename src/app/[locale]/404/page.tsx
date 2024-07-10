import { unstable_setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import { Button } from "antd";
import { LangCode } from "@/models/management/cms/language.interface";

interface PageProps {
  params: { locale: LangCode };
}
export default async function Page404({ params: { locale } }: PageProps) {
  unstable_setRequestLocale(locale);
  const t = await getTranslations("String");

  return (
    <div className="container mx-auto px-4 md:px-6 lg:px-8">
      <div className="inner py-12 flex items-center justify-center">
        <div className="text-center">
          <div className="text-8xl font-bold text-gray-300">404</div>
          <div className="excerpt mb-6">
            <p>{t("notFound.content1")}</p>
            <p>{t("notFound.content2")}</p>
          </div>
          <Button type="primary" size="large">
            {t("button.backHome")}
          </Button>
        </div>
      </div>
    </div>
  );
}
