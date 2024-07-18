import { useEffect, useState } from "react";
import { Locale } from "@/models/management/cms/language.interface";
import MenuBoxListSelect, { MenuBoxListSelectProps } from "@/components/admin/MenuBoxListSelect";

import { MenuPositionType } from "@/models/management/cms/menu.interface";
import { isUndefined } from "lodash";
import { useGetDestinationMinimalListQuery } from "@/queries/cms/destination";

import { DestinationMinimalQueryParams, IDestinationMinimal } from "@/models/management/region.interface";

export interface MenuDestinationSelectorProps {
  locale: Locale;
  menuPosition: MenuPositionType;
  onAdd?: MenuBoxListSelectProps<number, IDestinationMinimal>["onAdd"];
}
const MenuDestinationSelector: React.FC<MenuDestinationSelectorProps> = ({ locale, menuPosition, onAdd }) => {
  const initQueryParams = new DestinationMinimalQueryParams({ lang: locale.key }, 1, 10, {
    sortColumn: "id",
    direction: "desc",
  });
  const [queryParams, setQueryParams] = useState(initQueryParams);

  const { data, isLoading } = useGetDestinationMinimalListQuery(queryParams, !isUndefined(locale));
  const { list: destinationList, pageCurrent, pageSize, totalItems } = data || {};

  const onChangePage: Required<MenuBoxListSelectProps<number, IDestinationMinimal>>["pagination"]["onChange"] = (
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
          lang: locale.key,
        },
      }));
  }, [locale]);
  return (
    <MenuBoxListSelect<number, IDestinationMinimal>
      loading={isLoading}
      items={destinationList}
      pagination={{ totalItem: totalItems, onChange: onChangePage, pageCurrent: pageCurrent, pageSize: pageSize }}
      onAdd={onAdd}
    />
  );
};
export default MenuDestinationSelector;
