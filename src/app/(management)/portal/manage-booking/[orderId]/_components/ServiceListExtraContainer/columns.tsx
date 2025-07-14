import { ServiceItem, PassengerItem } from ".";
import { ColumnsType } from "antd/es/table";
import { moneyFormatVND } from "@/utils/helper";

export const serviceColumns: ColumnsType<ServiceItem & { pax?: PassengerItem }> = [
  {
    title: "Dịch vụ",
    width: 320,
    render: (value, record, index) => {
      return record.inventoryName;
    },
  },

  {
    title: "Số lượng",
    width: 120,
    render: (value, record, index) => {
      return 1;
    },
  },
  {
    title: "Hạng",
    width: 120,
    render: (value, record, index) => {
      return record.class;
    },
  },
  {
    title: "Giá tiền",
    width: 200,
    render: (value, record, index) => {
      return moneyFormatVND(record.amount);
    },
  },
];
