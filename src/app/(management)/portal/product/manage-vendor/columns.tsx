import { ColumnsType } from "antd/es/table";
import { Space, Tag } from "antd";
import { formatDate, stringToDate } from "@/utils/date";
import { Status } from "@/models/common.interface";
import { VendorListRs } from "@/models/management/vendor.interface";
import React from "react";
import dayjs from "dayjs";

export const vendorColumns: ColumnsType<VendorListRs["result"][0]> = [
  {
    title: "#ID",
    dataIndex: "recId",
    key: "recId",
    width: 80,
  },
  {
    title: "Tên vendor",
    dataIndex: "fullName",
    key: "fullName",
    width: 200,
    render(value, record, index) {
      return (
        <span>
          <span className="block">{record.fullName}</span>
          <span className="block text-xs text-primary-default">{record.shortName}</span>
        </span>
      );
    },
  },
  {
    title: "Loại dịch vụ cung ứng",
    dataIndex: "typeList",
    key: "typeList",
    width: 200,
    render(value, record, index) {
      return (
        <Space wrap={true}>
          {record.typeList.split("||").map((sv, _index) => (
            <Tag className="item" color="blue" key={sv}>
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
    title: "User",
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
            (record.status === Status.OX && "Ngừng kích hoạt") ||
            "none"}
        </Tag>
      );
    },
  },
];
