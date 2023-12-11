import { ColumnsType } from "antd/es/table";
import { IRolesPermissionsRs } from "@/model/Management/role.interface";
import { Tag } from "antd";
export const columnRoleGroups: ColumnsType<
    IRolesPermissionsRs["result"]["roleList"][0]
> = [
    {
        title: "Tên quyền",
        key: "localUser_RoleValue",
        dataIndex: "localUser_RoleValue",
        width: 150,
    },
    {
        title: "status",
        key: "status",
        dataIndex: "status",
        render: (_, record) => {
            return record.status === "OK" ? (
                <Tag color="green">Kích hoạt</Tag>
            ) : (
                <Tag color="red">Chưa kích hoạt</Tag>
            );
        },
        width: 150,
    },
];
