import { ColumnsType } from "antd/es/table";
import Link from "next/link";
import { Space, Tag } from "antd";
import { IDestinationListRs } from "@/models/management/region.interface";
import { Status } from "@/models/management/common.interface";
export const columnsDestinationList: ColumnsType<
    IDestinationListRs["result"][0]
> = [
    {
        title: "#ID",
        key: "id",
        dataIndex: "id",
        width: 80,
    },
    {
        title: "Tên nhóm",
        key: "codeName",
        dataIndex: "codeName",
        width: 150,
    },
    {
        title: "Nội dung",
        key: "content",
        dataIndex: "content",
        width: 150,
        render: (_, { id }) => {
            return (
                <>
                    <Link href={`/portal/destination/${id}`}>Cập nhật</Link>
                </>
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
