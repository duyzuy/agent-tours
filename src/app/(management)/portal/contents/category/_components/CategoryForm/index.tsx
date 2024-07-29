import React, { memo, useCallback, useEffect, useMemo, useState } from "react";
import { Form, Input, SwitchProps, Typography } from "antd";
import dayjs from "dayjs";
import { stringToSlug } from "@/utils/stringToSlug";
import { DATE_FORMAT, DATE_TIME_FORMAT, TIME_FORMAT } from "@/constants/common";
import { useFormSubmit } from "@/hooks/useFormSubmit";
import { mediaConfig } from "@/configs";

import { IPageContentDetail } from "@/models/management/cms/pageContent.interface";
import { CategoryFormData } from "../../modules/category.interface";
import { PageContentStatus } from "@/models/management/cms/pageContent.interface";
import { LangCode } from "@/models/management/cms/language.interface";

import MediaUploadDrawler, { MediaUploadProps } from "@/app/(management)/portal/media/_components/MediaUploadDrawler";
import ThumbnailImage from "@/components/admin/ThumbnailImage";
import Publishing, { PublishingProps } from "@/components/admin/Publishing";
import TextEditor from "@/components/base/TextEditor";
import FormItem from "@/components/base/FormItem";
import Slug, { SlugProps } from "@/components/admin/Slug";
import CategoryParentSelectorProps from "./CategoryParentSelector";
import { isEqualObject } from "@/utils/compare";

import { MediaTypes } from "@/models/management/media.interface";
import { categorySchema } from "../../schema/categorySchema.schema";
import { ICategory } from "@/models/management/category.interface";

type RequirePageContentFormData = Required<CategoryFormData>;

export interface CategoryFormProps {
  lang: LangCode;
  initData?: ICategory;
  originId?: number;
  onSubmit?: (data: CategoryFormData) => void;
  onPublish?: (id?: number) => void;
  onWatchFormChange?: (data: CategoryFormData) => void;
  action?: "create" | "update";
  onUpdateStatus?: (data: { id: number; status: PageContentStatus }, cb?: () => void) => void;
  onDelete?: (id?: number) => void;
  loading?: boolean;
}
export const initFormData = new CategoryFormData(
  undefined,
  undefined,
  "",
  "",
  0,
  undefined,
  "",
  "",
  "",
  "",
  LangCode.VI,
  PageContentStatus.PUBLISH,
);

