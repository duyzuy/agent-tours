"use client";
import { Status } from "@/models/common.interface";
import { FeOrderDetailResponse } from "@/models/fe/order.interface";
import { moneyFormatVND } from "@/utils/helper";
import { Table, Tag } from "antd";
import { ColumnsType } from "antd/es/table";

type FormOfPaymentType = FeOrderDetailResponse["result"]["fops"][number];
interface FormOfPaymentListProps {
  title?: string;
  items: FeOrderDetailResponse["result"]["fops"];
}
const FormOfPaymentList = ({ title, items }: FormOfPaymentListProps) => {
  const columns: ColumnsType<FormOfPaymentType> = [
    {
      title: "#ID",
      dataIndex: "recId",
    },
    {
      title: "Hình thức thanh toán",
      dataIndex: "fopType",
      render: (_, { fopType, fopDocument }) => {
        return (
          <>
            <div className="text-xs">{fopType}</div>
            <div>{fopDocument}</div>
          </>
        );
      },
    },

    {
      title: "Thông tin thanh toán",
      render(value, record, index) {
        return (
          <>
            <div>{record.infoNumber}</div>
            <div>{record.infoTId}</div>
            <div>{record.infoTrace}</div>
            <div>{record.infoNumber}</div>
            <div>
              <div className="text-xs">Ghi chú</div>
              <div>{record.infoNote || "--"}</div>
            </div>
          </>
        );
      },
    },
    {
      title: "Loại",
      dataIndex: "amount",
      render: (_, record) => {
        return <>{record.type}</>;
      },
    },
    {
      title: "Số tiền",
      dataIndex: "amount",
      render: (_, { amount }) => {
        return <>{moneyFormatVND(amount)}</>;
      },
    },
    {
      title: "Tình trạng",
      dataIndex: "amount",
      render: (_, { status }) => {
        return (
          <Tag
            color={
              status === Status.OK
                ? "green"
                : status === Status.QQ
                  ? "orange"
                  : status === Status.XX
                    ? "red"
                    : "default"
            }
            bordered={false}
          >
            {status === Status.OK
              ? "Đã duyệt"
              : status === Status.QQ
                ? "Chờ duyệt"
                : status === Status.XX
                  ? "Đã huỷ"
                  : "Unknown"}
          </Tag>
        );
      },
    },
  ];
  return (
    <div className="form-of-payment-list">
      {title && <h3 className="font-[500] text-[16px] mb-3 lg:mb-6">{title}</h3>}
      <Table
        rowKey="recId"
        dataSource={items}
        columns={columns}
        pagination={{ pageSize: 10, hideOnSinglePage: true }}
      />
    </div>
  );
};
export default FormOfPaymentList;
