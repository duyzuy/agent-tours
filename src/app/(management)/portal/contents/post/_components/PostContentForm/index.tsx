import React, { memo, useCallback, useEffect, useMemo, useState } from "react";
import { Form, Input, SwitchProps, Typography } from "antd";
import dayjs from "dayjs";
import { stringToSlug } from "@/utils/stringToSlug";
import { DATE_TIME_FORMAT } from "@/constants/common";
import { mediaConfig } from "@/configs";
import { PostContentFormData } from "../../module/postModule.interface";
import { PageContentStatus } from "@/models/management/cms/pageContent.interface";
import { LangCode } from "@/models/management/cms/language.interface";
import ThumbnailImage, { ThumbnailImageProps } from "@/components/admin/ThumbnailImage";
import Publishing, { PublishingProps } from "@/components/admin/Publishing";
import TextEditor, { TextEditorProps } from "@/components/base/TextEditor";
import FormItem from "@/components/base/FormItem";
import Slug, { SlugProps } from "@/components/admin/Slug";
import { isEqualObject } from "@/utils/compare";
import { postContentSchema } from "../../schema/post.schema";
import { IPostContent } from "@/models/management/post.interface";
import CategorySelector, { CategorySelectorProps } from "./CategorySelector";
import TagsSelector, { TagsSelectorProps } from "./TagsSelector";
import { isArray } from "lodash";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import MetaSeoBox, { MetaSeoBoxProps } from "@/components/admin/MetaSeoBox";
import { stringToDate } from "@/utils/date";

export const initFormData = new PostContentFormData(
  undefined,
  undefined,
  LangCode.VI,
  "",
  "",
  "",
  "",
  undefined,
  undefined,
  [],
  "",
  undefined,
  [],
  "",
  "",
  "",
  dayjs().locale("en").format(DATE_TIME_FORMAT),
  PageContentStatus.PUBLISH,
);

export interface PostContentFormProps {
  lang: LangCode;
  initData?: IPostContent;
  originId?: number;
  onSubmit?: SubmitHandler<PostContentFormData>;
  onPublish?: (id?: number) => void;
  onWatchFormChange?: (data: PostContentFormData) => void;
  action?: "create" | "update";
  onChangeStatus?: (data: { id: number; status: PageContentStatus }, cb?: () => void) => void;
  onDelete?: (id: number, cb?: () => void) => void;
}

