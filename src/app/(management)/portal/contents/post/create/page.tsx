"use client";
import React, { useState, useCallback } from "react";

import PageContainer from "@/components/admin/PageContainer";

import LocaleContainer from "@/components/admin/LocaleContainer";

import type { RcFile, UploadFile, UploadProps } from "antd/es/upload";
import type { UploadChangeParam } from "antd/es/upload";
import Uploader from "@/components/base/Uploader";
import PostContentForm, { PostContentFormProps } from "../_components/PostContentForm";
import { localeDefault } from "@/constants/locale.constant";
import { useRouter } from "next/navigation";
import { useLocale } from "@/hooks/useLocale";
import { isEqualObject } from "@/utils/compare";
import { initFormData } from "../_components/PostContentForm";
import { PostContentFormData } from "../module/postModule.interface";
import useCRUDPost from "../module/useCRUDPost";
interface ICreateFormData {
  locale: "vi" | "en";
  title: string;
  slug: string;
  date: string;
  category: string;
  tags: string[];
  thumbnail: string;
}
const PageCreatePost = () => {
  const router = useRouter();
  const { locale, setLocale } = useLocale(localeDefault);

  const [isUpdatedContent, setUpdatedContent] = useState(false);

  const { onCreate } = useCRUDPost();
  const onWatchingFormChange = useCallback<Required<PostContentFormProps>["onWatchFormChange"]>((formData) => {
    if (
      isEqualObject(
        [
          "id",
          "heroBanner",
          "publishDate",
          "name",
          "slug",
          "content",
          "thumbnail",
          "metaTitle",
          "metaKeyword",
          "metaDescription",
        ],
        formData,
        initFormData,
      )
    ) {
      setUpdatedContent(false);
    } else {
      setUpdatedContent(true);
    }
  }, []);

  const handleSubmitForm: PostContentFormProps["onSubmit"] = (formData) => {
    onCreate(formData);
  };
  return (
    <PageContainer
      name="Tạo bài viết mới"
      hideAddButton
      onBack={() => router.push("/portal/contents/post")}
      breadCrumItems={[{ title: "Danh sách bài viết", href: "/portal/contents/post" }, { title: "Thêm mới" }]}
    >
      <LocaleContainer
        defaultValue={localeDefault}
        onChange={(lc) => setLocale(lc)}
        value={locale}
        className="mb-6 border-b"
        showConfirmBeforeChange={isUpdatedContent}
      />
      {locale && (
        <PostContentForm
          lang={locale.key}
          onSubmit={handleSubmitForm}
          onWatchFormChange={onWatchingFormChange}
          action="create"
        />
      )}
    </PageContainer>
  );
};
export default PageCreatePost;
