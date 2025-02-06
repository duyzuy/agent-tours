import { LocalUserAgentListResponse } from "@/models/management/localUser.interface";
import { Select, SelectProps } from "antd";
import { useGetUserAgentList } from "@/queries/localUser";
import { isArray } from "lodash";
export interface AgentListSelectorProps {
  value?: number;
  disabled?: boolean;
  onSelect?: (agent: LocalUserAgentListResponse["result"][number]) => void;
}
const AgentListSelector = ({ value, onSelect, disabled }: AgentListSelectorProps) => {
  const { data: agentList, isLoading } = useGetUserAgentList();

  const handleChange: SelectProps<number, LocalUserAgentListResponse["result"][number]>["onChange"] = (
    value,
    option,
  ) => {
    onSelect?.(isArray(option) ? option[0] : option);
  };
  return (
    <Select<number, LocalUserAgentListResponse["result"][number]>
      value={value}
      fieldNames={{ label: "fullname", value: "recId" }}
      options={agentList}
      loading={isLoading}
      onChange={handleChange}
      placeholder="Chọn Agent"
      disabled={disabled}
    />
  );
};
export default AgentListSelector;
