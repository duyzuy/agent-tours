import { Select, SelectProps } from "antd";
import { IInventory, InventoryQueryParams } from "@/models/management/core/inventory.interface";
import { Status } from "@/models/common.interface";
import { useGetInventoryListCoreQuery } from "@/queries/core/inventory";
import { isArray } from "lodash";

export interface InventorySelectorProps {
  value?: number;
  onChange?: (value: number, option?: IInventory) => void;
  disabled?: boolean;
}
const InventorySelector: React.FC<InventorySelectorProps> = ({ value, onChange, disabled = false }) => {
  const initQueryParams = new InventoryQueryParams(
    {
      isStock: true,
      status: Status.OK,
    },
    1,
    999,
  );
  const { data: inventoryResponse } = useGetInventoryListCoreQuery({
    queryParams: initQueryParams,
    enabled: true,
  });
  const { list: inventoryList } = inventoryResponse || {};

  const handleChange: SelectProps<number, IInventory>["onChange"] = (value, option) => {
    onChange?.(value, isArray(option) ? option[0] : option);
  };
  return (
    <Select<number, IInventory>
      fieldNames={{ value: "recId", label: "name" }}
      onChange={handleChange}
      value={value}
      options={inventoryList}
      placeholder="Chọn loại dịch vụ"
      disabled={disabled}
    />
  );
};
export default InventorySelector;
