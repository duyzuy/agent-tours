"use client";
import React, { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import PageContainer from "@/components/admin/PageContainer";
import LocaleContainer from "@/components/admin/LocaleContainer";
import { useLocale } from "@/hooks/useLocale";
import ContentPageForm, {
    ContentPageFormProps,
} from "./_components/ContentPageForm";
import useCreateCMSTemplate from "../modules/useCreateCMSTemplate";
import { localeDefault } from "@/constants/locale.constant";

import { initCmsTemplate } from "./_components/ContentPageForm";
import { isEqualObject } from "@/utils/compare";

const CMSTemplateCreatePage = () => {
    const router = useRouter();
    const { locale, setLocale } = useLocale(localeDefault);
    const { onCreate } = useCreateCMSTemplate();
    const [isUpdatedContent, setUpdatedContent] = useState(false);

    const onWatchingFormChange = useCallback<
        Required<ContentPageFormProps>["onWatchFormChange"]
    >((formData) => {
        if (
            isEqualObject(
                ["code", "slug", "content", "name"],
                formData,
                initCmsTemplate,
            )
        ) {
            setUpdatedContent(false);
        } else {
            setUpdatedContent(true);
        }
    }, []);

    const handleSubmitForm: ContentPageFormProps["onSubmit"] = (formData) => {
        onCreate(formData);
    };
    return (
        <PageContainer
            name="Tạo template"
            hideAddButton
            onBack={() => router.push("./portal/cms-template")}
            breadCrumItems={[
                { title: "Cms template", href: "/portal/cms-template" },
                { title: "Thêm mới" },
            ]}
        >
            <LocaleContainer
                defaultValue={localeDefault}
                onChange={(lc) => setLocale(lc)}
                value={locale}
                className="mb-6 border-b"
                showConfirmBeforeChange={isUpdatedContent}
            />
            {locale && (
                <ContentPageForm
                    lang={locale?.key}
                    onSubmit={handleSubmitForm}
                    onWatchFormChange={onWatchingFormChange}
                    action="create"
                />
            )}
        </PageContainer>
    );
};
export default CMSTemplateCreatePage;
