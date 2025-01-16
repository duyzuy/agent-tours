"use client";
import { ICMSTemplateContent } from "@/models/management/cms/cmsTemplateContent.interface";
import { useEffect } from "react";
import { ELanguageActionType } from "@/store/actions/languageActions";
import { useLanguage } from "@/store/hooks";
interface ClientStoreDataProps {
  data?: ICMSTemplateContent["languages"];
  log: any;
}
const ClientStoreData: React.FC<ClientStoreDataProps> = ({ data, log }) => {
  const [langInfo, dispatch] = useLanguage();

  console.log(log);
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
