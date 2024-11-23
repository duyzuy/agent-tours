import { useContext } from "react";
import { LocalUserPermissionContext } from "@/context/permissionContext";

const useLocalUserPermissions = () => {
  const context = useContext(LocalUserPermissionContext);
  if (!context || !context.length) {
    throw new Error("Context must use in LocalUserPermissionContext");
  }
  return context;
};
export default useLocalUserPermissions;
