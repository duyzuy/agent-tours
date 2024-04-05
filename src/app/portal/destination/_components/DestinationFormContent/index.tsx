import { Form, Input, Button, Space, Tag } from "antd";
import TextEditor from "@/components/base/TextEditor";
import FormItem from "@/components/base/FormItem";
import React, { useState, useEffect, useMemo } from "react";
import {
    IDestinationContentPayload,
    IDestinationContentsRs,
    IDestinationRs,
} from "@/models/management/region.interface";
import { stringToSlug } from "@/utils/stringToSlug";
import Image from "next/image";
import { IMediaUploadProps } from "@/app/portal/media/_components/MediaUploadDrawler";
import { mediaConfig } from "@/configs";
import MediaUploadDrawler from "@/app/portal/media/_components/MediaUploadDrawler";
import { TDestinationsCMSContentErrorField } from "../../hooks/useCRUDContentDestination";
import { isEqual } from "lodash";
import { PictureOutlined } from "@ant-design/icons";
import { useFormSubmit } from "@/hooks/useFormSubmit";

const TextArea = Input.TextArea;

export interface DestinationFormContentProps {
    className?: string;
    onSubmit: (
        action: "create" | "edit",
        payload: IDestinationContentPayload,
        id?: number,
    ) => void;
    formData: IDestinationContentPayload;
    errors?: TDestinationsCMSContentErrorField;
    initValues?: IDestinationContentsRs["result"][0];
    codeKey: string;
    basePath: string;
    codeName: string;
    provinceList: IDestinationRs["result"]["listStateProvince"];
    isDisableButton?: boolean;
    setFormData: React.Dispatch<
        React.SetStateAction<IDestinationContentPayload>
    >;
}
const DestinationFormContent: React.FC<DestinationFormContentProps> = ({
    onSubmit,
    className = "",
    formData,
    errors,
    setFormData,
    initValues,
    codeKey,
    basePath,
    codeName,
    isDisableButton = false,
    provinceList,
}) => {
    // const {handlerSubmit, errors} = useFormSubmit({schema: undefined})
    const [previewImageUrl, setPreviewImageUrl] = useState<string>();
    const [isEditSlug, setEditSlug] = useState(false);
    const [slug, setSlug] = useState("");
    const [isOpenDrawler, setOpenDrawler] = useState(false);

    const onChangeFormData = (
        key: keyof IDestinationContentPayload,
        value: string,
    ) => {
        let newFormData = { ...formData };
        if (key === "title") {
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
    const onConfirmImageFromMediaUpload: IMediaUploadProps["onConfirm"] = (
        files,
    ) => {
        const file = files[0];
        setPreviewImageUrl(() => `${mediaConfig.rootApiPath}/${file.fullPath}`);

        setFormData((prev) => ({ ...prev, thumb: file.id }));
    };
    const onSubmitFormData = () => {
        onSubmit?.(initValues ? "edit" : "create", formData, initValues?.id);
    };
    const onChangeSlug = (slug: string) => {
        setSlug(slug);
    };
    const onEditSlug = () => {
        setEditSlug(true);
        setSlug(formData.slug);
    };
    const onUpdateSlug = () => {
        if (isDisableButtonApproveSlug) return;
        setEditSlug(false);
        setFormData((prev) => ({ ...prev, slug: stringToSlug(slug) }));
    };
    const isDisableButtonApproveSlug = useMemo(() => {
        return isEqual(formData.slug, slug);
    }, [slug]);
    useEffect(() => {
        if (initValues) {
            setPreviewImageUrl(
                () => `${mediaConfig.rootApiPath}/${initValues.thumbPath}`,
            );
        } else {
            setPreviewImageUrl(undefined);
        }
    }, [initValues]);

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
                <FormItem
                    label="Đường dẫn"
                    validateStatus={errors?.slug ? "error" : ""}
                    help={errors?.slug || ""}
                >
                    <div className="slug  text-gray-500  flex items-center">
                        <span>{basePath}</span>
                        <div className="slug-edit flex items-center">
                            {isEditSlug ? (
                                <Space>
                                    <Input
                                        name="slug"
                                        value={slug}
                                        onChange={(ev) =>
                                            onChangeSlug(ev.target.value)
                                        }
                                        size="small"
                                    />
                                    <Button
                                        type="primary"
                                        size="small"
                                        ghost
                                        disabled={isDisableButtonApproveSlug}
                                        onClick={onUpdateSlug}
                                    >
                                        Cập nhật
                                    </Button>
                                    <Button
                                        size="small"
                                        type="text"
                                        danger
                                        onClick={() => setEditSlug(false)}
                                    >
                                        Huỷ
                                    </Button>
                                </Space>
                            ) : (
                                <>
                                    <span>{formData.slug}</span>
                                    <Button
                                        size="small"
                                        type="text"
                                        onClick={onEditSlug}
                                    >
                                        Sửa
                                    </Button>
                                </>
                            )}
                        </div>
                    </div>
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
                                    src={previewImageUrl}
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
                    {/* <TextEditorWithMedia /> */}
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
                            onClick={onSubmitFormData}
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
                onConfirm={onConfirmImageFromMediaUpload}
            />
        </>
    );
};
export default DestinationFormContent;
