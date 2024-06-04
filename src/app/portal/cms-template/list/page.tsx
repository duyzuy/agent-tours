"use client";
import React, { useState } from "react";
import PageContainer from "@/components/admin/PageContainer";
import TableListPage from "@/components/admin/TableListPage";
import { useRouter } from "next/navigation";
import { LINKS } from "@/constants/links.constant";
import { useGetCMSTemplateListQuery } from "@/queries/cms/cmsTemplate";
import { columns, PageContentDataType } from "./columns";
import { useMemo } from "react";
import { CMSTemplateQueryParams } from "@/models/management/cms/cmsTemplate.interface";
import { LangCode } from "@/models/management/cms/language.interface";
import DrawerCMSTemplate from "../_components/DrawerCMSTemplate";
const CMSTemplatePageList = () => {
    const router = useRouter();
    const [showDrawer, setShowDrawer] = useState(false);
    const [queryParams, setQueryParams] = useState(
        () =>
            new CMSTemplateQueryParams(
                {
                    // lang: LangCode.VI,
                    id: 275,
                },
                1,
                10,
            ),
    );
    const { data: templateData, isLoading } =
        useGetCMSTemplateListQuery(queryParams);

    console.log(templateData);
    // () => router.push(LINKS.CMSTemplateCreate)
    return (
        <PageContainer
            name="Cms template"
            modelName="template"
            onClick={() => setShowDrawer(true)}
            breadCrumItems={[{ title: "Cms template" }]}
        >
            <TableListPage<PageContentDataType>
                scroll={{ x: 1000 }}
                modelName="Trang nội dung"
                dataSource={[]}
                rowKey={"id"}
                size="small"
                columns={columns}
                isLoading={isLoading}
                onEdit={(record) =>
                    router.push(`./portal/contents/page/${record.originId}`)
                }
                pagination={{
                    total: templateData?.totalItems,
                    pageSize: templateData?.pageSize,
                    current: templateData?.pageCurrent,
                    onChange: (page) =>
                        setQueryParams((params) => ({
                            ...params,
                            pageCurrent: page,
                        })),
                }}
                showActionsLess={false}
            />
            <DrawerCMSTemplate
                isOpen={showDrawer}
                onClose={() => setShowDrawer(false)}
            />
        </PageContainer>
    );
};
export default CMSTemplatePageList;
