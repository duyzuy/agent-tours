import { useState } from "react";
import { useGetSellableCodeListQuery } from "@/queries/core/Sellable";
import { Select, SelectProps } from "antd";
import { SellableCodeItem } from "@/models/management/core/sellable.interface";
import { isArray } from "lodash";
import { useGetLocalUserList } from "@/queries/localUser";
import { ELocalUserType, ILocalUser, ILocalUserList } from "@/models/management/localUser.interface";
export interface PicListSelectorProps {
  onChange?: (value: number, data: ILocalUser) => void;
  value?: number;
}
const PicListSelector: React.FC<PicListSelectorProps> = ({ onChange, value }) => {
  const [code, setCode] = useState("");

  const { data, isLoading } = useGetLocalUserList({ userTypeList: [ELocalUserType.ADMIN, ELocalUserType.STAFF] });

  const handleChangeSelect: SelectProps<number, ILocalUserList["result"][0]>["onChange"] = (value, option) => {
    onChange?.(value, isArray(option) ? option[0] : option);
  };

  const handleSearch = (value: string) => {
    setCode(value);
  };
  return (
    <>
      <Select<number, ILocalUserList["result"][0]>
        value={value}
        fieldNames={{ label: "fullname", value: "recId" }}
        options={data?.result || []}
        placeholder="Người phụ trách"
        onChange={handleChangeSelect}
        onSearch={handleSearch}
        showSearch
        loading={isLoading}
      />
    </>
  );
};
export default PicListSelector;
