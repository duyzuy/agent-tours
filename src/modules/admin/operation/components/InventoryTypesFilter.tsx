import { EInventoryType } from "@/models/management/core/inventoryType.interface";
import { useGetInventoryTypeListCoreQuery } from "@/queries/core/inventoryType";
import { Button, Radio } from "antd";
import { memo } from "react";

export interface InventoryTypesFilterProps {
  value?: EInventoryType;
  onChange?: (value: EInventoryType) => void;
}
const InventoryTypesFilter: React.FC<InventoryTypesFilterProps> = ({ value, onChange }) => {
  const { data: inventoryList, isLoading } = useGetInventoryTypeListCoreQuery({ enabled: true });
  return (
    <div className="flex items-center flex-wrap gap-2">
      {inventoryList?.map((item) => (
        <Radio key={item} className="!text-xs" checked={value === item} onChange={() => onChange?.(item)}>
          {item}
        </Radio>
      ))}
    </div>
  );
};
export default memo(InventoryTypesFilter);
