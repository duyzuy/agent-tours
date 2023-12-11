import { createContext } from "react";
import { ILocalUserProfileRs } from "@/models/management/localAuth.interface";
export const LocalUserProfileContext = createContext<
    ILocalUserProfileRs["result"] | undefined
>(undefined);
