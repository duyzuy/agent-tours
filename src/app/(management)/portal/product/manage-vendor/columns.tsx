import { ColumnsType } from "antd/es/table";
import { Space, Tag } from "antd";
import { stringToDate } from "@/utils/date";
import { Status } from "@/models/common.interface";
import { VendorListRs } from "@/models/management/vendor.interface";
import React from "react";
import Link from "next/link";
import { RightOutlined } from "@ant-design/icons";

export const vendorColumns: ColumnsType<VendorListRs["result"][0]> = [
  {
    title: "#ID",
    dataIndex: "recId",
    key: "recId",
    width: 80,
  },
  {
    title: "Vendor",
    dataIndex: "fullName",
    key: "fullName",
    width: 200,
    render: (value, { shortName, fullName, recId }, index) => (
      <>
        <span className="block text-xs">{shortName}</span>
        <div className="mb-2">{fullName}</div>
        <Link href={`/portal/product/manage-vendor/${recId}`}>
          Chi tiết
          <RightOutlined className="ml-1 !text-[10px] relative -top-[1px]" />
        </Link>
      </>
    ),
  },
  {
    title: "Dịch vụ cung ứng",
    dataIndex: "typeList",
    key: "typeList",
    width: 250,
    render: (value, { typeList }, index) => (
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
          (status === Status.OX && "Ngừng kích hoạt") ||
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
