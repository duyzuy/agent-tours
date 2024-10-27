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
  const deferredQueryCode = useDeferredValue(code);
  const { data, isLoading } = useGetSellableCodeListQuery({
    code: deferredQueryCode,
    enabled: deferredQueryCode.length >= 3,
  });

  const handleChangeSelect: SelectProps<string, SellableCodeItem>["onChange"] = (value, option) => {
    onChange?.(value, isArray(option) ? option[0] : option);
  };

  const handleSearch = (value: string) => {
    setCode(value);
  };

  console.log(data);
  return (
    <>
      <Suspense fallback={<>SEARCHING....</>}>
        <Select<string, SellableCodeItem>
          showSearch
          value={value}
          fieldNames={{ label: "code", value: "code" }}
          options={data ?? []}
          placeholder="Nhập từ 3 ký tự."
          onChange={handleChangeSelect}
          onSearch={handleSearch}
          loading={isLoading}
          disabled={disabled}
        />
      </Suspense>
    </>
  );
};
export default SellableCodeListSelector;
