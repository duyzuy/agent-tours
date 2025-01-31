"use client";
import { ICMSTemplateContent } from "@/models/management/cms/cmsTemplateContent.interface";
import { useEffect } from "react";

import { useAppDispatch } from "@/store";
interface ClientStoreDataProps {
  data: ICMSTemplateContent["languages"];
}
const ClientStoreData: React.FC<ClientStoreDataProps> = ({ data }) => {
  const dispatch = useAppDispatch();

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
