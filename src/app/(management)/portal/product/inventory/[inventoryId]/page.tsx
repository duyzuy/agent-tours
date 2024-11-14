"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Spin, Divider, Space, Button, Popconfirm } from "antd";
import { CheckCircleOutlined, CloseCircleOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";
import PageContainer from "@/components/admin/PageContainer";
import { useGetInventoryDetailCoreQuery } from "@/queries/core/inventory";
import useCRUDInventory from "../modules/useCRUDInventory";
import { LINKS } from "@/constants/links.constant";
import InventoryDetailContainer from "./_components/InventoryDetailContainer";
import { formatDate } from "@/utils/date";
import { EProductType } from "@/models/management/core/productType.interface";
import { ContentDetailList } from "@/components/admin/ContentDetailList";
import { Status } from "@/models/common.interface";
import DrawerInventoryForm, { DrawerInventoryFormProps } from "../_components/DrawerInventoryForm";
import { isUndefined } from "lodash";
import Link from "next/link";

const InventoryDetailPage = ({ params }: { params: { inventoryId: number } }) => {
  const [showDrawer, setShowDrawer] = useState(false);
  const router = useRouter();

  const { data: inventoryDetail, isLoading } = useGetInventoryDetailCoreQuery({
    recId: params.inventoryId,
    enabled: true,
  });

  const { onApprovalInventory, onUpdateInventory, onDeleteInventory } = useCRUDInventory();

  const setEditInventory = () => {
    setShowDrawer(true);
  };

  const handleUpdateInventory: DrawerInventoryFormProps["onSubmit"] = (action, formData) => {
    const inventoryId = formData.recId;
    if (isUndefined(inventoryId)) throw new Error("Missing ID Inventory.");
    if (action === "EDIT")
      onUpdateInventory(inventoryId, formData, () => {
        setShowDrawer(false);
      });
  };

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
            <Button
              className="!bg-blue-100 !text-blue-600"
              type="text"
              icon={<EditOutlined />}
              size="small"
              onClick={setEditInventory}
            >
              Sửa
            </Button>
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
          { label: "Loại dịch vụ", value: inventoryDetail.type },
          {
            label: "Loại sản phẩm",
            value:
              inventoryDetail.productType === EProductType.TOUR
                ? "Sản phẩm dịch vụ kèm tour"
                : inventoryDetail.productType === EProductType.EXTRA
                ? "Sản phẩm dịch vụ"
                : inventoryDetail.productType,
          },
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
        <div>Dịch vụ không có quản lý kho.</div>
      )}
      <DrawerInventoryForm
        isOpen={showDrawer}
        initialValues={inventoryDetail}
        inventoriesType={inventoryDetail.supplier.typeList}
        supplierId={inventoryDetail.supplier.recId}
        productType={inventoryDetail.productType}
        disableSupplierField={true}
        actionType="EDIT"
        onSubmit={handleUpdateInventory}
        onCancel={() => setShowDrawer(false)}
      />
    </PageContainer>
  );
};
export default InventoryDetailPage;
