import { Checkbox, Space } from "antd";
import { EInventoryType } from "@/models/management/core/inventoryType.interface";
import { useGetInventoryTypeListCoreQuery } from "@/queries/core/inventoryType";
export interface InventoryTypeSelectorProps {
  value?: EInventoryType[];
  onChange: (value: EInventoryType[]) => void;
  disabled?: boolean;
}
const InventoryTypeSelector: React.FC<InventoryTypeSelectorProps> = ({ value, onChange, disabled }) => {
  const { data: listInventoriesType, isLoading } = useGetInventoryTypeListCoreQuery({
    enabled: true,
  });

  const handleChangeInventory = (item: EInventoryType) => {
    let newValues = [...(value || [])];
    const indexItem = newValues.indexOf(item);
    if (indexItem !== -1) {
      newValues.splice(indexItem, 1);
    } else {
      newValues = [...newValues, item];
    }

    onChange?.(newValues);
  };

  return (
    <>
      <Space wrap>
        {listInventoriesType?.map((item) => (
          <Checkbox
            value={item}
            key={item}
            checked={value?.includes(item)}
            disabled={disabled}
            onChange={() => handleChangeInventory(item)}
          >
            {item}
          </Checkbox>
        ))}
      </Space>
    </>
  );
};
export default InventoryTypeSelector;
