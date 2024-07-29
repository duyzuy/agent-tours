"use client";
import React, { useEffect, useMemo } from "react";
import PostContentForm, { PostContentFormProps } from "../_components/PostContentForm";
import PageContainer from "@/components/admin/PageContainer";
import LocaleContainer from "@/components/admin/LocaleContainer";
import { useLocale } from "@/hooks/useLocale";
import { useRouter } from "next/navigation";
import { Spin } from "antd";
import { isUndefined } from "lodash";
import { useGetPostDetailQuery } from "@/queries/cms/post";
import { localeDefault } from "@/constants/locale.constant";
import { LangCode } from "@/models/management/cms/language.interface";
import useCRUDPost from "../module/useCRUDPost";

interface Props {
  params: { id: number };
}
const PostContentDetail: React.FC<Props> = ({ params }) => {
  const { locale, setLocale } = useLocale(localeDefault);

  const { data, isLoading } = useGetPostDetailQuery({
    originId: Number(params.id),
  });
  const router = useRouter();

  const postContent = useMemo(() => {
    return data?.find((page) => page.lang === locale?.key);
  }, [data, locale]);

  const langCodes = useMemo(() => {
    return data?.reduce<LangCode[]>((acc, item) => [...acc, item.lang], []);
  }, [data]);

  const { onUpdate, onCreate, onDelete, onUpdateStatus } = useCRUDPost();

  const handleSubmitFormData: PostContentFormProps["onSubmit"] = (formData) => {
    if (formData.id) {
      onUpdate(formData);
    } else {
      onCreate(formData);
    }
  };

  useEffect(() => {
    if ((!data && !isLoading) || (!data?.length && !isLoading)) {
      router.push("/portal/contents/post/list");
    }
  }, [isLoading, data]);

  if (isLoading) {
    return <Spin />;
  }

  if (!data || isUndefined(data)) {
    return null;
  }

  return (
    <PageContainer
      name="Cập nhật và tạo bài viết"
      hideAddButton
      onBack={() => router.push("/portal/contents/post/list")}
      breadCrumItems={[
        { title: "Trang nội dung", href: "/portal/contents/post/list" },
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
        <PostContentForm
          initData={postContent}
          originId={params.id}
          lang={locale?.key}
          onSubmit={handleSubmitFormData}
          action={postContent ? "update" : "create"}
          onChangeStatus={onUpdateStatus}
          onDelete={onDelete}
        />
      ) : null}
    </PageContainer>
  );
};
export default PostContentDetail;
