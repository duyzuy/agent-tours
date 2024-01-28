import { ColumnsType } from "antd/es/table";
import { Tag } from "antd";
import { formatDate } from "@/utils/date";
import { Status } from "@/models/management/common.interface";
import { SellableListRs } from "@/models/management/core/sellable.interface";

export const sellableColumns: ColumnsType<SellableListRs["result"][0]> = [
    {
        title: "#ID",
        dataIndex: "recId",
        key: "recId",
        width: 100,
    },
    {
        title: "Code",
        dataIndex: "code",
        key: "code",
        width: 300,
    },
    {
        title: "Stock type",
        dataIndex: "type",
        key: "type",
        width: 150,
    },
    {
        title: "Khả dụng (Avaiable)",
        dataIndex: "avaiable",
        key: "avaiable",
        width: 100,
    },
    {
        title: "Đã sử dụng (Used)",
        dataIndex: "used",
        key: "used",
        width: 100,
    },

    {
        title: "Valid Date",
        dataIndex: "valid-date",
        key: "valid-date",
        width: 200,
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
        width: 200,
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
        width: 100,
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
        width: 100,
    },
    {
        title: "Ngày tạo",
        dataIndex: "sysFstUpdate",
        key: "sysFstUpdate",
        width: 200,
        render: (_, record) => {
            return formatDate(record.sysFstUpdate);
        },
    },
];
