import { useContext } from "react";
import { LocalUserPermissionContext } from "@/context/permissionContext";

const useLocalUserPermissions = () => {
  const context = useContext(LocalUserPermissionContext);

  return context;
};
export default useLocalUserPermissions;
