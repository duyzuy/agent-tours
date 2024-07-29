"use client";
import React, { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import PageContainer from "@/components/admin/PageContainer";
import LocaleContainer from "@/components/admin/LocaleContainer";
import { useLocale } from "@/hooks/useLocale";

import useCRUDTag from "../module/useCRUDTag";
import { localeDefault } from "@/constants/locale.constant";

import TagForm, { initFormData, TagFormProps } from "../_components/TagForm";
import { isEqualObject } from "@/utils/compare";

const PageCreate = () => {
  const router = useRouter();
  const { locale, setLocale } = useLocale(localeDefault);
  const { onCreate } = useCRUDTag();
  const [isUpdatedContent, setUpdatedContent] = useState(false);

  const onWatchingFormChange = useCallback<Required<TagFormProps>["onWatchFormChange"]>((formData) => {
    if (
      isEqualObject(
        ["id", "name", "slug", "descriptions", "metaTitle", "metaKeyword", "metaDescription"],
        formData,
        initFormData,
      )
    ) {
      setUpdatedContent(false);
    } else {
      setUpdatedContent(true);
    }
  }, []);

  const handleSubmitForm: TagFormProps["onSubmit"] = (formData) => {
    onCreate(formData);
  };
  return (
    <PageContainer
      name="Tạo thẻ bài viết"
      hideAddButton
      onBack={() => router.push("/portal/contents/tag")}
      breadCrumItems={[{ title: "Thẻ bài viết", href: "/portal/contents/tag" }, { title: "Thêm mới" }]}
    >
      <LocaleContainer
        defaultValue={localeDefault}
        onChange={(lc) => setLocale(lc)}
        value={locale}
        className="mb-6 border-b"
        showConfirmBeforeChange={isUpdatedContent}
      />
      {locale && (
        <TagForm
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
