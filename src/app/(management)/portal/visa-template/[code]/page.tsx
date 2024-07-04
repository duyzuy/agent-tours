"use client";
import React, { useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Spin } from "antd";
import { isUndefined } from "lodash";
import { useLocale } from "@/hooks/useLocale";
import { localeDefault } from "@/constants/locale.constant";
import PageContainer from "@/components/admin/PageContainer";
import LocaleContainer from "@/components/admin/LocaleContainer";
import { LangCode } from "@/models/management/cms/language.interface";
import CMSTemplateContentForm, { CMSTemplateContentFormProps } from "./_components/CMSTemplateContentForm";
import { useGetCMSTemplateDetailQuery } from "@/queries/cms/cmsTemplate";
// import useCRUDCMSTemplateContent from "../modules/useCRUDCMSTemplateContent";
import useCRUDCMSTemplateContentMetadata from "../modules/useCRUDCMSTemplateContentMetadata";
interface PageContentDetailProps {
  params: { code: string };
}
const PageContentDetail: React.FC<PageContentDetailProps> = ({ params }) => {
  const { locale, setLocale } = useLocale(localeDefault);

  const { data, isLoading } = useGetCMSTemplateDetailQuery(params.code);

  useGetCMSTemplateDetailQuery;
  const router = useRouter();

  const templateContent = useMemo(() => {
    return data?.templates.find((item) => item.lang === locale?.key);
  }, [data, locale]);

  const langCodes = useMemo(() => {
    return data?.templates.reduce<LangCode[]>((acc, item) => {
      return [...acc, item.lang];
    }, []);
  }, [data]);

  // const { onUpdateTemplateContent, onUpdateStatus, onDeleteTemplateContent } =
  //     useCRUDCMSTemplateContent();

  const {
    onCreateMetaContentAndIncludeAndNote,
    onUpdateMetaContentAndIncludeAndNote,
    onCreateMetaContentItinerary,
    onUpdateMetaContentItinerary,
  } = useCRUDCMSTemplateContentMetadata();

  const handleSubmitMetadataContent: CMSTemplateContentFormProps["onSubmitMetaContent"] = (type, action, data) => {
    console.log(type, data);

    if (type === "includeAndNote" && data) {
      action === "create" ? onCreateMetaContentAndIncludeAndNote(data) : onUpdateMetaContentAndIncludeAndNote(data);
    }
    if (type === "itinerary" && data) {
      action === "create" ? onCreateMetaContentItinerary(data) : onUpdateMetaContentItinerary(data);
    }
  };

  // const handleSubmitFormData: CMSTemplateContentFormProps["onSubmit"] = (
  //     formData,
  // ) => {
  //     if (formData.id) {
  //         onUpdateTemplateContent(formData);
  //     }
  // };

  // const onChangeStatus: CMSTemplateContentFormProps["onChangeStatus"] = (
  //     id,
  //     status,
  // ) => {
  //     onUpdateStatus({ id, status: status });
  // };
  useEffect(() => {
    if ((isUndefined(data) && !isLoading) || (!data && !isLoading)) {
      router.push("./portal/visa-template/list");
    }
  }, [isLoading, data]);

  if (isLoading) {
    return <Spin />;
  }

  if (isUndefined(data) || !data) {
    return null;
  }

  return (
    <PageContainer
      name="Visa template content"
      hideAddButton
      onBack={() => router.push("./portal/visa-template/list")}
      breadCrumItems={[
        {
          title: "Danh sách visa template",
          href: "/portal/visa-template/list",
        },
        { title: params.code },
      ]}
    >
      {/* <LocaleContainer
                defaultValue={localeDefault}
                onChange={(lc) => setLocale(lc)}
                value={locale}
                langCodes={langCodes}
                className="mb-6 border-b"
            />
            {locale ? (
                <CMSTemplateContentForm
                    initData={templateContent}
                    code={params.code}
                    lang={locale?.key}
                    onSubmit={handleSubmitFormData}
                    onSubmitMetaContent={handleSubmitMetadataContent}
                    // onPublish={(id) => id && onPublish(id)}
                    onDelete={onDeleteTemplateContent}
                    action={templateContent ? "update" : "create"}
                    onChangeStatus={onChangeStatus}
                />
            ) : null} */}
    </PageContainer>
  );
};
export default PageContentDetail;
