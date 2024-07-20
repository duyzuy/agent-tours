import React, { memo, useCallback, useEffect, useMemo, useState } from "react";
import { Button, Form, Input, SwitchProps, Typography } from "antd";
import dayjs from "dayjs";
import { stringToSlug } from "@/utils/stringToSlug";
import { DATE_FORMAT, TIME_FORMAT } from "@/constants/common";
import { useFormSubmit } from "@/hooks/useFormSubmit";
import { mediaConfig } from "@/configs";
import { cmsTemplateContentSchema } from "../../../schema/cmsTemplate.schema";
import { CMSTemplateContentFormData } from "../../../modules/cmsTemplate.interface";
import { PageContentStatus } from "@/models/management/cms/pageContent.interface";
import { LangCode } from "@/models/management/cms/language.interface";

import ThumbnailImage from "@/components/admin/ThumbnailImage";
import Publishing, { PublishingProps } from "@/components/admin/Publishing";
import TextEditor from "@/components/base/TextEditor";
import FormItem from "@/components/base/FormItem";
import Slug, { SlugProps } from "@/components/admin/Slug";
import MediaUploadDrawler, { MediaUploadProps } from "@/app/(management)/portal/media/_components/MediaUploadDrawler";
import { isEqualObject } from "@/utils/compare";
import { PlusOutlined } from "@ant-design/icons";
import MetaDataFields, { MetaDataFieldsProps } from "./MetaDataFields";
import { isEmpty, isUndefined } from "lodash";
import { vietnameseTonesToUnderscoreKeyname } from "@/utils/helper";
import { ICMSTemplateContent } from "@/models/management/cms/cmsTemplateContent.interface";
import GallerySelector, { GallerySelectorProps } from "./GalleriesSelector";
import TemplateMetaContentForm, { TemplateMetaContentFormProps } from "./TemplateMetaContentForm";
import FileDownloadSelector, { FileDownloadSelectorProps } from "./FilesDownloadSelector";
import { IThumbnail } from "@/models/thumbnail.interface";
import { MediaTypes } from "@/models/management/media.interface";

type RequirePageContentFormData = Required<CMSTemplateContentFormData>;

