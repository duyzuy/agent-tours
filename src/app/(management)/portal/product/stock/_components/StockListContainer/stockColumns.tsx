import { ColumnsType } from "antd/es/table";
import { Tag } from "antd";
import { formatDate } from "@/utils/date";
import { Status } from "@/models/common.interface";
import { IStockListOfInventoryRs } from "@/models/management/core/stock.interface";

export const stockColumns: ColumnsType<IStockListOfInventoryRs["result"][0]> = [
  {
    title: "#ID",
    dataIndex: "recId",
    key: "recId",
    width: 80,
  },
  {
    title: "Mã kho",
    dataIndex: "code",
    key: "code",
    width: 240,
    render: (_, { description, code, type }) => {
      return (
        <>
          <div className="mb-2">
            <p className="text-primary-default">{code}</p>
            <p className="text-xs text-gray-500">{type}</p>
          </div>
          <p className="text-xs text-gray-500">Mô tả:</p>
          <p>{description || "--"}</p>
        </>
      );
    },
  },
  {
    title: "Số lượng",
    dataIndex: "quantity",
    key: "quantity",
    width: 150,
    render: (value, { available, open, used }, index) => {
      return (
        <div className="flex flex-col">
          <div>
            <span className="inline-block w-20">Khả dụng</span>
            <span className="text-red-600 text-[16px]">{available}</span>
          </div>
          <div>
            <span className="inline-block w-20">Đã bán</span>
            <span className="text-emerald-600 text-[16px]">{used}</span>
          </div>
          <div>
            <span className="inline-block w-20">Đang còn</span>
            <span className="text-[16px]">{open}</span>
          </div>
        </div>
      );
    },
  },
  {
    title: "Ngày mở bán",
    dataIndex: "valid-date",
    key: "valid-date",
    width: 180,
    render: (_, record) => {
      return (
        <span>
          <span className="block">{formatDate(record.validFrom)}</span>
          <span className="block">{formatDate(record.validTo)}</span>
        </span>
      );
    },
  },
  {
    title: "Ngày sử dụng",
    dataIndex: "use-date",
    key: "use-date",
    width: 180,
    render: (_, record) => {
      return (
        <span>
          <span className="block">{formatDate(record.startDate)}</span>
          <span className="block">{formatDate(record.endDate)}</span>
        </span>
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
    title: "Ngày cập nhật",
    dataIndex: "sysFstUpdate",
    key: "sysFstUpdate",
    width: 150,
    render: (_, { sysLstUpdate }) => {
      return formatDate(sysLstUpdate);
    },
  },
  {
    title: "Người tạo",
    dataIndex: "sysFstUser",
    key: "user",
    width: 150,
  },
  {
    title: "Người cập nhật",
    dataIndex: "sysLstUser",
    key: "sysLstUser",
    width: 150,
    render: (_, { sysLstUser }) => {
      return sysLstUser || "--";
    },
  },
  {
    title: "Trạng thái",
    dataIndex: "status",
    key: "status",
    width: 120,
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
];
