"use client";
import PageContainer from "@/components/admin/PageContainer";
import TableListPage from "@/components/admin/TableListPage";
import {
  BookingRequestQueryParams,
  IBookingRequest,
} from "@/models/management/bookingRequest/bookingRequest.interface";
import React, { useState } from "react";
import { useGetBookingRequestListCoreQuery } from "@/queries/core/bookingRequest";
import { columns } from "./columns";
import DrawerBookingRequestForm, { DrawerBookingRequestFormProps } from "./_components/DrawerBookingRequestForm";
import useCRUDBookingRequest from "../module/useCRUDBookingRequest";
import { useRouter } from "next/navigation";
const BookingRequestPageList = () => {
  const initqueryParams = new BookingRequestQueryParams(
    { status: ["NEW", "CONFIRMED", "WIN", "LOST", "CANCELLED"] },
    1,
    10,
  );
  const { data, isLoading } = useGetBookingRequestListCoreQuery({ enabled: true, queryParams: initqueryParams });
  const [openDrawer, setOpenDrawer] = useState(false);
  const { onCreate } = useCRUDBookingRequest();

  const router = useRouter();
  const handleCreate: DrawerBookingRequestFormProps["onSubmit"] = (action, data) => {
    action === "CREATE" && onCreate(data);
  };
  return (
    <PageContainer
      name="Danh sách yêu cầu dịch vụ"
      modelName="yêu cầu dịch vụ"
      breadCrumItems={[{ title: "Danh sách yêu cầu dịch vụ" }]}
      onClick={() => setOpenDrawer(true)}
    >
      <TableListPage<IBookingRequest>
        scroll={{ x: 1200 }}
        rowKey="requestId"
        columns={columns}
        dataSource={data?.list || []}
        loading={isLoading}
        size="small"
        onView={(record) => router.push(`/portal/booking-request/${record.requestId}`)}
        showActionsLess={false}
        pagination={{
          size: "small",
          pageSize: 20,
        }}
      />
      <DrawerBookingRequestForm
        isOpen={openDrawer}
        actionType="CREATE"
        onCancel={() => setOpenDrawer(false)}
        onSubmit={handleCreate}
      />
    </PageContainer>
  );
};
export default BookingRequestPageList;
