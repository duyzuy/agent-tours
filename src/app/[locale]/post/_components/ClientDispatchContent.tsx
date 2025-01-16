"use client";
import { useEffect } from "react";
import { useLanguage } from "@/store/hooks";
import { ELanguageActionType } from "@/store/actions/languageActions";
import { LangCode } from "@/models/management/cms/language.interface";

interface ClientDispatchContentProps {
  languages: { slug: string; lang: LangCode }[];
}
const ClientDispatchContent: React.FC<ClientDispatchContentProps> = ({ languages }) => {
  const [langssss, dispatch] = useLanguage();

  useEffect(() => {
    if (languages && languages.length) {
      dispatch({
        type: ELanguageActionType.SET_POST_CONTENT,
        payload: languages,
      });
    }
  }, [languages]);
  return null;
};
export default ClientDispatchContent;
