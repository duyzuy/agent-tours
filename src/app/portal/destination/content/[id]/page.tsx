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
} from "../../components/DestinationFormContent";
import {
    IDestinationContentFormData,
    DestinationContentFormData,
    IDestinationContentsRs,
} from "@/models/management/country.interface";
import useCRUDContentDestination from "../../hooks/useCRUDContentDestination";
import {
    useGetDestinationDetailMICSQuery,
    useGetDestinationDetailCMSQuery,
} from "@/queries/misc/destination";
import { LINKS } from "@/constants/links.constant";
import { isEqual } from "lodash";

const GroupArrivalContentPage = ({ params }: { params: { id: string } }) => {
    const { data: destinationDetail, isLoading } =
        useGetDestinationDetailMICSQuery(Number(params.id));

    const { data: destinationCMSContents, isLoading: loadingCMS } =
        useGetDestinationDetailCMSQuery(destinationDetail?.codeKey || "");

    const { locale, setLocale } = useLocale();
    const initFormData = new DestinationContentFormData(
        "",
        "",
        "",
        0,
        "",
        destinationDetail?.codeKey || "",
        locale.key,
    );

    const { onCreateCMSContent, errors } = useCRUDContentDestination();

    const [formData, setFormData] =
        useState<IDestinationContentFormData>(initFormData);

    const initDestinationCMSContent = useMemo(() => {
        return destinationCMSContents?.find(
            (content) => content.lang === locale.key,
        );
    }, [loadingCMS, locale, destinationCMSContents]);

    const router = useRouter();

    const onChangeLocale: LocaleContainerProps["onChange"] = (locale) => {
        setLocale(locale);
        let data: IDestinationContentFormData = {
            ...initFormData,
            lang: locale.key,
        };
        const destinationCMSContentByLang = destinationCMSContents?.find(
            (content) => content.lang === locale.key,
        );
        if (destinationCMSContentByLang) {
            data = {
                ...data,
                title: destinationCMSContentByLang.title,
                slug: destinationCMSContentByLang.slug,
                descriptions: destinationCMSContentByLang.descriptions,
                shortDescriptions:
                    destinationCMSContentByLang.shortDescriptions,
                thumb: destinationCMSContentByLang.thumb,
                lang: locale.key,
            };
        }
        setFormData(() => ({ ...data }));
    };

    const onSubmitFormData: DestinationFormContentProps["onSubmit"] = (
        action,
        payload,
    ) => {
        console.log(payload);
        console.log(action);
        if (action === "create") {
            onCreateCMSContent(payload);
        }
    };

    useEffect(() => {
        if (destinationDetail) {
            setFormData((prev) => ({
                ...prev,
                codeKey: destinationDetail.codeKey,
            }));
        }
        if (!destinationDetail && !isLoading) {
            router.push(LINKS.DestinationList);
        }
    }, [isLoading, destinationDetail]);

    const canShowModalConfirm = useMemo(() => {
        let collectFormData = { ...initFormData };
        if (initDestinationCMSContent) {
            collectFormData = {
                title: initDestinationCMSContent.title,
                descriptions: initDestinationCMSContent.descriptions,
                shortDescriptions: initDestinationCMSContent.shortDescriptions,
                slug: initDestinationCMSContent.slug,
                thumb: initDestinationCMSContent.thumb,
                lang: initDestinationCMSContent.lang,
                codeKey: initDestinationCMSContent.codeKey,
            };
        }

        console.log({ collectFormData, formData });
        return isEqual(
            JSON.stringify(collectFormData),
            JSON.stringify(formData),
        );
    }, [initDestinationCMSContent, formData, setFormData]);

    console.log(canShowModalConfirm);
    if (isLoading) {
        return <>...Loading</>;
    }
    if (!destinationDetail) {
        return null;
    }
    return (
        <React.Fragment>
            <PageContainer
                name={`Tạo nội dung nhóm "${destinationDetail.codeName}"`}
                modelName="nội dung"
                hideAddButton={true}
                breadCrumItems={[{ title: "Tạo nội dung" }]}
                onClick={() => {}}
                onCanel={() => router.back()}
            >
                <LocaleContainer
                    value={locale}
                    onChange={onChangeLocale}
                    currentData={initFormData}
                    newData={formData}
                    className="border-b"
                />
                <DestinationFormContent
                    initValues={initDestinationCMSContent}
                    setFormData={setFormData}
                    formData={formData}
                    errors={errors}
                    codeKey={destinationDetail.codeKey}
                    codeName={destinationDetail.codeName}
                    onSubmit={onSubmitFormData}
                    className="form-wrapper max-w-4xl pt-6"
                />
            </PageContainer>
        </React.Fragment>
    );
};
export default GroupArrivalContentPage;
