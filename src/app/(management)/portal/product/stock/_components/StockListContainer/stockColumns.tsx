import { ColumnsType } from "antd/es/table";
import { Tag } from "antd";
import { formatDate } from "@/utils/date";
import { Status } from "@/models/common.interface";
import { IStockListOfInventoryRs } from "@/models/management/core/stock.interface";

export const stockColumns: ColumnsType<IStockListOfInventoryRs["result"][0]> = [
    {
        title: "#ID",
        dataIndex: "recId",
        key: "recId",
        width: 80,
    },
    {
        title: "Mã kho",
        dataIndex: "code",
        key: "code",
        width: 240,
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
        title: "Loại nhóm kho",
        dataIndex: "inventoryType",
        key: "inventoryType",
        width: 120,
        render: (_, record) => {
            return (
                <>
                    <p>{record.inventoryType}</p>
                    <p className="text-xs text-gray-500">{record.type}</p>
                </>
            );
        },
    },
    {
        title: "Khả dụng",
        dataIndex: "avaiable",
        key: "avaiable",
        width: 100,
    },
    {
        title: "SL Đang còn",
        dataIndex: "open",
        key: "open",
        width: 100,
    },
    {
        title: "Đã sử dụng",
        dataIndex: "used",
        key: "used",
        width: 100,
    },

    {
        title: "Ngày mở bán",
        dataIndex: "valid-date",
        key: "valid-date",
        width: 180,
        render: (_, record) => {
            return (
                <span>
                    <span className="block">
                        {formatDate(record.validFrom)}
                    </span>
                    <span className="block">{formatDate(record.validTo)}</span>
                </span>
            );
        },
    },
    {
        title: "Ngày sử dụng",
        dataIndex: "use-date",
        key: "use-date",
        width: 180,
        render: (_, record) => {
            return (
                <span>
                    <span className="block">
                        {formatDate(record.startDate)}
                    </span>
                    <span className="block">{formatDate(record.endDate)}</span>
                </span>
            );
        },
    },
    {
        title: "Người tạo",
        dataIndex: "sysFstUser",
        key: "user",
        width: 150,
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
];
