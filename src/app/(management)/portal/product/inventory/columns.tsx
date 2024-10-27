import { ColumnsType } from "antd/es/table";
import { Tag } from "antd";
import { formatDate } from "@/utils/date";
import { IInventoryListRs } from "@/models/management/core/inventory.interface";
import { Status } from "@/models/common.interface";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
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
    render(value, record, index) {
      return (
        <div>
          <span className="text-primary-default text-xs">{record.code}</span>
          <span className="block mb-2">{record.name}</span>
          <span className="block">{record.productType}</span>
        </div>
      );
    },
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
    render: (_, record) => {
      return (
        <>
          {record.isStock ? (
            <span className="text-green-600">
              <CheckCircleOutlined />
            </span>
          ) : (
            <span className="text-red-600">
              <CloseCircleOutlined />
            </span>
          )}
        </>
      );
    },
  },

  {
    title: "Ngày tạo",
    dataIndex: "sysFstUpdate",
    key: 8,
    width: 180,
    render: (_, record) => {
      return formatDate(record.sysFstUpdate);
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
