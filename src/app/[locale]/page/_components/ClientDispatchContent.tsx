"use client";
import { useEffect } from "react";
import { useLanguage } from "@/store";

import { LangCode } from "@/models/management/cms/language.interface";

interface ClientDispatchContentProps {
  languages: { slug: string; lang: LangCode }[];
}
const ClientDispatchContent: React.FC<ClientDispatchContentProps> = ({ languages }) => {
  const [_, dispatch] = useLanguage();

  useEffect(() => {
    if (languages && languages.length) {
      dispatch({
        type: "SET_PAGE_CONTENT",
        payload: languages,
      });
    }
  }, [languages]);
  return null;
};
export default ClientDispatchContent;
