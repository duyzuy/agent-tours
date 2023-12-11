import { ColumnsType } from "antd/es/table";
import { IRolesPermissionsRs } from "@/models/management/role.interface";
import { Tag } from "antd";
export const columnRoleGroups: ColumnsType<
    IRolesPermissionsRs["result"]["rolePermissionList"][0]
> = [
    {
        title: "Tên nhóm quyền",
        key: "localUser_RolePermissionValue",
        dataIndex: "localUser_RolePermissionValue",
        width: 150,
    },
    {
        title: "Trạng thái",
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
