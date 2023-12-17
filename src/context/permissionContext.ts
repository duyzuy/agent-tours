import {
    ERolesFunctions,
    TRoleCondition,
} from "@/constants/permission.constant";
import { createContext } from "react";
export const LocalUserPermissionContext = createContext<
    [ERolesFunctions[], checkPers: (condition: TRoleCondition) => boolean] | []
>([]);
