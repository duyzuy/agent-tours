"use client";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { isEqual } from "lodash";
import { Spin } from "antd";
import { useRouter } from "next/navigation";
import PageContainer from "@/components/admin/PageContainer";
import LocaleContainer, { LocaleContainerProps } from "@/components/admin/LocaleContainer";
import { useLocale } from "@/hooks/useLocale";
import DestinationFormContent, { DestinationFormContentProps } from "../_components/DestinationFormContent";
import useCRUDContentDestination from "../modules/useCRUDContentDestination";
import { useGetDestinationDetailMICSQuery, useGetDestinationDetailCMSQuery } from "@/queries/cms/destination";
import { LINKS } from "@/constants/links.constant";
import { LangCode } from "@/models/management/cms/language.interface";
import { localeDefault } from "@/constants/locale.constant";

import { initDestinationCMSFormData } from "../_components/DestinationFormContent";

const GroupArrivalContentPage = ({ params }: { params: { id: string } }) => {
  const { data: destinationDetail, isLoading } = useGetDestinationDetailMICSQuery(Number(params.id));

  const { data: destinationCMSContents, isLoading: loadingCMS } = useGetDestinationDetailCMSQuery(
    destinationDetail?.codeKey || "",
  );
  const { onCreateCMSContent, onUpdateCMSContent } = useCRUDContentDestination();

  const { locale, setLocale } = useLocale(localeDefault);
  const [isUpdatedContent, setUpdatedContent] = useState(false);

  const router = useRouter();

  const initDestinationCMSContent = useMemo(() => {
    return destinationCMSContents?.find((content) => content.lang === locale?.key);
  }, [locale, destinationCMSContents]);

  const initFormContent = useMemo(() => {
    return initDestinationCMSContent || initDestinationCMSFormData;
  }, [initDestinationCMSContent]);

  const onChangeLocale: LocaleContainerProps["onChange"] = (locale) => {
    setLocale(locale);
  };

  const langCodes = useMemo(() => {
    return destinationCMSContents?.reduce<LangCode[]>((acc, item) => {
      acc = [...acc, item.lang as LangCode];
      return acc;
    }, []);
  }, [destinationCMSContents]);

  const handleSubmitFormData: DestinationFormContentProps["onSubmit"] = ({ id, ...restFormData }) => {
    if (id) {
      onUpdateCMSContent(id, restFormData);
    } else {
      onCreateCMSContent(restFormData);
    }
  };
  const onWatchingFormChange = useCallback<Required<DestinationFormContentProps>["onWatchFormChange"]>(
    (formData) => {
      if (
        isEqual(
          {
            id: formData.id,
            title: formData.title,
            descriptions: formData.descriptions,
            shortDescriptions: formData.shortDescriptions,
            thumbnail: formData.thumbnail,
            images: formData.images,
            metaDescription: formData.metaDescription,
            metaKeyword: formData.metaKeyword,
            metaTitle: formData.metaTitle,
            slug: formData.slug,
          },
          {
            id: initFormContent.id,
            title: initFormContent.title,
            descriptions: initFormContent.descriptions,
            shortDescriptions: initFormContent.shortDescriptions,
            thumbnail: initFormContent.thumbnail,
            metaDescription: initFormContent.metaDescription,
            metaKeyword: initFormContent.metaKeyword,
            metaTitle: initFormContent.metaTitle,
            images: formData.images,
            slug: initFormContent.slug,
          },
        )
      ) {
        setUpdatedContent(false);
      } else {
        setUpdatedContent(true);
      }
    },
    [initDestinationCMSContent],
  );

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
        name={`${initDestinationCMSContent ? "Cập nhật" : "Tạo"} nội dung nhóm "${destinationDetail.codeName}"`}
        modelName="nội dung"
        hideAddButton={true}
        breadCrumItems={[{ title: "Nhóm điểm đến" }, { title: destinationDetail.codeName }]}
        onClick={() => {}}
        onBack={() => router.back()}
      >
        <LocaleContainer
          value={locale}
          defaultValue={localeDefault}
          langCodes={langCodes}
          showConfirmBeforeChange={isUpdatedContent}
          onChange={onChangeLocale}
          className="border-b"
        />
        {locale && (
          <DestinationFormContent
            initValues={initDestinationCMSContent}
            langCode={locale.key}
            codeKey={destinationDetail.codeKey}
            provinceList={destinationDetail.listStateProvince}
            codeName={destinationDetail.codeName}
            onSubmit={handleSubmitFormData}
            className="form-wrapper max-w-4xl pt-6"
            onWatchFormChange={onWatchingFormChange}
          />
        )}
      </PageContainer>
    </React.Fragment>
  );
};
export default GroupArrivalContentPage;
