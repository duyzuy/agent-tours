import React, { useState, useEffect, useMemo } from "react";
import { Form, Input, Button, Space, Tag } from "antd";
import { isEqual } from "lodash";
import Image from "next/image";
import TextEditor from "@/components/base/TextEditor";
import FormItem from "@/components/base/FormItem";

import {
    IDestinationContentsRs,
    IDestinationRs,
} from "@/models/management/region.interface";
import { stringToSlug } from "@/utils/stringToSlug";
import { destinationContentSchema } from "../../schema/destinationContent.schema";
import { MediaUploadProps } from "@/app/portal/media/_components/MediaUploadDrawler";
import { mediaConfig } from "@/configs";
import MediaUploadDrawler from "@/app/portal/media/_components/MediaUploadDrawler";
import { DestinationContentFormData } from "../../modules/destinationContent.interface";
import { PictureOutlined } from "@ant-design/icons";
import { HandleSubmit, useFormSubmit } from "@/hooks/useFormSubmit";
import { LangCode } from "@/models/management/cms/language.interface";
import Slug, { SlugProps } from "@/components/admin/Slug";

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
    const [previewImageUrl, setPreviewImageUrl] = useState<string>();
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
    const onChangeThumbnail: MediaUploadProps["onConfirm"] = (files) => {
        const file = files[0];
        setPreviewImageUrl(() => `${file.fullPath}`);
        setFormData((prev) => ({ ...prev, thumb: file.id }));
    };
    const isDisableButton = useMemo(() => {
        return isEqual(
            JSON.stringify({
                id: formData?.id,
                title: formData?.title,
                descriptions: formData?.descriptions,
                shortDescriptions: formData?.shortDescriptions,
                thumb: formData?.thumb,
                slug: formData?.slug,
            }),
            JSON.stringify({
                id: initValues?.id,
                title: initValues?.title,
                descriptions: initValues?.descriptions,
                shortDescriptions: initValues?.shortDescriptions,
                thumb: initValues?.thumb,
                slug: initValues?.slug,
            }),
        );
    }, [initValues, formData]);

    const onSubmitFormData: HandleSubmit<DestinationContentFormData> = (
        formData,
    ) => {
        onSubmit?.(formData);
    };

    useEffect(() => {
        onWatchFormChange?.(formData);
    }, [formData]);
    useEffect(() => {
        if (initValues) {
            setPreviewImageUrl(() => `${initValues.thumbPath}`);
            setFormData(() => ({
                id: initValues.id,
                title: initValues.title,
                descriptions: initValues.descriptions,
                shortDescriptions: initValues.shortDescriptions,
                thumb: initValues.thumb,
                slug: initValues.slug,
                codeKey: codeKey,
                lang: initValues.lang,
            }));
        } else {
            setPreviewImageUrl(undefined);
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
            <Form
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 20 }}
                layout="horizontal"
                className={className}
            >
                <FormItem
                    label="Tiêu đề"
                    required
                    validateStatus={errors?.title ? "error" : ""}
                    help={errors?.title || ""}
                >
                    <Input
                        name="title"
                        placeholder="Tiêu đề điểm đến"
                        value={formData.title}
                        onChange={(ev) =>
                            onChangeFormData("title", ev.target.value)
                        }
                    />
                </FormItem>
                <FormItem label="Đường dẫn">
                    <Slug
                        type="destination"
                        lang={langCode}
                        slugName={formData.slug}
                        onSave={onSaveSlug}
                    />
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
                                {(province.stateProvinceKey &&
                                    province.stateProvinceKey) ||
                                    (province.countryKey &&
                                        province.countryKey) ||
                                    (province.subRegionKey &&
                                        province.subRegionKey) ||
                                    province.regionKey}
                            </Tag>
                        ))}
                    </Space>
                </FormItem>
                <FormItem
                    label="Ảnh đại diện"
                    validateStatus={errors?.thumb ? "error" : ""}
                    help={errors?.thumb || ""}
                >
                    <div className="feature-image">
                        <span className="no-image border border-dashed w-32 h-32 rounded-md flex items-center justify-center bg-gray-50 mb-2">
                            {previewImageUrl ? (
                                <Image
                                    src={`${mediaConfig.rootApiPath}/${previewImageUrl}`}
                                    alt="feature image"
                                    width={128}
                                    height={128}
                                />
                            ) : (
                                <span className="text-slate-500 text-center">
                                    <span className="text-2xl">
                                        <PictureOutlined />
                                    </span>
                                    <span className="text-xs block">
                                        Chưa có ảnh
                                    </span>
                                </span>
                            )}
                        </span>
                    </div>
                    <div className="upload-media">
                        <Button onClick={() => setOpenDrawler(true)}>
                            {`${previewImageUrl ? "Thay" : "Chọn"} ảnh `}
                        </Button>
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
                        onChange={(ev) =>
                            onChangeFormData(
                                "shortDescriptions",
                                ev.target.value,
                            )
                        }
                    ></TextArea>
                </FormItem>
                <FormItem label="Mô tả">
                    <TextEditor
                        initialValue={initValues?.descriptions || ""}
                        value={formData.descriptions}
                        onEditorChange={(content, editor) =>
                            onChangeFormData("descriptions", content)
                        }
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
                        <Button
                            type="primary"
                            onClick={() =>
                                handlerSubmit(formData, onSubmitFormData)
                            }
                            disabled={isDisableButton}
                        >
                            {initValues ? "Cập nhật" : "Thêm mới"}
                        </Button>
                    </Space>
                </FormItem>
            </Form>
            <MediaUploadDrawler
                onClose={() => setOpenDrawler(false)}
                isOpen={isOpenDrawler}
                onConfirm={onChangeThumbnail}
            />
        </>
    );
};
export default DestinationFormContent;
