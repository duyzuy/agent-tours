import React, { memo, useCallback, useEffect, useMemo, useState } from "react";
import { Form, Input, SwitchProps, Typography } from "antd";
import dayjs from "dayjs";
import { stringToSlug } from "@/utils/stringToSlug";
import { DATE_TIME_FORMAT } from "@/constants/common";
import { mediaConfig } from "@/configs";

import { IPageContentDetail } from "@/models/management/cms/pageContent.interface";
import { PageContentFormData } from "../../modules/pageContent.interface";
import { pageContentSchema } from "../../schema/pageContent.schema";
import { PageContentStatus } from "@/models/management/cms/pageContent.interface";
import { LangCode } from "@/models/management/cms/language.interface";

import ThumbnailImage, { ThumbnailImageProps } from "@/components/admin/ThumbnailImage";
import Publishing, { PublishingProps } from "@/components/admin/Publishing";
import TextEditor from "@/components/base/TextEditor";
import FormItem from "@/components/base/FormItem";
import Slug, { SlugProps } from "@/components/admin/Slug";
import PageParentList from "./PageParentList";
import { isEqualObject } from "@/utils/compare";
import { templateDefault, CONTENTS_LAYOUT_PAGE_TEMPLATE } from "@/constants/cmsTemplate.constant";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import MetaSeoBox, { MetaSeoBoxProps } from "@/components/admin/MetaSeoBox";
import { stringToDate } from "@/utils/date";

export interface ContentPageFormProps {
  lang: LangCode;
  initData?: IPageContentDetail;
  originId?: number;
  onSubmit?: (data: PageContentFormData) => void;
  onPublish?: (id?: number) => void;
  onWatchFormChange?: (data: PageContentFormData) => void;
  action?: "create" | "update";
  onChangeStatus?: (data: { id: number; type: PageContentStatus }, cb?: () => void) => void;
  onDelete?: (id: number, cb?: () => void) => void;
}
export const initPageContentFormData = new PageContentFormData(
  undefined,
  undefined,
  "",
  "",
  "",
  undefined,
  "",
  "",
  0,
  templateDefault.value,
  undefined,
  "",
  "",
  "",
  dayjs().locale("en").format(DATE_TIME_FORMAT),
  PageContentStatus.PENDING,
);

const ContentPageForm: React.FC<ContentPageFormProps> = ({
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
  const { control, getValues, setValue, watch, clearErrors, handleSubmit } = useForm<PageContentFormData>({
    resolver: yupResolver(pageContentSchema),
    defaultValues: { ...initPageContentFormData },
  });
  const [loadingStatus, setLoadingStatus] = useState(false);
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

  const handleSaveSlug = useCallback<Required<SlugProps>["onSave"]>((value) => {
    setValue("slug", stringToSlug(value));
  }, []);

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
      setLoadingStatus(true);
      initData?.id &&
        onChangeStatus?.(
          { id: initData.id, type: checked ? PageContentStatus.PUBLISH : PageContentStatus.UNPUBLISH },
          () => {
            setLoadingStatus(false);
          },
        );
    },
    [initData],
  );

  const onChangeTemplate = useCallback<Required<PublishingProps>["onChangeTemplate"]>(
    (template) => {
      console.log(template);
      setValue("templateId", template);
    },
    [watch("templateId")],
  );

  const onRemoveThumbnail = useCallback(() => {
    setValue("thumbnail", undefined);
  }, []);

  const handleAddThumb: ThumbnailImageProps["onAdd"] = (thumbnail) => {
    setValue("thumbnail", { id: thumbnail.id, original: thumbnail.fullPath, small: thumbnail.thumb });
  };

  const onRemoveHeroBanner = useCallback(() => {
    setValue("heroBanner", undefined);
  }, []);

  const handleAddHeroBanner: ThumbnailImageProps["onAdd"] = (thumbnail) => {
    setValue("heroBanner", thumbnail.fullPath);
  };

  const isDisablePublishButton = useMemo(() => {
    let newInitData = initData || initPageContentFormData;

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
        "excerpt",
        "heroBanner",
        "descriptions",
        "thumbnail",
        "templateId",
      ],
      getValues(),
      newInitData,
    );
  }, [initData, watch()]);

  useEffect(() => {
    if (action === "create") {
      const name = getValues("name") || "";
      setValue("slug", stringToSlug(name));
    }
  }, [watch("name")]);

  useEffect(() => {
    const initValues = initData
      ? new PageContentFormData(
          initData.id,
          initData.originId,
          initData.name,
          initData.slug,
          initData.excerpt,
          initData.thumbnail ?? undefined,
          initData.heroBanner ?? undefined,
          initData.descriptions,
          initData.parentId,
          initData.templateId,
          initData.lang,
          initData.metaTitle,
          initData.metaDescription,
          initData.metaKeyword,
          stringToDate(initData.publishDate)?.toISOString(),
          initData.status,
        )
      : { ...initPageContentFormData, originId, lang };

    Object.entries(initValues).map(([key, value], _index) => {
      setValue(key as keyof PageContentFormData, value);
    });
    clearErrors();
  }, [lang, initData]);

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
                type="page"
                onSave={handleSaveSlug}
                validateStatus={error ? "error" : ""}
                help={error?.message}
                className="mb-6"
              />
            )}
          />

          <Controller
            name="excerpt"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <FormItem label="Mô tả ngắn" help={error?.message} validateStatus={error ? "error" : ""}>
                <Input.TextArea className="resize-none" rows={3} {...field}></Input.TextArea>
              </FormItem>
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
              templateValue={getValues("templateId")}
              templateList={CONTENTS_LAYOUT_PAGE_TEMPLATE}
              onChangeTemplate={onChangeTemplate}
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
              onSaveForApproval={handleSubmit((data) =>
                onSubmit?.({
                  ...data,
                  status: PageContentStatus.PENDING,
                }),
              )}
              onApproval={() => onPublish?.(initData?.id)}
              loading={loadingStatus}
              onChangeStatus={onChangeStatusPage}
              onDelete={() => initData?.id && onDelete?.(initData.id)}
              hideSaveForApproval={action === "update"}
              hideApproval={getValues("status") !== PageContentStatus.PENDING || action === "create"}
              action={action}
              status={getValues("status")}
              disableSubmit={isDisablePublishButton}
              disableSaveForApproval={isDisablePublishButton}
              hideDelete={action === "create"}
            />

            <Controller
              name="heroBanner"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <ThumbnailImage
                  label="Hero banners"
                  thumbnailUrl={field.value ? `${mediaConfig.rootPath}/${field.value}` : undefined}
                  onRemove={onRemoveHeroBanner}
                  onAdd={handleAddHeroBanner}
                  error={error?.message}
                />
              )}
            />

            <Controller
              name="thumbnail"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <ThumbnailImage
                  thumbnailUrl={field.value ? `${mediaConfig.rootPath}/${field.value.original}` : undefined}
                  onRemove={onRemoveThumbnail}
                  onAdd={handleAddThumb}
                  error={error?.message}
                />
              )}
            />
            <Controller
              name="parentId"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <PageParentList
                  lang={lang}
                  excludeIds={initData?.id ? [initData?.id] : undefined}
                  value={field.value}
                  onChange={(value) => field.onChange(value)}
                  className="mb-2"
                />
              )}
            />
          </div>
        </div>
      </div>
    </Form>
  );
};
export default memo(ContentPageForm);
