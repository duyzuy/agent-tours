import { IRole } from "@/models/management/role.interface";
import { useGetRoles } from "@/modules/admin/role";
import { Select, SelectProps } from "antd";

export interface RoleSelectorProps {
  value?: string;
  onChange?: SelectProps<string, IRole>["onChange"];
  disabled?: boolean;
}
const RoleSelector: React.FC<RoleSelectorProps> = ({ onChange, value, disabled }) => {
  const { data: roles, isLoading } = useGetRoles();

  return (
    <Select<string, IRole>
      placeholder="Chọn quyền"
      fieldNames={{ label: "localUser_RoleValue", value: "localUser_RoleKey" }}
      options={roles?.roleList || []}
      value={value}
      loading={isLoading}
      onChange={onChange}
      disabled={disabled}
    />
  );
};
export default RoleSelector;
