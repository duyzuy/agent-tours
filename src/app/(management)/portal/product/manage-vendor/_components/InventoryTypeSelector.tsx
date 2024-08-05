import { Select, SelectProps } from "antd";
import { EInventoryType } from "@/models/management/core/inventoryType.interface";
import { useGetInventoryTypeListCoreQuery } from "@/queries/core/inventoryType";
export interface InventoryTypeSelectorProps {
  value?: EInventoryType[];
  onChange: SelectProps<EInventoryType[], { label: string; value: EInventoryType }>["onChange"];
  disabled?: boolean;
}
const InventoryTypeSelector: React.FC<InventoryTypeSelectorProps> = ({ value, onChange, disabled }) => {
  const { data: listInventoriesType, isLoading } = useGetInventoryTypeListCoreQuery({
    enabled: true,
  });

  return (
    <Select<EInventoryType[], { label: string; value: EInventoryType }>
      mode="multiple"
      placeholder="Loại dịch vụ cung ứng"
      loading={isLoading}
      value={value}
      options={listInventoriesType?.reduce<{ label: string; value: EInventoryType }[]>((opts, item) => {
        return [...opts, { label: item, value: item }];
      }, [])}
      onChange={onChange}
      disabled={disabled}
    />
  );
};
export default InventoryTypeSelector;
