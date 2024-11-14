import { ColumnsType } from "antd/es/table";
import { Space, Tag } from "antd";
import { stringToDate } from "@/utils/date";
import { Status } from "@/models/common.interface";
import React from "react";
import { ISupplier } from "@/models/management/supplier.interface";

export const supplierColumn: ColumnsType<ISupplier> = [
  {
    title: "#ID",
    dataIndex: "recId",
    key: "recId",
    width: 80,
  },
  {
    title: "Supplier",
    dataIndex: "supplier",
    key: "supplier",
    width: 200,
    render(value, record, index) {
      return (
        <span>
          <span className="block text-xs text-primary-default">{record.shortName}</span>
          <span className="block">{record.fullName}</span>
        </span>
      );
    },
  },
  {
    title: "Dịch vụ cung ứng",
    dataIndex: "supplier",
    key: "supplier",
    width: 200,
    render(value, { typeList }, index) {
      return (
        <Space wrap={true}>
          {typeList.map((sv, _index) => (
            <Tag className="item" color="blue" key={sv} bordered={false}>
              {sv}
            </Tag>
          ))}
        </Space>
      );
    },
  },

  {
    title: "Ngày tạo",
    key: "sysFstUpdate",
    width: 160,
    render: (_, { sysFstUpdate }) => {
      return stringToDate(sysFstUpdate).format("DD/MM/YYYY HH:mm");
    },
  },
  {
    title: "Người tạo",
    dataIndex: "sysFstUser",
    key: "sysFstUser",
    width: 100,
  },
  {
    title: "Trạng thái",
    dataIndex: "status",
    key: "status",
    width: 150,
    render: (_, record) => {
      return (
        <Tag color={(record.status === Status.OK && "green") || (record.status === Status.QQ && "orange") || "red"}>
          {(record.status === Status.OK && "Đang kích hoạt") ||
            (record.status === Status.XX && "Đã xoá") ||
            (record.status === Status.QQ && "Chờ duyệt") ||
            (record.status === Status.OX && "Chưa kích hoạt") ||
            "none"}
        </Tag>
      );
    },
  },
];
