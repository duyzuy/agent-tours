import { ColumnsType } from "antd/es/table";
import { IStockListOfInventoryRs } from "@/models/management/core/stock.interface";

export const miniStockColumns: ColumnsType<IStockListOfInventoryRs["result"][0]> = [
  {
    title: "#ID",
    dataIndex: "code",
    key: "code",
    width: 80,
    render: (_, record) => {
      return record.recId;
    },
  },
  {
    title: "Code",
    dataIndex: "code",
    key: "code",
    width: 250,
    render: (_, record) => {
      return (
        <>
          <p>{record.code}</p>
          <p className="text-xs text-gray-500">{record.description}</p>
        </>
      );
    },
  },
];
