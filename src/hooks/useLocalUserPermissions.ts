import { useContext } from "react";
import { LocalUserPermissionContext } from "@/context/permissionContext";

const useLocalUserPermissions = () => {
    return useContext(LocalUserPermissionContext);
};
export default useLocalUserPermissions;
