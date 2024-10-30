import { useState } from "react";
import { useGetSellableCodeListQuery } from "@/queries/core/Sellable";
import { Button, Checkbox, SelectProps, Spin, Tag } from "antd";
import { SellableCodeItem } from "@/models/management/core/sellable.interface";
import { isArray } from "lodash";
import { Status } from "@/models/common.interface";
import { CheckOutlined, CheckSquareOutlined, MinusSquareOutlined, PlusSquareOutlined } from "@ant-design/icons";

export interface SellableCodeListSelectorProps {
  onChange?: (value: string, option: SellableCodeItem) => void;
  value?: string;
  disabled?: boolean;
  query?: string;
}
const SellableCodeListSelector2: React.FC<SellableCodeListSelectorProps> = ({
  onChange,
  value,
  disabled,
  query = "",
}) => {
  const [code, setCode] = useState("");

  const { data, isLoading } = useGetSellableCodeListQuery({
    code: query,
    enabled: query.length >= 3,
  });

  const handleChangeSelect: SelectProps<string, SellableCodeItem>["onChange"] = (value, option) => {
    onChange?.(value, isArray(option) ? option[0] : option);
  };

  if (isLoading) {
    return <Spin />;
  }
  return (
    <>
      <div className="list">
        {data?.map(({ status, isOperationCodeCreated, code, recId }) => (
          <div className="sellable-code-item flex items-center justify-between border p-3 mb-2 rounded-md" key={recId}>
            <div>
              <span className="font-semibold">{code}</span>
              <div>
                <Tag color={status === Status.OK ? "green" : "yellow"} bordered={false}>
                  {status === Status.OK ? "Đã duyệt" : status === Status.QQ ? "Chờ duyệt" : "--"}
                </Tag>
              </div>
            </div>
            <div>
              {!isOperationCodeCreated && status === Status.OK && (
                <Button
                  type="text"
                  // icon={value === code ? <MinusSquareOutlined /> : <PlusSquareOutlined />}
                  className="!text-emerald-600"
                  size="small"
                  onClick={() => handleChangeSelect(code, { status, isOperationCodeCreated, code, recId })}
                >
                  {value === code ? "Đang chọn" : "Chọn"}
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
export default SellableCodeListSelector2;
