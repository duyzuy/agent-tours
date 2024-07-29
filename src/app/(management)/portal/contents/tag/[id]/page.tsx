"use client";
import React, { useEffect, useMemo } from "react";
import PageContainer from "@/components/admin/PageContainer";
import LocaleContainer from "@/components/admin/LocaleContainer";
import { useLocale } from "@/hooks/useLocale";
import { useRouter } from "next/navigation";
import { Spin } from "antd";
import { isUndefined } from "lodash";
import useCRUDTag from "../module/useCRUDTag";
import { localeDefault } from "@/constants/locale.constant";
import { LangCode } from "@/models/management/cms/language.interface";
import TagForm, { TagFormProps } from "../_components/TagForm";
import { useGetTagDetailQuery } from "@/queries/cms/tag";
interface PageContentDetailProps {
  params: { id: number };
}
const PageContentDetail: React.FC<PageContentDetailProps> = ({ params }) => {
  const { locale, setLocale } = useLocale(localeDefault);

  const { data, isLoading } = useGetTagDetailQuery({
    originId: Number(params.id),
  });

  const router = useRouter();

  const tagContent = useMemo(() => {
    return data?.find((page) => page.lang === locale?.key);
  }, [data, locale]);

  const langCodes = useMemo(() => {
    return data?.reduce<LangCode[]>((acc, item) => {
      return [...acc, item.lang];
    }, []);
  }, [data]);

  const { onCreate, onUpdate, onUpdateStatus, onDelete } = useCRUDTag();

  const handleSubmitFormData: TagFormProps["onSubmit"] = (formData) => {
    if (formData.id) {
      onUpdate(formData);
    } else {
      onCreate(formData);
    }
  };

  useEffect(() => {
    if ((!data && !isLoading) || (!data?.length && !isLoading)) {
      router.push("/portal/contents/tag");
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
      name={tagContent?.name || ""}
      hideAddButton
      onBack={() => router.push("/portal/contents/tag")}
      breadCrumItems={[{ title: "Thẻ bài viết", href: "/portal/contents/tag" }, { title: tagContent?.name }]}
    >
      <LocaleContainer
        defaultValue={localeDefault}
        onChange={(lc) => setLocale(lc)}
        value={locale}
        langCodes={langCodes}
        className="mb-6 border-b"
      />
      {locale ? (
        <TagForm
          initData={tagContent}
          originId={params.id}
          lang={locale?.key}
          action={tagContent ? "update" : "create"}
          onSubmit={handleSubmitFormData}
          onPublish={() => {}}
          onChangeStatus={onUpdateStatus}
          onDelete={onDelete}
        />
      ) : null}
    </PageContainer>
  );
};
export default PageContentDetail;
