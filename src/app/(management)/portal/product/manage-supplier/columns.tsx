import { ColumnsType } from "antd/es/table";
import { Space, Tag } from "antd";
import { stringToDate } from "@/utils/date";
import { Status } from "@/models/common.interface";
import React from "react";
import { ISupplier } from "@/models/management/supplier.interface";
import Link from "next/link";
import { RightOutlined } from "@ant-design/icons";

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
    render(value, { fullName, shortName, recId }, index) {
      return (
        <span>
          <span className="block text-xs">{shortName}</span>
          <span className="block mb-2">{fullName}</span>
          <Link href={`/portal/product/manage-supplier/${recId}`}>
            Chi tiết
            <RightOutlined className="ml-1 !text-[10px] relative -top-[1px]" />
          </Link>
        </span>
      );
    },
  },
  {
    title: "Dịch vụ cung ứng",
    dataIndex: "typeList",
    key: "typeList",
    width: 200,
    render: (_, { typeList }) => (
      <Space wrap={true}>
        {typeList.map((sv, _index) => (
          <Tag className="item" key={sv}>
            {sv}
          </Tag>
        ))}
      </Space>
    ),
  },
  {
    title: "Trạng thái",
    dataIndex: "status",
    key: "status",
    width: 150,
    render: (_, { status }) => (
      <Tag color={(status === Status.OK && "green") || (status === Status.QQ && "orange") || "red"} bordered={false}>
        {(status === Status.OK && "Đang kích hoạt") ||
          (status === Status.XX && "Đã xoá") ||
          (status === Status.QQ && "Chờ duyệt") ||
          (status === Status.OX && "Chưa kích hoạt") ||
          "none"}
      </Tag>
    ),
  },
  {
    title: "Ngày tạo",
    key: "sysFstUpdate",
    width: 160,
    render: (_, { sysFstUpdate }) => {
      return stringToDate(sysFstUpdate)?.format("DD/MM/YYYY HH:mm");
    },
  },
  {
    title: "Người tạo",
    dataIndex: "sysFstUser",
    key: "sysFstUser",
    width: 100,
  },
];
