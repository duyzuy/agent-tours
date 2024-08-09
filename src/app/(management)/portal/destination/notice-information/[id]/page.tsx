"use client";
import React, { useEffect, useMemo } from "react";
import NoticeInformationForm, { NoticeInformationFormProps } from "../_components/NoticeInformationForm";
import PageContainer from "@/components/admin/PageContainer";
import LocaleContainer from "@/components/admin/LocaleContainer";
import { useLocale } from "@/hooks/useLocale";
import { useRouter } from "next/navigation";
import { Spin } from "antd";
import { isUndefined } from "lodash";
import useCRUDTravelInformationNotice from "../modules/useCRUDTravelInformationNotice";
import { localeDefault } from "@/constants/locale.constant";
import { LangCode } from "@/models/management/cms/language.interface";
import { useGetTravelInformationNoticeDetailQuery } from "@/queries/cms/cmsTravelInfo";
interface PageContentDetailProps {
  params: { id: number };
}
const PageContentDetail: React.FC<PageContentDetailProps> = ({ params }) => {
  const { locale, setLocale } = useLocale(localeDefault);

  const { data, isLoading } = useGetTravelInformationNoticeDetailQuery({
    originId: Number(params.id),
  });
  const router = useRouter();

  const travelNoteContent = useMemo(() => {
    return data?.find((page) => page.lang === locale?.key);
  }, [data, locale]);

  const langCodes = useMemo(() => {
    return data?.reduce<LangCode[]>((acc, item) => {
      return [...acc, item.lang];
    }, []);
  }, [data]);

  const { onCreate, onUpdate, onUpdateStatus, onDelete } = useCRUDTravelInformationNotice();

  const handleSubmitFormData: NoticeInformationFormProps["onSubmit"] = (formData) => {
    if (formData.id) {
      onUpdate(formData);
    } else {
      onCreate(formData);
    }
  };

  useEffect(() => {
    if ((isUndefined(data) && !isLoading) || (!data?.length && !isLoading)) {
      router.push("/portal/destination/notice-information");
    }
  }, [data, isLoading]);

  if (isLoading) {
    return <Spin />;
  }

  if (isUndefined(data)) {
    return null;
  }

  return (
    <PageContainer
      name="Cập nhật và tạo bài viết"
      hideAddButton
      onBack={() => router.push("/portal/destination/notice-information")}
      breadCrumItems={[
        { title: "Thông tin lưu ý", href: "/portal/destination/notice-information" },
        { title: "Cập nhật và tạo bài viết" },
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
        <NoticeInformationForm
          initData={travelNoteContent}
          originId={params.id}
          lang={locale?.key}
          onSubmit={handleSubmitFormData}
          action={travelNoteContent ? "update" : "create"}
          onChangeStatus={onUpdateStatus}
          onDelete={onDelete}
        />
      ) : null}
    </PageContainer>
  );
};
export default PageContentDetail;
