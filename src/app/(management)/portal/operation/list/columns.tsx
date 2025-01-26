import { ColumnsType } from "antd/es/table";
import { Leading } from "@/models/management/leading.interface";
import { Tag, Popover, Space, TagProps } from "antd";
import { formatDate, stringToDate } from "@/utils/date";
import { IOperation } from "@/models/management/core/operation/operation.interface";
import { InfoCircleOutlined, QuestionCircleOutlined } from "@ant-design/icons";
import { moneyFormatVND } from "@/utils/helper";
import dayjs from "dayjs";
import classNames from "classnames";

export const columns: ColumnsType<IOperation> = [
  {
    title: "#ID",
    key: "id",
    dataIndex: "id",
    width: 80,
  },
  {
    title: "Sản phẩm",
    key: "sellableCode",
    dataIndex: "sellableCode",
    width: 350,
    render(value, { sellable, template }, index) {
      return (
        <div className="">
          <span className="block text-xs mb-1">{sellable.code}</span>
          <span className="block font-semibold">{template?.name}</span>
        </div>
      );
    },
  },

  {
    title: "Khởi hành",
    key: "sellableCode",
    dataIndex: "sellableCode",
    width: 200,
    render(value, { sellable }, index) {
      const colorType = dayjs().isAfter(stringToDate(sellable.startDate)) ? "red" : "emerald";
      return (
        <div className={classNames("mb-2", `text-${colorType}-500`)}>
          <span className="block">Đi: {formatDate(sellable.startDate, "DD/MM/YYYY")}</span>
          <span className="block">Về: {formatDate(sellable.endDate, "DD/MM/YYYY")}</span>
        </div>
      );
    },
  },
  {
    title: "Người phụ trách",
    key: "pic",
    dataIndex: "pic",
    width: 250,
    render: (value, { pic }, index) => {
      return pic ? (
        <Popover
          title="Thông tin"
          content={
            <div className="flex gap-y-1 flex-col">
              <span className="flex gap-x-2 text-xs">
                <span className="block w-20">Họ và tên</span>
                <span>{pic.fullname}</span>
              </span>
              <span className="flex gap-x-2 text-xs">
                <span className="block w-20">Email</span>
                <span>{pic.email}</span>
              </span>
              <span className="flex gap-x-2 text-xs">
                <span className="block w-20">Điện thoại</span>
                <span>{pic.phoneNumber}</span>
              </span>
            </div>
          }
        >
          <span className="flex items-center gap-x-2 cursor-pointer">
            <InfoCircleOutlined />
            {pic.username}
          </span>
        </Popover>
      ) : (
        <>
          <span className="opacity-60 flex items-center gap-x-2">
            <QuestionCircleOutlined /> Chưa có
          </span>
        </>
      );
    },
  },
  {
    title: "Tổng tiền",
    key: "totalCosting",
    dataIndex: "totalCosting",
    width: 200,
    render: (value, { totalCosting }, index) => {
      return <span>{moneyFormatVND(totalCosting)}</span>;
    },
  },
  {
    title: "Trạng thái",
    key: "status",
    dataIndex: "status",
    width: 150,
    render: (value, { status }, index) => {
      let color: TagProps["color"];
      color =
        status === "ACCEPTED"
          ? "cyan"
          : status === "CANCELED"
          ? "red"
          : status === "HANDOVERED"
          ? "magenta"
          : status === "DONE"
          ? "success"
          : status === "NEW"
          ? "blue"
          : status === "LOCKED"
          ? "default"
          : status === "PENDINGCANCELED"
          ? "gold"
          : "";

      let label: string;
      label =
        status === "ACCEPTED"
          ? "Chấp nhận"
          : status === "CANCELED"
          ? "Huỷ"
          : status === "HANDOVERED"
          ? "Bàn giao"
          : status === "DONE"
          ? "Hoàn thành"
          : status === "NEW"
          ? "Mới"
          : status === "LOCKED"
          ? "Khoá"
          : status === "PENDINGCANCELED"
          ? "Chờ huỷ"
          : "";
      return (
        <Tag color={color} bordered={false}>
          {label}
        </Tag>
      );
    },
  },
];
