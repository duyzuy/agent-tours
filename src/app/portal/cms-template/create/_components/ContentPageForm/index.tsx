import React, { memo, useCallback, useEffect, useMemo, useState } from "react";
import { Button, Form, Input, Space, SwitchProps, Typography } from "antd";
import dayjs from "dayjs";
import { stringToSlug } from "@/utils/stringToSlug";
import { DATE_FORMAT, DATE_TIME_FORMAT, TIME_FORMAT } from "@/constants/common";
import { useFormSubmit } from "@/hooks/useFormSubmit";
import { mediaConfig } from "@/configs";
import { cmsTemplateSchema } from "../../../schema/cmsTemplate.schema";
import { IPageContentDetail } from "@/models/management/cms/pageContent.interface";
import { CMSTemplateFormData } from "../../../modules/cmsTemplate.interface";
import { PageContentStatus } from "@/models/management/cms/pageContent.interface";
import { LangCode } from "@/models/management/cms/language.interface";

import { MediaUploadProps } from "@/app/portal/media/_components/MediaUploadDrawler";
import ThumbnailImage from "@/components/admin/ThumbnailImage";
import Publishing, { PublishingProps } from "@/components/admin/Publishing";
import TextEditor from "@/components/base/TextEditor";
import FormItem from "@/components/base/FormItem";
import Slug, { SlugProps } from "@/components/admin/Slug";
import MediaUploadDrawler from "@/app/portal/media/_components/MediaUploadDrawler";
import { isEqualObject } from "@/utils/compare";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import MetaDataFields from "./MetaDataFields";
import Image from "next/image";
import { isUndefined } from "lodash";
import { vietnameseTonesToUnderscoreKeyname } from "@/utils/helper";

type RequirePageContentFormData = Required<CMSTemplateFormData>;

const FILES_EXCERPT = ["IMAGE", "ICON"] as MediaUploadProps["exceptsSelect"];

