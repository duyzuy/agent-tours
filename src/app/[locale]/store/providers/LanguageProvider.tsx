"use client";
import { LanguageContext } from "../context";
import { useReducer } from "react";
import { initLanguageState } from "../reducers";
import { languageReducer } from "../reducers";
type Props = {
    children?: React.ReactNode;
};

export const LanguageProvider = ({ children }: Props) => {
    const [state, dispatch] = useReducer(languageReducer, initLanguageState);
    return (
        <LanguageContext.Provider value={[state, dispatch]}>
            {children}
        </LanguageContext.Provider>
    );
};
