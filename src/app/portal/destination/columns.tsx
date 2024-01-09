import { ColumnsType } from "antd/es/table";
import Link from "next/link";
import { Space, Tag } from "antd";
import { IDestinationListRs } from "@/models/management/region.interface";
import { Status } from "@/models/management/common.interface";
export const columnRoleGroups: ColumnsType<IDestinationListRs["result"][0]> = [
    {
        title: "Tên nhóm",
        key: "codeName",
        dataIndex: "codeName",
        width: 250,
        render: (name, record) => {
            return (
                <Link href={`/portal/destination/${record.id}`}>{name}</Link>
            );
        },
    },
    {
        title: "Nhóm key",
        key: "codeKey",
        dataIndex: "codeKey",
        width: 150,
    },
    {
        title: "Danh sách điểm đến",
        key: "listStateProvince",
        dataIndex: "listStateProvince",
        width: 400,
        render: (_, record) => {
            const numsOfItem = 10;
            const items = [...record.listStateProvince];

            return (
                <Space>
                    <div className="tag-items">
                        {(items.length > numsOfItem
                            ? items.splice(0, numsOfItem)
                            : items
                        ).map((item, index) => (
                            <Tag
                                bordered={false}
                                key={index}
                                style={{ marginBottom: 8 }}
                            >
                                {(item.stateProvinceKey &&
                                    item.stateProvinceKey) ||
                                    (item.countryName && item.countryName) ||
                                    (item.subRegionKey && item.subRegionKey) ||
                                    item.regionKey}
                            </Tag>
                        ))}
                        {items.length > numsOfItem ? (
                            <Tag className="rest" bordered={false}>
                                +{items.length} more ...
                            </Tag>
                        ) : null}
                    </div>
                </Space>
            );
        },
    },
    {
        title: "Trạng thái",
        key: "status",
        dataIndex: "status",
        width: 150,
        render: (_, record) => {
            return (
                <Tag color={record.status === Status.OK ? "green" : "red"}>
                    {(record.status === Status.OK && "Đang kích hoạt") ||
                        (record.status === Status.OX && "Chờ kích hoạt") ||
                        "Đã xoá"}
                </Tag>
            );
        },
    },
];
