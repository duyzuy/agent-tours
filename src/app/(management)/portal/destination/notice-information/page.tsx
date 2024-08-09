"use client";
import React, { useState } from "react";
import PageContainer from "@/components/admin/PageContainer";
import TableListPage from "@/components/admin/TableListPage";
import { useRouter } from "next/navigation";
import { LINKS } from "@/constants/links.constant";
import { columns } from "./columns";
import { TravelInformationNoticeQueryParams } from "@/models/management/cms/cmsStateProvinceNotice";
import { useGetTravelInformationNoticeListQuery } from "@/queries/cms/cmsTravelInfo";
import { ITravelInformationNotice } from "@/models/management/cms/cmsStateProvinceNotice";
const PageManagement = () => {
  const router = useRouter();

  const [queryParams, setQueryParams] = useState(() => new TravelInformationNoticeQueryParams({}, 1, 10));
  const { data, isLoading } = useGetTravelInformationNoticeListQuery(queryParams);

  return (
    <PageContainer
      name="Danh sách lưu ý"
      modelName="Danh sách lưu ý"
      onClick={() => router.push(LINKS.NoticeCreate)}
      breadCrumItems={[{ title: "Danh sách lưu ý" }]}
    >
      <TableListPage<ITravelInformationNotice>
        scroll={{ x: 1000 }}
        modelName="lưu ý"
        dataSource={data?.list || []}
        rowKey={"id"}
        size="small"
        columns={columns}
        isLoading={isLoading}
        onEdit={(record) => router.push(`/portal/destination/notice-information/${record.originId}`)}
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
        showActionsLess={false}
      />
    </PageContainer>
  );
};
export default PageManagement;
