"use client";
import React, { useEffect, useMemo } from "react";

import PageContainer from "@/components/admin/PageContainer";
import LocaleContainer from "@/components/admin/LocaleContainer";
import { useLocale } from "@/hooks/useLocale";
import { useRouter } from "next/navigation";
import { Spin } from "antd";
import { isUndefined } from "lodash";
import useCRUDCategory from "../modules/useCRUDCategory";
import { localeDefault } from "@/constants/locale.constant";
import { LangCode } from "@/models/management/cms/language.interface";
import CategoryForm, { CategoryFormProps } from "../_components/CategoryForm";
import { useGetCategoryDetailQuery } from "@/queries/cms/category";
interface PageContentDetailProps {
  params: { id: number };
}
const PageContentDetail: React.FC<PageContentDetailProps> = ({ params }) => {
  const { locale, setLocale } = useLocale(localeDefault);

  const { data, isLoading } = useGetCategoryDetailQuery({
    originId: Number(params.id),
  });
  const router = useRouter();

  const categoryDetailByLang = useMemo(() => {
    return data?.find((page) => page.lang === locale?.key);
  }, [data, locale]);

  const langCodes = useMemo(() => {
    return data?.reduce<LangCode[]>((acc, item) => {
      return [...acc, item.lang];
    }, []);
  }, [data]);

  const { onCreate, onUpdate, onUpdateStatus, onDelete } = useCRUDCategory();

  const handleSubmitFormData: CategoryFormProps["onSubmit"] = (formData) => {
    formData.id ? onUpdate(formData) : onCreate(formData);
  };

  useEffect(() => {
    if ((!data && !isLoading) || (!data?.length && !isLoading)) {
      router.push("/portal/contents/category");
    }
  }, [isLoading, data]);

  if (isLoading) {
    return <Spin />;
  }

  if (!data) {
    return null;
  }

  return (
    <PageContainer
      name={categoryDetailByLang ? categoryDetailByLang.name : "Thêm danh mục"}
      hideAddButton
      onBack={() => router.push("/portal/contents/category")}
      breadCrumItems={[
        { title: "Danh mục bài viết", href: "/portal/contents/category" },
        { title: categoryDetailByLang ? categoryDetailByLang.name : "Thêm danh mục" },
      ]}
    >
      <LocaleContainer
        defaultValue={localeDefault}
        onChange={(lc) => setLocale(lc)}
        value={locale}
        langCodes={langCodes}
        className="mb-6 border-b"
      />
      {locale ? (
        <CategoryForm
          initData={categoryDetailByLang}
          originId={params.id}
          lang={locale?.key}
          onSubmit={handleSubmitFormData}
          action={categoryDetailByLang ? "update" : "create"}
          onUpdateStatus={onUpdateStatus}
          onDelete={(id) => id && onDelete(id)}
        />
      ) : null}
    </PageContainer>
  );
};
export default PageContentDetail;