export interface CMSTemplateContentFormProps {
  lang?: LangCode;
  initData?: ICMSTemplateContent;
  code?: string;
  onSubmit?: (data: CMSTemplateContentFormData) => void;
  onSubmitMetaContent?: TemplateMetaContentFormProps["onSubmit"];
  onPublish?: (id?: number) => void;
  onDelete?: (id?: number) => void;
  onWatchFormChange?: (data: CMSTemplateContentFormData) => void;
  action?: "create" | "update";
  onChangeStatus?: (id: number, type: PageContentStatus.PUBLISH | PageContentStatus.UNPUBLISH) => void;
}
export const initCmsTemplate = new CMSTemplateContentFormData(
  undefined,
  "",
  "",
  "",
  undefined,
  [],
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
  const [formData, setFormData] = useState(initCmsTemplate);

  const [showMedia, setShowMedia] = useState<{
    isShow: boolean;
    type?: "thumb" | "images";
  }>(() => ({ isShow: false, type: undefined }));

  const { errors, handlerSubmit, clearErrors } = useFormSubmit({
    schema: cmsTemplateContentSchema,
  });

  const onChangeForm = (
    key: keyof RequirePageContentFormData,
    value: RequirePageContentFormData[keyof RequirePageContentFormData],
  ) => {
    if (key === "code" && typeof value === "string") {
      value = vietnameseTonesToUnderscoreKeyname(value).toUpperCase();
    }
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

  const onChangePublishDate = useCallback<Required<PublishingProps>["onChangeDate"]>((date) => {
    if (date) {
      setFormData((oldData) => {
        const { publishDate } = oldData;
        const [_, time] = (publishDate || "").split(" ");
        const newPublishDate = [date.locale("en").format(DATE_FORMAT), time].join(" ");

        return { ...oldData, publishDate: newPublishDate };
      });
    }
  }, []);
  const onChangePublishTime = useCallback<Required<PublishingProps>["onChangeTime"]>((time) => {
    if (time) {
      setFormData((oldData) => {
        const { publishDate } = oldData;
        const [oldDate, _] = (publishDate || "").split(" ");
        const newPublishDate = [oldDate, time.format(TIME_FORMAT)].join(" ");
        return { ...oldData, publishDate: newPublishDate };
      });
    }
  }, []);

  const onChangeStatusPage = useCallback<Required<SwitchProps>["onChange"]>(
    (checked) => {
      formData.id && onChangeStatus?.(formData.id, checked ? PageContentStatus.PUBLISH : PageContentStatus.UNPUBLISH);
    },
    [formData.id],
  );
  const publishDateTime = useMemo(() => {
    return formData.publishDate
      ? {
          publishTime: dayjs(formData.publishDate, {
            format: TIME_FORMAT,
          }),
          publishDate: dayjs(formData.publishDate, {
            format: DATE_FORMAT,
          }),
        }
      : undefined;
  }, [formData.publishDate]);

  const onConfirmSelectMediaImage = useCallback<Required<MediaUploadProps>["onConfirm"]>(
    (files) => {
      if (showMedia.type === "thumb") {
        setFormData((oldData) => ({
          ...oldData,
          thumbnail: {
            id: files[0].id,
            original: files[0].fullPath,
          },
        }));
      }

      if (showMedia.type === "images") {
        setFormData((oldData) => ({
          ...oldData,
          images: files.reduce<{ id: number; original: string }[]>((acc, item) => {
            return [...acc, { id: item.id, original: files[0].fullPath }];
          }, []),
        }));
      }
    },
    [showMedia],
  );
  const onRemoveThumbnail = useCallback(() => {
    setFormData((oldData) => ({
      ...oldData,
      thumbnail: undefined,
    }));
  }, []);
  const removeMetaDataItem = (index?: number) => {
    setFormData((oldData) => {
      const { metaData } = oldData;
      let newMetaData = [...(metaData || [])];
      if (!isUndefined(index)) {
        newMetaData.splice(index, 1);
      }
      return {
        ...oldData,
        metaData: newMetaData,
      };
    });
  };

  const onOpenMediaToSelectThumbail = useCallback(
    () =>
      setShowMedia({
        isShow: true,
        type: "thumb",
      }),
    [],
  );

  const onCloseMediaUpload = useCallback(() => setShowMedia({ isShow: false, type: undefined }), []);

  const isDisablePublishButton = useMemo(
    () =>
      isEqualObject(
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
          "images",
          "publishDate",
          "downloads",
          "thumbnail",
          "metaData",
        ],
        formData,
        initData || initCmsTemplate,
      ),
    [initData, formData],
  );

  const addMetaDataFields = () => {
    setFormData((oldData) => {
      const { metaData } = oldData;
      const newMetaDataFields = [...(metaData || []), { value: "", icon: "", key: "" }];
      return {
        ...oldData,
        metaData: newMetaDataFields,
      };
    });
  };

  const onChangeMetaDataForm: MetaDataFieldsProps["onChange"] = (data, index) => {
    if (isUndefined(index)) return;

    setFormData((oldData) => {
      const { metaData } = oldData;

      let newMetadata = [...(metaData || [])];

      const item = newMetadata[index];
      if (item) {
        newMetadata.splice(index, 1, {
          ...newMetadata[index],
          ...data,
        });
      }

      return {
        ...oldData,
        metaData: newMetadata,
      };
    });
  };
  const onSaveGallery: GallerySelectorProps["onSave"] = (images) => {
    setFormData((oldData) => ({
      ...oldData,
      images: images,
    }));
  };

  const onSaveFilesDownload: FileDownloadSelectorProps["setFiles"] = (files) => {
    setFormData((oldData) => ({
      ...oldData,
      downloads: [...(files || [])],
    }));
  };

  useEffect(() => {
    onWatchFormChange?.(formData);
  }, [formData]);
  useEffect(() => {
    setFormData((prev) => {
      return initData
        ? {
            ...prev,
            id: initData.id,
            code: initData.code,
            name: initData.name,
            slug: initData.slug,
            thumbnail: initData.thumbnail || undefined,
            content: initData.content,
            subContent: initData.subContent,
            downloads: initData.downloads,
            images: initData.images || undefined,
            metaData: initData.metaData,
            metaTitle: initData.metaTitle,
            metaDescription: initData.metaDescription,
            metaKeyword: initData.metaKeyword,
            publishDate: initData.publishDate,
            lang: initData.lang,
            status: isEmpty(initData.status) ? PageContentStatus.PUBLISH : initData.status,
          }
        : {
            ...initCmsTemplate,
            lang: lang,
            code: code,
          };
    });
    clearErrors();
  }, [lang, initData]);

  console.log(initData, formData);
  return (
    <>
      <Form layout="vertical">
        <div className="flex w-full">
          <div className="post-left flex-1 mr-8" style={{ width: "calc(100% - 380px)" }}>
            {/* <FormItem
                            label="Code"
                            required
                            validateStatus={errors?.code ? "error" : ""}
                            help={errors?.code || ""}
                        >
                            <Input
                                placeholder="Code"
                                disabled
                                value={formData.code}
                                onChange={(ev) =>
                                    onChangeForm("code", ev.target.value)
                                }
                            />
                        </FormItem> */}
            <FormItem
              label="Tiêu đề template"
              required
              validateStatus={errors?.name ? "error" : ""}
              help={errors?.name || ""}
            >
              <Input
                placeholder="Tiêu đề template"
                value={formData.name}
                onChange={(ev) => onChangeForm("name", ev.target.value)}
              />
            </FormItem>
            <Slug
              slugName={formData.slug}
              lang={lang}
              type="tour"
              onSave={onSaveSlug}
              validateStatus={errors?.slug ? "error" : ""}
              help={errors?.slug || ""}
              className="mb-6"
            />

            <Typography.Title level={4}>Meta data</Typography.Title>
            <div className="border p-6 rounded-md mb-6">
              <div className="meta-list">
                {formData.metaData?.map((metaItem, _index) => (
                  <MetaDataFields
                    key={_index}
                    index={_index}
                    values={metaItem}
                    onChange={onChangeMetaDataForm}
                    onRemove={removeMetaDataItem}
                  />
                ))}
              </div>
              <div>
                <Button
                  icon={<PlusOutlined />}
                  type="primary"
                  ghost
                  disabled={formData.metaData?.length === 6}
                  onClick={addMetaDataFields}
                  size="small"
                >
                  Thêm
                </Button>
              </div>
            </div>

            <GallerySelector
              images={formData.images || []}
              error={errors?.["images" as "images"]}
              onSave={onSaveGallery}
            />
            <FileDownloadSelector files={formData.downloads} setFiles={onSaveFilesDownload} />
            <FormItem
              label="Mô tả ngắn"
              help={errors?.subContent || ""}
              validateStatus={errors?.subContent ? "error" : ""}
            >
              <Input.TextArea
                className="resize-none"
                rows={3}
                value={formData.subContent}
                onChange={(ev) => onChangeForm("subContent", ev.target.value)}
              ></Input.TextArea>
            </FormItem>
            {/* <FormItem label="Chi tiết" help={errors?.content || ""} validateStatus={errors?.content ? "error" : ""}>
              <TextEditor onEditorChange={(data, editor) => onChangeForm("content", data)} value={formData.content} />
            </FormItem> */}
            <Typography.Title level={4}>SEO Meta</Typography.Title>
            <div className="box border rounded-md px-4 pt-6 mb-6">
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
            <TemplateMetaContentForm
              contentlabel="Thông tin tour"
              type="includeAndNote"
              referenceId={formData.id}
              lang={lang}
              initialData={initData?.includeAndNotes ?? undefined}
              className="mb-6"
              onSubmit={onSubmitMetaContent}
            />
            <TemplateMetaContentForm
              contentlabel="Lịch trình"
              type="itinerary"
              referenceId={formData.id}
              lang={lang}
              initialData={initData?.itineraries ?? undefined}
              className="mb-6"
              onSubmit={onSubmitMetaContent}
            />
          </div>
          <div className="post-right w-[320px] xl:w-[380px]">
            <div className="inner-right">
              <Publishing
                // templateValue={formData.templateId}
                // templateList={CONTENTS_LAYOUT_PAGE_TEMPLATE}
                // onChangeTemplate={onChangeTemplate}
                onChangeTime={onChangePublishTime}
                onChangeDate={onChangePublishDate}
                timeValue={publishDateTime?.publishTime}
                dateValue={publishDateTime?.publishDate}
                onSaveAndPublish={() =>
                  handlerSubmit(formData, (data) =>
                    onSubmit?.({
                      ...data,
                      status: PageContentStatus.PUBLISH,
                    }),
                  )
                }
                onDelete={() => onDelete?.(formData.id)}
                onApproval={() => onPublish?.(formData.id)}
                onChangeStatus={onChangeStatusPage}
                hideSaveForApproval={action === "update" ?? false}
                hideApproval={formData.status !== PageContentStatus.PENDING || action === "create"}
                hideDelete={action === "create"}
                action={action}
                status={formData.status}
                disableSubmit={isDisablePublishButton}
                disableSaveForApproval={isDisablePublishButton}
                errors={{
                  publishDate: errors?.publishDate,
                }}
              />
              <ThumbnailImage
                thumbnailUrl={formData.thumbnail ? `${mediaConfig.rootPath}/${formData.thumbnail.original}` : undefined}
                onRemove={onRemoveThumbnail}
                onAdd={onOpenMediaToSelectThumbail}
                error={errors?.thumbnail}
              />
            </div>
          </div>
        </div>
      </Form>
      <MediaUploadDrawler
        isOpen={showMedia.isShow}
        onClose={onCloseMediaUpload}
        onConfirm={onConfirmSelectMediaImage}
        mediaTypes={[MediaTypes.IMAGE, MediaTypes.ICON]}
        mode={showMedia.type === "images" ? "multiple" : "single"}
      />
    </>
  );
};
export default memo(CMSTemplateContentForm);
