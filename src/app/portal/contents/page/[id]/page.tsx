"use client";
import React, { useEffect, useMemo } from "react";
import { useGetPageContentDetailQuery } from "@/queries/cms/content";
import ContentPageForm, {
    ContentPageFormProps,
} from "../create/_components/ContentPageForm";
import PageContainer from "@/components/admin/PageContainer";
import LocaleContainer from "@/components/admin/LocaleContainer";
import { useLocale } from "@/hooks/useLocale";
import { useRouter } from "next/navigation";
import { Spin } from "antd";
import { isUndefined } from "lodash";
import useCRUDPageContent from "../modules/useCRUDPageContent";
import { localeDefault } from "@/constants/locale.constant";
import { LangCode } from "@/models/management/cms/language.interface";
interface PageContentDetailProps {
    params: { id: number };
}
const PageContentDetail: React.FC<PageContentDetailProps> = ({ params }) => {
    const { locale, setLocale } = useLocale(localeDefault);

    const { data, isLoading } = useGetPageContentDetailQuery({
        originId: Number(params.id),
    });
    const router = useRouter();

    const pageContent = useMemo(() => {
        return data?.find((page) => page.lang === locale?.key);
    }, [data, locale]);

    const langCodes = useMemo(() => {
        return data?.reduce<LangCode[]>((acc, item) => {
            return [...acc, item.lang];
        }, []);
    }, [data]);

    const { onUpdate, onCreate } = useCRUDPageContent();

    const handleSubmitFormData: ContentPageFormProps["onSubmit"] = (
        formData,
    ) => {
        if (formData.id) {
            onUpdate(formData);
        } else {
            onCreate(formData);
        }
    };
    useEffect(() => {
        if (isUndefined(data) && !isLoading) {
            router.push("./portal/contents/page");
        }
    }, [isLoading]);

    if (isLoading) {
        return <Spin />;
    }

    if (isUndefined(data)) {
        return null;
    }

    return (
        <PageContainer
            name="Cập nhật và tạo bài viết"
            hideAddButton
            onBack={() => router.push("./portal/contents/page")}
            breadCrumItems={[
                { title: "Trang nội dung", href: "/portal/contents/page" },
                { title: "Cập nhật và tạo bài viết" },
            ]}
        >
            <LocaleContainer
                defaultValue={localeDefault}
                onChange={(lc) => setLocale(lc)}
                value={locale}
                langCodes={langCodes}
                className="mb-6 border-b"
            />
            {locale ? (
                <ContentPageForm
                    initData={pageContent}
                    originId={params.id}
                    lang={locale?.key}
                    onSubmit={handleSubmitFormData}
                />
            ) : null}
        </PageContainer>
    );
};
export default PageContentDetail;
