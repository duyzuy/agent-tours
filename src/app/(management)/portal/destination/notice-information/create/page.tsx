"use client";
import React, { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import PageContainer from "@/components/admin/PageContainer";
import LocaleContainer from "@/components/admin/LocaleContainer";
import { useLocale } from "@/hooks/useLocale";
import NoticeInformationForm, { NoticeInformationFormProps, initFormData } from "../_components/NoticeInformationForm";

import { localeDefault } from "@/constants/locale.constant";
import useCRUDTravelInformationNotice from "../modules/useCRUDTravelInformationNotice";
import { isEqualObject } from "@/utils/compare";

const PageCreate = () => {
  const router = useRouter();
  const { locale, setLocale } = useLocale(localeDefault);
  const { onCreate } = useCRUDTravelInformationNotice();
  const [isUpdatedContent, setUpdatedContent] = useState(false);

  const onWatchingFormChange = useCallback<Required<NoticeInformationFormProps>["onWatchFormChange"]>((formData) => {
    if (isEqualObject(["id", "name", "descriptions"], formData, initFormData)) {
      setUpdatedContent(false);
    } else {
      setUpdatedContent(true);
    }
  }, []);

  const handleSubmitForm: NoticeInformationFormProps["onSubmit"] = (formData) => {
    onCreate(formData);
  };
  return (
    <PageContainer
      name="Tạo lưu ý mới"
      hideAddButton
      onBack={() => router.push("/portal/destination/notice-information")}
      breadCrumItems={[
        { title: "Thông tin lưu ý", href: "/portal/destination/notice-information" },
        { title: "Thêm mới" },
      ]}
    >
      <LocaleContainer
        defaultValue={localeDefault}
        onChange={(lc) => setLocale(lc)}
        value={locale}
        className="mb-6 border-b"
        showConfirmBeforeChange={isUpdatedContent}
      />
      {locale && (
        <NoticeInformationForm
          lang={locale.key}
          onSubmit={handleSubmitForm}
          onWatchFormChange={onWatchingFormChange}
          action="create"
        />
      )}
    </PageContainer>
  );
};
export default PageCreate;
