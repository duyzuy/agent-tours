import { useQuery } from "@tanstack/react-query";
import { queryCMS } from "../var";
import { LangCode } from "@/models/management/cms/language.interface";
import { menuAPIs } from "@/services/management/cms/menu";
import { MenuPositionType } from "@/models/management/cms/menu.interface";

export const useGetMenuPositionListQuery = ({
  menuPosition,
  lang,
}: {
  menuPosition: MenuPositionType;
  lang: LangCode;
}) => {
  return useQuery({
    queryKey: [queryCMS.GET_MENU_POSITION_LIST, { menuPosition, lang }],
    queryFn: () => menuAPIs.getList({ menuPosition, lang }),
    select: (data) => {
      return data.result.sort((a, b) => a.order - b.order);
    },
  });
};
