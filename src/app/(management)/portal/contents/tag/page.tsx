"use client";
import PageContainer from "@/components/admin/PageContainer";
import TableListPage from "@/components/admin/TableListPage";
import { useGetTagListLangQuery } from "@/queries/cms/tag";
import { TagQueryParamsData } from "./module/tag.interface";
import { useState } from "react";
import { TagListResponse } from "@/models/management/tag.interface";
import { columns } from "./columns";
import { useRouter } from "next/navigation";
import { LINKS } from "@/constants/links.constant";
const TagPage = () => {
  const initQueryParams = new TagQueryParamsData(undefined, 1, 20);
  const [queryParams, setQueryParams] = useState(initQueryParams);
  const { data, isLoading } = useGetTagListLangQuery({ queryParams: queryParams });
  const router = useRouter();

  return (
    <>
      <PageContainer
        name="Thẻ nội dung"
        modelName="thẻ"
        onClick={() => router.push(LINKS.TagCreate)}
        breadCrumItems={[{ title: "Thẻ nội dung" }]}
      >
        <TableListPage<TagListResponse["result"][0]>
          scroll={{ x: 1000 }}
          modelName="Thẻ"
          dataSource={data?.list || []}
          rowKey={"id"}
          columns={columns}
          isLoading={isLoading}
          onEdit={(record) => router.push(`/portal/contents/tag/${record.originId}`)}
          pagination={{
            total: data?.totalItems,
            pageSize: data?.pageSize,
            current: data?.pageCurrent,
            onChange: (page) =>
              setQueryParams((params) => ({
                ...params,
                pageCurrent: page,
              })),
          }}
        />
      </PageContainer>
    </>
  );
};
export default TagPage;
