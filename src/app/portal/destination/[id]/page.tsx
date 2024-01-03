"use client";
import React, { useEffect, useMemo, useState } from "react";
import PageContainer from "@/components/admin/PageContainer";
import LocaleContainer, {
    LocaleContainerProps,
} from "@/components/admin/LocaleContainer";
import { useLocale } from "@/hooks/useLocale";
import { useRouter, notFound } from "next/navigation";

import DestinationFormContent, {
    DestinationFormContentProps,
} from "../components/DestinationFormContent";
import { DestinationContentFormData } from "@/models/management/region.interface";
import useCRUDContentDestination from "../hooks/useCRUDContentDestination";
import {
    useGetDestinationDetailMICSQuery,
    useGetDestinationDetailCMSQuery,
} from "@/queries/misc/destination";
import { LINKS } from "@/constants/links.constant";
import { isEqual } from "lodash";
import { Spin } from "antd";

const GroupArrivalContentPage = ({ params }: { params: { id: string } }) => {
    const { data: destinationDetail, isLoading } =
        useGetDestinationDetailMICSQuery(Number(params.id));

    const { data: destinationCMSContents, isLoading: loadingCMS } =
        useGetDestinationDetailCMSQuery(destinationDetail?.codeKey || "");
    const { onCreateCMSContent, errors, onUpdateCMSContent } =
        useCRUDContentDestination();

    const { locale, setLocale } = useLocale();
    const initFormData = new DestinationContentFormData(
        "",
        "",
        "",
        0,
        "",
        "",
        locale.key,
    );
    const router = useRouter();
    const [initData, setInitData] = useState(initFormData);
    const [formData, setFormData] = useState(initFormData);

    const initDestinationCMSContent = useMemo(() => {
        return destinationCMSContents?.find(
            (content) => content.lang === locale.key,
        );
    }, [loadingCMS, locale, destinationCMSContents]);

    const onChangeLocale: LocaleContainerProps["onChange"] = (locale) => {
        setLocale(locale);
    };

    const isDisableButton = useMemo(() => {
        return isEqual(JSON.stringify(initData), JSON.stringify(formData));
    }, [formData]);

    const handleSubmitFormData: DestinationFormContentProps["onSubmit"] = (
        action,
        payload,
        id,
    ) => {
        if (action === "create") {
            onCreateCMSContent(payload);
        }
        if (action === "edit" && id) {
            onUpdateCMSContent(id, payload);
        }
    };

    useEffect(() => {
        let initFormDataUpdate = { ...initFormData };
        if (destinationDetail) {
            initFormDataUpdate = {
                ...initFormDataUpdate,
                codeKey: destinationDetail.codeKey,
            };
        }

        const destinationCMSContentByLang = destinationCMSContents?.find(
            (content) => content.lang === locale.key,
        );
        if (destinationCMSContentByLang) {
            initFormDataUpdate = {
                ...initFormDataUpdate,
                title: destinationCMSContentByLang.title,
                descriptions: destinationCMSContentByLang.descriptions,
                shortDescriptions:
                    destinationCMSContentByLang.shortDescriptions,
                slug: destinationCMSContentByLang.slug,
                thumb: destinationCMSContentByLang.thumb,
            };
        }
        setFormData(() => initFormDataUpdate);
        setInitData(() => initFormDataUpdate);
    }, [destinationCMSContents, destinationDetail, locale]);

    useEffect(() => {
        if (!destinationDetail && !isLoading) {
            router.push(LINKS.DestinationList);
        }
    }, [isLoading, destinationDetail]);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center py-4">
                <Spin size="large" />
            </div>
        );
    }
    if (!destinationDetail) {
        return null;
    }
    return (
        <React.Fragment>
            <PageContainer
                name={`${
                    initDestinationCMSContent ? "Cập nhật" : "Tạo"
                } nội dung nhóm "${destinationDetail.codeName}"`}
                modelName="nội dung"
                hideAddButton={true}
                breadCrumItems={[
                    { title: "Nhóm điểm đến" },
                    { title: destinationDetail.codeName },
                ]}
                onClick={() => {}}
                onCanel={() => router.back()}
            >
                <LocaleContainer
                    value={locale}
                    onChange={onChangeLocale}
                    currentData={initData}
                    newData={formData}
                    className="border-b"
                />
                <DestinationFormContent
                    initValues={initDestinationCMSContent}
                    isDisableButton={isDisableButton}
                    setFormData={setFormData}
                    formData={formData}
                    errors={errors}
                    codeKey={destinationDetail.codeKey}
                    provinceList={destinationDetail.listStateProvince}
                    codeName={destinationDetail.codeName}
                    onSubmit={handleSubmitFormData}
                    className="form-wrapper max-w-4xl pt-6"
                />
            </PageContainer>
        </React.Fragment>
    );
};
export default GroupArrivalContentPage;
