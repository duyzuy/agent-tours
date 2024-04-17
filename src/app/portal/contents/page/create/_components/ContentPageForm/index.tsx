import React, { memo, useCallback, useEffect, useMemo, useState } from "react";
import { Form, Input, Typography } from "antd";
import dayjs from "dayjs";
import { isEqual } from "lodash";
import { stringToSlug } from "@/utils/stringToSlug";
import { DATE_FORMAT, DATE_TIME_FORMAT, TIME_FORMAT } from "@/constants/common";
import { useFormSubmit } from "@/hooks/useFormSubmit";
import { mediaConfig } from "@/configs";

import { pageContentSchema } from "../../../schema/pageContent.schema";
import { IPageContentDetail } from "@/models/management/cms/pageContent.interface";
import { PageContentFormData } from "../../../modules/pageContent.interface";
import { PageStatus } from "@/models/management/cms/pageContent.interface";
import { LangCode } from "@/models/management/cms/language.interface";

import { MediaUploadProps } from "@/app/portal/media/_components/MediaUploadDrawler";
import ThumbnailImage from "@/components/admin/ThumbnailImage";
import Publishing, { PublishingProps } from "@/components/admin/Publishing";
import TextEditor from "@/components/base/TextEditor";
import FormItem from "@/components/base/FormItem";
import Slug, { SlugProps } from "@/components/admin/Slug";
import MediaUploadDrawler from "@/app/portal/media/_components/MediaUploadDrawler";
import PageParentList from "./PageParentList";

type RequirePageContentFormData = Required<PageContentFormData>;

const FILES_EXCERPT = ["IMAGE", "ICON"] as MediaUploadProps["exceptsSelect"];

export interface ContentPageFormProps {
    lang?: LangCode;
    initData?: IPageContentDetail;
    originId?: number;
    onSubmit?: (data: PageContentFormData) => void;
    onWatchFormChange?: (data: PageContentFormData) => void;
}
export const initPageContentFormData = new PageContentFormData(
    undefined,
    undefined,
    "",
    "",
    "",
    "",
    "",
    "",
    0,
    "",
    undefined,
    "",
    "",
    "",
    dayjs().format(DATE_TIME_FORMAT),
    PageStatus.PENDING,
);

