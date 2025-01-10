import { ColumnsType } from "antd/es/table";
import { Tag } from "antd";
import { formatDate } from "@/utils/date";
import { IInventoryListRs } from "@/models/management/core/inventory.interface";
import { Status } from "@/models/common.interface";
import { CheckCircleOutlined, CloseCircleOutlined, RightOutlined } from "@ant-design/icons";
import Link from "next/link";
export const inventoryColumns: ColumnsType<IInventoryListRs["result"][0]> = [
  {
    title: "#ID",
    dataIndex: "recId",
    key: 1,
    width: 80,
  },
  {
    title: "Tên dịch vụ",
    dataIndex: "name",
    key: 2,
    width: 250,
    render: (value, record, index) => (
      <>
        <div className="text-xs">{record.code}</div>
        <div className="mb-2">{record.name}</div>
        <Link href={`/portal/product/inventory/${record.recId}`}>
          Chi tiết
          <RightOutlined className="ml-1 !text-xs" />
        </Link>
      </>
    ),
  },
  {
    title: "Loại",
    dataIndex: "productType",
    key: 2,
    width: 140,
    render: (value, { productType }, index) => <span>{productType}</span>,
  },
  {
    title: "Loại dịch vụ",
    dataIndex: "type",
    key: 5,
    width: 150,
  },
  {
    title: "QL Kho",
    dataIndex: "isStock",
    key: 7,
    width: 80,
    render: (_, record) => (
      <>
        {record.isStock ? (
          <CheckCircleOutlined className="!text-green-600" />
        ) : (
          <CloseCircleOutlined className="!text-red-600" />
        )}
      </>
    ),
  },
  {
    title: "Ngày tạo",
    dataIndex: "sysFstUpdate",
    key: 8,
    width: 180,
    render: (_, { sysFstUpdate }) => {
      return formatDate(sysFstUpdate);
    },
  },
  {
    title: "Người tạo",
    dataIndex: "sysFstUser",
    key: 9,
    width: 100,
  },
  {
    title: "Trạng thái",
    dataIndex: "status",
    key: 6,
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
];
