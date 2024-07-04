import { ColumnsType } from "antd/es/table";
import { Space, Tag, Table, Button } from "antd";
import { formatDate } from "@/utils/date";
import { Status } from "@/models/common.interface";
import { ITemplateSaleableListRs } from "@/models/management/core/templateSellable.interface";
import { IDestination } from "@/models/management/region.interface";
import Link from "next/link";
import { RightOutlined } from "@ant-design/icons";

export const templateColums: ColumnsType<ITemplateSaleableListRs["result"][0]> =
    [
        {
            title: "#ID",
            dataIndex: "recId",
            key: "recId",
            width: 80,
        },
        {
            title: "Tên nhóm sản phẩm",
            dataIndex: "name",
            key: "name",
            width: 220,
            render: (_, record) => {
                return (
                    <div>
                        <p className="font-bold mb-1">{record.name}</p>
                        <p className="text-xs text-gray-500 mb-2">
                            {record.code}
                        </p>
                        {(record.status === Status.OK && (
                            <p>
                                <Link
                                    href={`/portal/product/template-sellable/${record.recId}`}
                                    className="text-xs"
                                >
                                    <span> Chi tiết</span>
                                    <span className="text-[10px] ml-1">
                                        <RightOutlined />
                                    </span>
                                </Link>
                            </p>
                        )) ||
                            null}
                    </div>
                );
            },
        },
        {
            title: "Loại sản phẩm",
            dataIndex: "type",
            key: "type",
            width: 120,
        },
        {
            title: "Loại nhóm kho",
            dataIndex: "inventoryTypeList",
            key: "inventoryTypeList",
            width: 200,
            filters: [
                {
                    text: "HOTEL",
                    value: "HOTEL",
                },
                {
                    text: "VISA",
                    value: "VISA",
                },
                {
                    text: "AIR",
                    value: "AIR",
                },
                {
                    text: "TRANSPORT",
                    value: "TRANSPORT",
                },
                {
                    text: "INSURANCE",
                    value: "INSURANCE",
                },
                {
                    text: "GUIDE",
                    value: "GUIDE",
                },
            ],
            onFilter: (value, record) =>
                record.inventoryTypeList.indexOf(value as string) === 0,
            render(value, record) {
                const inventoryTypes: string[] =
                    record.inventoryTypeList.split("||");

                return (
                    <Space wrap>
                        {inventoryTypes.map((item) => (
                            <Tag key={item}>{item}</Tag>
                        ))}
                    </Space>
                );
            },
        },
        Table.EXPAND_COLUMN,
        {
            title: "Nhóm điểm đến",
            dataIndex: "destListJson",
            key: "destListJson",
            width: 200,
            render(value, record) {
                const destinations: IDestination[] = JSON.parse(
                    record.destListJson,
                );
                return (
                    <Space wrap>
                        {destinations.map((item) => (
                            <Tag color="blue" key={item.id}>
                                {item.codeName}
                            </Tag>
                        ))}
                    </Space>
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
                            "Chờ kích hoạt"}
                    </Tag>
                );
            },
        },
    ];
