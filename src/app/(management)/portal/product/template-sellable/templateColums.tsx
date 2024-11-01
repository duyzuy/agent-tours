import { ColumnsType } from "antd/es/table";
import { Space, Tag, Table, Button } from "antd";
import { formatDate } from "@/utils/date";
import { Status } from "@/models/common.interface";
import { ITemplateSaleableListRs } from "@/models/management/core/templateSellable.interface";
import { IDestination } from "@/models/management/region.interface";
import Link from "next/link";
import { RightOutlined } from "@ant-design/icons";

export const templateColums: ColumnsType<ITemplateSaleableListRs["result"][0]> = [
  {
    title: "#ID",
    dataIndex: "recId",
    key: "recId",
    width: 80,
  },
  {
    title: "Nhóm sản phẩm",
    dataIndex: "name",
    key: "name",
    width: 220,
    render: (_, { status, recId, code, name, type }) => {
      return (
        <div>
          <div className="mb-2">
            <p className="text-xs text-gray-600">{code}</p>
            <p className="font-[500] mb-2">{name}</p>
            <span className="block">{type}</span>
          </div>

          {(status === Status.OK && (
            <p>
              <Link href={`/portal/product/template-sellable/${recId}`} className="text-xs">
                <span>Chi tiết</span>
                <span className="text-[10px] ml-1">
                  <RightOutlined />
                </span>
              </Link>
            </p>
          )) ||
            null}
        </div>
      );
    },
  },
  {
    title: "Loại dịch vụ",
    dataIndex: "inventoryTypeList",
    key: "inventoryTypeList",
    width: 200,
    filters: [
      {
        text: "HOTEL",
        value: "HOTEL",
      },
      {
        text: "VISA",
        value: "VISA",
      },
      {
        text: "AIR",
        value: "AIR",
      },
      {
        text: "TRANSPORT",
        value: "TRANSPORT",
      },
      {
        text: "INSURANCE",
        value: "INSURANCE",
      },
      {
        text: "GUIDE",
        value: "GUIDE",
      },
    ],
    onFilter: (value, record) => record.inventoryTypeList.indexOf(value as string) === 0,
    render(value, record) {
      const inventoryTypes: string[] = record.inventoryTypeList.split("||");

      return (
        <Space wrap>
          {inventoryTypes.map((item) => (
            <Tag key={item}>{item}</Tag>
          ))}
        </Space>
      );
    },
  },
  Table.EXPAND_COLUMN,
  {
    title: "Nhóm điểm đến",
    dataIndex: "destListJson",
    key: "destListJson",
    width: 200,
    render(value, record) {
      const destinations: IDestination[] = JSON.parse(record.destListJson);
      return (
        <Space wrap>
          {destinations.map(({ id, codeName }, _index) => (
            <Tag color="blue" key={_index}>
              {codeName}
            </Tag>
          ))}
        </Space>
      );
    },
  },
  {
    title: "Ngày tạo",
    key: "sysLstUpdate",
    width: 160,
    render: (_, { sysLstUpdate }) => {
      return formatDate(sysLstUpdate);
    },
  },
  {
    title: "Người tạo",
    dataIndex: "sysFstUser",
    key: "sysFstUser",
    width: 100,
  },
  {
    title: "Trạng thái",
    dataIndex: "status",
    key: "status",
    width: 150,
    render: (_, { status }) => {
      return (
        <Tag color={(status === Status.OK && "green") || (status === Status.QQ && "orange") || "red"} bordered={false}>
          {(status === Status.OK && "Đang kích hoạt") ||
            (status === Status.XX && "Đã xoá") ||
            (status === Status.QQ && "Chờ duyệt") ||
            "Chờ kích hoạt"}
        </Tag>
      );
    },
  },
];
