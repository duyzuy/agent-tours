import React, { memo, useCallback, useEffect, useMemo, useState } from "react";
import { Button, Form, Input, SwitchProps, Typography } from "antd";
import dayjs from "dayjs";
import { stringToSlug } from "@/utils/stringToSlug";
import { mediaConfig } from "@/configs";
import { visaTemplateContentSchema } from "../../../schema/visaTemplate.schema";

import { VisaTemplateContentFormData } from "../../../modules/visaTemplate.interface";
import { PageContentStatus } from "@/models/management/cms/pageContent.interface";
import { LangCode } from "@/models/management/cms/language.interface";

import ThumbnailImage, { ThumbnailImageProps } from "@/components/admin/ThumbnailImage";
import Publishing, { PublishingProps } from "@/components/admin/Publishing";
import FormItem from "@/components/base/FormItem";
import Slug, { SlugProps } from "@/components/admin/Slug";
import { isEqualObject } from "@/utils/compare";
import { PlusOutlined } from "@ant-design/icons";
import MetaDataFields, { MetaDataFieldsProps } from "./MetaDataFields";
import { isEmpty, isUndefined } from "lodash";

import TemplateMetaContentForm, { TemplateMetaContentFormProps } from "./TemplateMetaContentForm";
import FileDownloadSelector, { FileDownloadSelectorProps } from "./FilesDownloadSelector";
import { IVisaTemplateContent } from "@/models/management/cms/visaTemplateContent.interface";

import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import MetaSeoBox, { MetaSeoBoxProps } from "@/components/admin/MetaSeoBox";
import { stringToDate } from "@/utils/date";

export interface CMSTemplateContentFormProps {
  lang?: LangCode;
  initData?: IVisaTemplateContent;
  code?: string;
  onSubmit?: (data: VisaTemplateContentFormData) => void;
  onSubmitMetaContent?: TemplateMetaContentFormProps["onSubmit"];
  onPublish?: (id?: number) => void;
  onDelete?: (id?: number) => void;
  onWatchFormChange?: (data: VisaTemplateContentFormData) => void;
  action?: "create" | "update";
  onChangeStatus?: (id: number, type: PageContentStatus.PUBLISH | PageContentStatus.UNPUBLISH) => void;
}
export const initCmsTemplate = new VisaTemplateContentFormData(
  undefined,
  "",
  "",
  "",
  undefined,
  undefined,
  "",
  "",
  [],
  "",
  "",
  "",
  undefined,
  PageContentStatus.PENDING,
  LangCode.VI,
);

