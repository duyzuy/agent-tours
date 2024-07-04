"use client";
import React, { useState } from "react";
import PageContainer from "@/components/admin/PageContainer";
import TableListPage from "@/components/admin/TableListPage";
import { useRouter } from "next/navigation";
import { LINKS } from "@/constants/links.constant";
import { useGetPageContentListQuery } from "@/queries/cms/content";
import { columns, PageContentDataType } from "./columns";
import { useMemo } from "react";
import { PageContentQueryParams } from "@/models/management/cms/pageContent.interface";
const PageManagement = () => {
    const router = useRouter();

    const [queryParams, setQueryParams] = useState(
        () => new PageContentQueryParams(1, 10),
    );
    const { data: pageContentData, isLoading } =
        useGetPageContentListQuery(queryParams);

    const getPageListWithoutChild = (items: PageContentDataType[]) => {
        return (
            items.reduce<PageContentDataType[]>((acc, item) => {
                if (item.children && item.children.length) {
                    const childofItem = getPageListWithoutChild(item.children);
                    acc = [...acc, { ...item, children: childofItem }];
                } else {
                    const { children, ...restItem } = item;
                    acc = [...acc, { ...restItem }];
                }
                return acc;
            }, []) || []
        );
    };
    const pageListContents = useMemo(
        () => getPageListWithoutChild(pageContentData?.list || []),
        [pageContentData],
    );

    return (
        <PageContainer
            name="Trang nội dung"
            modelName="trang"
            onClick={() => router.push(LINKS.PageCreate)}
            breadCrumItems={[{ title: "Trang nội dung" }]}
        >
            <TableListPage<PageContentDataType>
                scroll={{ x: 1000 }}
                modelName="Trang nội dung"
                dataSource={pageListContents}
                rowKey={"id"}
                size="small"
                columns={columns}
                isLoading={isLoading}
                onEdit={(record) =>
                    router.push(`/portal/contents/page/${record.originId}`)
                }
                pagination={{
                    total: pageContentData?.totalItems,
                    pageSize: pageContentData?.pageSize,
                    current: pageContentData?.pageCurrent,
                    onChange: (page) =>
                        setQueryParams((params) => ({
                            ...params,
                            pageCurrent: page,
                        })),
                }}
                showActionsLess={false}
            />
        </PageContainer>
    );
};
export default PageManagement;
