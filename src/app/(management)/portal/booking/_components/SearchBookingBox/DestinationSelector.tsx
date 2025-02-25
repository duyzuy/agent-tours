import { LocalSearchDestinationListRs } from "@/models/management/localSearchDestination.interface";
import { useGetLocalSearchListMISCQuery } from "@/queries/cms/destination";
import { Select, SelectProps } from "antd";
import { isArray } from "lodash";
import { LocalSearchQueryParams } from "@/models/management/localSearchDestination.interface";

export interface DestinationSelectorProps {
  value?: LocalSearchDestinationListRs["result"][number];
  onChange?: (data: LocalSearchDestinationListRs["result"][number]) => void;
}
const DestinationSelector: React.FC<DestinationSelectorProps> = ({ value, onChange }) => {
  const initDestinationSearchParams = new LocalSearchQueryParams({}, 1, 1000, {
    sortColumn: "id",
    direction: "desc",
  });
  const { data: destinationList, isLoading: isLoading } = useGetLocalSearchListMISCQuery({
    enabled: true,
    queryParams: initDestinationSearchParams,
  });

  const onChangeDestination: SelectProps<number, LocalSearchDestinationListRs["result"][number]>["onChange"] = (
    value,
    options,
  ) => {
    onChange?.(isArray(options) ? options[0] : options);
  };

  return (
    <Select<number, LocalSearchDestinationListRs["result"][number]>
      placeholder="Chọn điểm đến"
      bordered={false}
      loading={isLoading}
      style={{ padding: 0 }}
      showSearch={true}
      fieldNames={{
        label: "name",
        value: "id",
      }}
      value={value ? value.id : undefined}
      options={destinationList || []}
      onChange={onChangeDestination}
      getPopupContainer={(triggerNode) => triggerNode.parentElement.parentElement}
      suffixIcon={null}
    />
  );
};
export default DestinationSelector;
