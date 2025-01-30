"use client";
import { ICMSTemplateContent } from "@/models/management/cms/cmsTemplateContent.interface";
import { useEffect } from "react";
import { useLanguage } from "@/store";
interface ClientStoreDataProps {
  data: ICMSTemplateContent["languages"];
}
const ClientStoreData: React.FC<ClientStoreDataProps> = ({ data }) => {
  const [langInfo, dispatch] = useLanguage();

  useEffect(() => {
    if (data) {
      dispatch({
        type: "SET_CMSCONTENT_TOUR",
        payload: data,
      });
    }
  }, [data]);
  return null;
};
export default ClientStoreData;
