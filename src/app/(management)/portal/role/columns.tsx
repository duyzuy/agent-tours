import { ColumnsType } from "antd/es/table";
import { RolesPermissionListResponse } from "@/models/management/rolePermission.interface";
import { Tag } from "antd";
export const columnRoleGroups: ColumnsType<RolesPermissionListResponse["result"]["roleList"][0]> = [
  {
    title: "Tên quyền",
    key: "localUser_RoleValue",
    dataIndex: "localUser_RoleValue",
    width: 150,
  },
  {
    title: "Trạng thái",
    key: "status",
    dataIndex: "status",
    render: (_, record) => {
      return record.status === "OK" ? (
        <Tag color="green" bordered={false}>
          Kích hoạt
        </Tag>
      ) : (
        <Tag color="red" bordered={false}>
          Chưa kích hoạt
        </Tag>
      );
    },
    width: 150,
  },
];
