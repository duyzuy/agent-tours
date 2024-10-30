import { Suspense, useState, useDeferredValue } from "react";
import { useGetSellableCodeListQuery } from "@/queries/core/Sellable";
import { Select, SelectProps } from "antd";
import { SellableCodeItem } from "@/models/management/core/sellable.interface";
import { isArray } from "lodash";

export interface SellableCodeListSelectorProps {
  onChange?: (value: string, option: SellableCodeItem) => void;
  value?: string;
  disabled?: boolean;
}
const SellableCodeListSelector: React.FC<SellableCodeListSelectorProps> = ({ onChange, value, disabled }) => {
  const [code, setCode] = useState("");
  const { data, isLoading } = useGetSellableCodeListQuery({
    code: code,
    enabled: code.length >= 3,
  });

  const handleChangeSelect: SelectProps<string, SellableCodeItem>["onChange"] = (value, option) => {
    onChange?.(value, isArray(option) ? option[0] : option);
  };

  return (
    <>
      <Select<string, SellableCodeItem>
        showSearch
        value={value}
        fieldNames={{ label: "code", value: "code" }}
        options={data ?? []}
        placeholder="Nhập từ 3 ký tự."
        onChange={handleChangeSelect}
        onSearch={setCode}
        loading={isLoading}
        disabled={disabled}
      />
    </>
  );
};
export default SellableCodeListSelector;
