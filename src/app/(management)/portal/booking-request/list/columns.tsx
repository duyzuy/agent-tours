import { ColumnsType } from "antd/es/table";
import { Leading } from "@/models/management/leading.interface";
import { Tag, Popover, Space, TagProps } from "antd";
import { formatDate } from "@/utils/date";
import { IOperation } from "@/models/management/core/operation/operation.interface";
import { InfoCircleOutlined } from "@ant-design/icons";
import { moneyFormatVND } from "@/utils/helper";
import { IBookingRequest } from "@/models/management/bookingRequest/bookingRequest.interface";

export const columns: ColumnsType<IBookingRequest> = [
  {
    title: "#ID",
    key: "requestId",
    dataIndex: "requestId",
    width: 80,
  },
  {
    title: "Tên khách",
    key: "custName",
    dataIndex: "custName",
    width: 150,
    render(value, record, index) {
      return record.custName;
    },
  },
  {
    title: "Dịch vụ tour yêu cầu",
    key: "requestName",
    dataIndex: "requestName",
    width: 200,
    render(value, { requestName }, index) {
      return requestName;
    },
  },

  {
    title: "Khởi hành",
    key: "startDate",
    dataIndex: "startDate",
    width: 180,
    render: (value, { startDate, endDate }, index) => {
      return (
        <div>
          <span className="flex items-center">
            <span className="w-6 inline-block text-red-500 text-xs">Đi</span>
            {formatDate(startDate)}
          </span>

          <span className="flex items-center">
            <span className="w-6 inline-block text-amber-500 text-xs">Về</span>
            {formatDate(endDate)}
          </span>
        </div>
      );
    },
  },
  {
    title: "Tổng tiền",
    key: "totalAmount",
    dataIndex: "totalAmount",
    width: 180,
    render: (value, { totalAmount }, index) => {
      return <span>{moneyFormatVND(totalAmount)}</span>;
    },
  },
  {
    title: "Trạng thái",
    key: "status",
    dataIndex: "status",
    width: 100,
    render: (value, { status }, index) => {
      let color: TagProps["color"];
      color =
        status === "CONFIRMED"
          ? "green"
          : status === "CANCELLED"
          ? "red"
          : status === "LOST"
          ? "magenta"
          : status === "NEW"
          ? "blue"
          : status === "WIN"
          ? "success"
          : "";

      let label: string;
      label =
        status === "CONFIRMED"
          ? "Đã xác nhận"
          : status === "CANCELLED"
          ? "Đã Huỷ"
          : status === "LOST"
          ? "Thua"
          : status === "WIN"
          ? "Thắng"
          : status === "NEW"
          ? "Mới"
          : "Unknown";
      return (
        <Tag color={color} bordered={false}>
          {label}
        </Tag>
      );
    },
  },
  {
    title: "Ngày tạo",
    key: "sysFstUpdate",
    dataIndex: "sysFstUpdate",
    width: 150,
    render(value, record, index) {
      return formatDate(record.sysFstUpdate);
    },
  },
  {
    title: "Người tạo",
    key: "sysFstUser",
    dataIndex: "sysFstUser",
    width: 180,
    render(value, { sysFstUser }, index) {
      return sysFstUser;
    },
  },
];
