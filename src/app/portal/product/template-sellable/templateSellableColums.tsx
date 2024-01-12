import { ColumnsType } from "antd/es/table";
import { Space, Tag, Table } from "antd";
import { formatDate } from "@/utils/date";
import { Status } from "@/models/management/common.interface";

import { ITemplateSaleableListRs } from "@/models/management/core/templateSellable.interface";
import { IDestination } from "@/models/management/region.interface";
import { IInventory } from "@/models/management/core/inventory.interface";

export const templateSellableColums: ColumnsType<
    ITemplateSaleableListRs["result"][0]
> = [
    {
        title: "#ID",
        dataIndex: "recId",
        key: "recId",
        width: 60,
    },
    {
        title: "Template name",
        dataIndex: "name",
        key: "code",
        width: 220,
        render: (_, record) => {
            return (
                <div>
                    <p className="font-bold mb-1">{record.name}</p>
                    <p className="text-xs text-gray-500">{record.code}</p>
                </div>
            );
        },
    },
    {
        title: "Product type",
        dataIndex: "type",
        key: "type",
        width: 120,
        filters: [
            {
                text: "TOUR",
                value: "TOUR",
            },
            {
                text: "EXTRA",
                value: "EXTRA",
            },
        ],
        onFilter: (value, record) => record.type.indexOf(value as string) === 0,
    },
    {
        title: "Inventory type",
        dataIndex: "inventoryTypeList",
        key: "inventoryTypeList",
        width: 200,
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
        key: "inventoryTypeList",
        width: 220,
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
        title: "Trạng thái",
        dataIndex: "status",
        key: "status",
        width: 80,
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
        width: 80,
    },
];
