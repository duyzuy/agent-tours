import React, { memo, useCallback, useEffect, useMemo } from "react";
import { Form, Input, SwitchProps, Typography } from "antd";

import { stringToSlug } from "@/utils/stringToSlug";

import { mediaConfig } from "@/configs";

import { CategoryFormData } from "../../modules/category.interface";
import { PageContentStatus } from "@/models/management/cms/pageContent.interface";
import { LangCode } from "@/models/management/cms/language.interface";

import ThumbnailImage, { ThumbnailImageProps } from "@/components/admin/ThumbnailImage";
import Publishing from "@/components/admin/Publishing";
import TextEditor from "@/components/base/TextEditor";
import FormItem from "@/components/base/FormItem";
import Slug, { SlugProps } from "@/components/admin/Slug";
import CategoryParentSelectorProps from "./CategoryParentSelector";
import { isEqualObject } from "@/utils/compare";

import { categorySchema } from "../../schema/categorySchema.schema";
import { ICategory } from "@/models/management/category.interface";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import MetaSeoBox, { MetaSeoBoxProps } from "@/components/admin/MetaSeoBox";

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
  const { getValues, setValue, clearErrors, handleSubmit, control, watch } = useForm<CategoryFormData>({
    resolver: yupResolver(categorySchema),
    defaultValues: { ...initFormData },
  });

  const onSaveSlug = useCallback<Required<SlugProps>["onSave"]>((value) => {
    setValue("slug", stringToSlug(value));
  }, []);

  const onChangeMetaSeoBox: MetaSeoBoxProps["onChange"] = ({ key, value, data }) => {
    if (key === "metaTitle") {
      setValue("metaTitle", value);
    }
    if (key === "metaDescription") {
      setValue("metaDescription", value);
    }
    if (key === "metaKeyword") {
      setValue("metaKeyword", value);
    }
  };

  const onChangeParentId = useCallback((value: number) => {
    setValue("parentId", value);
  }, []);

  const handleChangeStatus = useCallback<Required<SwitchProps>["onChange"]>(
    (checked) => {
      initData?.id &&
        onUpdateStatus?.({
          id: initData.id,
          status: checked ? PageContentStatus.PUBLISH : PageContentStatus.UNPUBLISH,
        });
    },
    [initData],
  );

  const onRemoveThumbnail = useCallback(() => {
    setValue("thumbnail", undefined);
  }, []);

  const handleAddThumb: ThumbnailImageProps["onAdd"] = (thumbnail) => {
    setValue("thumbnail", { id: thumbnail.id, original: thumbnail.fullPath, small: thumbnail.thumb });
  };

  const isDisablePublishButton = useMemo(() => {
    let newInitData = initData || initFormData;

    return isEqualObject(
      ["id", "slug", "thumbnail", "descriptions", "parentId", "metaTitle", "metaDescription", "metaKeyword", "name"],
      getValues(),
      newInitData,
    );
  }, [initData, watch()]);

  useEffect(() => {
    if (action === "create") {
      const catName = getValues("name");
      setValue("slug", stringToSlug(catName ?? ""));
    }
  }, [watch("name")]);
  useEffect(() => {
    const initValues = initData
      ? new CategoryFormData(
          initData.id,
          initData.originId,
          initData.name,
          initData.slug,
          initData.parentId,
          initData.thumbnail ?? undefined,
          initData.descriptions,
          initData.metaTitle,
          initData.metaDescription,
          initData.metaKeyword,
          initData.lang,
          initData.status,
        )
      : { ...initFormData, originId, lang };

    Object.entries(initValues).map(([key, value], _index) => {
      setValue(key as keyof CategoryFormData, value);
    });
    clearErrors();
  }, [lang, initData]);

  return (
    <>
      <Form layout="vertical">
        <div className="flex w-full">
          <div
            className="post-left flex-1 mr-8"
            // style={{ width: "calc(100% - 380px)" }}
          >
            <Controller
              control={control}
              name="name"
              render={({ field, fieldState: { error } }) => (
                <FormItem label="Tiêu đề" required validateStatus={error ? "error" : ""} help={error?.message}>
                  <Input placeholder="Tiêu đề" {...field} />
                </FormItem>
              )}
            />
            <Controller
              control={control}
              name="slug"
              render={({ field, fieldState: { error } }) => (
                <Slug
                  slugName={field.value}
                  lang={lang}
                  type="category"
                  onSave={onSaveSlug}
                  validateStatus={error ? "error" : ""}
                  help={error?.message}
                  className="mb-6"
                />
              )}
            />
            <Controller
              control={control}
              name="descriptions"
              render={({ field, fieldState: { error } }) => (
                <FormItem label="Chi tiết" help={error?.message} validateStatus={error ? "error" : ""}>
                  <TextEditor onEditorChange={(data, editor) => field.onChange(data)} value={field.value} />
                </FormItem>
              )}
            />

            <Typography.Title level={4}>SEO Meta</Typography.Title>
            <MetaSeoBox
              values={{
                metaDescription: getValues("metaDescription"),
                metaKeyword: getValues("metaKeyword"),
                metaTitle: getValues("metaTitle"),
              }}
              onChange={onChangeMetaSeoBox}
            />
          </div>
          <div className="post-right w-[320px] xl:w-[380px]">
            <div className="inner-right">
              <Publishing
                onSaveAndPublish={handleSubmit((data) => onSubmit?.({ ...data, status: PageContentStatus.PUBLISH }))}
                onSaveForApproval={handleSubmit((data) => onSubmit?.({ ...data, status: PageContentStatus.PENDING }))}
                onApproval={() => onPublish?.(initData?.id)}
                onChangeStatus={handleChangeStatus}
                hideSaveForApproval={action === "update"}
                hideApproval={getValues("status") !== PageContentStatus.PENDING || action === "create"}
                action={action}
                onDelete={() => onDelete?.(initData?.id)}
                hideDelete={action === "create"}
                status={getValues("status")}
                disableSubmit={isDisablePublishButton}
                disableSaveForApproval={isDisablePublishButton}
                loading={loading}
              />
              <Controller
                control={control}
                name="thumbnail"
                render={({ field, fieldState: { error } }) => (
                  <ThumbnailImage
                    thumbnailUrl={field.value ? `${mediaConfig.rootPath}/${field.value.original}` : undefined}
                    onRemove={onRemoveThumbnail}
                    onAdd={handleAddThumb}
                    error={error?.message}
                  />
                )}
              />
              <CategoryParentSelectorProps
                lang={lang}
                excludeIds={initData?.id ? [initData?.id] : undefined}
                value={getValues("parentId")}
                onChange={onChangeParentId}
                className="mb-2"
              />
            </div>
          </div>
        </div>
      </Form>
    </>
  );
};
export default memo(CategoryForm);
