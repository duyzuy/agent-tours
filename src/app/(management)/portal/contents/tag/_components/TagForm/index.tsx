import React, { memo, useCallback, useEffect, useMemo, useState } from "react";
import { Form, Input, SwitchProps, Typography } from "antd";
import { stringToSlug } from "@/utils/stringToSlug";
import { useFormSubmit } from "@/hooks/useFormSubmit";
import { TagFormData } from "../../module/tag.interface";
import { PageContentStatus } from "@/models/management/cms/pageContent.interface";
import { LangCode } from "@/models/management/cms/language.interface";
import Publishing, { PublishingProps } from "@/components/admin/Publishing";
import TextEditor from "@/components/base/TextEditor";
import FormItem from "@/components/base/FormItem";
import Slug, { SlugProps } from "@/components/admin/Slug";
import { isEqualObject } from "@/utils/compare";
import { tagContentSchema } from "../../schema/tag.schema";
import { ITag } from "@/models/management/tag.interface";

type RequirePageContentFormData = Required<TagFormData>;

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
  const [formData, setFormData] = useState(initFormData);

  const { errors, handlerSubmit, clearErrors } = useFormSubmit({
    schema: tagContentSchema,
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
      formData.id &&
        onChangeStatus?.({
          id: formData.id,
          status: checked ? PageContentStatus.PUBLISH : PageContentStatus.UNPUBLISH,
        });
    },
    [formData.id],
  );

  const isDisablePublishButton = useMemo(
    () =>
      isEqualObject(
        ["id", "slug", "descriptions", "metaTitle", "metaDescription", "metaKeyword", "name"],
        formData,
        initData || initFormData,
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
        descriptions: initData.descriptions,
        lang: initData.lang,
        metaTitle: initData.metaTitle,
        metaDescription: initData.metaDescription,
        metaKeyword: initData.metaKeyword,
        status: initData.status,
      }));
    } else {
      setFormData({
        ...initFormData,
        lang: lang,
        originId: originId,
      });
    }
    clearErrors();
  }, [lang, initData]);

  return (
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
            type="tag"
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
              label="Đăng thẻ bài viết"
              onChangeTemplate={onChangeTemplate}
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
              hideSaveForApproval={action === "update" ?? false}
              hideApproval={formData.status !== PageContentStatus.PENDING || action === "create"}
              action={action}
              status={formData.status}
              disableSubmit={isDisablePublishButton}
              disableSaveForApproval={isDisablePublishButton}
              onDelete={() => formData?.id && onDelete?.(formData.id)}
              hideDelete={action === "create"}
            />
          </div>
        </div>
      </div>
    </Form>
  );
};
export default memo(TagForm);