const PostContentForm: React.FC<PostContentFormProps> = ({
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
  const initFormData = new PostContentFormData(
    undefined,
    undefined,
    LangCode.VI,
    "",
    "",
    "",
    "",
    undefined,
    undefined,
    [],
    "",
    undefined,
    [],
    "",
    "",
    "",
    dayjs().locale("en").format(DATE_TIME_FORMAT),
    PageContentStatus.PUBLISH,
  );

  const { handleSubmit, control, setValue, getValues, watch } = useForm<PostContentFormData>({
    resolver: yupResolver(postContentSchema),
    defaultValues: { ...initFormData },
  });

  const handleSaveSlug: SlugProps["onSave"] = (slug) => {
    setValue("slug", slug);
  };
  const handleChangeContent: TextEditorProps["onEditorChange"] = (data, editor) => {
    setValue("content", data);
  };

  const handleSelectCategory: CategorySelectorProps["onChange"] = (_, { name, id, slug, parentId }) => {
    setValue("category", { name, id, slug });
  };

  const handleSelectTags: TagsSelectorProps["onChange"] = (number, options) => {
    if (!isArray(options)) {
      return;
    }
    const tags = options.map((item) => ({ id: item.id, slug: item.slug, name: item.name }));
    setValue("tags", tags);
  };

  const handleAddThumb: ThumbnailImageProps["onAdd"] = (thumbnail) => {
    setValue("thumbnail", { id: thumbnail.id, original: thumbnail.fullPath, small: thumbnail.thumb });
  };

  const handleAddHerobanner: ThumbnailImageProps["onAdd"] = (thumbnail) => {
    setValue("heroBanner", { id: thumbnail.id, original: thumbnail.fullPath, small: thumbnail.thumb });
  };

  const onRemoveThumbnail = useCallback(() => {
    setValue("thumbnail", undefined);
  }, []);
  const onRemoveHeroBanners = useCallback(() => {
    setValue("heroBanner", undefined);
  }, []);

  const onChangePublishDate = useCallback<Required<PublishingProps>["onChangeDate"]>((date) => {
    if (date) {
      setValue("publishDate", date.toISOString());
    }
  }, []);
  const onChangePublishTime = useCallback<Required<PublishingProps>["onChangeTime"]>((time) => {
    if (time) {
      setValue("publishDate", time.toISOString());
    }
  }, []);

  const handleChangeStatus = useCallback<Required<SwitchProps>["onChange"]>(
    (checked) => {
      initData &&
        initData.id &&
        onChangeStatus?.({
          id: initData.id,
          status: checked ? PageContentStatus.PUBLISH : PageContentStatus.UNPUBLISH,
        });
    },
    [initData],
  );
  const handleDelete = useCallback(() => {
    initData && initData.id && onDelete?.(initData.id);
  }, [initData]);
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

  const isDisablePublishButton = useMemo(() => {
    const initValues = initData
      ? {
          ...initData,
          heroBanner: initData.heroBanner ?? undefined,
          thumbnail: initData.thumbnail ?? undefined,
          category: { id: initData.category.id, name: initData.category.name, slug: initData.category.slug },
          tags: initData.tags.map((tag) => {
            return { id: tag.id, name: tag.name, slug: tag.slug };
          }),
          publishDate: stringToDate(initData.publishDate).toISOString(),
        }
      : initFormData;

    return isEqualObject(
      [
        "id",
        "slug",
        "thumbnail",
        "heroBanner",
        "content",
        "category",
        "tags",
        "name",
        "metaTitle",
        "metaDescription",
        "metaKeyword",
        "publishDate",
        "images",
        "postFormat",
        "excerpt",
      ],
      getValues(),
      initValues,
    );
  }, [initData, watch()]);

  useEffect(() => {
    if (action === "create") {
      const postName = getValues("name");
      setValue("slug", stringToSlug(postName ?? ""));
    }
  }, [watch("name")]);
  useEffect(() => {
    const initValues = initData
      ? new PostContentFormData(
          initData.id,
          initData.originId,
          initData.lang,
          initData.slug,
          initData.name,
          initData.content,
          initData.excerpt,
          initData.heroBanner ?? undefined,
          initData.thumbnail ?? undefined,
          initData.images,
          initData.postFormat,
          { id: initData.category.id, name: initData.category.name, slug: initData.category.slug },
          initData.tags.map((tag) => {
            return { id: tag.id, name: tag.name, slug: tag.slug };
          }),
          initData.metaTitle,
          initData.metaDescription,
          initData.metaKeyword,
          stringToDate(initData.publishDate).toISOString(),
          initData.status,
        )
      : { ...initFormData, lang, originId };

    Object.keys(initValues).forEach((key) => {
      setValue(key as keyof PostContentFormData, initValues[key as keyof PostContentFormData]);
    });
  }, [lang, initData]);

  useEffect(() => {
    onWatchFormChange?.(getValues());
  }, [watch()]);
  return (
    <>
      <Form layout="vertical">
        <div className="flex w-full">
          <div
            className="post-left flex-1 mr-8"
            // style={{ width: "calc(100% - 380px)" }}
          >
            <Controller
              name="name"
              control={control}
              render={({ field, formState: { errors } }) => (
                <FormItem
                  label="Tiêu đề"
                  required
                  validateStatus={errors.name ? "error" : ""}
                  help={errors?.name?.message}
                >
                  <Input {...field} placeholder="Tiêu đề" />
                </FormItem>
              )}
            ></Controller>
            <Controller
              name="slug"
              control={control}
              render={({ field: { value }, formState: { errors } }) => (
                <Slug
                  slugName={value}
                  lang={lang}
                  type="post"
                  onSave={handleSaveSlug}
                  validateStatus={errors?.slug ? "error" : ""}
                  help={errors?.slug?.message}
                  className="mb-6"
                />
              )}
            ></Controller>
            <Controller
              name="excerpt"
              control={control}
              render={({ field, formState: { errors } }) => (
                <FormItem
                  label="Mô tả ngắn"
                  help={errors?.content?.message}
                  validateStatus={errors?.content ? "error" : ""}
                >
                  <Input.TextArea {...field} showCount maxLength={160} rows={4} cols={12} />
                </FormItem>
              )}
            ></Controller>
            <Controller
              name="content"
              control={control}
              render={({ field: { value }, formState: { errors } }) => (
                <FormItem
                  label="Chi tiết"
                  help={errors?.content?.message}
                  validateStatus={errors?.content ? "error" : ""}
                >
                  <TextEditor onEditorChange={handleChangeContent} value={value} height={600} maxHeight={950} />
                </FormItem>
              )}
            ></Controller>

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
                // onChangeTemplate={onChangeTemplate}
                onChangeTime={onChangePublishTime}
                onChangeDate={onChangePublishDate}
                timeValue={dayjs(getValues("publishDate"))}
                dateValue={dayjs(getValues("publishDate"))}
                onSaveAndPublish={
                  onSubmit && handleSubmit((data) => onSubmit({ ...data, status: PageContentStatus.PUBLISH }))
                }
                onSaveForApproval={
                  onSubmit && handleSubmit((data) => onSubmit({ ...data, status: PageContentStatus.PENDING }))
                }
                onChangeStatus={handleChangeStatus}
                hideSaveForApproval={action === "update"}
                hideApproval={getValues("status") !== PageContentStatus.PENDING || action === "create"}
                action={action}
                status={getValues("status")}
                onDelete={handleDelete}
                hideDelete={action === "create"}
                disableSubmit={isDisablePublishButton}
                disableSaveForApproval={isDisablePublishButton}
              />

              <Controller
                name="heroBanner"
                control={control}
                render={({ field: { value }, formState: { errors } }) => (
                  <ThumbnailImage
                    label="Hero banners"
                    thumbnailUrl={value ? `${mediaConfig.rootPath}/${value.original}` : undefined}
                    onRemove={onRemoveHeroBanners}
                    onAdd={handleAddHerobanner}
                    error={errors?.heroBanner?.id?.message}
                  />
                )}
              ></Controller>

              <Controller
                name="thumbnail"
                control={control}
                render={({ field: { value }, formState: { errors } }) => (
                  <ThumbnailImage
                    thumbnailUrl={value ? `${mediaConfig.rootPath}/${value.original}` : undefined}
                    onRemove={onRemoveThumbnail}
                    onAdd={handleAddThumb}
                    error={errors?.thumbnail?.id?.message}
                  />
                )}
              ></Controller>

              <Controller
                name="tags"
                control={control}
                render={({ field: { value }, formState: { errors } }) => (
                  <TagsSelector
                    lang={lang}
                    value={value?.map((item) => item.id)}
                    onChange={handleSelectTags}
                    className="mb-6"
                  />
                )}
              ></Controller>

              <Controller
                name="category"
                control={control}
                render={({ field: { value }, formState: { errors } }) => (
                  <CategorySelector
                    lang={lang}
                    value={value?.id}
                    onChange={handleSelectCategory}
                    error={errors.category?.id?.message}
                    className="mb-6"
                  />
                )}
              ></Controller>
            </div>
          </div>
        </div>
      </Form>
    </>
  );
};
export default memo(PostContentForm);
