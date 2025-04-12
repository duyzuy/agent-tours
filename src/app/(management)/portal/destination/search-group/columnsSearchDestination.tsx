import { ColumnsType } from "antd/es/table";
import { Tag } from "antd";
import { LocalSearchDestinationListRs } from "@/models/management/localSearchDestination.interface";
import { Status } from "@/models/common.interface";
export const columnsSearchDestination: ColumnsType<LocalSearchDestinationListRs["result"][number]> = [
  {
    title: "#ID",
    key: "id",
    dataIndex: "id",
    width: 80,
  },
  {
    title: "Tên nhóm",
    key: "name",
    dataIndex: "name",
    width: 150,
  },
  {
    title: "Tên nhóm (EN)",
    key: "engName",
    dataIndex: "engName",
    width: 150,
  },
  {
    title: "Sắp xếp",
    key: "order",
    dataIndex: "order",
    width: 150,
    sorter: (a, b) => {
      return a.order - b.order;
    },
  },
  {
    title: "Trạng thái",
    key: "status",
    dataIndex: "status",
    width: 150,
    render: (_, record) => {
      return (
        <Tag color={record.status === Status.OK ? "green" : "orange"} bordered={false}>
          {record.status === Status.OK
            ? "Đang kích hoạt"
            : record.status === Status.OX
              ? "Chờ kích hoạt"
              : record.status === Status.XX
                ? "Đã xoá"
                : "Unknown"}
        </Tag>
      );
    },
  },
];
