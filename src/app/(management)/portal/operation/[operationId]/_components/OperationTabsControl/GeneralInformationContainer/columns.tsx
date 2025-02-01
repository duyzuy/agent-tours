import { ColumnsType } from "antd/es/table";
import { OperationStatusResponse } from "@/models/management/core/operation/operationStatus.interface";
import { moneyFormatVND } from "@/utils/helper";
import { Tag } from "antd";
import { PaymentStatus } from "@/models/common.interface";

export const columns: ColumnsType<OperationStatusResponse["result"]["orderList"][number]> = [
  { title: "#ID", dataIndex: "id" },
  { title: "Kênh bán", dataIndex: "channel" },
  { title: "Khách hàng", dataIndex: "custName" },
  { title: "Số điện thoại", dataIndex: "custPhoneNumber" },
  {
    title: "Tổng tiền",
    dataIndex: "totalAmount",
    render(value, { totalAmount }, index) {
      return moneyFormatVND(totalAmount);
    },
  },
  {
    title: "Đã thanh toán",
    dataIndex: "totalPaid",
    render(value, { totalPaid }, index) {
      return moneyFormatVND(totalPaid);
    },
  },
  {
    title: "Trạng thái",
    dataIndex: "paymentStatus",
    render(value, record, index) {
      return (
        <>
          {record.paymentStatus === PaymentStatus.PAID ? (
            <Tag color="green" bordered={false}>
              Đã thanh toán
            </Tag>
          ) : record.paymentStatus === PaymentStatus.DEPOSITED ? (
            <Tag color="blue" bordered={false}>
              Thanh toán 1 phần
            </Tag>
          ) : record.paymentStatus === PaymentStatus.NOTPAID ? (
            <Tag color="red" bordered={false}>
              Chưa thanh toán
            </Tag>
          ) : (
            "Không xác định"
          )}
        </>
      );
    },
  },
];
