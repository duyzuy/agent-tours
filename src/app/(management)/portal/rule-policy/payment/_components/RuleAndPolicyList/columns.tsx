import { ColumnsType } from "antd/es/table";
import { Tag } from "antd";
import { IRuleAndPolicy } from "@/models/ruleAndPolicy.interface";
import { moneyFormatVND } from "@/utils/helper";
import { PolicyCat, PolicyRule } from "@/models/management/core/ruleAndPolicy.interface";

import Table from "antd/es/table";
export const columns: ColumnsType<IRuleAndPolicy> = [
  {
    title: "#ID",
    key: "id",
    dataIndex: "id",
    width: 80,
  },
  {
    title: "Loại chính sách",
    key: "type",
    dataIndex: "type",
    width: 150,
    render(soTien, record) {
      return (
        <div>
          <span className="block">{record.typeName}</span>
          <span className="text-xs">{record.type}</span>
        </div>
      );
    },
    filters: [
      { text: "Phí phạt", value: "PENALTY" },
      { text: "Trả 1 phần", value: "DEPOSIT" },
      { text: "Trả sau", value: "BOOKING_TIMELIMIT" },
    ],
    onFilter: (value, record) => record.type.indexOf(value as string) === 0,
  },
  {
    title: "Áp dụng theo",
    key: "cat",
    dataIndex: "cat",
    width: 150,
    render(value, record, index) {
      return (
        <div>
          <div className="text-xs mb-2">{record.cat}</div>
          {record.cat === PolicyCat.BYTOURCODE ? (
            <Tag className="text-xs" color="blue">
              {record.maTour}
            </Tag>
          ) : null}
        </div>
      );
    },
  },
  Table.EXPAND_COLUMN,
  {
    title: "Nguyên tắc",
    key: "ruleName",
    dataIndex: "ruleName",
    width: 250,
    render(value, record, index) {
      return (
        <div>
          <div className="text-xs mb-2">{record.ruleName}</div>
          {record.rule === PolicyRule.HOURSAFTER_BOOK ? (
            <Tag className="text-xs" color="blue">
              {`${record.soGio} giờ`}
            </Tag>
          ) : null}

          {record.rule === PolicyRule.FIXAMOUNT || record.rule === PolicyRule.AMOUNTBEFOR_DEPART ? (
            <Tag className="text-xs" color="blue">
              {`${moneyFormatVND(record.soTien)}`}
            </Tag>
          ) : null}
        </div>
      );
    },
  },
  {
    title: "Số ngày",
    key: "soNgay",
    dataIndex: "soNgay",
    width: 100,
  },
];
