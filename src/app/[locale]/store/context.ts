import { createContext } from "react";

import { LangCode } from "@/models/management/cms/language.interface";
import { LanguageActions } from "./actions";
import { LanguageContentContainer } from "./type";
import { ICustomerProfile } from "@/models/customerAuth.interface";

export const LanguageContext = createContext<
    [LanguageContentContainer, React.Dispatch<LanguageActions>] | undefined
>(undefined);

export const CustomerAuthContext = createContext<
    [ICustomerProfile, React.Dispatch<LanguageActions>] | undefined
>(undefined);
