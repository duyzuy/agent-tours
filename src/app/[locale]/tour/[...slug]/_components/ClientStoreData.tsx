"use client";
import { useLanguage } from "@/app/[locale]/hooks/useLanguage";
import { ELanguageActionType } from "@/app/[locale]/store/actions/languageActions";
import { ICMSTemplateContent } from "@/models/management/cms/cmsTemplateContent.interface";
import { useEffect } from "react";

interface ClientStoreDataProps {
    data?: ICMSTemplateContent["languages"];
}
const ClientStoreData: React.FC<ClientStoreDataProps> = ({ data }) => {
    const [langInfo, dispatch] = useLanguage();

    console.log("store data", langInfo);
    useEffect(() => {
        if (data) {
            dispatch({
                type: ELanguageActionType.SET_CMSCONTENT_TOUR,
                payload: data,
            });
        }
    }, [data]);
    return null;
};
export default ClientStoreData;
