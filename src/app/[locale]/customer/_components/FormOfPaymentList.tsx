"use client";
import { FeOrderDetailResponse } from "@/models/fe/order.interface";
import { moneyFormatVND } from "@/utils/helper";
import { Table } from "antd";
import { ColumnsType } from "antd/es/table";

type FormOfPaymentType = FeOrderDetailResponse["result"]["fops"][number];
interface FormOfPaymentsProps {
  title?: string;
  items: FeOrderDetailResponse["result"]["fops"];
}
const FormOfPayments = ({ title, items }: FormOfPaymentsProps) => {
  const columns: ColumnsType<FormOfPaymentType> = [
    {
      title: "document",
      dataIndex: "fopDocument",
    },
    {
      title: "Loại fop",
      dataIndex: "fopType",
      render: (_, record) => {
        return <>{record.fopType}</>;
      },
    },
    {
      title: "Ghi chú",
      dataIndex: "infoNote",
      render: (_, record) => {
        return <>{record.infoNote}</>;
      },
    },
    {
      title: "infoNumber",
      dataIndex: "infoNumber",
      render: (_, record) => {
        return <>{record.infoNumber}</>;
      },
    },
    {
      title: "infoTId",
      dataIndex: "infoTId",
      render: (_, record) => {
        return <>{record.infoTId}</>;
      },
    },
    {
      title: "infoTrace",
      dataIndex: "infoTrace",
      render: (_, record) => {
        return <>{record.infoTrace}</>;
      },
    },
    {
      title: "infoTrace",
      dataIndex: "infoTnxId",
      render: (_, record) => {
        return <>{record.infoTnxId}</>;
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
      render: (_, record) => {
        return <>{record.status}</>;
      },
    },
  ];
  return (
    <div className="form-of-payment-list">
      {title && <h3 className="font-[500] text-[16px] mb-3 lg:mb-6">{title}</h3>}

      <Table<FormOfPaymentType> dataSource={items} columns={columns} />
    </div>
  );
};
export default FormOfPayments;
