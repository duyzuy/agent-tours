"use client";
import { IPageContentDetailPerLangRs } from "@/models/management/cms/pageContent.interface";
import { useLanguage } from "../../hooks/useLanguage";
import {
    initPageContentAction,
    ELanguageActionType,
} from "../../store/actions";
import { useEffect } from "react";
import { LangCode } from "@/models/management/cms/language.interface";
interface PageContainerProps {
    data?: IPageContentDetailPerLangRs["result"];
}
const PageContainer: React.FC<PageContainerProps> = ({ data }) => {
    const [_, dispatch] = useLanguage();

    useEffect(() => {
        if (data) {
            dispatch({
                type: ELanguageActionType.FETCH_CONTENT_TYPE,
                payload: data.languages,
            });
            // dispatch(initPageContentAction(data.languages));
        }
    }, []);
    return null;
};
export default PageContainer;
