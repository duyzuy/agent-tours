import React from "react";
import { Select, SelectProps } from "antd";
import { ISupplier, SupplierQueryParams } from "@/models/management/supplier.interface";
import { useGetSupplierListCoreQuery } from "@/queries/core/supplier";
import { Status } from "@/models/common.interface";

export type SelectorSupplierProps = SelectProps<number, ISupplier> & {
  value?: number;
  onChange?: SelectProps<number, ISupplier>["onChange"];
};
const SelectorSupplier: React.FC<SelectorSupplierProps> = ({ value, onChange, ...restProps }) => {
  const queryParams = new SupplierQueryParams(
    {
      status: Status.OK,
      shortName: undefined,
      fullName: undefined,
      vendorId: undefined,
    },
    1,
    999,
  );
  const { data, isLoading } = useGetSupplierListCoreQuery({
    queryParams: queryParams,
    enabled: true,
  });
  return (
    <Select<number, ISupplier>
      placeholder="Chọn supplier"
      value={value !== 0 ? value : undefined}
      fieldNames={{ label: "fullName", value: "recId" }}
      options={data?.list || []}
      onChange={onChange}
      loading={isLoading}
      {...restProps}
    />
  );
};
export default SelectorSupplier;
