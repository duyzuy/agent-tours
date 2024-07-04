import { ColumnsType } from "antd/es/table";
import { Tag } from "antd";
import { formatDate } from "@/utils/date";
import { Status } from "@/models/common.interface";
import { SellableListRs } from "@/models/management/core/sellable.interface";

export const sellableColumns: ColumnsType<SellableListRs["result"][0]> = [
    {
        title: "#ID",
        dataIndex: "recId",
        key: "recId",
        width: 80,
    },
    {
        title: "Mã sản phẩm",
        dataIndex: "code",
        key: "code",
        width: 200,
        render: (_, record) => {
            return (
                <div>
                    <span className="block mb-1">{record.code}</span>
                    <span className="text-xs">{record.type}</span>
                </div>
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
        title: "SL đang còn",
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
        title: "Ngày bán",
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
];
