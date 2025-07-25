import Link from "next/link";
import { ColumnsType } from "antd/es/table";
import { Space, Tag } from "antd";
import { RightOutlined } from "@ant-design/icons";
import { formatDate } from "@/utils/date";
import { Status } from "@/models/common.interface";
import { ITemplateSaleableListRs } from "@/models/management/core/templateSellable.interface";
import { EInventoryType } from "@/models/management/core/inventoryType.interface";

export const templateColums: ColumnsType<ITemplateSaleableListRs["result"][0]> = [
  {
    title: "#ID",
    dataIndex: "recId",
    key: "recId",
    width: 80,
  },
  {
    title: "Sản phẩm",
    dataIndex: "name",
    key: "name",
    width: 250,
    render: (_, { status, recId, code, name, type }) => {
      return (
        <div>
          <p className="text-xs text-gray-600">{code}</p>
          <p className="font-[500] mb-2">{name}</p>
          <Link href={`/portal/product/template-sellable/${recId}`} className="inline-flex items-center">
            <span>Chi tiết</span>
            <RightOutlined className="ml-1 !text-[0.75rem]" />
          </Link>
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
      {
        text: "LANDPACKAGE",
        value: "LANDPACKAGE",
      },
    ],
    onFilter: (value, { inventoryTypeList }) => {
      return inventoryTypeList.indexOf(value as EInventoryType) === 0;
    },
    render(value, { inventoryTypeList }) {
      return (
        <Space wrap>
          {inventoryTypeList.map((item) => (
            <Tag key={item}>{item}</Tag>
          ))}
        </Space>
      );
    },
  },
  // Table.EXPAND_COLUMN,
  {
    title: "Nhóm điểm đến",
    dataIndex: "destListJson",
    key: "destListJson",
    width: 150,
    render(value, { destListJson }) {
      return (
        <Space wrap>
          {destListJson.map(({ id, codeName }, _index) => (
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
      return (
        <div>
          <span>{formatDate(sysLstUpdate, "HH:mm")}</span>
          <span>{formatDate(sysLstUpdate, "DD/MM/YYYY")}</span>
        </div>
      );
    },
  },
  {
    title: "Người tạo",
    dataIndex: "sysFstUser",
    key: "sysFstUser",
    width: 150,
  },
  {
    title: "Trạng thái",
    dataIndex: "status",
    key: "status",
    width: 150,
    fixed: "right",
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
