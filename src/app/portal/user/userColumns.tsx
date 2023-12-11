import { ColumnsType } from "antd/es/table";
import { ILocalUserList } from "@/model/Management/localUser.interface";
import { Tag } from "antd";
import { formatDate } from "@/utils/date";
export const userColumns: ColumnsType<ILocalUserList["result"][0]> = [
    {
        title: "Họ và tên",
        dataIndex: "fullname",
        key: 1,
        width: 150,
    },
    {
        title: "Email",
        dataIndex: "email",
        key: 1,
        width: 150,
    },
    {
        title: "Quyền",
        dataIndex: "mainRoleName",
        key: 2,
        width: 150,
    },
    {
        title: "Trạng thái",
        dataIndex: "status",
        key: 3,
        width: 150,
        render: (_, record) => {
            return (
                <Tag color={record.status === "OK" ? "green" : "red"}>
                    {(record.status === "OK" && "Đang kích hoạt") ||
                        (record.status === "XX" && "Tài khoản bị xoá") ||
                        "Chưa kích hoạt"}
                </Tag>
            );
        },
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
