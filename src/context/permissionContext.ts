import { ERolesFunctions } from "@/constants/permission.constant";
import { createContext } from "react";
export const LocalUserPermissionContext = createContext<ERolesFunctions[]>([]);
