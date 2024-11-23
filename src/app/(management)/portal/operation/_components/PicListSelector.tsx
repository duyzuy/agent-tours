import { useState } from "react";

import { Select, SelectProps } from "antd";
import { isArray } from "lodash";
import { useGetLocalUserList } from "@/queries/localUser";
import { ELocalUserType, ILocalUser } from "@/models/management/localUser.interface";
export interface PicListSelectorProps {
  onChange?: (value: number, data: ILocalUser) => void;
  value?: number;
}
const PicListSelector: React.FC<PicListSelectorProps> = ({ onChange, value }) => {
  const [code, setCode] = useState("");

  const { data, isLoading } = useGetLocalUserList({ userTypeList: [ELocalUserType.ADMIN, ELocalUserType.STAFF] });

  const handleChangeSelect: SelectProps<number, ILocalUser>["onChange"] = (value, option) => {
    onChange?.(value, isArray(option) ? option[0] : option);
  };

  const handleSearch = (value: string) => {
    setCode(value);
  };
  return (
    <>
      <Select<number, ILocalUser>
        value={value}
        fieldNames={{ label: "fullname", value: "recId" }}
        options={data}
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
