import React, { useState, useContext } from "react";
import { Form, FormInstance, Button, InputNumber, Select, SelectProps } from "antd";

import { useGetInventoryListCoreQuery } from "@/queries/core/inventory";
import { IInventory, InventoryQueryParams } from "@/models/management/core/inventory.interface";
import { EInventoryType } from "@/models/management/core/inventoryType.interface";
import { EProductType } from "@/models/management/core/productType.interface";
import { isArray } from "lodash";

export type InventoryTourListSelectorProps = {
  inventoryTypes: EInventoryType[];
  enabled?: boolean;
  onChange?: (values: number[], options: IInventory[]) => void;
  value?: number[];
};

function InventoryTourListSelector({
  inventoryTypes,
  onChange,
  enabled = true,
  value,
}: InventoryTourListSelectorProps) {
  const initQueryParams = new InventoryQueryParams(
    { productType: [EProductType.TOUR], isStock: true, type: inventoryTypes },
    1,
    999,
  );
  const { data, isLoading } = useGetInventoryListCoreQuery({ queryParams: initQueryParams, enabled: enabled });
  const handleChange: SelectProps<number[], IInventory>["onChange"] = (value, options) => {
    onChange?.(value, isArray(options) ? options : [options]);
  };
  return (
    <React.Fragment>
      <Select<number[], IInventory>
        mode="multiple"
        value={value}
        fieldNames={{ label: "name", value: "recId" }}
        options={data?.list}
        loading={isLoading}
        placeholder="Loại dịch vụ"
        onChange={handleChange}
      />
    </React.Fragment>
  );
}
export default InventoryTourListSelector;
