import { ColumnsType } from "antd/es/table";
import { Space, Tag, Table, Button } from "antd";
import { formatDate } from "@/utils/date";
import { Status } from "@/models/management/common.interface";
import React from "react";
import { ISupplier } from "@/models/management/supplier.interface";

export const vendorColumns: ColumnsType<ISupplier> = [
    {
        title: "#ID",
        dataIndex: "recId",
        key: "recId",
        width: 80,
    },
    {
        title: "Tên Vendor",
        dataIndex: "vendor",
        key: "vendor",
        width: 200,
        render(value, record, index) {
            return (
                <span>
                    <span className="block">{record.vendor.fullName}</span>
                    <span className="block text-xs text-primary-default">
                        {record.vendor.shortName}
                    </span>
                </span>
            );
        },
    },
    {
        title: "Tên supplier",
        dataIndex: "fullName",
        key: "fullName",
        width: 200,
        render(value, record, index) {
            return (
                <span>
                    <span className="block">{record.fullName}</span>
                    <span className="block text-xs text-primary-default">
                        {record.shortName}
                    </span>
                </span>
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
        title: "User",
        dataIndex: "sysFstUser",
        key: "sysFstUser",
        width: 100,
    },
    {
        title: "Trạng thái",
        dataIndex: "status",
        key: "status",
        width: 150,
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
                        (record.status === Status.OX && "Chưa kích hoạt") ||
                        "none"}
                </Tag>
            );
        },
    },
];
