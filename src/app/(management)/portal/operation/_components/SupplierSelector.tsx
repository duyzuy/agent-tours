import { useState } from "react";
import { Select, SelectProps } from "antd";
import { isArray } from "lodash";
import { useGetSupplierListCoreQuery } from "@/queries/core/supplier";
import { ISupplier, SupplierQueryParams } from "@/models/management/supplier.interface";
import { Status } from "@/models/common.interface";

export interface SupplierSelectorProps {
  onChange?: (value: number, data: ISupplier) => void;
  value?: number;
}
const SupplierSelector: React.FC<SupplierSelectorProps> = ({ onChange, value }) => {
  const [code, setCode] = useState("");

  // const { data, isLoading } = useGetLocalUserList({ userTypeList: [ELocalUserType.ADMIN, ELocalUserType.STAFF] });
  const queryParams = new SupplierQueryParams({ fullName: "", shortName: "", status: Status.OK }, 1, 100);

  const { data, isLoading } = useGetSupplierListCoreQuery({ enabled: true });

  const handleChangeSelect: SelectProps<number, ISupplier>["onChange"] = (value, option) => {
    onChange?.(value, isArray(option) ? option[0] : option);
  };

  const handleSearch = (value: string) => {
    setCode(value);
  };
  return (
    <>
      <Select<number, ISupplier>
        value={value}
        fieldNames={{ label: "fullName", value: "recId" }}
        optionRender={(option) => {
          return <>{`${option.data.fullName} - ${option.data.shortName}`}</>;
        }}
        options={data?.list || []}
        placeholder="Supplier"
        onChange={handleChangeSelect}
        onSearch={handleSearch}
        showSearch
        loading={isLoading}
      />
    </>
  );
};
export default SupplierSelector;
