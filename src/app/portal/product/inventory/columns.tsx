import { ColumnsType } from "antd/es/table";
import { Tag } from "antd";
import { formatDate } from "@/utils/date";
import { IInventoryListRs } from "@/models/management/core/inventory.interface";
import Link from "next/link";
import { Status } from "@/models/management/common.interface";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
export const inventoryColumns: ColumnsType<IInventoryListRs["result"][0]> = [
    {
        title: "#ID",
        dataIndex: "recId",
        key: 1,
        width: 80,
    },
    {
        title: "Tên",
        dataIndex: "name",
        key: 2,
        width: 250,
    },
    {
        title: "Code",
        dataIndex: "code",
        key: 3,
        width: 250,
    },
    {
        title: "Product type",
        dataIndex: "productType",
        key: 4,
        width: 150,
    },
    {
        title: "Inventory type",
        dataIndex: "type",
        key: 5,
        width: 150,
    },
    {
        title: "Trạng thái",
        dataIndex: "status",
        key: 6,
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
        title: "Có stock",
        dataIndex: "isStock",
        key: 7,
        width: 120,
        render: (_, record) => {
            return (
                <>
                    {record.isStock ? (
                        <Tag color="green" icon>
                            Có
                        </Tag>
                    ) : (
                        <Tag color="red">Không</Tag>
                    )}
                </>
            );
        },
    },
    {
        title: "Ngày tạo",
        dataIndex: "sysFstUpdate",
        key: 8,
        width: 180,
        render: (_, record) => {
            return formatDate(record.sysFstUpdate);
        },
    },
    {
        title: "User",
        dataIndex: "sysFstUser",
        key: 9,
        width: 100,
    },
];
