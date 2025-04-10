"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Spin, Divider, Space, Button, Popconfirm, Empty } from "antd";
import { CheckCircleOutlined, CloseCircleOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";
import PageContainer from "@/components/admin/PageContainer";
import { useGetInventoryDetailCoreQuery } from "@/queries/core/inventory";
import useCRUDInventory from "../modules/useCRUDInventory";
import { LINKS } from "@/constants/links.constant";
import InventoryDetailContainer from "./_components/InventoryDetailContainer";
import { formatDate } from "@/utils/date";
import { ContentDetailList } from "@/components/admin/ContentDetailList";
import { Status } from "@/models/common.interface";
import Link from "next/link";
import EditInventoryButton from "./_components/EditInventoryButton";

const InventoryDetailPage = ({ params }: { params: { inventoryId: number } }) => {
  const router = useRouter();
  const { data: inventoryDetail, isLoading } = useGetInventoryDetailCoreQuery({
    recId: params.inventoryId,
    enabled: true,
  });

  const { onApprovalInventory, onDeleteInventory } = useCRUDInventory();

  const handleDelete = (recId: number) => {
    onDeleteInventory(recId, () => {
      router.back();
    });
  };

  useEffect(() => {
    if (!inventoryDetail && !isLoading) {
      router.push(LINKS.ProductInventoryList);
    }
  }, [inventoryDetail, isLoading]);

  if (isLoading) {
    return <Spin />;
  }

  if (!inventoryDetail) {
    return null;
  }

  return (
    <PageContainer
      name={`Dịch vụ - ${inventoryDetail.name}`}
      onBack={router.back}
      modelName="Quản lý stock"
      breadCrumItems={[
        { title: "Danh sách dịch vụ", href: LINKS.ProductInventoryList },
        { title: inventoryDetail.name },
      ]}
      hideAddButton
    >
      <div className="flex py-2 mb-6">
        <Space>
          {inventoryDetail.status === Status.QQ ? (
            <Button
              className="!bg-emerald-100 !text-emerald-600"
              type="text"
              onClick={() => onApprovalInventory(inventoryDetail.recId)}
            >
              Duyệt
            </Button>
          ) : (
            <EditInventoryButton initialValues={inventoryDetail} />
          )}
          <Popconfirm
            placement="topLeft"
            title="Xoá"
            description={`Bạn muốn xoá dịch vụ ${inventoryDetail.name}`}
            okText="Xác nhận"
            cancelText="Huỷ bỏ"
            onConfirm={() => handleDelete(inventoryDetail.recId)}
          >
            <Button className="!bg-red-100 !text-red-600" type="text" icon={<DeleteOutlined />} size="small">
              Xoá
            </Button>
          </Popconfirm>
        </Space>
      </div>
      <ContentDetailList
        className=""
        items={[
          { label: "#ID", value: inventoryDetail.recId.toString() },
          { label: "Mã dịch vụ", value: inventoryDetail.code },
          { label: "Tên dịch vụ", value: inventoryDetail.name },

          {
            label: "Loại",
            value: inventoryDetail.productType,
          },
          { label: "Loại dịch vụ", value: inventoryDetail.type },
          {
            label: "Stock",
            value: inventoryDetail.isStock ? (
              <CheckCircleOutlined className="!text-emerald-600" />
            ) : (
              <CloseCircleOutlined className="!text-red-600" />
            ),
          },
          { label: "Ngày tạo", value: formatDate(inventoryDetail.sysFstUpdate) },
          { label: "Ngày cập nhật", value: formatDate(inventoryDetail.sysLstUpdate) },
          { label: "Người tạo", value: inventoryDetail.sysFstUser },
          { label: "Người cập nhật", value: inventoryDetail.sysLstUser || "--" },
          {
            label: "Nhà cung cấp",
            value: (
              <>
                <div>{inventoryDetail.supplier ? inventoryDetail.supplier.fullName : "--"}</div>
                <Link href={`/portal/product/manage-supplier/${inventoryDetail.supplier.recId}`} className="text-xs">
                  Chi tiết
                </Link>
              </>
            ),
          },
        ]}
      />
      <Divider />
      {inventoryDetail.isStock ? (
        <div>
          {inventoryDetail.status === Status.QQ ? (
            "Vui lòng duyệt để tạo kho dịch vụ."
          ) : (
            <InventoryDetailContainer data={inventoryDetail} />
          )}
        </div>
      ) : (
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="Dịch vụ không quản lý số lượng kho." />
      )}
    </PageContainer>
  );
};
export default InventoryDetailPage;
