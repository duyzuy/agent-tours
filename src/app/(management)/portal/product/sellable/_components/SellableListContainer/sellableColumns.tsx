import { ColumnsType } from "antd/es/table";
import { Tag } from "antd";
import { formatDate } from "@/utils/date";
import { Status } from "@/models/common.interface";
import { SellableListRs } from "@/models/management/core/sellable.interface";

export const sellableColumns: ColumnsType<SellableListRs["result"][0]> = [
  {
    title: "#ID",
    dataIndex: "recId",
    key: "recId",
    width: 80,
  },
  {
    title: "Sản phẩm",
    dataIndex: "code",
    key: "code",
    width: 250,
    render: (_, record) => {
      return (
        <div>
          <span className="block mb-1">{record.code}</span>
          <span className="text-xs">{record.type}</span>
        </div>
      );
    },
  },
  {
    title: "Khả dụng",
    dataIndex: "available",
    key: "available",
    width: 100,
    render(value, { available }, index) {
      return <span className="text-gray-900">{available}</span>;
    },
  },
  {
    title: "Đang còn",
    dataIndex: "open",
    key: "open",
    width: 100,
    render(value, { open }, index) {
      return <span className="text-emerald-600">{open}</span>;
    },
  },
  {
    title: "Đã dùng",
    dataIndex: "used",
    key: "used",
    width: 100,
    render(value, { used }, index) {
      return <span className="text-red-600">{used}</span>;
    },
  },
  {
    title: "Ngày bán",
    dataIndex: "valid-date",
    key: "valid-date",
    width: 180,
    render: (_, record) => {
      return (
        <>
          <div className="flex items-center">
            <span className="w-8 inline-block text-red-500 text-xs">Từ</span>
            {formatDate(record.validFrom)}
          </div>
          <div className="flex items-center">
            <span className="w-8 inline-block text-amber-500 text-xs">Đến</span>
            {formatDate(record.validTo)}
          </div>
        </>
      );
    },
  },
  {
    title: "Ngày khởi hành",
    dataIndex: "use-date",
    key: "use-date",
    width: 180,
    render: (_, record) => {
      return (
        <>
          <div className="flex items-center">
            <span className="w-6 inline-block text-red-500 text-xs">Đi</span>
            {formatDate(record.validFrom)}
          </div>
          <div className="flex items-center">
            <span className="w-6 inline-block text-amber-500 text-xs">Về</span>
            {formatDate(record.validTo)}
          </div>
        </>
      );
    },
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
            "Chờ kích hoạt"}
        </Tag>
      );
    },
  },
  {
    title: "Ngày tạo",
    dataIndex: "sysFstUpdate",
    key: "sysFstUpdate",
    width: 150,
    render: (_, record) => {
      return formatDate(record.sysFstUpdate);
    },
  },
  {
    title: "Người tạo",
    dataIndex: "sysFstUser",
    key: 2,
    width: 150,
  },
];
