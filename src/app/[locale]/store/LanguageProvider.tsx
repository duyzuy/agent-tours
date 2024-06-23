"use client";
import { LanguageContext } from "./context";
import { useReducer } from "react";
import { initLanguageContextState } from "./reducer";
import { languageReducer } from "./reducer";
type Props = {
    children?: React.ReactNode;
};

export const LanguageProvider = ({ children }: Props) => {
    const [state, dispatch] = useReducer(
        languageReducer,
        initLanguageContextState,
    );
    return (
        <LanguageContext.Provider value={[state, dispatch]}>
            {children}
        </LanguageContext.Provider>
    );
};
