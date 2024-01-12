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
        fixed: "left",
        width: 120,
        render: (_, record) => {
            return (
                <>
                    <p>{record.code}</p>
                    <p className="text-xs text-gray-500">
                        {record.description}
                    </p>
                </>
            );
        },
    },
    {
        title: "Inventory type",
        dataIndex: "inventoryType",
        key: "inventoryType",
        width: 60,
    },
    {
        title: "Stock type",
        dataIndex: "type",
        key: "type",
        width: 60,
        filters: [
            {
                text: "AIRTICKET",
                value: "AIRTICKET",
            },
        ],
        onFilter: (value, record) => record.type.indexOf(value as string) === 0,
    },
    {
        title: "Open",
        dataIndex: "open",
        key: "open",
        width: 40,
    },
    {
        title: "Khả dụng (Avaiable)",
        dataIndex: "avaiable",
        key: "avaiable",
        width: 40,
    },
    {
        title: "Đã sử dụng (Used)",
        dataIndex: "used",
        key: "used",
        width: 45,
    },

    {
        title: "Valid Date",
        dataIndex: "valid-date",
        key: "valid-date",
        width: 90,
        render: (_, record) => {
            return (
                <>
                    <p>
                        <span className="w-14 inline-block text-right mr-2">
                            From:
                        </span>
                        <span>{formatDate(record.validFrom)}</span>
                    </p>
                    <p>
                        <span className="w-14 inline-block text-right mr-2">
                            To:
                        </span>
                        <span>{formatDate(record.validTo)}</span>
                    </p>
                </>
            );
        },
    },
    {
        title: "Use date",
        dataIndex: "use-date",
        key: "use-date",
        width: 90,
        render: (_, record) => {
            return (
                <>
                    <p>
                        <span className="w-14 inline-block text-right mr-2">
                            Start:
                        </span>
                        <span>{formatDate(record.startDate)}</span>
                    </p>
                    <p>
                        <span className="w-14 inline-block text-right mr-2">
                            End:
                        </span>
                        <span>{formatDate(record.endDate)}</span>
                    </p>
                </>
            );
        },
    },
    {
        title: "Trạng thái",
        dataIndex: "status",
        key: "status",
        width: 60,
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
        title: "User",
        dataIndex: "sysFstUser",
        key: 2,
        width: 60,
    },
    {
        title: "Ngày tạo",
        dataIndex: "sysFstUpdate",
        key: "sysFstUpdate",
        width: 80,
        render: (_, record) => {
            return formatDate(record.sysFstUpdate);
        },
    },
];
