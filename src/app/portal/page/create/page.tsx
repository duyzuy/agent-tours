"use client";
import React, { useState } from "react";
import {
    Input,
    Typography,
    Radio,
    Space,
    Button,
    Select,
    Upload,
    DatePicker,
    TimePicker,
    Form,
    RadioChangeEvent,
    message,
} from "antd";
import {
    LoadingOutlined,
    PictureOutlined,
    PlusOutlined,
} from "@ant-design/icons";
import { SelectProps } from "antd";
import TextEditor from "@/components/base/TextEditor";
import PageContainer from "@/components/admin/PageContainer";
import FormItem from "@/components/base/FormItem";
import LocaleContainer from "@/components/admin/LocaleContainer";
import { useLocale } from "@/hooks/useLocale";
import config from "@/configs";
const timeFormat = "HH:mm";
import type { RcFile, UploadFile, UploadProps } from "antd/es/upload";
import type { UploadChangeParam } from "antd/es/upload";
import Uploader from "@/components/base/Uploader";
import Slug from "@/components/admin/Slug";
import Image from "next/image";

interface ICreateFormData {
    locale: "vi" | "en";
    title: string;
    slug: string;
    date: string;
    category: string;
    tags: string[];
    thumbnail: string;
}
const PageCreatePost = () => {
    const { TextArea } = Input;
    const [value, setValue] = useState(1);

    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState<string>();
    const [uploadError, setUploadError] = useState("");
    const { locale, setLocale } = useLocale();
    const onChange = (e: RadioChangeEvent) => {
        console.log("radio checked", e.target.value);
        setValue(e.target.value);
    };
    const options: SelectProps["options"] = [];
    for (let i = 10; i < 36; i++) {
        options.push({
            value: i.toString(36) + i,
            label: i.toString(36) + i,
        });
    }

    const getBase64 = (img: RcFile, callback: (url: string) => void) => {
        const reader = new FileReader();
        reader.addEventListener("load", () =>
            callback(reader.result as string),
        );
        reader.readAsDataURL(img);
    };

    const beforeUploadImage = (file: RcFile) => {
        console.log(file);
        // const fileTypes = ["image/jpeg", "image/png"]
        const isJpgOrPng =
            file.type === "image/jpeg" ||
            file.type === "image/png" ||
            file.type === "";
        if (!isJpgOrPng) {
            setUploadError("You can only upload JPG/PNG file!");
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            setUploadError("Image must smaller than 2MB!");
        }
        return isJpgOrPng && isLt2M;
    };
    const handleUploadImage: UploadProps["onChange"] = (
        info: UploadChangeParam<UploadFile>,
    ) => {
        console.log(info);
        // if (info.file.status === "uploading") {
        //     setLoading(true);
        //     return;
        // }
        // if (info.file.status === "done") {
        //     // Get this url from response in real world.
        //     getBase64(info.file.originFileObj as RcFile, (url) => {
        //         setLoading(false);
        //         setImageUrl(url);
        //     });
        // }

        // if (info.file.status === "error") {
        //     // Get this url from response in real world.
        //     setLoading(false);
        //     setUploadError("Upload thất bại.");
        //     return;
        // }
    };

    return (
        <PageContainer name="Tạo bài viết mới" hideAddButton>
            <LocaleContainer onChange={(lc) => setLocale(lc)} value={locale} />
            <Form layout="vertical">
                <div className="flex w-full">
                    <div
                        className="post-left flex-1 mr-8"
                        style={{ width: "calc(100% - 380px)" }}
                    >
                        <FormItem>
                            <Input placeholder="Tên bài viết" />
                            <Slug />
                        </FormItem>
                        <FormItem label="Mô tả ngắn">
                            <TextArea
                                className="resize-none"
                                rows={3}
                            ></TextArea>
                        </FormItem>

                        <FormItem label="Chi tiết">
                            <TextEditor
                                onEditorChange={() => {}}
                                value={"test content"}
                            />
                        </FormItem>
                        <div className="section">
                            <Typography.Title level={4}>
                                SEO Meta
                            </Typography.Title>
                            <div className="box border rounded-[4px] px-4 py-6">
                                <FormItem label="Meta title">
                                    <Input placeholder="Meta title" />
                                </FormItem>
                                <FormItem label="Meta description">
                                    <TextArea rows={2}></TextArea>
                                </FormItem>
                                <FormItem label="Meta keywords">
                                    <Input placeholder="Keywords" />
                                </FormItem>
                            </div>
                        </div>
                    </div>
                    <div className="post-right w-[320px]">
                        <div className="inner-right">
                            <div className="box border rounded-[4px] mb-6">
                                <div className="py-4 border-b px-4">
                                    <p className="font-bold">Đăng bài viết</p>
                                </div>
                                <div className="">
                                    <div className="post-times px-4 py-4 input-control">
                                        <FormItem label="Ngày hiển thị">
                                            <div className="flex items-center gap-x-4">
                                                <DatePicker
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
                                                    format={timeFormat}
                                                />
                                            </div>
                                        </FormItem>
                                    </div>
                                    <div className="feature-post py-4 px-4 flex gap-x-4">
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
                                        <div className="no-image text-slate-400 text-center">
                                            <span className="text-2xl stroke-slate-400">
                                                <PictureOutlined />
                                            </span>
                                            <span className="block">
                                                Chưa có ảnh
                                            </span>
                                        </div>
                                    </div>
                                    <Button>Thêm ảnh đại diện</Button>
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
                                            onChange={onChange}
                                            value={value}
                                        >
                                            <Space direction="vertical">
                                                <Radio value={1}>
                                                    Danh muc 1
                                                </Radio>
                                                <Radio value={1}>
                                                    Danh muc 1
                                                </Radio>
                                                <Radio value={2}>
                                                    Danh muc 2
                                                </Radio>
                                                <Radio value={3}>
                                                    Danh muc 3
                                                </Radio>
                                                <Radio value={4}>
                                                    Danh muc 1
                                                </Radio>
                                                <Radio value={5}>
                                                    Danh muc 1
                                                </Radio>
                                                <Radio value={6}>
                                                    Danh muc 2
                                                </Radio>
                                                <Radio value={7}>
                                                    Danh muc 3
                                                </Radio>
                                            </Space>
                                        </Radio.Group>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Form>
        </PageContainer>
    );
};
export default PageCreatePost;
