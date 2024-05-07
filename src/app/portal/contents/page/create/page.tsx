"use client";
import React, { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import PageContainer from "@/components/admin/PageContainer";
import LocaleContainer from "@/components/admin/LocaleContainer";
import { useLocale } from "@/hooks/useLocale";
import ContentPageForm, {
    ContentPageFormProps,
} from "./_components/ContentPageForm";
import useCRUDPageContent from "../modules/useCRUDPageContent";
import { localeDefault } from "@/constants/locale.constant";

import { isEqual } from "lodash";
import { initPageContentFormData } from "./_components/ContentPageForm";
import { isEqualObject } from "@/utils/compare";

const PageCreate = () => {
    const router = useRouter();
    const { locale, setLocale } = useLocale(localeDefault);
    const { onCreate } = useCRUDPageContent();
    const [isUpdatedContent, setUpdatedContent] = useState(false);

    const onWatchingFormChange = useCallback<
        Required<ContentPageFormProps>["onWatchFormChange"]
    >((formData) => {
        if (
            isEqualObject(
                [
                    "id",
                    "heroBanner",
                    "parentId",
                    "publishDate",
                    "templateId",
                    "name",
                    "slug",
                    "descriptions",
                    "excerpt",
                    "thumbnail",
                    "metaTitle",
                    "metaKeyword",
                    "metaDescription",
                ],
                formData,
                initPageContentFormData,
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
            name="Tạo trang mới"
            hideAddButton
            onBack={() => router.push("./portal/contents/page")}
            breadCrumItems={[
                { title: "Trang nội dung", href: "/portal/contents/page" },
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
export default PageCreate;
