import React, { memo, useCallback, useEffect, useMemo, useState } from "react";
import { Form, Input, SwitchProps, Typography } from "antd";
import dayjs from "dayjs";
import { stringToSlug } from "@/utils/stringToSlug";
import { DATE_FORMAT, DATE_TIME_FORMAT, TIME_FORMAT } from "@/constants/common";
import { mediaConfig } from "@/configs";
import { PostContentFormData } from "../../module/postModule.interface";
import { PageContentStatus } from "@/models/management/cms/pageContent.interface";
import { LangCode } from "@/models/management/cms/language.interface";

import MediaUploadDrawler, { MediaUploadProps } from "@/app/(management)/portal/media/_components/MediaUploadDrawler";
import ThumbnailImage from "@/components/admin/ThumbnailImage";
import Publishing, { PublishingProps } from "@/components/admin/Publishing";
import TextEditor, { TextEditorProps } from "@/components/base/TextEditor";
import FormItem from "@/components/base/FormItem";
import Slug, { SlugProps } from "@/components/admin/Slug";
import { isEqualObject } from "@/utils/compare";
import { MediaTypes } from "@/models/management/media.interface";
import { postContentSchema } from "../../schema/post.schema";
import { IPostContent } from "@/models/management/post.interface";
import CategorySelector, { CategorySelectorProps } from "./CategorySelector";
import TagsSelector, { TagsSelectorProps } from "./TagsSelector";
import { isArray } from "lodash";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

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
  dayjs().format(DATE_TIME_FORMAT),
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
  const { handleSubmit, control, setValue, getValues, watch } = useForm<PostContentFormData>({
    resolver: yupResolver(postContentSchema),
    defaultValues: { ...initFormData },
  });

  const [showDrawerMedia, setShowDrawerMedia] = useState<{
    isShow: boolean;
    type?: "heroBanner" | "thumbnail";
  }>(() => ({ isShow: false, type: undefined }));

  const handleChangeName = (name: string) => {
    setValue("slug", stringToSlug(name));
    setValue("name", name);
  };
  const handleChangeSlug: SlugProps["onSave"] = (slug) => {
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

  const onConfirmSelectMediaImage = useCallback<Required<MediaUploadProps>["onConfirm"]>(
    (files) => {
      const type = showDrawerMedia.type;
      type && setValue(type, { id: files[0].id, original: files[0].fullPath, small: files[0].thumb });
    },
    [showDrawerMedia],
  );
  const onRemoveThumbnail = useCallback(() => {
    setValue("thumbnail", undefined);
  }, []);
  const onRemoveHeroBanners = useCallback(() => {
    setValue("heroBanner", undefined);
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

  const onChangePublishDate = useCallback<Required<PublishingProps>["onChangeDate"]>((date) => {
    if (date) {
      const oldPublishDate = getValues("publishDate");
      const [_, time] = oldPublishDate?.split(" ") || [];
      const newPublishDate = [date.format(DATE_FORMAT), time].join(" ");
      setValue("publishDate", newPublishDate);
    }
  }, []);
  const onChangePublishTime = useCallback<Required<PublishingProps>["onChangeTime"]>((time) => {
    if (time) {
      const oldPublishDate = getValues("publishDate");
      const [oldDate, _] = oldPublishDate?.split(" ") || [];
      const newPublishDate = [oldDate, time.format(TIME_FORMAT)].join(" ");
      setValue("publishDate", newPublishDate);
    }
  }, []);

  const handleChangeStatus = useCallback<Required<SwitchProps>["onChange"]>((checked) => {
    const postId = getValues("id");
    postId &&
      onChangeStatus?.({
        id: postId,
        status: checked ? PageContentStatus.PUBLISH : PageContentStatus.UNPUBLISH,
      });
  }, []);
  const handleDelete = useCallback(() => {
    const postId = getValues("id");
    postId && onDelete?.(postId);
  }, []);
  const watchPublishDate = watch("publishDate");
  const publishDateTime = useMemo(() => {
    const publishDate = getValues("publishDate");
    console.log(publishDate);
    return {
      publishTime: dayjs(publishDate, { format: TIME_FORMAT }),
      publishDate: dayjs(publishDate, DATE_FORMAT),
    };
  }, [watchPublishDate]);

  console.log(dayjs(getValues("publishDate"), DATE_FORMAT).format("MM/DD/YYYY"));
  const isDisablePublishButton = useMemo(() => {
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
        "postMeta",
        "excerpt",
      ],
      getValues(),
      initData || initFormData,
    );
  }, [initData, watch()]);

  useEffect(() => {
    let updateInitFormData = { ...initFormData, lang: lang, originId: originId };

    if (initData) {
      updateInitFormData = {
        ...updateInitFormData,
        id: initData.id,
        originId: initData.originId,
        lang: initData.lang,
        slug: initData.slug,
        name: initData.name,
        content: initData.content,
        excerpt: initData.excerpt,
        heroBanner: initData.heroBanner ?? undefined,
        thumbnail: initData.thumbnail ?? undefined,
        images: initData.images,
        postMeta: initData.postMeta,
        category: initData.category,
        tags: initData.tags,
        metaTitle: initData.metaTitle,
        metaDescription: initData.metaDescription,
        metaKeyword: initData.metaKeyword,
        publishDate: initData.publishDate,
        status: initData.status,
      };
    }

    Object.keys(updateInitFormData).forEach((key) => {
      setValue(key as keyof typeof updateInitFormData, updateInitFormData[key as keyof typeof updateInitFormData]);
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
              render={({ field: { value }, formState: { errors } }) => (
                <FormItem
                  label="Tiêu đề"
                  required
                  validateStatus={errors.name ? "error" : ""}
                  help={errors?.name?.message}
                >
                  <Input value={value} onChange={(ev) => handleChangeName(ev.target.value)} placeholder="Tiêu đề" />
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
                  onSave={handleChangeSlug}
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
            <div className="box border rounded-[4px] px-4 py-6">
              <Controller
                name="metaTitle"
                control={control}
                render={({ field, formState: { errors } }) => (
                  <FormItem
                    label="Meta title"
                    help={errors?.metaTitle?.message}
                    validateStatus={errors?.metaTitle ? "error" : ""}
                  >
                    <Input placeholder="Meta title" {...field} />
                  </FormItem>
                )}
              ></Controller>

              <Controller
                name="metaDescription"
                control={control}
                render={({ field, formState: { errors } }) => (
                  <FormItem
                    label="Meta description"
                    help={errors?.metaDescription?.message}
                    validateStatus={errors?.metaDescription ? "error" : ""}
                  >
                    <Input.TextArea rows={2} {...field}></Input.TextArea>
                  </FormItem>
                )}
              ></Controller>

              <Controller
                name="metaKeyword"
                control={control}
                render={({ field, formState: { errors } }) => (
                  <FormItem
                    label="Meta keywords"
                    help={errors?.metaKeyword?.message}
                    validateStatus={errors?.metaKeyword ? "error" : ""}
                  >
                    <Input placeholder="Keywords" {...field} />
                  </FormItem>
                )}
              ></Controller>
            </div>
          </div>
          <div className="post-right w-[320px] xl:w-[380px]">
            <div className="inner-right">
              <Publishing
                // onChangeTemplate={onChangeTemplate}
                onChangeTime={onChangePublishTime}
                onChangeDate={onChangePublishDate}
                timeValue={publishDateTime.publishTime}
                dateValue={publishDateTime.publishDate}
                onSaveAndPublish={
                  onSubmit && handleSubmit((data) => onSubmit({ ...data, status: PageContentStatus.PUBLISH }))
                }
                onSaveForApproval={
                  onSubmit && handleSubmit((data) => onSubmit({ ...data, status: PageContentStatus.PENDING }))
                }
                onChangeStatus={handleChangeStatus}
                hideSaveForApproval={action === "update" ?? false}
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
                    onAdd={onOpenMediaToSelectHeroBanner}
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
                    onAdd={onOpenMediaToSelectThumbail}
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
      <MediaUploadDrawler
        isOpen={showDrawerMedia.isShow}
        onClose={onCloseMediaUpload}
        onConfirm={onConfirmSelectMediaImage}
        mediaTypes={[MediaTypes.ICON, MediaTypes.IMAGE]}
      />
    </>
  );
};
export default memo(PostContentForm);
