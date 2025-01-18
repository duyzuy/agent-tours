import React, { memo, useCallback, useEffect, useMemo, useState } from "react";
import { Form, Input, SwitchProps, Typography } from "antd";
import { stringToSlug } from "@/utils/stringToSlug";
import { TagFormData } from "../../module/tag.interface";
import { PageContentStatus } from "@/models/management/cms/pageContent.interface";
import { LangCode } from "@/models/management/cms/language.interface";
import Publishing from "@/components/admin/Publishing";
import TextEditor from "@/components/base/TextEditor";
import FormItem from "@/components/base/FormItem";
import Slug, { SlugProps } from "@/components/admin/Slug";
import { isEqualObject } from "@/utils/compare";
import { tagContentSchema } from "../../schema/tag.schema";
import { ITag } from "@/models/management/tag.interface";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import MetaSeoBox, { MetaSeoBoxProps } from "@/components/admin/MetaSeoBox";

export interface TagFormProps {
  lang: LangCode;
  initData?: Partial<ITag>;
  originId?: number;
  onSubmit?: (data: TagFormData) => void;
  onPublish?: (id?: number) => void;
  onWatchFormChange?: (data: TagFormData) => void;
  action?: "create" | "update";
  onChangeStatus?: (data: { id: number; status: PageContentStatus }) => void;
  onDelete?: (id: number, cb?: () => void) => void;
}
export const initFormData = new TagFormData(
  undefined,
  0,
  "",
  "",
  "",
  "",
  "",
  "",
  LangCode.VI,
  PageContentStatus.PUBLISH,
);

const TagForm: React.FC<TagFormProps> = ({
  lang,
  initData,
  onSubmit,
  onWatchFormChange,
  onPublish,
  originId,
  action,
  onChangeStatus,
  onDelete,
}) => {
  const { control, watch, clearErrors, getValues, setValue, handleSubmit } = useForm<TagFormData>({
    resolver: yupResolver(tagContentSchema),
    defaultValues: { ...initFormData, originId },
  });

  const handleSaveSlug = useCallback<Required<SlugProps>["onSave"]>(
    (value) => {
      setValue("slug", stringToSlug(value));
    },
    [watch("slug")],
  );
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

  const onChangeStatusPage = useCallback<Required<SwitchProps>["onChange"]>(
    (checked) => {
      initData?.id &&
        onChangeStatus?.({
          id: initData.id,
          status: checked ? PageContentStatus.PUBLISH : PageContentStatus.UNPUBLISH,
        });
    },
    [initData],
  );

  useEffect(() => {
    if (action === "create") {
      setValue("slug", stringToSlug(getValues("name") ?? ""));
    }
  }, [watch("name")]);
  const isDisablePublishButton = useMemo(() => {
    let newInitData = initData || initFormData;

    return isEqualObject(
      ["slug", "metaTitle", "metaDescription", "metaKeyword", "name", "descriptions"],
      getValues(),
      newInitData,
    );
  }, [initData, watch()]);
  // stringToDate(initData.publishDate).toISOString(),

  useEffect(() => {
    const initValues = initData
      ? new TagFormData(
          initData.id,
          initData.originId,
          initData.name,
          initData.slug,
          initData.descriptions,
          initData.metaTitle,
          initData.metaDescription,
          initData.metaKeyword,
          initData.lang,
          initData.status,
        )
      : { ...initFormData, lang, originId: originId };

    Object.entries(initValues).map(([key, value], _index) => {
      setValue(key as keyof TagFormData, value);
    });
    clearErrors();
  }, [lang, initData, originId]);

  console.log(getValues());
  return (
    <Form layout="vertical">
      <div className="flex w-full">
        <div
          className="post-left flex-1 mr-8"
          // style={{ width: "calc(100% - 380px)" }}
        >
          <Controller
            name="name"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <FormItem label="Tiêu đề" required validateStatus={error ? "error" : ""} help={error?.message}>
                <Input placeholder="Tiêu đề" {...field} />
              </FormItem>
            )}
          />
          <Controller
            name="slug"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <Slug
                slugName={field.value}
                lang={lang}
                type="tag"
                onSave={handleSaveSlug}
                validateStatus={error ? "error" : ""}
                help={error?.message}
                className="mb-6"
              />
            )}
          />
          <Controller
            name="descriptions"
            control={control}
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
              label="Đăng thẻ bài viết"
              // onChangeTemplate={onChangeTemplate}
              onSaveAndPublish={handleSubmit((data) =>
                onSubmit?.({
                  ...data,
                  status: PageContentStatus.PUBLISH,
                }),
              )}
              onSaveForApproval={handleSubmit((data) =>
                onSubmit?.({
                  ...data,
                  status: PageContentStatus.PENDING,
                }),
              )}
              onApproval={() => onPublish?.(initData?.id)}
              onChangeStatus={onChangeStatusPage}
              hideSaveForApproval={action === "update"}
              hideApproval={getValues("status") !== PageContentStatus.PENDING || action === "create"}
              action={action}
              status={getValues("status")}
              disableSubmit={isDisablePublishButton}
              disableSaveForApproval={isDisablePublishButton}
              onDelete={() => initData?.id && onDelete?.(initData.id)}
              hideDelete={action === "create"}
            />
          </div>
        </div>
      </div>
    </Form>
  );
};
export default memo(TagForm);
