import React from "react";
import { ColumnsType } from "antd/es/table";
import { moneyFormatVND } from "@/utils/helper";
import { Tag } from "antd";
import { IOrderListRs } from "@/models/management/booking/order.interface";
import { PaymentStatus, Status } from "@/models/management/common.interface";
import { formatDate } from "@/utils/date";
import Link from "next/link";

export const columnsOrderList: ColumnsType<IOrderListRs["result"][0]> = [
    {
        title: "#ID",
        dataIndex: "recId",
        key: "recId",
        width: 80,
    },
    {
        title: "Tour",
        dataIndex: "recId",
        key: "recId",
        width: 260,
        render(value, record, index) {
            return (
                <div>
                    <span className="block">{record.template.name}</span>
                    <span className="text-xs text-gray-600">
                        {record.sellable.code}
                    </span>
                    <Link
                        href={`./portal/manage-booking/${record.recId}`}
                        className="block text-xs"
                    >
                        <span>Chi tiết</span>
                    </Link>
                </div>
            );
        },
    },
    {
        title: "Người đặt",
        dataIndex: "custName",
        key: "custName",
        width: 150,
    },
    {
        title: "Tổng tiền",
        dataIndex: "totalAmount",
        key: "totalAmount",
        width: 180,
        render: (_, record) => {
            return <>{moneyFormatVND(record.totalAmount)}</>;
        },
    },
    {
        title: "Trạng thái thanh toán",
        dataIndex: "paymentStatus",
        key: "paymentStatus",
        width: 200,
        render(value, record, index) {
            return (
                <>
                    {(record.paymentStatus === PaymentStatus.PAID && (
                        <Tag color="green">Đã thanh toán</Tag>
                    )) ||
                        (record.paymentStatus === PaymentStatus.DEPOSITED && (
                            <Tag color="blue">Thanh toán 1 phần</Tag>
                        )) || <Tag color="red">Chưa thanh toán</Tag>}
                </>
            );
        },
    },
    {
        title: "Thời hạn thanh toán",
        dataIndex: "timelimits",
        key: "timelimits",
        width: 200,
        render(value, record, index) {
            return (
                <>
                    {/* {record.timelimits.map((item) => (
                        <React.Fragment key={item.recId}>
                            <div>{formatDate(item.deadline)}</div>
                        </React.Fragment>
                    ))} */}
                </>
            );
        },
    },
    {
        title: "Trạng thái ",
        dataIndex: "paymentStatus",
        key: "paymentStatus",
        width: 120,
        render(value, record, index) {
            return (
                <>
                    {(record.status === Status.OK && (
                        <Tag color="green">Đã xác nhận</Tag>
                    )) ||
                        (record.status === Status.XX && (
                            <Tag color="red">Đã huỷ</Tag>
                        )) || <Tag color="orange">Chờ xác nhận</Tag>}
                </>
            );
        },
    },
    {
        title: "Ngày đặt",
        dataIndex: "sysFstUpdate",
        key: "sysFstUpdate",
        width: 160,
        render: (sysFstUpdate, record) => {
            return <>{formatDate(sysFstUpdate)}</>;
        },
    },
];
