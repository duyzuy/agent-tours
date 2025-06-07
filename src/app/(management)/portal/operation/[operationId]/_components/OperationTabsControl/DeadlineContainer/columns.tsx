import { ColumnsType } from "antd/es/table";
import { Leading } from "@/models/management/leading.interface";
import { Tag, Popover, Space } from "antd";
import { formatDate } from "@/utils/date";

import { IOperationDeadline } from "@/models/management/core/operation/operationDeadline.interface";

export const columns: ColumnsType<IOperationDeadline> = [
  {
    title: "#ID",
    key: "id",
    dataIndex: "id",
    width: 100,
  },
  {
    title: "Ghi chú",
    key: "type",
    dataIndex: "type",
    width: 400,
    render: (value, { type, remark }, index) => {
      return (
        <>
          <span className="font-semibold">{type}</span>
          <div>{remark}</div>
        </>
      );
    },
  },

  {
    title: "Hạn hoàn thành 1",
    key: "preDeadline",
    dataIndex: "preDeadline",
    width: 180,
    render(value, { preDeadline, deadline }, index) {
      return <div>{preDeadline ? formatDate(preDeadline) : "--"}</div>;
    },
  },
  {
    title: "Hạn hoàn thành 2",
    key: "sellableCode",
    dataIndex: "sellableCode",
    width: 180,
    render(value, { preDeadline, deadline }, index) {
      return <div>{deadline ? formatDate(deadline) : "--"}</div>;
    },
  },
  {
    title: "Trạng thái",
    key: "status",
    dataIndex: "status",
    width: 150,
    render: (value, { status }, index) => {
      return (
        <Tag
          color={
            status === "NEW"
              ? "blue"
              : status === "DONE"
                ? "green"
                : status === "EXPIRED"
                  ? "red"
                  : status === "PRE_DEADLINE"
                    ? "orange"
                    : "default"
          }
          bordered={false}
        >
          {status === "NEW"
            ? "Mới"
            : status === "DONE"
              ? "Hoàn thành"
              : status === "PRE_DEADLINE"
                ? "Quá hạn đợt 1"
                : "Không xác định"}
        </Tag>
      );
    },
  },
];
