import { useEffect, useState } from "react";
import { isUndefined } from "lodash";
import { PageContentStatus } from "@/models/management/cms/pageContent.interface";
import { Locale } from "@/models/management/cms/language.interface";
import MenuBoxListSelect, { MenuBoxListSelectProps } from "@/components/admin/MenuBoxListSelect";
import { MenuPositionType } from "@/models/management/cms/menu.interface";

import { useGetVisaTemplateContentMinimalListQuery } from "@/queries/cms/visaTemplate";
import {
  VisaTemplateContentMinimalQueryParams,
  IVisaTemplateContentMinimal,
} from "@/models/management/cms/visaTemplateContent.interface";

export interface BoxVisaListSelectorProps {
  locale: Locale;
  menuPosition: MenuPositionType;
  onAdd?: MenuBoxListSelectProps<number, IVisaTemplateContentMinimal>["onAdd"];
}
const BoxVisaListSelector: React.FC<BoxVisaListSelectorProps> = ({ locale, menuPosition, onAdd }) => {
  const initPageQueryParams = new VisaTemplateContentMinimalQueryParams(
    { lang: locale.key, status: PageContentStatus.PUBLISH },
    1,
    10,
    { sortColumn: "id", direction: "desc" },
  );
  const [queryParams, setQueryParams] = useState(initPageQueryParams);
  const { data, isLoading } = useGetVisaTemplateContentMinimalListQuery(queryParams, !isUndefined(locale));
  const { list: visaContentList, pageCurrent, pageSize, totalItems } = data || {};

  const onChangePage: Required<
    MenuBoxListSelectProps<number, IVisaTemplateContentMinimal>
  >["pagination"]["onChange"] = (page, pageSize) => {
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
    <MenuBoxListSelect<number, IVisaTemplateContentMinimal>
      loading={isLoading}
      items={visaContentList}
      pagination={{ totalItem: totalItems, onChange: onChangePage, pageCurrent: pageCurrent, pageSize: pageSize }}
      onAdd={onAdd}
    />
  );
};
export default BoxVisaListSelector;
