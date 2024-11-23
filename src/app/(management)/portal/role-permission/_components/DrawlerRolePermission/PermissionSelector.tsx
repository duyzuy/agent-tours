import { useGetPermissionsQuery } from "@/queries/role";
import { Select } from "antd";

const PermissionSelector = () => {
  const { data: permissions, isLoading } = useGetPermissionsQuery();
  return <Select options={[]} loading={isLoading} />;
};

export default PermissionSelector;
