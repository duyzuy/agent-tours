import { ColumnsType } from "antd/es/table";
import { IStockListOfInventoryRs } from "@/models/management/core/stock.interface";
import { formatDate } from "@/utils/date";

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
    width: 180,
    render: (_, record) => {
      return (
        <>
          <p>{record.code}</p>
          <p className="text-xs text-gray-500">{record.description}</p>
        </>
      );
    },
  },
  {
    title: "Ngày sử dụng",
    dataIndex: "used-date",
    key: "used-date",
    width: 250,
    render: (_, { startDate, endDate }) => {
      return (
        <>
          <div>
            <span className="w-8 inline-block text-blue-600">Từ</span> {formatDate(startDate)}
          </div>
          <div>
            <span className="w-8 inline-block text-cyan-600">Đến</span> {formatDate(endDate)}
          </div>
        </>
      );
    },
  },
];
