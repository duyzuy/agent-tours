import { createContext } from "react";
import { ILocalUserProfile } from "@/models/management/localAuth.interface";
export const LocalUserProfileContext = createContext<ILocalUserProfile | undefined>(undefined);
