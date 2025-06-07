import { PlusOutlined } from "@ant-design/icons";
import { Button } from "antd";
import React, { useState } from "react";
import DrawerInventoryForm, { DrawerInventoryFormProps } from "../../../inventory/_components/DrawerInventoryForm";
import useCRUDInventory from "../../../inventory/modules/useCRUDInventory";

interface CreateInventoryButtonProps {
  inventoriesType: DrawerInventoryFormProps["inventoriesType"];
  supplierId: DrawerInventoryFormProps["supplierId"];
}
function CreateInventoryButton({ supplierId, inventoriesType }: CreateInventoryButtonProps) {
  const [showDrawerInventory, setShowDrawerInventory] = useState(false);
  const { onCreateInventory } = useCRUDInventory();

  const handleCreateInventory: DrawerInventoryFormProps["onSubmit"] = (action, formdata) => {
    console.log(action, formdata);
    if (action === "CREATE")
      onCreateInventory(formdata, () => {
        setShowDrawerInventory(false);
      });
  };

  return (
    <div>
      <Button size="small" type="primary" ghost icon={<PlusOutlined />} onClick={() => setShowDrawerInventory(true)}>
        Thêm dịch vụ
      </Button>
      <DrawerInventoryForm
        isOpen={showDrawerInventory}
        disableSupplierField={true}
        inventoriesType={inventoriesType}
        supplierId={supplierId}
        onCancel={() => setShowDrawerInventory(false)}
        actionType="CREATE"
        onSubmit={handleCreateInventory}
      />
    </div>
  );
}

export default CreateInventoryButton;
