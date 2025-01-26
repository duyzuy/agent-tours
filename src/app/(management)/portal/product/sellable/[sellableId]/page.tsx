"use client";
import React, { useEffect, useMemo, useState } from "react";
import { Button, Divider, Empty, Popconfirm, Space, Spin, Switch, Tag } from "antd";
import PageContainer from "@/components/admin/PageContainer";
import { useGetSellableDetailCoreQuery } from "@/queries/core/Sellable";
import { useRouter } from "next/navigation";
import SellableContainerDetail from "./_components/SellableContainerDetail";
import { DeleteOutlined, EditOutlined, SwapRightOutlined } from "@ant-design/icons";
import { formatDate } from "@/utils/date";
import { Status } from "@/models/common.interface";
import { ContentDetailList } from "@/components/admin/ContentDetailList";
import DrawerSellableApproval, { DrawerSellableApprovalProps } from "../_components/DrawerSellableApproval";
import useCRUDSellable from "../modules/useCRUDSellable";
import Link from "next/link";
import SellableActionsButton from "./_components/SellableActionsButton";

const SellableDetailPage: React.FC<{ params: { sellableId: string } }> = ({ params: { sellableId } }) => {
  const router = useRouter();

  const { data, isLoading } = useGetSellableDetailCoreQuery(Number(sellableId), {
    enabled: !!Number(sellableId),
  });

  useEffect(() => {
    if (!isLoading && !data) {
      router.push("./portal/product/inventory");
    }
  }, [data, isLoading]);

  if (isLoading) return <Spin />;

  if (!data) {
    return null;
  }

  return (
    <PageContainer
      name={data.sellable.code}
      hideAddButton
      onBack={router.back}
      breadCrumItems={[
        { title: "Danh sách sản phẩm", href: "/portal/product/sellable" },
        { title: data.sellable.code },
      ]}
      modelName="Sản phẩm"
    >
      <SellableActionsButton
        item={data.sellable}
        status={data.sellable.status}
        type={data.sellable.type}
        code={data.sellable.code}
        inventoryTypeList={data.sellable.template?.inventoryTypeList || []}
      />
      <ContentDetailList
        column={3}
        items={[
          {
            label: "#ID",
            value: data.sellable?.recId.toString(),
          },
          {
            label: "Mã sản phẩm",
            value: data.sellable?.code,
          },
          {
            label: "Loại",
            value: data.sellable?.type,
          },
          {
            label: "Trạng thái",
            value: (
              <Tag
                color={
                  (data.sellable.status === Status.OK && "green") ||
                  (data.sellable.status === Status.QQ && "orange") ||
                  "red"
                }
              >
                {(data.sellable.status === Status.OK && "Đang kích hoạt") ||
                  (data.sellable.status === Status.XX && "Đã xoá") ||
                  (data.sellable.status === Status.QQ && "Chờ duyệt") ||
                  "Chờ kích hoạt"}
              </Tag>
            ),
          },
        ]}
        className="mb-6"
      />
      <ContentDetailList
        column={3}
        items={[
          {
            label: "Tổng số lượng",
            value: data.sellable?.cap.toString(),
          },
          {
            label: "Khả dụng",
            value: data.sellable?.available,
          },
          {
            label: "Đang còn",
            value: <span className="text-emerald-600">{data.sellable?.open.toString()}</span>,
          },
          {
            label: "Đã sử dụng",
            value: <span className="text-red-600">{data.sellable?.used.toString()}</span>,
          },
        ]}
        className="mb-6"
      />
      <ContentDetailList
        column={3}
        items={[
          {
            label: "Ngày bán",
            value: (
              <div className="flex flex-col">
                <span className="flex items-center">
                  <span className="text-xs w-7 inline-block text-red-600">Từ</span>
                  {formatDate(data.sellable.validFrom)}
                </span>
                <span className="flex items-center">
                  <span className="text-xs w-7 inline-block text-emerald-600">Đến</span>
                  {formatDate(data.sellable?.validTo)}
                </span>
              </div>
            ),
          },
          {
            label: "Ngày kết thúc mở bán",
            value: (data.sellable?.closeDate && formatDate(data.sellable.closeDate)) || "--",
          },
          {
            label: "Ngày sử dụng",
            value: (
              <div className="flex flex-col">
                <span className="flex items-center">
                  <span className="text-xs w-7 inline-block text-red-600">Từ</span>
                  {formatDate(data.sellable.startDate)}
                </span>
                <span className="flex items-center">
                  <span className="text-xs w-7 inline-block text-emerald-600">Đến</span>
                  {formatDate(data.sellable.endDate)}
                </span>
              </div>
            ),
          },
        ]}
        className="mb-6"
      />
      <Divider />
      <h3 className="mb-6 font-semibold text-lg">Sản phẩm</h3>
      <ContentDetailList.Item direction="horizontal" label="Mã" value={data.sellable.template?.code} className="mb-2" />
      <ContentDetailList.Item
        direction="horizontal"
        label="Sản phẩm"
        className="mb-2"
        value={
          <Link href={`/portal/product/template-sellable/${data.sellable.template?.templateId}`} className="text-xs">
            {data.sellable.template?.name}
          </Link>
        }
      />
      <ContentDetailList.Item
        direction="horizontal"
        label="Dịch vụ"
        value={
          <Space wrap>
            {data.sellable.template?.inventoryTypeList.map((item) => (
              <Tag key={item}>{item}</Tag>
            ))}
          </Space>
        }
      />
      <Divider />
      {data.sellable.status === Status.OK ? (
        <SellableContainerDetail data={data} disabled={data.sellable.status !== Status.OK} />
      ) : (
        <Empty
          imageStyle={{ width: 60, height: 60, margin: "auto" }}
          description={<p className="mb-3">Sản phẩm đang chờ duyệt.</p>}
        />
      )}
    </PageContainer>
  );
};
export default SellableDetailPage;
