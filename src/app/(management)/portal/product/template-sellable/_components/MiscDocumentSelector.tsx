import { Select, SelectProps } from "antd";
import { useGetMiscDocumentListQuery } from "@/queries/cms/miscDocument";
import { useMemo } from "react";
import { IMiscDocument } from "@/models/management/cms/miscDocument.interface";
import { isArray } from "lodash";

export interface MiscDocumentSelectorProps {
  onChange?: (value: number[], options: IMiscDocument[]) => void;
  values?: number[];
}
const MiscDocumentSelector: React.FC<MiscDocumentSelectorProps> = ({ onChange, values }) => {
  const { data, isLoading } = useGetMiscDocumentListQuery();

  const handleChange: SelectProps<number[], IMiscDocument>["onChange"] = (value, options) => {
    onChange?.(value, isArray(options) ? options : [options]);
  };
  return (
    <Select<number[], IMiscDocument>
      value={values}
      placeholder="Lựa chọn các loại hồ sơ giấy tờ"
      fieldNames={{ label: "name", value: "id" }}
      options={data?.list}
      loading={isLoading}
      onChange={handleChange}
      mode="multiple"
    />
  );
};
export default MiscDocumentSelector;
