import React, { memo, useCallback, useEffect, useMemo, useState } from "react";
import { Form, Input, SwitchProps, Typography } from "antd";
import dayjs from "dayjs";
import { stringToSlug } from "@/utils/stringToSlug";
import { DATE_FORMAT, DATE_TIME_FORMAT, TIME_FORMAT } from "@/constants/common";
import { useFormSubmit } from "@/hooks/useFormSubmit";
import { mediaConfig } from "@/configs";

import { IPageContentDetail } from "@/models/management/cms/pageContent.interface";
import { PageContentFormData } from "../../modules/pageContent.interface";
import { pageContentSchema } from "../../schema/pageContent.schema";
import { PageContentStatus } from "@/models/management/cms/pageContent.interface";
import { LangCode } from "@/models/management/cms/language.interface";

import MediaUploadDrawler, { MediaUploadProps } from "@/app/(management)/portal/media/_components/MediaUploadDrawler";
import ThumbnailImage from "@/components/admin/ThumbnailImage";
import Publishing, { PublishingProps } from "@/components/admin/Publishing";
import TextEditor from "@/components/base/TextEditor";
import FormItem from "@/components/base/FormItem";
import Slug, { SlugProps } from "@/components/admin/Slug";
import PageParentList from "./PageParentList";
import { isEqualObject } from "@/utils/compare";
import { templateDefault, CONTENTS_LAYOUT_PAGE_TEMPLATE } from "@/constants/cmsTemplate.constant";
import { MediaTypes } from "@/models/management/media.interface";

type RequirePageContentFormData = Required<PageContentFormData>;

export interface ContentPageFormProps {
  lang: LangCode;
  initData?: IPageContentDetail;
  originId?: number;
  onSubmit?: (data: PageContentFormData) => void;
  onPublish?: (id?: number) => void;
  onWatchFormChange?: (data: PageContentFormData) => void;
  action?: "create" | "update";
  onChangeStatus?: (id: number, type: "active" | "deactive") => void;
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
  dayjs().format(DATE_TIME_FORMAT),
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
  const [formData, setFormData] = useState(initPageContentFormData);

  const [showDrawerMedia, setShowDrawerMedia] = useState<{
    isShow: boolean;
    type?: "heroBanner" | "thumbnail";
  }>(() => ({ isShow: false, type: undefined }));

