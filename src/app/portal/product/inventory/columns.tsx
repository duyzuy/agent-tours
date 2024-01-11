import { ColumnsType } from "antd/es/table";
import { Tag } from "antd";
import { formatDate } from "@/utils/date";
import { IInventoryListRs } from "@/models/management/core/inventory.interface";
import Link from "next/link";
import { Status } from "@/models/management/common.interface";
export const inventoryColumns: ColumnsType<IInventoryListRs["result"][0]> = [
    {
        title: "Tên",
        dataIndex: "name",
        key: 1,
        width: 200,
    },
    {
        title: "Code",
        dataIndex: "code",
        key: 1,
        width: 150,
    },
    {
        title: "Product type",
        dataIndex: "productType",
        key: 2,
        width: 100,
    },
    {
        title: "Inventory type",
        dataIndex: "type",
        key: 2,
        width: 100,
    },
    {
        title: "Trạng thái",
        dataIndex: "status",
        key: 3,
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
        title: "Quản lý stock",
        dataIndex: "isStock",
        key: 2,
        width: 120,
        render: (_, record) => {
            return (
                <>
                    {(record.isStock && record.status === Status.OK && (
                        <Link
                            href={`/portal/product/inventory/${record.recId}`}
                            className=""
                        >
                            <span className="text-primary-default text-xs inline-block px-2 py-1 rounded-sm border border-primary-default">
                                Tạo stock
                            </span>
                        </Link>
                    )) ||
                        null}
                </>
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
        key: 4,
        width: 150,
        render: (_, record) => {
            return formatDate(record.sysFstUpdate);
        },
    },
];
