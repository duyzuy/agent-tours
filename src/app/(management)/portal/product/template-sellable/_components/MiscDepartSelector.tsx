import { Select, SelectProps } from "antd";
import { useGetMiscDepartLocationsQuery } from "@/queries/cms/miscDepart";
import { IDepartLocation } from "@/models/management/cms/miscDepartLocation.interface";
import { isArray } from "lodash";

export interface MiscDepartSelectorProps {
  onChange?: (value: number, options: IDepartLocation) => void;
  value?: number;
}
const MiscDepartSelector: React.FC<MiscDepartSelectorProps> = ({ onChange, value }) => {
  const { data, isLoading } = useGetMiscDepartLocationsQuery();

  const handleChange: SelectProps<number, IDepartLocation>["onChange"] = (value, options) => {
    onChange?.(value, isArray(options) ? options[0] : options);
  };
  return (
    <Select<number, IDepartLocation>
      value={value}
      placeholder="Chọn điểm khởi hành"
      fieldNames={{ label: "name_vi", value: "id" }}
      options={data?.list}
      loading={isLoading}
      onChange={handleChange}
    />
  );
};
export default MiscDepartSelector;
