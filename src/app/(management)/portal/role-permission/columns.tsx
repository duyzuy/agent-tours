import { ColumnsType } from "antd/es/table";
import { RolesPermissionListResponse } from "@/models/management/rolePermission.interface";
import { Tag } from "antd";
export const columnRoleGroups: ColumnsType<RolesPermissionListResponse["result"]["rolePermissionList"][number]> = [
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
      return record.status === "OK" ? <Tag color="green">Kích hoạt</Tag> : <Tag color="red">Chưa kích hoạt</Tag>;
    },
    width: 150,
  },
];
