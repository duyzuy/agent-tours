import { createContext } from "react";
import { ILocalUserProfileRs } from "@/model/management/localAuth.interface";
export const LocalUserProfileContext = createContext<
    ILocalUserProfileRs["result"] | undefined
>(undefined);
