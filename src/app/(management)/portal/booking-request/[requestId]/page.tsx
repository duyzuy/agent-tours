"use client";
import PageContainer from "@/components/admin/PageContainer";
import { IBookingRequestDetail } from "@/models/management/bookingRequest/bookingRequest.interface";
import React, { useEffect, useState } from "react";
import { useGetBookingRequestDetailCoreQuery } from "@/queries/core/bookingRequest";
import useCRUDBookingRequest from "../module/useCRUDBookingRequest";
import { useRouter } from "next/navigation";
import { Button, Divider, Popconfirm, Space, Spin, Tag, TagProps } from "antd";
import { ContentDetailList } from "@/components/admin/ContentDetailList";
import { moneyFormatVND } from "@/utils/helper";
import { formatDate } from "@/utils/date";
import DrawerBookingRequestForm, { DrawerBookingRequestFormProps } from "../list/_components/DrawerBookingRequestForm";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Status } from "@/models/common.interface";

const BookingRequestPageDetail = ({ params: { requestId } }: { params: { requestId: string } }) => {
  const { data, isLoading } = useGetBookingRequestDetailCoreQuery(Number(requestId));
  const [openDrawer, setOpenDrawer] = useState(false);
  const { onUpdate, onUpdateStatus } = useCRUDBookingRequest();

  const router = useRouter();

  const renderActionsUpdateStatus = (status: IBookingRequestDetail["status"], requestId: number) => {
    //   NEW => CONFIRMED CANCELLED
    // CONFIRMED  => WIN LOST CANCELLED

    if (status !== "CONFIRMED" && status !== "NEW") return;

    let actionList = [
      {
        label: "Xác nhận",
        key: "CONFIRMED",
        className: "!text-blue-600 !bg-blue-100",
        action: () => onUpdateStatus({ requestId: requestId, status: "CONFIRMED" }),
      },
      {
        label: "Win",
        key: "WIN",
        className: "!text-emerald-600 !bg-emerald-100",
        action: () => onUpdateStatus({ requestId: requestId, status: "WIN" }),
      },
      {
        label: "Lost",
        key: "LOST",
        className: "!text-orange-500 !bg-orange-100",
        action: () => onUpdateStatus({ requestId: requestId, status: "LOST" }),
      },
      {
        label: "Huỷ bỏ",
        key: "CANCELLED",
        className: "!text-red-600 !bg-red-100",
        action: () => onUpdateStatus({ requestId: requestId, status: "CANCELLED" }),
      },
    ];

    if (status === "NEW") {
      actionList = actionList.filter((act) => act.key === "CONFIRMED" || act.key === "CANCELLED");
    }
    if (status === "CONFIRMED") {
      actionList = actionList.filter((act) => act.key === "WIN" || act.key === "LOST" || act.key === "CANCELLED");
    }

    return actionList;
  };
  const handleUpdate: DrawerBookingRequestFormProps["onSubmit"] = (action, formData) => {
    if (action === "EDIT" && formData.requestId) {
      onUpdate(formData, {
        onSuccess(data, variables, context) {
          setOpenDrawer(false);
        },
      });
    }
  };
  const renderStatus = (status: IBookingRequestDetail["status"]) => {
    let color: TagProps["color"];
    color =
      status === "CONFIRMED"
        ? "gold"
        : status === "CANCELLED"
        ? "red"
        : status === "LOST"
        ? "magenta"
        : status === "NEW"
        ? "blue"
        : status === "WIN"
        ? "success"
        : "";

    let label: string;
    label =
      status === "CONFIRMED"
        ? "Đã xác nhận"
        : status === "CANCELLED"
        ? "Đã Huỷ"
        : status === "LOST"
        ? "Thua"
        : status === "WIN"
        ? "Thắng"
        : status === "NEW"
        ? "Mới"
        : "Unknown";
    return (
      <Tag color={color} bordered={false}>
        {label}
      </Tag>
    );
  };
  useEffect(() => {
    if (!isLoading && !data) {
      router.push("/portal/booking-request/list");
    }
  }, []);
  if (isLoading) return <Spin />;

  if (!data) {
    return null;
  }
  return (
    <PageContainer
      name={`#${data.requestId} - ${data.requestName}`}
      modelName="yêu cầu dịch vụ"
      breadCrumItems={[{ title: "Danh sách yêu cầu dịch vụ" }, { title: data.requestName }]}
      onBack={router.back}
      hideAddButton
    >
      <Space>
        {data.status === "CONFIRMED" && (
          <>
            <Button
              type="text"
              size="small"
              icon={<EditOutlined />}
              className="!bg-blue-100 !text-blue-600"
              onClick={() => setOpenDrawer(true)}
            >
              Sửa
            </Button>
            <span className="text-gray-500">|</span>
          </>
        )}
        {renderActionsUpdateStatus(data.status, data.requestId)?.map(({ label, className, action }, _index) => (
          <Button key={_index} onClick={action} className={`${className} w-[80px]`} type="text" size="small">
            {label}
          </Button>
        ))}
      </Space>
      <Divider />
      <ContentDetailList
        items={[
          { label: "#ID", value: data.requestId },
          { label: "Dịch vụ yêu cầu", value: data.requestName },
          { label: "Ngày đi", value: formatDate(data.startDate) },
          { label: "Ngày về", value: formatDate(data.endDate) },
          { label: "Ngày tạo", value: formatDate(data.sysFstUpdate) },
          { label: "Người tạo", value: data.sysFstUser },
          { label: "Trạng thái", value: renderStatus(data.status) },
        ]}
      />
      <Divider />
      <ContentDetailList
        items={[
          { label: "Giá dịch vụ", value: moneyFormatVND(data.extraPrice) },
          { label: "Giá tour", value: moneyFormatVND(data.tourPrice) },
          { label: "Tổng tiền", value: moneyFormatVND(data.totalAmount) },
        ]}
      />
      <Divider />
      <h3 className="text-lg font-[500] mb-4">Thông tin người đặt</h3>
      <ContentDetailList
        items={[
          { label: "Họ và tên", value: data.custName || "--" },
          { label: "Email", value: data.custEmail || "--" },
          { label: "Số điện thoại", value: data.custPhoneNumber || "--" },
          { label: "Địa chỉ", value: data.custAddress || "--" },
          { label: "Khác", value: data.custInfoJson || "--" },
        ]}
      />
      <Divider />
      <h3 className="text-lg font-[500] mb-4">Thông xuất hoá đơn</h3>
      <ContentDetailList
        items={[
          { label: "Tên công ty", value: data.invoiceCompanyName || "--" },
          { label: "Tên hoá đơn", value: data.invoiceName || "--" },
          { label: "mã số thuế", value: data.invoiceTaxCode || "--" },
          { label: "Email", value: data.invoiceEmail || "--" },
          { label: "Địa chỉ", value: data.invoiceAddress || "--" },
        ]}
      />
      <DrawerBookingRequestForm
        actionType="EDIT"
        initialValues={data}
        isOpen={openDrawer}
        onCancel={() => setOpenDrawer(false)}
        onSubmit={handleUpdate}
      />
    </PageContainer>
  );
};
export default BookingRequestPageDetail;
