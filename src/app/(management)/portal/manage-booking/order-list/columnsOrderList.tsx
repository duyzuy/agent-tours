import React from "react";
import { ColumnsType } from "antd/es/table";
import { moneyFormatVND } from "@/utils/helper";
import { Tag } from "antd";
import { IOrderListRs } from "@/models/management/booking/order.interface";
import { PaymentStatus } from "@/models/common.interface";
import { formatDate } from "@/utils/date";
import Link from "next/link";

export const columnsOrderList: ColumnsType<IOrderListRs["result"][0]> = [
  {
    title: "#ID",
    dataIndex: "recId",
    key: "recId",
    width: 80,
  },
  {
    title: "Tên sản phẩm",
    dataIndex: "templateName",
    key: "templateName",
    width: 260,
    render(value, record, index) {
      return (
        <div>
          <Link href={`/portal/manage-booking/${record.recId}`} className="block">
            <div className="block text-gray-800 hover:text-blue-600">{record.template.name}</div>
            <div className="text-xs text-gray-600">{record.sellable.code}</div>
          </Link>
        </div>
      );
    },
  },
  {
    title: "Loại dịch vụ",
    dataIndex: "template",
    key: "template",
    width: 120,
    render(value, record, index) {
      return (
        <div>
          <span className="block">{record.template.type}</span>
        </div>
      );
    },
  },
  {
    title: "Kênh bán",
    dataIndex: "channel",
    key: "channel",
    width: 120,
    render(value, record, index) {
      return (
        <div>
          <span className="block">{record.channel}</span>
        </div>
      );
    },
  },
  {
    title: "Khách hàng",
    dataIndex: "custName",
    key: "custName",
    width: 150,
  },
  {
    title: "Tổng tiền",
    dataIndex: "totalAmount",
    key: "totalAmount",
    width: 200,
    render: (_, record) => {
      return <span className="text-rose-600">{moneyFormatVND(record.totalAmount)}</span>;
    },
  },
  {
    title: "Trạng thái thanh toán",
    dataIndex: "paymentStatus",
    key: "paymentStatus",
    width: 200,
    render(value, { paymentStatus }, index) {
      return (
        <Tag
          bordered={false}
          color={
            paymentStatus === PaymentStatus.PAID ? "green" : paymentStatus === PaymentStatus.DEPOSITED ? "blue" : "red"
          }
        >
          {paymentStatus === PaymentStatus.PAID
            ? "Đã thanh toán"
            : paymentStatus === PaymentStatus.DEPOSITED
            ? "Thanh toán 1 phần"
            : " Chưa thanh toán"}
        </Tag>
      );
    },
  },
  {
    title: "Ngày đặt",
    dataIndex: "sysFstUpdate",
    key: "sysFstUpdate",
    width: 160,
    render: (sysFstUpdate, record) => {
      return <>{formatDate(sysFstUpdate)}</>;
    },
  },
];
