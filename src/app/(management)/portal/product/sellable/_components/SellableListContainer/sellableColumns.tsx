import { ColumnsType } from "antd/es/table";
import { Space, Tag } from "antd";
import { formatDate } from "@/utils/date";
import { Status } from "@/models/common.interface";
import { SellableListRs } from "@/models/management/core/sellable.interface";
import Link from "next/link";
import { RightOutlined } from "@ant-design/icons";

export const sellableColumns: ColumnsType<SellableListRs["result"][number]> = [
  {
    title: "#ID",
    dataIndex: "recId",
    key: "recId",
    width: 80,
  },
  {
    title: "Mã",
    dataIndex: "code",
    key: "code",
    width: 250,
    render: (_, { code, recId }) => (
      <div>
        <span className="block mb-1 font-semibold">{code}</span>
        <Link href={`/portal/product/sellable/${recId}`}>
          Chi tiết
          <RightOutlined className="ml-1 relative -top-[1px] !text-[10px]" />
        </Link>
      </div>
    ),
  },
  {
    title: "Ngày bán",
    dataIndex: "valid-date",
    key: "valid-date",
    width: 180,
    render: (_, { validFrom, validTo }) => (
      <>
        <div className="flex items-center">
          <span className="w-8 inline-block text-blue-600 text-xs">Từ</span>
          {formatDate(validFrom)}
        </div>
        <div className="flex items-center">
          <span className="w-8 inline-block text-cyan-600 text-xs">Đến</span>
          {formatDate(validTo)}
        </div>
      </>
    ),
  },
  {
    title: "Ngày khởi hành",
    dataIndex: "use-date",
    key: "use-date",
    width: 180,
    render: (_, { startDate, endDate }) => (
      <>
        <div className="flex items-center">
          <span className="w-6 inline-block text-blue-600 text-xs">Đi</span>
          {formatDate(startDate)}
        </div>
        <div className="flex items-center">
          <span className="w-6 inline-block text-cyan-600 text-xs">Về</span>
          {formatDate(endDate)}
        </div>
      </>
    ),
  },
  {
    title: "Số lượng",
    dataIndex: "available",
    key: "available",
    width: 160,
    render: (value, { available, open, used }) => (
      <div className="flex flex-col">
        <div className="flex gap-2">
          <span className="block w-16 text-xs">Khả dụng</span>
          <span className="text-gray-900">{available}</span>
        </div>
        <div className="flex gap-2">
          <span className="block w-16 text-xs">Đang còn</span>
          <span className="text-emerald-600">{open}</span>
        </div>
        <div className="flex gap-2">
          <span className="block w-16 text-xs">Đã dùng</span>
          <span className="text-red-600">{used}</span>
        </div>
      </div>
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
          "Chờ kích hoạt"}
      </Tag>
    ),
  },
  {
    title: "Ngày tạo",
    dataIndex: "sysFstUpdate",
    key: "sysFstUpdate",
    width: 150,
    render: (_, { sysFstUpdate }) => formatDate(sysFstUpdate),
  },
  {
    title: "Người tạo",
    dataIndex: "sysFstUser",
    key: "sysFstUser",
    width: 150,
  },
];
