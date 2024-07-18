import { useState } from "react";
import { SupplierQueryParams } from "@/models/management/supplier.interface";
import { useGetSupplierListCoreQuery } from "@/queries/core/supplier";
import FormItem from "@/components/base/FormItem";
import { Select, SelectProps } from "antd";
import { Status } from "@/models/common.interface";
import { ISupplier } from "@/models/management/supplier.interface";
import { number } from "yup";
export type SupplierSelectorProps = SelectProps & {
  errors?: string;
  label?: string;
  onChange?: SelectProps<number, ISupplier>["onChange"];
  value?: string;
};
const SupplierSelector: React.FC<SupplierSelectorProps> = ({
  errors,
  label = "Chọn Supplier",
  disabled,
  onChange,
  value,
}) => {
  const initQueryParams = new SupplierQueryParams(
    { status: Status.OK, shortName: "", fullName: "", vendorId: undefined },
    1,
    99,
  );
  const [queryParams, setQueryParams] = useState(initQueryParams);
  const { data: supplierData, isLoading } = useGetSupplierListCoreQuery({
    enabled: true,
    queryParams: queryParams,
  });

  return (
    <FormItem label={label} required validateStatus={errors ? "error" : ""} help={errors || ""}>
      <Select<number, ISupplier>
        placeholder="Chọn Supplier"
        value={value}
        disabled={disabled}
        onChange={onChange}
        fieldNames={{ label: "fullName", value: "recId" }}
        options={supplierData?.list || []}
        loading={isLoading}
      />
    </FormItem>
  );
};
export default SupplierSelector;