const CMSTemplateContentForm: React.FC<CMSTemplateContentFormProps> = ({
  lang,
  initData,
  onSubmit,
  onWatchFormChange,
  onPublish,
  code,
  action,
  onChangeStatus,
  onSubmitMetaContent,
  onDelete,
}) => {
  const { getValues, watch, setValue, control, handleSubmit, clearErrors } = useForm<VisaTemplateContentFormData>({
    resolver: yupResolver(visaTemplateContentSchema),
    defaultValues: initCmsTemplate,
  });

  const onSaveSlug = useCallback<Required<SlugProps>["onSave"]>(
    (value) => {
      setValue("slug", stringToSlug(value));
    },
    [watch("slug")],
  );

  const onChangePublishDate = useCallback<Required<PublishingProps>["onChangeDate"]>((date) => {
    if (date) {
      const newPublishDate = date.toISOString();
      setValue("publishDate", newPublishDate);
    }
  }, []);
  const onChangePublishTime = useCallback<Required<PublishingProps>["onChangeTime"]>((time) => {
    if (time) {
      const newPublishDate = time.toISOString();
      setValue("publishDate", newPublishDate);
    }
  }, []);

  const onChangeStatusPage = useCallback<Required<SwitchProps>["onChange"]>(
    (checked) => {
      initData?.id && onChangeStatus?.(initData.id, checked ? PageContentStatus.PUBLISH : PageContentStatus.UNPUBLISH);
    },
    [initData],
  );

  const addMetaDataFields = () => {
    const oldMetaData = getValues("metaData");
    const newMetaDataFields = [...(oldMetaData || []), { value: "", icon: "", key: "" }];
    setValue("metaData", newMetaDataFields);
  };

  const onChangeMetaDataForm: MetaDataFieldsProps["onChange"] = (data, index) => {
    if (isUndefined(index)) return;

    const oldMetaData = getValues("metaData");

    if (oldMetaData) {
      let newMetaData = [...oldMetaData];

      newMetaData.splice(index, 1, {
        ...newMetaData[index],
        ...data,
      });

      setValue("metaData", newMetaData);
    }
  };

  const removeMetaDataItem = (index: number) => {
    const oldMetaData = getValues("metaData");

    let newMetaData = [...(oldMetaData || [])];
    newMetaData.splice(index, 1);
    setValue("metaData", newMetaData);
  };

  const onSaveFilesDownload: FileDownloadSelectorProps["setFiles"] = (files) => {
    setValue("downloads", files);
  };
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

  const onRemoveThumbnail = useCallback(() => {
    setValue("thumbnail", undefined);
  }, []);

  const handleAddThumb: ThumbnailImageProps["onAdd"] = (thumbnail) => {
    setValue("thumbnail", { id: thumbnail.id, original: thumbnail.fullPath, small: thumbnail.thumb });
  };

  const isDisablePublishButton = useMemo(() => {
    let newInitData = initData || initCmsTemplate;

    if (initData?.publishDate) {
      newInitData = { ...newInitData, publishDate: stringToDate(initData.publishDate)?.toISOString() || "" };
    }

    return isEqualObject(
      [
        "slug",
        "metaTitle",
        "metaDescription",
        "metaKeyword",
        "publishDate",
        "name",
        "content",
        "subContent",
        "status",
        "publishDate",
        "downloads",
        "thumbnail",
        "metaData",
      ],
      getValues(),
      newInitData,
    );
  }, [initData, watch()]);

  useEffect(() => {
    const initValues = initData
      ? new VisaTemplateContentFormData(
          initData.id,
          initData.code,
          initData.name,
          initData.slug,
          initData.thumbnail ?? undefined,
          initData.downloads,
          initData.content,
          initData.subContent,
          initData.metaData,
          initData.metaTitle,
          initData.metaDescription,
          initData.metaKeyword,
          stringToDate(initData.publishDate)?.toISOString(),
          initData.status,
          initData.lang,
        )
      : initCmsTemplate;

    Object.entries(initValues).map(([key, value], _index) => {
      setValue(key as keyof VisaTemplateContentFormData, value);
    });
    clearErrors();
  }, [lang, initData]);

  return (
    <>
      <Form layout="vertical">
        <div className="flex w-full">
          <div className="post-left flex-1 mr-8" style={{ width: "calc(100% - 380px)" }}>
            <Controller
              control={control}
              name="name"
              render={({ field, fieldState: { error } }) => (
                <FormItem label="Tiêu đề template" required validateStatus={error ? "error" : ""} help={error?.message}>
                  <Input placeholder="Tiêu đề template" {...field} />
                </FormItem>
              )}
            />
            <Controller
              control={control}
              name="slug"
              render={({ field, fieldState: { error } }) => (
                <FormItem label="Tiêu đề template" required validateStatus={error ? "error" : ""} help={error?.message}>
                  <Slug
                    slugName={field.value}
                    lang={lang}
                    type="visa"
                    onSave={onSaveSlug}
                    validateStatus={error ? "error" : ""}
                    help={error?.message}
                    className="mb-6"
                  />
                </FormItem>
              )}
            />

            <Typography.Title level={4}>Meta data</Typography.Title>
            <div className="border p-6 rounded-md mb-6">
              <Controller
                control={control}
                name="metaData"
                render={({ field, fieldState: { error } }) => (
                  <>
                    {field.value?.map((metaItem, _index) => (
                      <MetaDataFields
                        key={_index}
                        index={_index}
                        values={metaItem}
                        onChange={onChangeMetaDataForm}
                        onRemove={removeMetaDataItem}
                      />
                    ))}
                  </>
                )}
              />
              <Button
                icon={<PlusOutlined />}
                type="primary"
                ghost
                disabled={getValues("metaData")?.length === 6}
                onClick={addMetaDataFields}
                size="small"
              >
                Thêm
              </Button>
            </div>
            <Controller
              control={control}
              name="downloads"
              render={({ field, fieldState: { error } }) => (
                <FileDownloadSelector files={field.value} setFiles={onSaveFilesDownload} />
              )}
            />

            <Controller
              control={control}
              name="subContent"
              render={({ field, fieldState: { error } }) => (
                <FormItem label="Mô tả ngắn" help={error?.message} validateStatus={error ? "error" : ""}>
                  <Input.TextArea className="resize-none" rows={3} {...field}></Input.TextArea>
                </FormItem>
              )}
            />

            {/*<FormItem
                            label="Chi tiết"
                            help={errors?.content || ""}
                            validateStatus={errors?.content ? "error" : ""}
                        >
                            <TextEditor
                                onEditorChange={(data, editor) =>
                                    onChangeForm("content", data)
                                }
                                value={formData.content}
                            />
                        </FormItem> */}
            <Typography.Title level={4}>SEO Meta</Typography.Title>
            <MetaSeoBox
              values={{
                metaDescription: getValues("metaDescription"),
                metaKeyword: getValues("metaKeyword"),
                metaTitle: getValues("metaTitle"),
              }}
              onChange={onChangeMetaSeoBox}
            />
            <TemplateMetaContentForm
              contentlabel="Thông tin Visa"
              referenceId={initData?.id}
              lang={lang}
              initialData={initData?.visaContent ?? undefined}
              className="mb-6"
              onSubmit={onSubmitMetaContent}
            />
          </div>
          <div className="post-right w-[320px] xl:w-[380px]">
            <Publishing
              // templateValue={formData.templateId}
              // templateList={CONTENTS_LAYOUT_PAGE_TEMPLATE}
              // onChangeTemplate={onChangeTemplate}
              onChangeTime={onChangePublishTime}
              onChangeDate={onChangePublishDate}
              timeValue={dayjs(getValues("publishDate"))}
              dateValue={dayjs(getValues("publishDate"))}
              onSaveAndPublish={handleSubmit((data) =>
                onSubmit?.({
                  ...data,
                  status: PageContentStatus.PUBLISH,
                }),
              )}
              onDelete={() => onDelete?.(initData?.id)}
              onApproval={() => onPublish?.(initData?.id)}
              onChangeStatus={onChangeStatusPage}
              hideSaveForApproval={action === "update"}
              hideApproval={getValues("status") !== PageContentStatus.PENDING || action === "create"}
              hideDelete={action === "create"}
              action={action}
              status={getValues("status")}
              disableSubmit={isDisablePublishButton}
              disableSaveForApproval={isDisablePublishButton}
              // errors={{
              //   publishDate: errors?.publishDate,
              // }}
            />
            <Controller
              control={control}
              name="thumbnail"
              render={({ field, fieldState: { error } }) => (
                <ThumbnailImage
                  thumbnailUrl={
                    field.value && field.value.id !== 0 ? `${mediaConfig.rootPath}/${field.value.original}` : undefined
                  }
                  onRemove={onRemoveThumbnail}
                  onAdd={handleAddThumb}
                  error={error?.message}
                />
              )}
            />
          </div>
        </div>
      </Form>
    </>
  );
};
export default memo(CMSTemplateContentForm);
