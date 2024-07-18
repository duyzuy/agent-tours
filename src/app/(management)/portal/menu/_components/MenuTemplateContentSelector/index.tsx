import { useEffect, useState } from "react";
import { isUndefined } from "lodash";
import { PageContentStatus } from "@/models/management/cms/pageContent.interface";
import { Locale } from "@/models/management/cms/language.interface";
import MenuBoxListSelect, { MenuBoxListSelectProps } from "@/components/admin/MenuBoxListSelect";
import { MenuPositionType } from "@/models/management/cms/menu.interface";
import { useGetCMSTemplateContentMinimalListQuery } from "@/queries/cms/cmsTemplate";
import {
  CMSTemplateContentMinimalQueryParams,
  ICMSTemplateContentMinimal,
} from "@/models/management/cms/cmsTemplateContent.interface";

export interface MenuTemplateContentSelectorProps {
  locale: Locale;
  menuPosition: MenuPositionType;
  onAdd?: MenuBoxListSelectProps<number, ICMSTemplateContentMinimal>["onAdd"];
}
const MenuTemplateContentSelector: React.FC<MenuTemplateContentSelectorProps> = ({ locale, menuPosition, onAdd }) => {
  const initQueryParams = new CMSTemplateContentMinimalQueryParams(
    { lang: locale.key, status: PageContentStatus.PUBLISH },
    1,
    10,
    { sortColumn: "id", direction: "desc" },
  );
  const [queryParams, setQueryParams] = useState(initQueryParams);
  const { data, isLoading } = useGetCMSTemplateContentMinimalListQuery(queryParams, !isUndefined(locale));
  const { list: templateContentList, pageCurrent, pageSize, totalItems } = data || {};

  const onChangePage: Required<MenuBoxListSelectProps<number, ICMSTemplateContentMinimal>>["pagination"]["onChange"] = (
    page,
    pageSize,
  ) => {
    setQueryParams((oldData) => ({
      ...oldData,
      pageCurrent: page,
    }));
  };

  useEffect(() => {
    locale &&
      setQueryParams((prev) => ({
        ...prev,
        requestObject: {
          ...(prev.requestObject || {}),
          lang: locale.key,
        },
      }));
  }, [locale]);
  return (
    <MenuBoxListSelect<number, ICMSTemplateContentMinimal>
      loading={isLoading}
      items={templateContentList}
      pagination={{ totalItem: totalItems, onChange: onChangePage, pageCurrent: pageCurrent, pageSize: pageSize }}
      onAdd={onAdd}
    />
  );
};
export default MenuTemplateContentSelector;