  const { errors, handlerSubmit, clearErrors } = useFormSubmit({
    schema: pageContentSchema,
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
        return { ...oldData, parentId: undefined };
      }
      return { ...oldData, parentId: value };
    });
  }, []);
  const onChangePublishDate = useCallback<Required<PublishingProps>["onChangeDate"]>((date) => {
    if (date) {
      setFormData((oldData) => {
        const { publishDate } = oldData;
        const [_, time] = publishDate?.split(" ");
        const newPublishDate = [date.format(DATE_FORMAT), time].join(" ");

        return { ...oldData, publishDate: newPublishDate };
      });
    }
  }, []);
  const onChangePublishTime = useCallback<Required<PublishingProps>["onChangeTime"]>((time) => {
    if (time) {
      setFormData((oldData) => {
        const { publishDate } = oldData;
        const [oldDate, _] = publishDate?.split(" ");
        const newPublishDate = [oldDate, time.format(TIME_FORMAT)].join(" ");
        return { ...oldData, publishDate: newPublishDate };
      });
    }
  }, []);

  const onChangeTemplate = useCallback<Required<PublishingProps>["onChangeTemplate"]>(
    (value) =>
      setFormData((oldData) => ({
        ...oldData,
        templateId: value,
      })),
    [],
  );

  const onChangeStatusPage = useCallback<Required<SwitchProps>["onChange"]>(
    (checked) => {
      formData.id && onChangeStatus?.(formData.id, checked ? "active" : "deactive");
    },
    [formData.id],
  );
  const publishDateTime = useMemo(() => {
    return {
      publishTime: dayjs(formData.publishDate, { format: TIME_FORMAT }),
      publishDate: dayjs(formData.publishDate, { format: DATE_FORMAT }),
    };
  }, [formData.publishDate]);

  const onConfirmSelectMediaImage = useCallback<Required<MediaUploadProps>["onConfirm"]>(
    (files) => {
      const type = showDrawerMedia.type;
      type &&
        setFormData((oldData) => ({
          ...oldData,
          [type]: type === "heroBanner" ? files[0].fullPath : { id: files[0].id, original: files[0].fullPath },
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
  const onOpenMediaToSelectThumbail = useCallback(
    () =>
      setShowDrawerMedia({
        isShow: true,
        type: "thumbnail",
      }),
    [],
  );
  const onOpenMediaToSelectHeroBanner = useCallback(
    () =>
      setShowDrawerMedia({
        isShow: true,
        type: "heroBanner",
      }),
    [],
  );
  const onCloseMediaUpload = useCallback(() => setShowDrawerMedia({ isShow: false, type: undefined }), []);

  const isDisablePublishButton = useMemo(
    () =>
      isEqualObject(
        [
          "id",
          "slug",
          "thumbnail",
          "excerpt",
          "heroBanner",
          "descriptions",
          "parentId",
          "templateId",
          "metaTitle",
          "metaDescription",
          "metaKeyword",
          "publishDate",
          "name",
        ],
        formData,
        initData || initPageContentFormData,
      ),
    [initData, formData],
  );

  useEffect(() => {
    onWatchFormChange?.(formData);
  }, [formData]);
  useEffect(() => {
    if (initData) {
      setFormData((prev) => ({
        ...prev,
        id: initData.id,
        originId: initData.originId,
        name: initData.name,
        slug: initData.slug,
        thumbnail: initData.thumbnail,
        excerpt: initData.excerpt,
        heroBanner: initData.heroBanner,
        descriptions: initData.descriptions,
        parentId: initData.parentId,
        templateId: initData.templateId,
        lang: initData.lang,
        metaTitle: initData.metaTitle,
        metaDescription: initData.metaDescription,
        metaKeyword: initData.metaKeyword,
        publishDate: initData.publishDate,
        status: initData.status,
      }));
    } else {
      setFormData({
        ...initPageContentFormData,
        lang: lang,
        originId: originId,
      });
    }
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
              type="page"
              onSave={onSaveSlug}
              validateStatus={errors?.slug ? "error" : ""}
              help={errors?.slug || ""}
              className="mb-6"
            />
            <FormItem label="Mô tả ngắn" help={errors?.excerpt || ""} validateStatus={errors?.excerpt ? "error" : ""}>
              <Input.TextArea
                className="resize-none"
                rows={3}
                value={formData.excerpt}
                onChange={(ev) => onChangeForm("excerpt", ev.target.value)}
              ></Input.TextArea>
            </FormItem>
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
                templateValue={formData.templateId}
                templateList={CONTENTS_LAYOUT_PAGE_TEMPLATE}
                onChangeTemplate={onChangeTemplate}
                onChangeTime={onChangePublishTime}
                onChangeDate={onChangePublishDate}
                timeValue={publishDateTime.publishTime}
                dateValue={publishDateTime.publishDate}
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
                onChangeStatus={onChangeStatusPage}
                onDelete={() => formData.id && onDelete?.(formData.id)}
                hideSaveForApproval={action === "update" ?? false}
                hideApproval={formData.status !== PageContentStatus.PENDING || action === "create"}
                action={action}
                status={formData.status}
                disableSubmit={isDisablePublishButton}
                disableSaveForApproval={isDisablePublishButton}
                hideDelete={action === "create"}
              />
              <ThumbnailImage
                label="Hero banners"
                thumbnailUrl={formData.heroBanner ? `${mediaConfig.rootPath}/${formData.heroBanner}` : undefined}
                onRemove={onRemoveHeroBanners}
                onAdd={onOpenMediaToSelectHeroBanner}
                error={errors?.heroBanner}
              />
              <ThumbnailImage
                thumbnailUrl={
                  formData.thumbnail?.original ? `${mediaConfig.rootPath}/${formData.thumbnail.original}` : undefined
                }
                onRemove={onRemoveThumbnail}
                onAdd={onOpenMediaToSelectThumbail}
                error={errors?.thumbnail}
              />
              <PageParentList
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
        isOpen={showDrawerMedia.isShow}
        onClose={onCloseMediaUpload}
        onConfirm={onConfirmSelectMediaImage}
        mediaTypes={[MediaTypes.ICON, MediaTypes.IMAGE]}
      />
    </>
  );
};
export default memo(ContentPageForm);
