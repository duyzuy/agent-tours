"use client";
import React, { useCallback, useEffect, useState } from "react";
import PageContainer from "@/components/admin/PageContainer";
import { useRouter } from "next/navigation";
import { useGetVendorDetailCoreQuery } from "@/queries/core/vendor";
import { Badge, Button, Col, Divider, Popconfirm, Row, Space, Spin, Switch, SwitchProps, Tabs, Tag } from "antd";
import { ContentDetailList } from "@/components/admin/ContentDetailList";
import { Status } from "@/models/common.interface";
import { formatDate } from "@/utils/date";
import VendorContainerTab from "./_components/VendorContainerTab";
import DrawerVendorForm, { DrawerVendorFormProps } from "../_components/DrawerVendorForm";
import useManageVendor from "../modules/useManageVendor";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
type VendorDetailPageProps = {
  params: { vendorId: string };
};
const VendorDetailPage: React.FC<VendorDetailPageProps> = ({ params: { vendorId } }) => {
  const [showDrawer, setShowDrawer] = useState(false);
  const [loadingToggle, setLoadingToggle] = useState(false);
  const { data, isLoading } = useGetVendorDetailCoreQuery({ recId: Number(vendorId) });

  const { onUpdate, onDeactive, onActive, onApproval, onDelete } = useManageVendor();

  const router = useRouter();

  const setEditVendor = () => {
    setShowDrawer(true);
  };
  const handleUpdate: DrawerVendorFormProps["onSubmit"] = (action, formData, cb) => {
    if (action === "EDIT") {
      onUpdate(formData, () => {
        cb?.();
        setShowDrawer(false);
      });
    }
  };
  const handleDelete = (recId: number) => {
    onDelete(recId, () => {
      router.push("/portal/product/manage-vendor");
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
      router.push("/portal/product/manage-vendor");
    }
  }, [data, isLoading]);

  if (isLoading) return <Spin />;

  if (!data) {
    return null;
  }

  return (
    <PageContainer
      name={`Vendor - ${data.fullName}`}
      onBack={() => router.push("/portal/product/manage-vendor")}
      breadCrumItems={[{ title: "Quản lý Vendor", href: "/portal/product/manage-vendor" }, { title: data.fullName }]}
      hideAddButton
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
                onClick={setEditVendor}
              >
                Sửa
              </Button>
            </>
          )}

          <Popconfirm
            placement="topLeft"
            title="Xoá"
            description={`Bạn muốn xoá vendor ${data.fullName}`}
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
              <Tag color={(data.status === Status.OK && "green") || (data.status === Status.QQ && "orange") || "red"}>
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
              <Tag key={type} bordered={false} color="blue">
                {type}
              </Tag>
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
      <VendorContainerTab vendorId={data.recId} inventoriesType={data.typeList} />
      <DrawerVendorForm
        isOpen={showDrawer}
        onCancel={() => setShowDrawer(false)}
        initialValues={data}
        actionType="EDIT"
        // onActive={onActive}
        // onDeactive={onDeactive}
        onSubmit={handleUpdate}
      />
    </PageContainer>
  );
};
export default VendorDetailPage;
