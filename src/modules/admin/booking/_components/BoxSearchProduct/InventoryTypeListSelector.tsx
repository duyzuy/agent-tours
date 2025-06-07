import { EInventoryType } from "@/models/management/core/inventoryType.interface";
import { useGetInventoryTypeListCoreQuery } from "@/queries/core/inventoryType";
import { Select, SelectProps } from "antd";

export interface InventoryTypeListSelectorProps {
  values?: EInventoryType[];
  onChange?: (data: EInventoryType[]) => void;
}
const InventoryTypeListSelector: React.FC<InventoryTypeListSelectorProps> = ({ values, onChange }) => {
  const { data: inventoryType, isLoading: isLoadingInventoryType } = useGetInventoryTypeListCoreQuery({
    enabled: true,
  });

  return (
    <Select<EInventoryType[]>
      mode="multiple"
      maxTagCount="responsive"
      placeholder="Chọn loại inventory"
      bordered={false}
      loading={isLoadingInventoryType}
      style={{ padding: 0 }}
      showSearch={true}
      options={
        inventoryType?.map((type) => ({
          label: type,
          value: type,
        })) || []
      }
      value={values}
      onChange={(value) => onChange?.(value)}
      getPopupContainer={(triggerNode) => triggerNode.parentElement.parentElement}
      suffixIcon={null}
    />
  );
};
export default InventoryTypeListSelector;
