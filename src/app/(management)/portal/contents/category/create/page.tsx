"use client";
import React, { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import PageContainer from "@/components/admin/PageContainer";
import LocaleContainer from "@/components/admin/LocaleContainer";
import { useLocale } from "@/hooks/useLocale";
import useCRUDCategory from "../modules/useCRUDCategory";
import { localeDefault } from "@/constants/locale.constant";
import { isEqualObject } from "@/utils/compare";
import CategoryForm, { initFormData, CategoryFormProps } from "../_components/CategoryForm";

const PageCreateCategory = () => {
  const router = useRouter();
  const { locale, setLocale } = useLocale(localeDefault);
  const { onCreate, isPendingCreate } = useCRUDCategory();
  const [isUpdatedContent, setUpdatedContent] = useState(false);

  const onWatchingFormChange = useCallback<Required<CategoryFormProps>["onWatchFormChange"]>((formData) => {
    if (
      isEqualObject(
        ["id", "parentId", "name", "slug", "descriptions", "thumbnail", "metaTitle", "metaKeyword", "metaDescription"],
        formData,
        initFormData,
      )
    ) {
      setUpdatedContent(false);
    } else {
      setUpdatedContent(true);
    }
  }, []);

  const handleSubmitForm: CategoryFormProps["onSubmit"] = (data) => {
    onCreate(data);
  };
  return (
    <PageContainer
      name="Thêm danh mục mới"
      hideAddButton
      onBack={() => router.push("/portal/contents/category/list")}
      breadCrumItems={[
        { title: "Trang nội dung", href: "/portal/contents/category/list" },
        { title: "Thêm danh mục mới" },
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
        <CategoryForm
          lang={locale?.key}
          onSubmit={handleSubmitForm}
          action={"create"}
          onWatchFormChange={onWatchingFormChange}
          loading={isPendingCreate}
        />
      )}
    </PageContainer>
  );
};
export default PageCreateCategory;
