import React, { useState, useEffect, useMemo } from "react";
import { Form, Input, Button, Space, Tag, Typography } from "antd";
import { isEqual } from "lodash";
import Image from "next/image";
import TextEditor from "@/components/base/TextEditor";
import FormItem from "@/components/base/FormItem";

import { IDestinationContentsRs, IDestinationRs } from "@/models/management/region.interface";
import { stringToSlug } from "@/utils/stringToSlug";
import { destinationContentSchema } from "../../schema/destinationContent.schema";
import { mediaConfig } from "@/configs";
import MediaUploadDrawer, { MediaUploadDrawerProps } from "../../../media/_components/MediaUploadDrawer";
import { DestinationContentFormData } from "../../modules/destinationContent.interface";
import { PictureOutlined } from "@ant-design/icons";
import { HandleSubmit, useFormSubmit } from "@/hooks/useFormSubmit";
import { LangCode } from "@/models/management/cms/language.interface";
import Slug, { SlugProps } from "@/components/admin/Slug";
import GallerySelector, { GallerySelectorProps } from "./GalleriesSelector";

const TextArea = Input.TextArea;

export interface DestinationFormContentProps {
  className?: string;
  onSubmit?: (data: DestinationContentFormData) => void;
  initValues?: IDestinationContentsRs["result"][0];
  codeKey: string;
  codeName: string;
  provinceList: IDestinationRs["result"]["listStateProvince"];
  langCode?: LangCode;
  onWatchFormChange?: (data: DestinationContentFormData) => void;
}
export const initDestinationCMSFormData = new DestinationContentFormData(
  undefined,
  "",
  "",
  "",
  undefined,
  undefined,
  "",
  "",
  "",
  "",
  "",
  undefined,
);
const DestinationFormContent: React.FC<DestinationFormContentProps> = ({
  onSubmit,
  className = "",
  initValues,
  codeKey,
  codeName,
  provinceList,
  langCode,
  onWatchFormChange,
}) => {
  const { handlerSubmit, errors, clearErrors } = useFormSubmit({
    schema: destinationContentSchema,
  });

  const [formData, setFormData] = useState(initDestinationCMSFormData);

  const [isOpenDrawler, setOpenDrawler] = useState(false);

  const onChangeFormData = (
    key: keyof DestinationContentFormData,
    value: DestinationContentFormData[keyof DestinationContentFormData],
  ) => {
    let newFormData = { ...formData };
    if (key === "title" && typeof value === "string") {
      newFormData = {
        ...newFormData,
        title: value,
        slug: stringToSlug(value),
      };
    } else {
      newFormData = {
        ...newFormData,
        [key]: value,
      };
    }
    setFormData(() => ({ ...newFormData }));
  };

  const onSaveSlug: SlugProps["onSave"] = (slug) => {
    setFormData((oldData) => ({ ...oldData, slug: slug }));
  };
  const onChangeThumbnail: MediaUploadDrawerProps["onConfirm"] = (files) => {
    const file = files[0];

    setFormData((prev) => ({
      ...prev,
      thumbnail: {
        id: file.id,
        original: file.fullPath,
        small: file.thumb,
      },
    }));
  };
  const isDisableButton = useMemo(() => {
    return isEqual(
      JSON.stringify({
        id: formData?.id,
        title: formData?.title,
        descriptions: formData?.descriptions,
        shortDescriptions: formData?.shortDescriptions,
        thumbnail: formData?.thumbnail,
        images: formData.images,
        metaTitle: formData.metaTitle,
        metaKeyword: formData.metaKeyword,
        metaDescription: formData.metaDescription,
        slug: formData?.slug,
      }),
      JSON.stringify({
        id: initValues?.id,
        title: initValues?.title,
        descriptions: initValues?.descriptions,
        shortDescriptions: initValues?.shortDescriptions,
        thumbnail: initValues?.thumbnail,
        images: initValues?.images,
        metaTitle: initValues?.metaTitle,
        metaKeyword: initValues?.metaKeyword,
        metaDescription: initValues?.metaDescription,
        slug: initValues?.slug,
      }),
    );
  }, [initValues, formData]);

  const onSubmitFormData: HandleSubmit<DestinationContentFormData> = (formData) => {
    onSubmit?.(formData);
  };

  const onSaveGallery: GallerySelectorProps["onSave"] = (images) => {
    setFormData((oldData) => ({
      ...oldData,
      images: [...images],
    }));
  };
  useEffect(() => {
    onWatchFormChange?.(formData);
  }, [formData]);
  useEffect(() => {
    if (initValues) {
      setFormData(() => ({
        id: initValues.id,
        title: initValues.title,
        descriptions: initValues.descriptions,
        shortDescriptions: initValues.shortDescriptions,
        thumbnail: initValues.thumbnail || undefined,
        images: initValues.images || undefined,
        metaDescription: initValues.metaDescription,
        metaTitle: initValues.metaTitle,
        metaKeyword: initValues.metaKeyword,
        slug: initValues.slug,
        codeKey: codeKey,
        lang: initValues.lang,
      }));
    } else {
      setFormData({
        ...initDestinationCMSFormData,
        lang: langCode,
        codeKey: codeKey,
      });
    }
    clearErrors();
  }, [initValues, langCode]);

  return (
    <>
      <Form labelCol={{ span: 4 }} wrapperCol={{ span: 20 }} layout="horizontal" className={className}>
        <FormItem label="Tiêu đề" required validateStatus={errors?.title ? "error" : ""} help={errors?.title || ""}>
          <Input
            name="title"
            placeholder="Tiêu đề điểm đến"
            value={formData.title}
            onChange={(ev) => onChangeFormData("title", ev.target.value)}
          />
        </FormItem>
        <FormItem label="Đường dẫn">
          <Slug type="destination" lang={langCode} slugName={formData.slug} onSave={onSaveSlug} />
        </FormItem>
        <FormItem
          label="Tên nhóm"
          required
          validateStatus={errors?.codeKey ? "error" : ""}
          help={errors?.codeKey || ""}
        >
          <p className="font-bold">{`${codeName}`}</p>
        </FormItem>
        <FormItem label="Danh sách điểm đến">
          <Space wrap className="list">
            {provinceList.map((province) => (
              <Tag key={province.recId} bordered={false}>
                {(province.stateProvinceKey && province.stateProvinceKey) ||
                  (province.countryKey && province.countryKey) ||
                  (province.subRegionKey && province.subRegionKey) ||
                  province.regionKey}
              </Tag>
            ))}
          </Space>
        </FormItem>
        <FormItem label="Ảnh đại diện" validateStatus={errors?.thumbnail ? "error" : ""} help={errors?.thumbnail || ""}>
          <div className="feature-image">
            <span className="no-image border border-dashed w-32 h-32 rounded-md flex items-center justify-center bg-gray-50 mb-2">
              {formData.thumbnail ? (
                <Image
                  src={`${mediaConfig.rootApiPath}/${formData.thumbnail.small}`}
                  alt="feature image"
                  width={128}
                  height={128}
                />
              ) : (
                <span className="text-slate-500 text-center">
                  <span className="text-2xl">
                    <PictureOutlined />
                  </span>
                  <span className="text-xs block">Chưa có ảnh</span>
                </span>
              )}
            </span>
          </div>
          <div className="upload-media">
            <Button onClick={() => setOpenDrawler(true)}>{`${formData.thumbnail ? "Thay" : "Chọn"} ảnh `}</Button>
          </div>
        </FormItem>
        <FormItem label="Mô tả ngắn">
          <TextArea
            placeholder="Nhập mô tả ngắn"
            className=" resize-none"
            spellCheck={true}
            rows={4}
            cols={12}
            value={formData.shortDescriptions}
            onChange={(ev) => onChangeFormData("shortDescriptions", ev.target.value)}
          ></TextArea>
        </FormItem>
        <FormItem label="Thư viện ảnh">
          <GallerySelector
            images={formData.images || []}
            error={errors?.["images" as "images"]}
            onSave={onSaveGallery}
          />
        </FormItem>
        <FormItem label="Seo Meta">
          <div className="box border rounded-md px-4 pt-6 mb-6">
            <div className="mb-6">
              <Input
                placeholder="Meta title"
                value={formData.metaTitle}
                onChange={(ev) => onChangeFormData("metaTitle", ev.target.value)}
              />
            </div>

            <div className="mb-6">
              <Input.TextArea
                rows={2}
                placeholder="Meta description"
                value={formData.metaDescription}
                onChange={(ev) => onChangeFormData("metaDescription", ev.target.value)}
              ></Input.TextArea>
            </div>
            <div className="mb-6">
              <Input
                placeholder="Keywords"
                value={formData.metaKeyword}
                onChange={(ev) => onChangeFormData("metaKeyword", ev.target.value)}
              />
            </div>
          </div>
        </FormItem>
        <FormItem label="Mô tả">
          <TextEditor
            initialValue={initValues?.descriptions || ""}
            value={formData.descriptions}
            onEditorChange={(content, editor) => onChangeFormData("descriptions", content)}
            minHeight={800}
            height={800}
            maxHeight={1200}
          />
        </FormItem>
        <FormItem
          wrapperCol={{
            span: 20,
            offset: 4,
          }}
        >
          <Space>
            <Button type="default">Huỷ bỏ</Button>
            <Button type="primary" onClick={() => handlerSubmit(formData, onSubmitFormData)} disabled={isDisableButton}>
              {initValues ? "Cập nhật" : "Thêm mới"}
            </Button>
          </Space>
        </FormItem>
      </Form>
      <MediaUploadDrawer onClose={() => setOpenDrawler(false)} isOpen={isOpenDrawler} onConfirm={onChangeThumbnail} />
    </>
  );
};
export default DestinationFormContent;
