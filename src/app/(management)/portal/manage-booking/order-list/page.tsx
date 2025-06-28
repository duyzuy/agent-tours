"use client";
import React, { useState } from "react";
import PageContainer from "@/components/admin/PageContainer";
import TableListPage from "@/components/admin/TableListPage";
import { BookingOrderListQueryParams } from "@/models/management/booking/order.interface";
import { useGetBookingOrderListCoreQuery } from "@/queries/core/bookingOrder";
import { columnsOrderList } from "./columnsOrderList";
import { IOrderListRs } from "@/models/management/booking/order.interface";
import { useLocalGetRuleAndPolicyQuery } from "@/queries/ruleAndPolicy";
import { PaginationProps } from "antd";

import OrderFilter, { OrderFilterProps } from "./_components/OrderFilter";
export default function ManageBookingOrderListPage() {
  const [booingQueryParams, setBookingQueryParams] = useState(
    () =>
      new BookingOrderListQueryParams(undefined, 1, 20, {
        sortColumn: "recId",
        direction: "desc",
      }),
  );

  const { data: ruleAndPolicyList, isLoading: isLoadingRule } = useLocalGetRuleAndPolicyQuery();

  const { data: reservationResponse, isLoading } = useGetBookingOrderListCoreQuery({
    enabled: !isLoadingRule,
    queryParams: booingQueryParams,
    localRuleAndPolicies: ruleAndPolicyList || [],
  });

  const onChangePagination: PaginationProps["onChange"] = (page, pageSize) => {
    setBookingQueryParams((prev) => ({ ...prev, pageCurrent: page }));
  };

  const handleFilter: OrderFilterProps["onFilter"] = (key, value, data) => {
    setBookingQueryParams((prev) => ({
      ...prev,
      requestObject: {
        ...data,
      },
    }));
  };
  return (
    <PageContainer
      name="Quản lý đặt chỗ"
      modelName="Quản lý đặt chỗ"
      breadCrumItems={[{ title: "Quản lý đặt chỗ" }, { title: "Danh sách đặt chỗ" }]}
      hideAddButton
    >
      <OrderFilter onFilter={handleFilter} value={booingQueryParams.requestObject} />
      <TableListPage<IOrderListRs["result"][0]>
        dataSource={reservationResponse?.list || []}
        columns={columnsOrderList}
        isLoading={isLoading || isLoadingRule}
        rowKey={"recId"}
        // onView={(record) => router.push(`/portal/manage-booking/${record.recId}`)}
        pagination={{
          total: reservationResponse?.totalItems,
          pageSize: reservationResponse?.pageSize,
          current: reservationResponse?.pageCurrent,
          onChange: onChangePagination,
        }}
        scroll={{ x: 1400 }}
        showActionsLess={false}
      />
    </PageContainer>
  );
}
