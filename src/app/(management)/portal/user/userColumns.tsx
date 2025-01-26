import { ColumnsType } from "antd/es/table";
import { LocalUserListResponse } from "@/models/management/localUser.interface";
import { Tag } from "antd";
import { formatDate } from "@/utils/date";
export const userColumns: ColumnsType<LocalUserListResponse["result"][0]> = [
  {
    title: "#ID",
    dataIndex: "recId",
    key: "recId",
    width: 80,
  },
  {
    title: "Họ và tên",
    dataIndex: "fullname",
    key: "fullname",
    width: 250,
    render: (_, { email, fullname }) => {
      return (
        <>
          <div>{fullname}</div>
          <div>{email}</div>
        </>
      );
    },
  },
  {
    title: "Quyền",
    dataIndex: "mainRoleName",
    key: "mainRoleName",
    width: 150,
  },
  {
    title: "Loại tài khoản",
    dataIndex: "userType",
    key: "userType",
    width: 150,
  },
  {
    title: "Trạng thái",
    dataIndex: "status",
    key: "status",
    width: 150,
    render: (_, { status }) => {
      return (
        <Tag color={status === "OK" ? "green" : status === "OX" ? "orange" : "red"} bordered={false}>
          {(status === "OK" && "Đang kích hoạt") ||
            (status === "XX" && "Tài khoản bị xoá") ||
            (status === "OX" && "Chờ kích hoạt") ||
            "Unknown"}
        </Tag>
      );
    },
  },
  {
    title: "Ngày tạo",
    dataIndex: "sysFstUpdate",
    key: "sysFstUpdate",
    width: 150,
    render: (_, record) => {
      return formatDate(record.sysFstUpdate);
    },
  },
];
