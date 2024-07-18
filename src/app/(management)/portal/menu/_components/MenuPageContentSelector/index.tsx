import { useEffect, useState } from "react";
import { isUndefined } from "lodash";
import { useGetPageContentMinimalListQuery } from "@/queries/cms/content";
import {
  IPageContentItemMinimal,
  PageContentMinimalQueryParams,
  PageContentStatus,
} from "@/models/management/cms/pageContent.interface";
import { Locale } from "@/models/management/cms/language.interface";
import MenuBoxListSelect, { MenuBoxListSelectProps } from "@/components/admin/MenuBoxListSelect";
import { MenuPositionType } from "@/models/management/cms/menu.interface";

export interface MenuPageContentSelectorProps {
  locale: Locale;
  menuPosition: MenuPositionType;
  onAdd?: MenuBoxListSelectProps<number, IPageContentItemMinimal>["onAdd"];
}
const MenuPageContentSelector: React.FC<MenuPageContentSelectorProps> = ({ locale, menuPosition, onAdd }) => {
  const initQueryParams = new PageContentMinimalQueryParams(
    { lang: locale.key, status: PageContentStatus.PUBLISH },
    1,
    10,
    { direction: "desc", sortColumn: "id" },
  );
  const [queryParams, setQueryParams] = useState(initQueryParams);

  const { data, isLoading } = useGetPageContentMinimalListQuery(queryParams, !isUndefined(locale));

  const { list: pageContentList, totalItems, pageCurrent, pageSize } = data || {};

  const onChangePage: Required<MenuBoxListSelectProps<number, IPageContentItemMinimal>>["pagination"]["onChange"] = (
    page,
    pageSize,
  ) => {
    setQueryParams((oldData) => ({
      ...oldData,
      pageCurrent: page,
    }));
  };

  useEffect(() => {
    setQueryParams((prev) => ({
      ...prev,
      requestObject: {
        ...prev.requestObject,
        lang: locale.key,
      },
    }));
  }, [locale]);
  return (
    <MenuBoxListSelect<number, IPageContentItemMinimal>
      loading={isLoading}
      items={pageContentList}
      pagination={{ totalItem: totalItems, onChange: onChangePage, pageCurrent: pageCurrent, pageSize: pageSize }}
      onAdd={onAdd}
    />
  );
};
export default MenuPageContentSelector;
