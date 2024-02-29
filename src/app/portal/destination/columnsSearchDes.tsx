import { ColumnsType } from "antd/es/table";
import Link from "next/link";
import { Space, Tag } from "antd";
import { IDestinationListRs } from "@/models/management/region.interface";
import { Status } from "@/models/management/common.interface";
export const columnsSearchDes: ColumnsType<IDestinationListRs["result"][0]> = [
    {
        title: "#ID",
        key: "recId",
        dataIndex: "recId",
        width: 80,
    },
    {
        title: "Tên (Vi)",
        key: "name",
        dataIndex: "name",
        width: 150,
    },
    {
        title: "Tên (En)",
        key: "engName",
        dataIndex: "engName",
        width: 150,
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
