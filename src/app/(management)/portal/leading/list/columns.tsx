import { ColumnsType } from "antd/es/table";
import { Leading } from "@/models/management/leading.interface";
import { Tag } from "antd";
import { formatDate } from "@/utils/date";
export const columns: ColumnsType<Leading> = [
  {
    title: "Họ và tên",
    key: "paxName",
    dataIndex: "paxName",
    width: 200,
  },
  {
    title: "Nguồn",
    key: "source",
    dataIndex: "source",
    width: 100,
  },
  {
    title: "Remark",
    key: "remark",
    dataIndex: "remark",
    width: 250,
  },
  {
    title: "Trạng thái",
    key: "status",
    dataIndex: "status",
    render: (_, { status }) => {
      const color =
        status === "BLACKLIST"
          ? "black"
          : status === "LOSS"
            ? "red"
            : status === "NEW"
              ? "blue"
              : status === "CALLBACKLATER"
                ? "orange"
                : status === "NORESPONSE"
                  ? "pink"
                  : status === "WIN"
                    ? "green"
                    : undefined;
      return <Tag color={color}>{status}</Tag>;
    },
    width: 150,
  },
  {
    title: "Ngày tạo",
    key: "fstUpdate",
    dataIndex: "fstUpdate",
    width: 150,
    render(value, { fstUpdate }, index) {
      return formatDate(fstUpdate);
    },
  },
];
