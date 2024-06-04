import React, { useCallback, useEffect, useState } from "react";
import { Form, Button, Input, Space, Tag, Drawer, Tabs } from "antd";
import FormItem from "@/components/base/FormItem";
import MediaUploadDrawler from "@/app/portal/media/_components/MediaUploadDrawler";
import Image from "next/image";
import Slug from "@/components/admin/Slug";
import { useFormSubmit } from "@/hooks/useFormSubmit";
import { PictureOutlined } from "@ant-design/icons";
import { LangCode } from "@/models/management/cms/language.interface";
import { mediaConfig } from "@/configs";
import { locales } from "@/constants/locale.constant";
interface DrawerCMSTemplateProps {
    isOpen?: boolean;
    onClose?: () => void;
}
const DrawerCMSTemplate: React.FC<DrawerCMSTemplateProps> = ({
    isOpen,
    onClose,
}) => {
    const { errors, handlerSubmit } = useFormSubmit({ schema: undefined });
    const [showMedia, setShowMedia] = useState(false);
    const previewImageUrl = undefined;
    return (
        <Drawer
            open={isOpen}
            destroyOnClose
            onClose={onClose}
            width={550}
            title="Thêm template"
        >
            <Form layout="vertical">
                <FormItem
                    label="Tên template"
                    required
                    // validateStatus={errors?.title ? "error" : ""}
                    // help={errors?.title || ""}
                >
                    <Input
                        name="Tên template"
                        placeholder="Tên template"
                        // value={formData.title}
                        // onChange={(ev) =>
                        //     onChangeFormData("title", ev.target.value)
                        // }
                    />
                </FormItem>
                <FormItem
                    label="Code"
                    required
                    // validateStatus={errors?.title ? "error" : ""}
                    // help={errors?.title || ""}
                >
                    <Input
                        name="code"
                        placeholder="Mã template"
                        // value={formData.title}
                        // onChange={(ev) =>
                        //     onChangeFormData("title", ev.target.value)
                        // }
                    />
                </FormItem>
                <FormItem label="Mô tả ngắn">
                    <Input.TextArea
                        placeholder="Nhập mô tả ngắn"
                        className=" resize-none"
                        spellCheck={true}
                        rows={4}
                        cols={12}
                        // value={formData.shortDescriptions}
                        // onChange={(ev) =>
                        //     onChangeFormData(
                        //         "shortDescriptions",
                        //         ev.target.value,
                        //     )
                        // }
                    ></Input.TextArea>
                </FormItem>
                <FormItem
                    label="Ảnh đại diện"
                    // validateStatus={errors?.thumb ? "error" : ""}
                    // help={errors?.thumb || ""}
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
                        <Button onClick={() => setShowMedia(true)}>
                            {`${previewImageUrl ? "Thay" : "Chọn"} ảnh `}
                        </Button>
                    </div>
                </FormItem>
                <div className="">
                    <Tabs
                        // onChange={onChange}
                        type="card"
                        items={locales.map((locale, i) => {
                            return {
                                label: locale.name,
                                key: locale.key,
                                children: (
                                    <FormContentTemplateByLang
                                        lang={locale.key}
                                    />
                                ),
                            };
                        })}
                    />
                </div>
                <FormItem>
                    <Space>
                        <Button type="default">Huỷ bỏ</Button>
                        <Button
                            type="primary"
                            // onClick={() =>
                            //     handlerSubmit(formData, onSubmitFormData)
                            // }
                            // disabled={isDisableButton}
                        >
                            Lưu
                        </Button>
                    </Space>
                </FormItem>
            </Form>
            <MediaUploadDrawler
                onClose={() => setShowMedia(false)}
                isOpen={showMedia}
                onConfirm={() => {}}
            />
        </Drawer>
    );
};
export default DrawerCMSTemplate;

interface FormContentTemplateByLangProps {
    lang: LangCode;
}
const FormContentTemplateByLang = ({
    lang,
}: FormContentTemplateByLangProps) => {
    return (
        <div className="">
            <FormItem label={`Tên (${lang})`}>
                <Input placeholder="Tên" onChange={() => {}} name="name" />
            </FormItem>
            <FormItem>
                <Slug lang={lang} slugName="" type="tour" />
            </FormItem>
        </div>
    );
};
