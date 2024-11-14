import { ColumnsType } from "antd/es/table";
import { IMiscDocument } from "@/models/management/cms/miscDocument.interface";

const getTemplateColumns = () => {
  let columns: ColumnsType<IMiscDocument> = [
    {
      title: "#ID",
      key: "id",
      dataIndex: "id",
      width: 100,
    },
    {
      title: "Tên",
      key: "name",
      dataIndex: "name",
      width: 240,
    },
    {
      title: "Mô tả",
      key: "descriptions",
      dataIndex: "descriptions",
      width: 360,
    },
    {
      title: "Đường dẫn",
      key: "link",
      dataIndex: "link",
    },
  ];
  return columns;
};

export const columns = getTemplateColumns();
