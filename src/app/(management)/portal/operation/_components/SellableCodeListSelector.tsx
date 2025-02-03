import { useGetSellableCodeListQuery } from "@/queries/core/Sellable";
import { Checkbox, Empty, SelectProps, Spin, Tag } from "antd";
import { SellableCodeItem } from "@/models/management/core/sellable.interface";
import { isArray } from "lodash";
import { Status } from "@/models/common.interface";

export interface SellableCodeListSelectorProps {
  onChange?: (value: string, option: SellableCodeItem) => void;
  value?: string;
  disabled?: boolean;
  query?: string;
}
const SellableCodeListSelector: React.FC<SellableCodeListSelectorProps> = ({
  onChange,
  value,
  disabled,
  query = "",
}) => {
  const { data, isLoading } = useGetSellableCodeListQuery({
    code: query,
    enabled: query.length >= 3,
  });

  const handleChangeSelect: SelectProps<string, SellableCodeItem>["onChange"] = (value, option) => {
    onChange?.(value, isArray(option) ? option[0] : option);
  };

  return (
    <div className="sellable-list">
      {isLoading ? (
        <Spin>
          <div className="flex items-center justify-center h-20 bg-gray-100 text-center rounded-md">Loading...</div>
        </Spin>
      ) : data && data.length ? (
        data.map(({ status, isOperationCodeCreated, type, code, recId }) => (
          <div key={recId} className="flex items-center justify-between border pl-4 pr-1 py-2 mb-2 rounded-md">
            <div>
              <div className="font-semibold">{type}</div>
              <div className="flex items-center gap-x-3">
                <div className="text-xs">{code}</div>
                <Tag color={status === Status.OK ? "green" : "gold"} bordered={false}>
                  {status === Status.OK ? "Đã duyệt" : status === Status.QQ ? "Chờ duyệt" : "--"}
                </Tag>
              </div>
            </div>
            {!isOperationCodeCreated && status === Status.OK && (
              <Checkbox
                checked={value === code}
                onChange={() => handleChangeSelect(code, { status, type, isOperationCodeCreated, code, recId })}
              >
                Chọn
              </Checkbox>
            )}
          </div>
        ))
      ) : (
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="Đang trống" />
      )}
    </div>
  );
};
export default SellableCodeListSelector;
