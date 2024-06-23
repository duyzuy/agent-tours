import { LanguageContext } from "../store/context";
import { LanguageContentContainer } from "../store/type";

import { useContext } from "react";
export const useLanguage = () => {
    const languages = useContext(LanguageContext);

    if (!languages) {
        throw new Error("Hook must use under language provider");
    }

    return languages;
};

export const useLanguageSelector = <T>(
    selector: (state: LanguageContentContainer) => T,
) => {
    const languages = useContext(LanguageContext);

    if (!languages) {
        throw new Error("Hook must use under language provider");
    }
    const [state, _] = languages;

    return selector(state);
};
