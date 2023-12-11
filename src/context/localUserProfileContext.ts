import { createContext } from "react";
import { ILocalUserProfileRs } from "@/model/Management/localAuth.interface";
export const LocalUserProfileContext = createContext<
    ILocalUserProfileRs["result"] | undefined
>(undefined);
