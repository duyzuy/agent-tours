import { ColumnsType } from "antd/es/table";
import { Tag } from "antd";
import { formatDate } from "@/utils/date";
import { MemberListResponse } from "@/models/management/member.interface";
export const columns: ColumnsType<MemberListResponse["result"][number]> = [
  {
    title: "#ID",
    dataIndex: "recId",
    key: "recId",
    width: 80,
  },
  {
    title: "Tài khoản",
    dataIndex: "fullname",
    key: "fullname",
    width: 250,
    render: (_, { email, username }) => {
      return (
        <>
          <div>{username}</div>
          <div>{email}</div>
        </>
      );
    },
  },
  {
    title: "Facebook",
    dataIndex: "fullname",
    key: "fullname",
    width: 250,
    render: (_, { faceBookId }) => {
      return <div>{faceBookId}</div>;
    },
  },
  {
    title: "Google",
    dataIndex: "fullname",
    key: "fullname",
    width: 250,
    render: (_, { googleId }) => {
      return <div>{googleId}</div>;
    },
  },
];
