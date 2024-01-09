import { ColumnsType } from "antd/es/table";
import { Tag } from "antd";
import { formatDate } from "@/utils/date";
import { Status } from "@/models/management/common.interface";
import { IStockListOfInventoryRs } from "@/models/management/core/stockInventory.interface";

export const stockColumns: ColumnsType<IStockListOfInventoryRs["result"][0]> = [
    {
        title: "Code",
        dataIndex: "code",
        key: "code",
        width: 150,
    },
    {
        title: "Product type",
        dataIndex: "inventoryType",
        key: "inventoryType",
        width: 100,
    },
    {
        title: "Type",
        dataIndex: "type",
        key: "type",
        width: 100,
        filters: [
            {
                text: "AIRTICKET",
                value: "AIRTICKET",
            },
        ],
        onFilter: (value, record) => record.type.indexOf(value as string) === 0,
    },
    {
        title: "Số lượng (Cap)",
        dataIndex: "cap",
        key: "cap",
        width: 60,
    },
    {
        title: "Đã sử dụng (Used)",
        dataIndex: "used",
        key: "used",
        width: 80,
    },
    {
        title: "Khả dụng (Avaiable)",
        dataIndex: "avaiable",
        key: "avaiable",
        width: 60,
    },
    {
        title: "Valid from",
        dataIndex: "validFrom",
        key: "validFrom",
        width: 120,
        render: (_, record) => {
            return formatDate(record.validFrom);
        },
    },
    {
        title: "Valid to",
        dataIndex: "validTo",
        key: "validTo",
        width: 120,
        render: (_, record) => {
            return formatDate(record.validTo);
        },
    },
    {
        title: "Start date",
        dataIndex: "startDate",
        key: "startDate",
        width: 120,
        render: (_, record) => {
            return formatDate(record.startDate);
        },
    },
    {
        title: "End date",
        dataIndex: "endDate",
        key: "endDate",
        width: 120,
        render: (_, record) => {
            return formatDate(record.endDate);
        },
    },
    {
        title: "Trạng thái",
        dataIndex: "status",
        key: "status",
        width: 120,
        render: (_, record) => {
            return (
                <Tag
                    color={
                        (record.status === Status.OK && "green") ||
                        (record.status === Status.QQ && "orange") ||
                        "red"
                    }
                >
                    {(record.status === Status.OK && "Đang kích hoạt") ||
                        (record.status === Status.XX && "Đã xoá") ||
                        (record.status === Status.QQ && "Chờ duyệt") ||
                        "Chờ kích hoạt"}
                </Tag>
            );
        },
    },
    {
        title: "Ngày tạo",
        dataIndex: "sysFstUpdate",
        key: "sysFstUpdate",
        width: 150,
        render: (_, record) => {
            return formatDate(record.sysFstUpdate);
        },
    },
];
