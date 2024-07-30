import { useEffect, useState } from "react";
import { PageContentStatus } from "@/models/management/cms/pageContent.interface";
import { Locale } from "@/models/management/cms/language.interface";
import MenuBoxListSelect, { MenuBoxListSelectProps } from "@/components/admin/MenuBoxListSelect";
import { MenuPositionType } from "@/models/management/cms/menu.interface";

import { TagQueryParamsData } from "../../../contents/tag/module/tag.interface";
import { useGetTagListLangQuery } from "@/queries/cms/tag";
import { ITagMinimal } from "@/models/management/tag.interface";

export interface MenuTagSelectorProps {
  locale: Locale;
  menuPosition: MenuPositionType;
  onAdd?: MenuBoxListSelectProps<number, ITagMinimal>["onAdd"];
}
const MenuTagSelector: React.FC<MenuTagSelectorProps> = ({ locale, menuPosition, onAdd }) => {
  const initQueryParams = new TagQueryParamsData({ lang: locale.key, status: PageContentStatus.PUBLISH }, 1, 10);
  const [queryParams, setQueryParams] = useState(initQueryParams);

  const { data, isLoading } = useGetTagListLangQuery({ queryParams: queryParams });

  const { list: tagList, totalItems, pageCurrent, pageSize } = data || {};

  const onChangePage: Required<MenuBoxListSelectProps<number, ITagMinimal>>["pagination"]["onChange"] = (
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
    <MenuBoxListSelect<number, ITagMinimal>
      loading={isLoading}
      items={tagList}
      pagination={{ totalItem: totalItems, onChange: onChangePage, pageCurrent: pageCurrent, pageSize: pageSize }}
      onAdd={onAdd}
    />
  );
};
export default MenuTagSelector;
