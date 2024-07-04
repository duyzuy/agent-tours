import React from "react";
import { ColumnsType } from "antd/es/table";
import { moneyFormatVND } from "@/utils/helper";
import { Tag } from "antd";
import { Status } from "@/models/common.interface";
import { formatDate } from "@/utils/date";
import {
    DiscountType,
    IDiscountPolicy,
} from "@/models/management/core/discountPolicy.interface";
import { SwapRightOutlined } from "@ant-design/icons";

export const createDynamicDiscountColumns = (type: DiscountType) => {
    let initColumns: ColumnsType<IDiscountPolicy> = [
        {
            title: "#ID",
            dataIndex: "recId",
            key: "recId",
            width: 80,
        },
        {
            title: "Mã",
            dataIndex: "code",
            key: "code",
            width: 150,
            render: (_, record) => {
                return (
                    <>
                        <span className="text-primary-default  font-bold">
                            {record.code}
                        </span>
                        <p className="text-xs text-gray-500">
                            {record.descriptions}
                        </p>
                    </>
                );
            },
        },
        {
            title: "Giá trị",
            dataIndex: "discountAmount",
            key: "discountAmount",
            width: 150,
            render: (_, record) => {
                return <span>{moneyFormatVND(record.discountAmount)}</span>;
            },
        },
    ];

    if (type.toUpperCase() === DiscountType.COUPON) {
        initColumns = [
            ...initColumns,
            {
                title: "Sử dụng",
                dataIndex: "used",
                key: "used",
                width: 150,
                render: (_, record) => {
                    return <p>{`${record.used}/${record.maxUseTimes}`}</p>;
                },
            },
        ];
    }
    initColumns = [
        ...initColumns,
        {
            title: "Ngày áp dụng",
            dataIndex: "validFromTo",
            key: "validFromTo",
            width: 200,
            render: (sysFstUpdate, record) => {
                return (
                    <span className="flex items-center">
                        <span>
                            {formatDate(record.validFrom, "dd/MM/yyyy")}
                        </span>
                        <span className="mx-2">
                            <SwapRightOutlined />
                        </span>
                        <span>{formatDate(record.validTo, "dd/MM/yyyy")}</span>
                    </span>
                );
            },
        },
        {
            title: "Trạng thái",
            dataIndex: "status",
            key: "status",
            width: 120,
            render(value, record, index) {
                return (
                    <>
                        {record?.status === Status.OK ? (
                            <Tag color="green">Đang kích hoạt</Tag>
                        ) : record?.status === Status.QQ ? (
                            <Tag color="orange">Chờ kích hoạt</Tag>
                        ) : (
                            <Tag color="red">Đã huỷ</Tag>
                        )}
                    </>
                );
            },
        },
    ];
    return initColumns;
};
