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
    width: 180,
    render: (_, { description, code, type }) => {
      return (
        <>
          <p className="text-primary-default">{code}</p>
          <p className="text-xs text-gray-500">{type}</p>
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
            <span className="">{available}</span>
          </div>
          <div>
            <span className="inline-block w-20">Đang còn</span>
            <span className=" text-emerald-600">{open}</span>
          </div>
          <div>
            <span className="inline-block w-20">Đã bán</span>
            <span className="text-red-600 ">{used}</span>
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
    title: "Ngày sử dụng",
    dataIndex: "use-date",
    key: "use-date",
    width: 180,
    render: (_, record) => {
      return (
        <>
          <div className="flex items-center">
            <span className="w-8 inline-block text-red-500 text-xs">Từ</span>
            {formatDate(record.startDate)}
          </div>
          <div className="flex items-center">
            <span className="w-8 inline-block text-amber-500 text-xs">Đến</span>
            {formatDate(record.endDate)}
          </div>
        </>
      );
    },
  },

  {
    title: "Mô tả",
    dataIndex: "description",
    key: "description",
    width: 240,
    render: (_, { description }) => {
      return <p>{description || "--"}</p>;
    },
  },
  {
    title: "Trạng thái",
    dataIndex: "status",
    key: "status",
    width: 120,
    render: (_, record) => {
      return (
        <Tag
          color={(record.status === Status.OK && "green") || (record.status === Status.QQ && "orange") || "red"}
          bordered={false}
        >
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
  // {
  //   title: "Ngày cập nhật",
  //   dataIndex: "sysFstUpdate",
  //   key: "sysFstUpdate",
  //   width: 150,
  //   render: (_, { sysLstUpdate }) => {
  //     return formatDate(sysLstUpdate);
  //   },
  // },
  {
    title: "Người tạo",
    dataIndex: "sysFstUser",
    key: "user",
    width: 150,
  },
  // {
  //   title: "Người cập nhật",
  //   dataIndex: "sysLstUser",
  //   key: "sysLstUser",
  //   width: 150,
  //   render: (_, { sysLstUser }) => {
  //     return sysLstUser || "--";
  //   },
  // },
];