const ContentPageForm: React.FC<ContentPageFormProps> = ({
    lang,
    initData,
    onSubmit,
    onWatchFormChange,
    originId,
}) => {
    const [formData, setFormData] = useState(initPageContentFormData);

    const [showDrawerMedia, setShowDrawerMedia] = useState<{
        isShow: boolean;
        type?: "heroBanner" | "thumbnail";
    }>(() => ({ isShow: false, type: undefined }));

    const { errors, handlerSubmit, clearErrors } = useFormSubmit({
        schema: pageContentSchema,
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

    const onChangeParentId = useCallback((value: number) => {
        setFormData((oldData) => {
            const { parentId } = oldData;

            if (parentId && parentId === value) {
                return { ...oldData, parentId: undefined };
            }
            return { ...oldData, parentId: value };
        });
    }, []);
    const onChangePublishDate = useCallback<
        Required<PublishingProps>["onChangeDate"]
    >((date) => {
        if (date) {
            setFormData((oldData) => {
                const { publishDate } = oldData;
                const [_, time] = publishDate?.split(" ");
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
                const [oldDate, _] = publishDate?.split(" ");
                const newPublishDate = [oldDate, time.format(TIME_FORMAT)].join(
                    " ",
                );
                return { ...oldData, publishDate: newPublishDate };
            });
        }
    }, []);
    const onConfirmSelectMediaImage = useCallback<
        Required<MediaUploadProps>["onConfirm"]
    >(
        (files) => {
            const type = showDrawerMedia.type;
            type &&
                setFormData((oldData) => ({
                    ...oldData,
                    [type]: files[0].fullPath,
                }));
        },
        [showDrawerMedia],
    );
    const onRemoveThumbnail = useCallback(() => {
        setFormData((oldData) => ({
            ...oldData,
            thumbnail: undefined,
        }));
    }, []);
    const onRemoveHeroBanners = useCallback(() => {
        setFormData((oldData) => ({
            ...oldData,
            heroBanner: undefined,
        }));
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
    const onCloseMediaUpload = useCallback(
        () => setShowDrawerMedia({ isShow: false, type: undefined }),
        [],
    );

    const isDisablePublishButton = useMemo(() => {
        const initDataConpareration = initData
            ? initData
            : initPageContentFormData;

        return isEqual(
            {
                id: formData.id,
                originId: formData.originId,
                name: formData.name,
                slug: formData.slug,
                thumbnail: formData.thumbnail,
                excerpt: formData.excerpt,
                heroBanner: formData.heroBanner,
                descriptions: formData.descriptions,
                parentId: formData.parentId,
                templateId: formData.templateId,
                metaTitle: formData.metaTitle,
                metaDescription: formData.metaDescription,
                metaKeyword: formData.metaKeyword,
                publishDate: formData.publishDate,
                status: formData.status,
            },
            {
                id: initDataConpareration.id,
                originId: initDataConpareration.originId,
                name: initDataConpareration.name,
                slug: initDataConpareration.slug,
                thumbnail: initDataConpareration.thumbnail,
                excerpt: initDataConpareration.excerpt,
                heroBanner: initDataConpareration.heroBanner,
                descriptions: initDataConpareration.descriptions,
                parentId: initDataConpareration.parentId,
                templateId: initDataConpareration.templateId,
                metaTitle: initDataConpareration.metaTitle,
                metaDescription: initDataConpareration.metaDescription,
                metaKeyword: initDataConpareration.metaKeyword,
                publishDate: initDataConpareration.publishDate,
                status: initDataConpareration.status,
            },
        );
    }, [initData, formData]);
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
                thumbnail: initData.thumbnail,
                excerpt: initData.excerpt,
                heroBanner: initData.heroBanner,
                descriptions: initData.descriptions,
                parentId: initData.parentId,
                templateId: initData.templateId,
                lang: initData.lang,
                metaTitle: initData.metaTitle,
                metaDescription: initData.metaDescription,
                metaKeyword: initData.metaKeyword,
                publishDate: initData.publishDate,
                status: initData.status,
            }));
        } else {
            setFormData({
                ...initPageContentFormData,
                lang: lang,
                originId: originId,
            });
        }
        clearErrors();
    }, [lang, initData]);

    return (
        <>
            <Form layout="vertical">
                <div className="flex w-full">
                    <div
                        className="post-left flex-1 mr-8"
                        style={{ width: "calc(100% - 380px)" }}
                    >
                        <FormItem
                            label="Tiêu đề"
                            required
                            validateStatus={errors?.name ? "error" : ""}
                            help={errors?.name || ""}
                        >
                            <Input
                                placeholder="Tiêu đề"
                                value={formData.name}
                                onChange={(ev) =>
                                    onChangeForm("name", ev.target.value)
                                }
                            />
                        </FormItem>
                        <Slug
                            slugName={formData.slug}
                            lang={lang}
                            type="page"
                            onSave={onSaveSlug}
                            validateStatus={errors?.slug ? "error" : ""}
                            help={errors?.slug || ""}
                            className="mb-6"
                        />
                        <FormItem
                            label="Mô tả ngắn"
                            help={errors?.excerpt || ""}
                            validateStatus={errors?.excerpt ? "error" : ""}
                        >
                            <Input.TextArea
                                className="resize-none"
                                rows={3}
                                value={formData.excerpt}
                                onChange={(ev) =>
                                    onChangeForm("excerpt", ev.target.value)
                                }
                            ></Input.TextArea>
                        </FormItem>
                        <FormItem
                            label="Chi tiết"
                            help={errors?.descriptions || ""}
                            validateStatus={errors?.descriptions ? "error" : ""}
                        >
                            <TextEditor
                                onEditorChange={(data, editor) =>
                                    onChangeForm("descriptions", data)
                                }
                                value={formData.descriptions}
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
                    <div className="post-right w-[320px]">
                        <div className="inner-right">
                            <Publishing
                                timeValue={dayjs(formData.publishDate, {
                                    format: TIME_FORMAT,
                                })}
                                dateValue={dayjs(formData.publishDate, {
                                    format: DATE_FORMAT,
                                })}
                                onChangeTime={onChangePublishTime}
                                onChangeDate={onChangePublishDate}
                                onSaveAndPublish={() =>
                                    handlerSubmit(
                                        {
                                            ...formData,
                                            status: PageStatus.PUBLISH,
                                        },
                                        onSubmit,
                                    )
                                }
                                disableSubmit={isDisablePublishButton}
                                disableApproval={isDisablePublishButton}
                            />
                            <ThumbnailImage
                                label="Hero banners"
                                thumbnailUrl={
                                    formData.heroBanner
                                        ? `${mediaConfig.rootPath}/${formData.heroBanner}`
                                        : undefined
                                }
                                onRemove={onRemoveHeroBanners}
                                onAdd={onOpenMediaToSelectHeroBanner}
                                error={errors?.heroBanner}
                            />
                            <ThumbnailImage
                                thumbnailUrl={
                                    formData.thumbnail
                                        ? `${mediaConfig.rootPath}/${formData.thumbnail}`
                                        : undefined
                                }
                                onRemove={onRemoveThumbnail}
                                onAdd={onOpenMediaToSelectThumbail}
                                error={errors?.thumbnail}
                            />
                            <PageParentList
                                lang={lang}
                                value={formData.parentId}
                                onChange={onChangeParentId}
                                className="mb-2"
                            />
                        </div>
                    </div>
                </div>
            </Form>
            <MediaUploadDrawler
                isOpen={showDrawerMedia.isShow}
                onClose={onCloseMediaUpload}
                onConfirm={onConfirmSelectMediaImage}
                exceptsSelect={FILES_EXCERPT}
            />
        </>
    );
};
export default memo(ContentPageForm);
