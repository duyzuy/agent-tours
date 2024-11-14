import { ColumnsType } from "antd/es/table";
import { IDepartLocation } from "@/models/management/cms/miscDepartLocation.interface";

const getTemplateColumns = () => {
  let columns: ColumnsType<IDepartLocation> = [
    {
      title: "#ID",
      key: "id",
      dataIndex: "id",
      width: 100,
    },
    {
      title: "Tên - vi",
      key: "name",
      dataIndex: "name_vi",
      width: 240,
    },
    {
      title: "Tên - en",
      key: "name_en",
      dataIndex: "name_en",
      width: 240,
    },
  ];
  return columns;
};

export const columns = getTemplateColumns();