const CategoryForm: React.FC<CategoryFormProps> = ({
  lang,
  initData,
  onSubmit,
  onWatchFormChange,
  onPublish,
  originId,
  action,
  onUpdateStatus,
  onDelete,
  loading,
}) => {
  const [formData, setFormData] = useState(initFormData);

  const [showDrawerMedia, setShowDrawerMedia] = useState(false);

  const { errors, handlerSubmit, clearErrors } = useFormSubmit({
    schema: categorySchema,
  });

  const onChangeForm = (
    key: keyof RequirePageContentFormData,
    value: RequirePageContentFormData[keyof RequirePageContentFormData],
  ) => {
    setFormData((oldData) => {
      let newData = { ...oldData };
      if (key === "name" && typeof value === "string") {
        newData = {
          ...newData,
          slug: stringToSlug(value),
        };
      }

      newData = {
        ...newData,
        [key]: value,
      };

      return newData;
    });
  };

  const onSaveSlug = useCallback<Required<SlugProps>["onSave"]>((value) => {
    setFormData((oldData) => ({
      ...oldData,
      slug: stringToSlug(value),
    }));
  }, []);

  const onChangeParentId = useCallback((value: number) => {
    setFormData((oldData) => {
      const { parentId } = oldData;

      if (parentId && parentId === value) {
        return { ...oldData, parentId: 0 };
      }
      return { ...oldData, parentId: value };
    });
  }, []);

  const handleChangeStatus = useCallback<Required<SwitchProps>["onChange"]>(
    (checked) => {
      formData.id &&
        onUpdateStatus?.({
          id: formData.id,
          status: checked ? PageContentStatus.PUBLISH : PageContentStatus.UNPUBLISH,
        });
    },
    [formData.id],
  );

  const confirmSelectThumbnail = useCallback<Required<MediaUploadProps>["onConfirm"]>(
    (files) => {
      setFormData((oldData) => ({
        ...oldData,
        thumbnail: { id: files[0].id, original: files[0].fullPath, small: files[0].thumb },
      }));
    },
    [showDrawerMedia],
  );
  const onRemoveThumbnail = useCallback(() => {
    setFormData((oldData) => ({
      ...oldData,
      thumbnail: undefined,
    }));
  }, []);
  const onRemoveHeroBanners = useCallback(() => {
    setFormData((oldData) => ({
      ...oldData,
      heroBanner: undefined,
    }));
  }, []);
  const onOpenMediaToSelectThumbail = useCallback(() => setShowDrawerMedia(true), []);

  const onCloseMediaUpload = useCallback(() => setShowDrawerMedia(false), []);

  const isDisablePublishButton = useMemo(
    () =>
      isEqualObject(
        ["id", "slug", "thumbnail", "descriptions", "parentId", "metaTitle", "metaDescription", "metaKeyword", "name"],
        formData,
        initData ?? initFormData,
      ),
    [initData, formData],
  );

  useEffect(() => {
    onWatchFormChange?.(formData);
  }, [formData]);
  useEffect(() => {
    setFormData((prev) => {
      return initData
        ? {
            ...prev,
            id: initData.id,
            originId: initData.originId,
            parentId: initData.parentId,
            name: initData.name,
            slug: initData.slug,
            thumbnail: initData?.thumbnail || undefined,
            descriptions: initData.descriptions,
            lang: initData.lang,
            metaTitle: initData.metaTitle,
            metaDescription: initData.metaDescription,
            metaKeyword: initData.metaKeyword,
            status: initData.status,
          }
        : {
            ...initFormData,
            lang: lang,
            originId: originId,
          };
    });

    clearErrors();
  }, [lang, initData]);

  console.log(formData, initData);
  return (
    <>
      <Form layout="vertical">
        <div className="flex w-full">
          <div
            className="post-left flex-1 mr-8"
            // style={{ width: "calc(100% - 380px)" }}
          >
            <FormItem label="Tiêu đề" required validateStatus={errors?.name ? "error" : ""} help={errors?.name || ""}>
              <Input
                placeholder="Tiêu đề"
                value={formData.name}
                onChange={(ev) => onChangeForm("name", ev.target.value)}
              />
            </FormItem>
            <Slug
              slugName={formData.slug}
              lang={lang}
              type="category"
              onSave={onSaveSlug}
              validateStatus={errors?.slug ? "error" : ""}
              help={errors?.slug || ""}
              className="mb-6"
            />
            <FormItem
              label="Chi tiết"
              help={errors?.descriptions || ""}
              validateStatus={errors?.descriptions ? "error" : ""}
            >
              <TextEditor
                onEditorChange={(data, editor) => onChangeForm("descriptions", data)}
                value={formData.descriptions}
              />
            </FormItem>
            <Typography.Title level={4}>SEO Meta</Typography.Title>
            <div className="box border rounded-[4px] px-4 py-6">
              <FormItem
                label="Meta title"
                help={errors?.metaTitle || ""}
                validateStatus={errors?.metaTitle ? "error" : ""}
              >
                <Input
                  placeholder="Meta title"
                  value={formData.metaTitle}
                  onChange={(ev) => onChangeForm("metaTitle", ev.target.value)}
                />
              </FormItem>
              <FormItem
                label="Meta description"
                help={errors?.metaDescription || ""}
                validateStatus={errors?.metaDescription ? "error" : ""}
              >
                <Input.TextArea
                  rows={2}
                  value={formData.metaDescription}
                  onChange={(ev) => onChangeForm("metaDescription", ev.target.value)}
                ></Input.TextArea>
              </FormItem>
              <FormItem
                label="Meta keywords"
                help={errors?.metaKeyword || ""}
                validateStatus={errors?.metaKeyword ? "error" : ""}
              >
                <Input
                  placeholder="Keywords"
                  value={formData.metaKeyword}
                  onChange={(ev) => onChangeForm("metaKeyword", ev.target.value)}
                />
              </FormItem>
            </div>
          </div>
          <div className="post-right w-[320px] xl:w-[380px]">
            <div className="inner-right">
              <Publishing
                onSaveAndPublish={() =>
                  handlerSubmit(
                    {
                      ...formData,
                      status: PageContentStatus.PUBLISH,
                    },
                    onSubmit,
                  )
                }
                onSaveForApproval={() =>
                  handlerSubmit(
                    {
                      ...formData,
                      status: PageContentStatus.PENDING,
                    },
                    onSubmit,
                  )
                }
                onApproval={() => onPublish?.(formData.id)}
                onChangeStatus={handleChangeStatus}
                hideSaveForApproval={action === "update" ?? false}
                hideApproval={formData.status !== PageContentStatus.PENDING || action === "create"}
                action={action}
                onDelete={() => onDelete?.(formData.id)}
                hideDelete={action === "create"}
                status={formData.status}
                disableSubmit={isDisablePublishButton}
                disableSaveForApproval={isDisablePublishButton}
                loading={loading}
              />
              <ThumbnailImage
                thumbnailUrl={
                  formData.thumbnail?.original ? `${mediaConfig.rootPath}/${formData.thumbnail.original}` : undefined
                }
                onRemove={onRemoveThumbnail}
                onAdd={onOpenMediaToSelectThumbail}
                error={errors?.thumbnail}
              />
              <CategoryParentSelectorProps
                lang={lang}
                excludeIds={initData?.id ? [initData?.id] : undefined}
                value={formData.parentId}
                onChange={onChangeParentId}
                className="mb-2"
              />
            </div>
          </div>
        </div>
      </Form>
      <MediaUploadDrawler
        isOpen={showDrawerMedia}
        onClose={onCloseMediaUpload}
        onConfirm={confirmSelectThumbnail}
        mediaTypes={[MediaTypes.IMAGE]}
      />
    </>
  );
};
export default memo(CategoryForm);
