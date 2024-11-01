import { ColumnsType } from "antd/es/table";
import { Leading } from "@/models/management/leading.interface";
import { Tag, Popover, Space } from "antd";
import { formatDate } from "@/utils/date";

import { IOperationDeadline } from "@/models/management/core/operationDeadline.interface";

export const columns: ColumnsType<IOperationDeadline> = [
  {
    title: "#ID",
    key: "id",
    dataIndex: "id",
    width: 100,
  },
  {
    title: "Loại dịch vụ",
    key: "type",
    dataIndex: "type",
    width: 200,
  },
  {
    title: "Ghi chú",
    key: "remark",
    dataIndex: "remark",
    width: 200,
  },
  {
    title: "Ngày thanh toán 1",
    key: "preDeadline",
    dataIndex: "preDeadline",
    width: 180,
    render(value, { preDeadline, deadline }, index) {
      return (
        <div>
          <span className="block">{preDeadline ? formatDate(preDeadline) : "--"}</span>
        </div>
      );
    },
  },
  {
    title: "Ngày thanh toán 2",
    key: "sellableCode",
    dataIndex: "sellableCode",
    width: 180,
    render(value, { preDeadline, deadline }, index) {
      return (
        <div>
          <span className="block">{deadline ? formatDate(deadline) : "--"}</span>
        </div>
      );
    },
  },
  {
    title: "Trạng thái",
    key: "status",
    dataIndex: "status",
    width: 100,
    render: (value, { status }, index) => {
      return <Tag color={status === "DONE" ? "blue" : "green"}>{status}</Tag>;
    },
  },
];
