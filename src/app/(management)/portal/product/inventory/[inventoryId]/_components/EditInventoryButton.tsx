import { EditOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { useState } from "react";
import DrawerInventoryForm, { DrawerInventoryFormProps } from "../../_components/DrawerInventoryForm";
import { isUndefined } from "lodash";
import useCRUDInventory from "../../modules/useCRUDInventory";

interface EditInventoryButtonProps {
  initialValues: Exclude<DrawerInventoryFormProps["initialValues"], undefined>;
}
const EditInventoryButton: React.FC<EditInventoryButtonProps> = ({ initialValues }) => {
  const [showDrawer, setShowDrawer] = useState(false);

  const { onUpdateInventory } = useCRUDInventory();

  const handleUpdateInventory: DrawerInventoryFormProps["onSubmit"] = (action, formData) => {
    const inventoryId = formData.recId;
    if (isUndefined(inventoryId)) throw new Error("Missing ID Inventory.");
    if (action === "EDIT")
      onUpdateInventory(inventoryId, formData, () => {
        setShowDrawer(false);
      });
  };

  return (
    <>
      <Button
        className="!bg-blue-100 !text-blue-600"
        type="text"
        icon={<EditOutlined />}
        size="small"
        onClick={() => setShowDrawer(true)}
      >
        Sửa
      </Button>
      <DrawerInventoryForm
        isOpen={showDrawer}
        initialValues={initialValues}
        inventoriesType={initialValues.supplier.typeList}
        supplierId={initialValues.supplier.recId}
        productType={initialValues.productType}
        disableSupplierField={true}
        actionType="EDIT"
        onSubmit={handleUpdateInventory}
        onCancel={() => setShowDrawer(false)}
      />
    </>
  );
};
export default EditInventoryButton;