export interface ContentPageFormProps {
    lang?: LangCode;
    initData?: IPageContentDetail;
    originId?: number;
    onSubmit?: (data: CMSTemplateFormData) => void;
    onPublish?: (id?: number) => void;
    onWatchFormChange?: (data: CMSTemplateFormData) => void;
    action?: "create" | "update";
    onChangeStatus?: (id: number, type: "active" | "deactive") => void;
}
export const initCmsTemplate = new CMSTemplateFormData(
    undefined,
    "",
    "",
    "",
    "",
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

const ContentPageForm: React.FC<ContentPageFormProps> = ({
    lang,
    initData,
    onSubmit,
    onWatchFormChange,
    onPublish,
    originId,
    action,
    onChangeStatus,
}) => {
    const [formData, setFormData] = useState(initCmsTemplate);

    const [showMedia, setShowMedia] = useState<{
        isShow: boolean;
        type?: "thumb" | "images";
    }>(() => ({ isShow: false, type: undefined }));

    const { errors, handlerSubmit, clearErrors } = useFormSubmit({
        schema: cmsTemplateSchema,
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

    console.log(errors);
    const onChangePublishDate = useCallback<
        Required<PublishingProps>["onChangeDate"]
    >((date) => {
        console.log(date);
        if (date) {
            setFormData((oldData) => {
                const { publishDate } = oldData;
                const [_, time] = (publishDate || "").split(" ");
                const newPublishDate = [date.format(DATE_FORMAT), time].join(
                    " ",
                );

                return { ...oldData, publishDate: newPublishDate };
            });
        }
    }, []);
    const onChangePublishTime = useCallback<
        Required<PublishingProps>["onChangeTime"]
    >((time) => {
        if (time) {
            setFormData((oldData) => {
                const { publishDate } = oldData;
                const [oldDate, _] = (publishDate || "").split(" ");
                const newPublishDate = [oldDate, time.format(TIME_FORMAT)].join(
                    " ",
                );
                return { ...oldData, publishDate: newPublishDate };
            });
        }
    }, []);

    const onChangeStatusPage = useCallback<Required<SwitchProps>["onChange"]>(
        (checked) => {
            formData.id &&
                onChangeStatus?.(formData.id, checked ? "active" : "deactive");
        },
        [formData.id],
    );
    const publishDateTime = useMemo(() => {
        return {
            publishTime: dayjs(formData.publishDate, { format: TIME_FORMAT }),
            publishDate: dayjs(formData.publishDate, { format: DATE_FORMAT }),
        };
    }, [formData.publishDate]);
    const onConfirmSelectMediaImage = useCallback<
        Required<MediaUploadProps>["onConfirm"]
    >(
        (files) => {
            if (showMedia.type === "thumb") {
                setFormData((oldData) => ({
                    ...oldData,
                    thumb: files[0].fullPath,
                }));
            }

            if (showMedia.type === "images") {
                setFormData((oldData) => ({
                    ...oldData,
                    images: {
                        listImage: files,
                    },
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

    const onOpenMediaToSelectGallery = useCallback(
        () =>
            setShowMedia({
                isShow: true,
                type: "images",
            }),
        [],
    );

    const onCloseMediaUpload = useCallback(
        () => setShowMedia({ isShow: false, type: undefined }),
        [],
    );

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
                ],
                formData,
                initData || initCmsTemplate,
            ),
        [initData, formData],
    );

    const addMetaDataFields = () => {
        setFormData((oldData) => {
            const { metaData } = oldData;
            const newMetaDataFields = [
                ...(metaData || []),
                { value: "", icon: "", key: "" },
            ];
            return {
                ...oldData,
                metaData: newMetaDataFields,
            };
        });
    };
    useEffect(() => {
        onWatchFormChange?.(formData);
    }, [formData]);
    // useEffect(() => {
    //     if (initData) {
    //         setFormData((prev) => ({
    //             ...prev,
    //             id: initData.id,
    //             originId: initData.originId,
    //             name: initData.name,
    //             slug: initData.slug,
    //             thumbnail: initData.thumbnail,
    //             excerpt: initData.excerpt,
    //             heroBanner: initData.heroBanner,
    //             descriptions: initData.descriptions,
    //             parentId: initData.parentId,
    //             templateId: initData.templateId,
    //             lang: initData.lang,
    //             metaTitle: initData.metaTitle,
    //             metaDescription: initData.metaDescription,
    //             metaKeyword: initData.metaKeyword,
    //             publishDate: initData.publishDate,
    //             status: initData.status,
    //         }));
    //     } else {
    //         setFormData({
    //             ...initPageContentFormData,
    //             lang: lang,
    //             originId: originId,
    //         });
    //     }
    //     clearErrors();
    // }, [lang, initData]);

    console.log(formData);
    return (
        <>
            <Form layout="vertical">
                <div className="flex w-full">
                    <div
                        className="post-left flex-1 mr-8"
                        // style={{ width: "calc(100% - 380px)" }}
                    >
                        <FormItem
                            label="Code"
                            required
                            validateStatus={errors?.code ? "error" : ""}
                            help={errors?.code || ""}
                        >
                            <Input
                                placeholder="Code"
                                value={formData.code}
                                onChange={(ev) =>
                                    onChangeForm("code", ev.target.value)
                                }
                            />
                        </FormItem>
                        <FormItem
                            label="Tên nội dung"
                            required
                            validateStatus={errors?.name ? "error" : ""}
                            help={errors?.name || ""}
                        >
                            <Input
                                placeholder="Tên nội dung"
                                value={formData.name}
                                onChange={(ev) =>
                                    onChangeForm("name", ev.target.value)
                                }
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
                                {formData.metaData?.map((item, _index) => (
                                    <MetaDataFields
                                        key={_index}
                                        index={_index}
                                        values={item}
                                        onRemove={removeMetaDataItem}
                                    />
                                ))}
                            </div>
                            <div>
                                <Button
                                    icon={<PlusOutlined />}
                                    type="primary"
                                    ghost
                                    onClick={addMetaDataFields}
                                >
                                    Thêm
                                </Button>
                            </div>
                        </div>
                        <Typography.Title level={4}>Gallery</Typography.Title>
                        <div className="gallery-container px-6 pt-6 pb-3 mb-6 border rounded-md">
                            <div className="list-image">
                                <Space>
                                    {formData.images?.listImage.map(
                                        (item, _index) => (
                                            <div
                                                key={_index}
                                                className="w-20 h-20 bg-slate-100 flex  items-center justify-center overflow-hidden relative rounded-sm"
                                            >
                                                <Image
                                                    src={`${mediaConfig.rootPath}/${item.path}`}
                                                    alt="thumb"
                                                    width={80}
                                                    height={80}
                                                    style={{
                                                        width: "100%",
                                                        height: "100%",
                                                        objectFit: "contain",
                                                    }}
                                                />
                                                <div className="ovlay absolute left-0 w-full top-0 h-full flex items-center justify-center bg-slate-950/30">
                                                    <Space>
                                                        <Button
                                                            icon={
                                                                <DeleteOutlined />
                                                            }
                                                            type="link"
                                                        ></Button>
                                                    </Space>
                                                </div>
                                            </div>
                                        ),
                                    )}
                                </Space>
                            </div>
                            <div className="gallery-action">
                                <Button
                                    onClick={onOpenMediaToSelectGallery}
                                    type="link"
                                    size="small"
                                >
                                    Chọn thư viện ảnh
                                </Button>
                            </div>
                        </div>
                        <FormItem
                            label="Mô tả ngắn"
                            help={errors?.subContent || ""}
                            validateStatus={errors?.subContent ? "error" : ""}
                        >
                            <Input.TextArea
                                className="resize-none"
                                rows={3}
                                value={formData.subContent}
                                onChange={(ev) =>
                                    onChangeForm("subContent", ev.target.value)
                                }
                            ></Input.TextArea>
                        </FormItem>
                        <FormItem
                            label="Chi tiết"
                            help={errors?.content || ""}
                            validateStatus={errors?.content ? "error" : ""}
                        >
                            <TextEditor
                                onEditorChange={(data, editor) =>
                                    onChangeForm("content", data)
                                }
                                value={formData.content}
                            />
                        </FormItem>
                        <Typography.Title level={4}>SEO Meta</Typography.Title>
                        <div className="box border rounded-[4px] px-4 py-6">
                            <FormItem
                                label="Meta title"
                                help={errors?.metaTitle || ""}
                                validateStatus={
                                    errors?.metaTitle ? "error" : ""
                                }
                            >
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
                            <FormItem
                                label="Meta description"
                                help={errors?.metaDescription || ""}
                                validateStatus={
                                    errors?.metaDescription ? "error" : ""
                                }
                            >
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
                            <FormItem
                                label="Meta keywords"
                                help={errors?.metaKeyword || ""}
                                validateStatus={
                                    errors?.metaKeyword ? "error" : ""
                                }
                            >
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
                    <div className="post-right w-[320px] xl:w-[380px]">
                        <div className="inner-right">
                            <Publishing
                                // templateValue={formData.templateId}
                                // templateList={CONTENTS_LAYOUT_PAGE_TEMPLATE}
                                // onChangeTemplate={onChangeTemplate}
                                onChangeTime={onChangePublishTime}
                                onChangeDate={onChangePublishDate}
                                timeValue={publishDateTime.publishTime}
                                dateValue={publishDateTime.publishDate}
                                onSaveAndPublish={() =>
                                    handlerSubmit(formData, (data) =>
                                        onSubmit?.({
                                            ...data,
                                            status: PageContentStatus.PUBLISH,
                                        }),
                                    )
                                }
                                onSaveForApproval={() => {}}
                                onApproval={() => onPublish?.(formData.id)}
                                onChangeStatus={onChangeStatusPage}
                                hideSaveForApproval={
                                    action === "update" ?? false
                                }
                                hideApproval={
                                    formData.status !==
                                        PageContentStatus.PENDING ||
                                    action === "create"
                                }
                                action={action}
                                status={formData.status}
                                disableSubmit={isDisablePublishButton}
                                disableSaveForApproval={isDisablePublishButton}
                            />
                            <ThumbnailImage
                                thumbnailUrl={
                                    formData.thumb
                                        ? `${mediaConfig.rootPath}/${formData.thumb}`
                                        : undefined
                                }
                                onRemove={onRemoveThumbnail}
                                onAdd={onOpenMediaToSelectThumbail}
                                error={errors?.thumb}
                            />
                        </div>
                    </div>
                </div>
            </Form>
            <MediaUploadDrawler
                isOpen={showMedia.isShow}
                onClose={onCloseMediaUpload}
                onConfirm={onConfirmSelectMediaImage}
                exceptsSelect={FILES_EXCERPT}
                mode={showMedia.type === "images" ? "multiple" : "single"}
            />
        </>
    );
};
export default memo(ContentPageForm);
