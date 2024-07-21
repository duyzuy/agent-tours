import { LangCode } from "@/models/management/cms/language.interface";
import { MenuPositionType } from "@/models/management/cms/menu.interface";
import { useGetMenuPositionListQuery } from "@/queries/cms/menu";
import { useEffect } from "react";
import useMenuManager from "../hooks/useMenuManager";

const useInitMenuPositionList = (menuKey: MenuPositionType, lang: LangCode) => {
  const { data, isLoading } = useGetMenuPositionListQuery({ menuPosition: menuKey, lang: lang });
  const [_, dispatch] = useMenuManager();

  console.log(data, isLoading);
  useEffect(() => {
    if (data && !isLoading) {
      dispatch({
        type: "SET_MENU_POSITION_LIST",
        payload: { position: menuKey, items: data },
      });
    }
  }, [data, isLoading]);

  return {
    isLoading,
  };
};
export default useInitMenuPositionList;
