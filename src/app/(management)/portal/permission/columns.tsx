import { ColumnsType } from "antd/es/table";
import { RolesPermissionListResponse } from "@/models/management/rolePermission.interface";
import { Tag } from "antd";
export const columns: ColumnsType<RolesPermissionListResponse["result"]["permissionList"][number]> = [
  {
    title: "Nhóm",
    key: "groupName",
    dataIndex: "groupName",
    width: 150,
  },
  {
    title: "Tên chức năng",
    key: "localUser_PermissionValue",
    dataIndex: "localUser_PermissionValue",
    width: 150,
  },
  {
    title: "Key",
    key: "localUser_PermissionKey",
    dataIndex: "localUser_PermissionKey",
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
