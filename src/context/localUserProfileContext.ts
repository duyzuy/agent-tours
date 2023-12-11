import { createContext } from "react";
import { ILocalUserProfileRs } from "@/Model/Management/localAuth.interface";
export const LocalUserProfileContext = createContext<
    ILocalUserProfileRs["result"] | undefined
>(undefined);
