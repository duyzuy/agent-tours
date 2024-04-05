"use client";
import React, { useCallback, useState } from "react";
import {
    Input,
    Typography,
    Radio,
    Space,
    Button,
    TimePicker,
    Form,
} from "antd";
import { PictureOutlined } from "@ant-design/icons";
import TextEditor, { TextEditorProps } from "@/components/base/TextEditor";
import PageContainer from "@/components/admin/PageContainer";
import FormItem from "@/components/base/FormItem";
import LocaleContainer from "@/components/admin/LocaleContainer";
import { useLocale } from "@/hooks/useLocale";
import { mediaConfig } from "@/configs";

import Slug, { SlugProps } from "@/components/admin/Slug";
import Image from "next/image";
import MediaUploadDrawler, {
    IMediaUploadProps,
} from "@/app/portal/media/_components/MediaUploadDrawler";
import { PageContentFormData } from "../modules/pageContent.interface";
import { LangCode } from "@/models/management/cms/language.interface";
import CustomDatePicker from "@/components/admin/CustomDatePicker";
import { stringToSlug } from "@/utils/stringToSlug";
import { isEmpty, isUndefined } from "lodash";
import { TIME_FORMAT } from "@/constants/common";

type RequirePageContentFormData = Required<PageContentFormData>;
const PageCreate = () => {
    const initFormData = new PageContentFormData(
        undefined,
        undefined,
        undefined,
        "",
        "",
        "",
        0,
        "",
        LangCode.VI,
        "",
        "",
        "",
    );
    const [formData, setFormData] = useState(initFormData);
    const [showDrawerMedia, setShowDrawerMedia] = useState(false);
    const { locale, setLocale } = useLocale();

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
    const onSaveSlug: SlugProps["onSave"] = (value) => {
        setFormData((oldData) => ({
            ...oldData,
            slug: stringToSlug(value),
        }));
    };

    const onSelectThumbnail: IMediaUploadProps["onConfirm"] = (file) => {
        setFormData((oldData) => ({
            ...oldData,
            thumbnail: file[0].fullPath,
        }));
    };
    const onRemoveThumbnail = () => {
        setFormData((oldData) => ({
            ...oldData,
            thumbnail: undefined,
        }));
    };

    return (
        <PageContainer
            name="Tạo trang mới"
            hideAddButton
            onBack={() => {}}
            breadCrumItems={[
                { title: "Trang nội dung", href: "/portal/contents/page" },
                { title: "Thêm mới" },
            ]}
        >
            <LocaleContainer
                onChange={(lc) => setLocale(lc)}
                value={locale}
                className="mb-6"
            />
            <Form layout="vertical">
                <div className="flex w-full">
                    <div
                        className="post-left flex-1 mr-8"
                        style={{ width: "calc(100% - 380px)" }}
                    >
                        <FormItem label="Tên trang" required>
                            <Input
                                placeholder="Tên trang"
                                value={formData.name}
                                onChange={(ev) =>
                                    onChangeForm("name", ev.target.value)
                                }
                            />
                            <Slug
                                slugName={formData.slug}
                                lang={locale.key}
                                type="page"
                                onSave={onSaveSlug}
                            />
                        </FormItem>
                        <FormItem label="Mô tả ngắn">
                            <Input.TextArea
                                className="resize-none"
                                rows={3}
                                value={formData.excerpt}
                                onChange={(ev) =>
                                    onChangeForm("excerpt", ev.target.value)
                                }
                            ></Input.TextArea>
                        </FormItem>

                        <FormItem label="Chi tiết">
                            <TextEditor
                                onEditorChange={(data, editor) =>
                                    onChangeForm("descriptions", data)
                                }
                                value={formData.descriptions}
                            />
                        </FormItem>

                        <Typography.Title level={4}>SEO Meta</Typography.Title>
                        <div className="box border rounded-[4px] px-4 py-6">
                            <FormItem label="Meta title">
                                <Input
                                    placeholder="Meta title"
                                    value={formData.metaTitle}
                                    onChange={(ev) =>
                                        onChangeForm(
                                            "metaTitle",
                                            ev.target.value,
                                        )
                                    }
                                />
                            </FormItem>
                            <FormItem label="Meta description">
                                <Input.TextArea
                                    rows={2}
                                    value={formData.metaDescription}
                                    onChange={(ev) =>
                                        onChangeForm(
                                            "metaDescription",
                                            ev.target.value,
                                        )
                                    }
                                ></Input.TextArea>
                            </FormItem>
                            <FormItem label="Meta keywords">
                                <Input
                                    placeholder="Keywords"
                                    value={formData.metaKeyword}
                                    onChange={(ev) =>
                                        onChangeForm(
                                            "metaKeyword",
                                            ev.target.value,
                                        )
                                    }
                                />
                            </FormItem>
                        </div>
                    </div>
                    <div className="post-right w-[320px]">
                        <div className="inner-right">
                            <div className="box border rounded-[4px] mb-6">
                                <div className="py-4 border-b px-4">
                                    <p className="font-bold">Đăng bài viết</p>
                                </div>
                                <div className="">
                                    <div className="post-times px-4 pt-4 input-control">
                                        <FormItem label="Ngày hiển thị">
                                            <div className="flex items-center gap-x-4">
                                                <CustomDatePicker
                                                    onChange={() => {}}
                                                    onOk={() => {}}
                                                    placeholder="Chọn ngày"
                                                    picker="date"
                                                    className="flex-1"
                                                />
                                                <TimePicker
                                                    onChange={() => {}}
                                                    onOk={() => {}}
                                                    placeholder="Chọn giờ"
                                                    className="w-28"
                                                    format={TIME_FORMAT}
                                                />
                                            </div>
                                        </FormItem>
                                    </div>
                                    <div className="feature-post pb-4 px-4 flex gap-x-4">
                                        <Button className="flex-1" block>
                                            Lưu nháp
                                        </Button>
                                        <Button
                                            type="primary"
                                            className=" bg-primary-default flex-1"
                                            block
                                        >
                                            Đăng
                                        </Button>
                                    </div>
                                </div>
                            </div>
                            <div className="box border rounded-[4px] mb-6">
                                <div className="py-4 border-b px-4">
                                    <p className="font-bold">Ảnh bài viết</p>
                                </div>
                                <div className="feature-post py-4 px-4">
                                    <div className="thumbnail-preview bg-slate-100 h-40 mb-3 flex items-center justify-center">
                                        {formData.thumbnail ? (
                                            <div className="relative w-full h-full">
                                                <Image
                                                    src={`${mediaConfig.rootPath}/${formData.thumbnail}`}
                                                    alt="thumbnail"
                                                    fill
                                                    style={{
                                                        objectFit: "contain",
                                                    }}
                                                />
                                            </div>
                                        ) : (
                                            <div className="no-image text-slate-400 text-center">
                                                <span className="text-2xl stroke-slate-400">
                                                    <PictureOutlined />
                                                </span>
                                                <span className="block">
                                                    Chưa có ảnh
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                    <Space>
                                        <Button
                                            onClick={() =>
                                                setShowDrawerMedia(true)
                                            }
                                        >
                                            {isEmpty(formData.thumbnail) ||
                                            isUndefined(formData.thumbnail)
                                                ? "Thêm ảnh đại diện"
                                                : "Thay ảnh đại diện"}
                                        </Button>
                                        {isEmpty(formData.thumbnail) ||
                                        isUndefined(
                                            formData.thumbnail,
                                        ) ? null : (
                                            <Button
                                                type="primary"
                                                ghost
                                                danger
                                                onClick={onRemoveThumbnail}
                                            >
                                                Xoá ảnh
                                            </Button>
                                        )}
                                    </Space>
                                </div>
                            </div>
                            <div className="box border rounded-[4px] mb-6">
                                <div className="category">
                                    <div className="py-4 border-b px-4">
                                        <p className="font-bold">
                                            Trang nội dung cha
                                        </p>
                                    </div>
                                    <div className="category-list h-[250px] overflow-hidden overflow-y-auto px-4 py-4">
                                        <Radio.Group
                                            onChange={() => {}}
                                            value={1}
                                        >
                                            <Space direction="vertical">
                                                <Radio value={1}>Trang 1</Radio>
                                                <Radio value={2}>Trang 1</Radio>
                                                <Radio value={3}>Trang 1</Radio>
                                            </Space>
                                        </Radio.Group>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Form>
            <MediaUploadDrawler
                isOpen={showDrawerMedia}
                onClose={() => setShowDrawerMedia(false)}
                onConfirm={onSelectThumbnail}
                exceptsSelect={["IMAGE", "ICON"]}
            />
        </PageContainer>
    );
};
export default PageCreate;
