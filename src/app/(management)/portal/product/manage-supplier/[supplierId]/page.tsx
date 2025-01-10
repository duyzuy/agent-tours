"use client";
import React, { useEffect, useState } from "react";
import PageContainer from "@/components/admin/PageContainer";
import { useRouter } from "next/navigation";
import { Button, Divider, Empty, Popconfirm, Space, Spin, Switch, SwitchProps, Tag } from "antd";
import { ContentDetailList } from "@/components/admin/ContentDetailList";
import { Status } from "@/models/common.interface";
import { formatDate } from "@/utils/date";
import { useGetSupplierDetailCoreQuery } from "@/queries/core/supplier";
import useManageSupplier from "../modules/useManageSupplier";
import DrawerSupplierForm, { DrawerSupplierFormProps } from "../_components/DrawerSupplierForm";
import Link from "next/link";
import { DeleteOutlined, EditOutlined, RightOutlined } from "@ant-design/icons";
import SupplierContainerTab from "./_components/SupplierContainerTab";

type SupplierDetailPageProps = {
  params: { supplierId: string };
};
const SupplierDetailPage: React.FC<SupplierDetailPageProps> = ({ params: { supplierId } }) => {
  const [showDrawer, setShowDrawer] = useState(false);
  const [loadingToggle, setLoadingToggle] = useState(false);

  const { data, isLoading } = useGetSupplierDetailCoreQuery({ recId: Number(supplierId), enabled: true });

  const { onUpdate, onDeactive, onActive, onApproval, onDelete } = useManageSupplier();

  const router = useRouter();

  const setEditSupplier = () => {
    setShowDrawer(true);
  };
  const handleSubmitForm: DrawerSupplierFormProps["onSubmit"] = (action, formData) => {
    if (action === "EDIT") {
      onUpdate(formData, () => {
        setShowDrawer(false);
      });
    }
  };

  const handleDelete = (recId: number) => {
    onDelete(recId, () => {
      router.back();
    });
  };
  const toggleActive: SwitchProps["onChange"] = (checked) => {
    if (!data?.recId) {
      throw new Error("Recid in-valid");
    }
    setLoadingToggle(true);
    if (checked === true) {
      onActive?.(data.recId, (data) => {
        setLoadingToggle(false);
      });
    } else {
      onDeactive?.(data.recId, (data) => {
        setLoadingToggle(false);
      });
    }
  };

  useEffect(() => {
    if (!data && !isLoading) {
      router.push("/portal/product/manage-supplier");
    }
  }, [data, isLoading]);

  if (isLoading) return <Spin />;

  if (!data) {
    return null;
  }

  return (
    <PageContainer
      name={`Supplier - ${data.fullName}`}
      breadCrumItems={[
        { title: "Quản lý Supplier", href: "/portal/product/manage-supplier" },
        { title: data.fullName },
      ]}
      hideAddButton
      onBack={router.back}
    >
      <div className="flex py-2 mb-6">
        <Space>
          {data.status === Status.QQ ? (
            <Button
              className="!bg-emerald-100 !text-emerald-600 w-[80px]"
              size="small"
              type="text"
              onClick={() => onApproval(data.recId)}
            >
              Duyệt
            </Button>
          ) : (
            <>
              <Space>
                <span className="font-normal text-sm">Kích hoạt</span>
                <Switch
                  value={data.status === Status.OK ? true : false}
                  onChange={toggleActive}
                  loading={loadingToggle}
                />
              </Space>
              <span className="mx-3 text-xs text-gray-500">|</span>
              <Button
                className="!bg-blue-100 !text-blue-600 w-[80px]"
                type="text"
                icon={<EditOutlined />}
                size="small"
                onClick={setEditSupplier}
              >
                Sửa
              </Button>
            </>
          )}

          <Popconfirm
            placement="topLeft"
            title="Xoá"
            description={`Bạn muốn xoá Supplier ${data.fullName}`}
            okText="Xác nhận"
            cancelText="Huỷ bỏ"
            onConfirm={() => handleDelete(data.recId)}
          >
            <Button className="!bg-red-100 !text-red-600 w-[80px]" type="text" icon={<DeleteOutlined />} size="small">
              Xoá
            </Button>
          </Popconfirm>
        </Space>
      </div>
      <ContentDetailList
        items={[
          {
            label: "#ID",
            value: data.recId,
          },
          {
            label: "Tên đầy đủ",
            value: data.fullName,
          },
          {
            label: "Tên rút gọn",
            value: data.shortName,
          },
          {
            label: "Mã số thuế",
            value: data.taxCode || "--",
          },
          {
            label: "Email",
            value: data.email,
          },
          {
            label: "Địa chỉ",
            value: data.address || "--",
          },
          {
            label: "Họ tên người liên hệ",
            value: data.contact,
          },
          {
            label: "Ghi chú",
            value: data.rmk || "--",
          },
        ]}
      />
      <Divider />
      <ContentDetailList
        items={[
          {
            label: "Ngày tạo",
            value: formatDate(data.sysFstUpdate),
          },
          {
            label: "Ngày cập nhật",
            value: formatDate(data.sysLstUpdate),
          },
          {
            label: "Người tạo",
            value: data.sysFstUser,
          },
          {
            label: "Người cập nhật",
            value: data.sysLstUser || "--",
          },
          {
            label: "Log",
            value: data.logStatus || "--",
          },
          {
            label: "Trạng thái",
            value: (
              <Tag
                color={(data.status === Status.OK && "green") || (data.status === Status.QQ && "orange") || "red"}
                bordered={false}
              >
                {(data.status === Status.OK && "Đang kích hoạt") ||
                  (data.status === Status.XX && "Đã xoá") ||
                  (data.status === Status.QQ && "Chờ duyệt") ||
                  (data.status === Status.OX && "Ngừng kích hoạt") ||
                  data.status}
              </Tag>
            ),
          },
        ]}
      />
      <Divider />
      <ContentDetailList.Item
        label="Loại dịch vụ cung ứng"
        value={
          <div className="flex gap-2 mt-2">
            {data.typeList.map((type) => (
              <Tag key={type}>{type}</Tag>
            ))}
          </div>
        }
      />
      <Divider />
      <h3 className="text-lg font-semibold mb-3">Thông tin thanh toán</h3>
      <ContentDetailList
        items={[
          {
            label: "Tên ngân hàng",
            value: data.bankName || "--",
          },
          {
            label: "Chi nhánh ngân hàng",
            value: data.bankAddress || "--",
          },
          {
            label: "Số tài khoản",
            value: data.bankAccountNumber || "--",
          },
          {
            label: "Swift code",
            value: data.bankSwiftcode || "--",
          },
          {
            label: "Chính sách thanh toán",
            value: data.paymentTerm || "--",
          },
          {
            label: "Hinh thức thanh toán",
            value: data.paymentType,
          },
        ]}
      />
      <Divider />
      <h3 className="text-lg font-semibold mb-3">Thông tin Vendor</h3>
      <ContentDetailList
        items={[
          {
            label: "Tên đầy đủ",
            value: data.vendor?.fullName || "--",
          },
          {
            label: "Tên rút gọn",
            value: data.vendor?.shortName || "--",
          },
          {
            label: "Email",
            value: data.vendor?.email || "--",
          },
          {
            label: "Người liên hệ",
            value: data.vendor?.contact || "--",
          },
          {
            label: "Địa chỉ",
            value: data.vendor?.address || "--",
          },
          {
            label: "Chi tiết vendor",
            value: (
              <Link href={`/portal/product/manage-vendor/${data?.vendor?.recId}`}>
                Xem chi tiết <RightOutlined className="!text-xs !w-3 !h-3" />
              </Link>
            ),
          },
        ]}
      />
      <Divider />
      {data.status !== Status.QQ ? (
        <>
          <SupplierContainerTab
            supplierId={data.recId}
            inventoriesType={data.typeList}
            canCreateInventory={data.status === Status.OK}
          />
          <DrawerSupplierForm
            initialValues={data}
            actionType="EDIT"
            isOpen={showDrawer}
            onCancel={() => setShowDrawer(false)}
            vendorInventoriesType={data.vendor?.typeList}
            disabledVendorField={true}
            // onActive={onActive}
            // onApproval={onApproval}
            // onDeactive={onDeactive}
            onSubmit={handleSubmitForm}
          />
        </>
      ) : (
        <></>
      )}

      {data.status === Status.QQ ? (
        <Empty
          imageStyle={{ width: 60, height: 60, margin: "auto" }}
          description={
            <>
              <p className="mb-3">Supplier đang chờ duyệt.</p>
              <Button className="w-[80px]" size="small" type="primary" onClick={() => onApproval(data.recId)}>
                Duyệt
              </Button>
            </>
          }
        />
      ) : null}
    </PageContainer>
  );
};
export default SupplierDetailPage;
