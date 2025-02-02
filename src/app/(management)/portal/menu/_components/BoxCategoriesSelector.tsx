import { useEffect, useState } from "react";
import { PageContentStatus } from "@/models/management/cms/pageContent.interface";
import { Locale } from "@/models/management/cms/language.interface";
import MenuBoxListSelect, { MenuBoxListSelectProps } from "@/components/admin/MenuBoxListSelect";
import { MenuPositionType } from "@/models/management/cms/menu.interface";
import { CategoryQueryParamsData } from "../../contents/category/modules/category.interface";
import { useGetCategoryListLangQuery } from "@/queries/cms/category";
import { ICategoryMinimal } from "@/models/management/category.interface";

export interface BoxCategoriesSelectorProps {
  locale: Locale;
  menuPosition: MenuPositionType;
  onAdd?: MenuBoxListSelectProps<number, ICategoryMinimal>["onAdd"];
}
const BoxCategoriesSelector: React.FC<BoxCategoriesSelectorProps> = ({ locale, menuPosition, onAdd }) => {
  const initQueryParams = new CategoryQueryParamsData({ lang: locale.key, status: PageContentStatus.PUBLISH }, 1, 10);
  const [queryParams, setQueryParams] = useState(initQueryParams);

  const { data, isLoading } = useGetCategoryListLangQuery({ queryParams: queryParams });

  const { list: categoryList, totalItems, pageCurrent, pageSize } = data || {};

  const onChangePage: Required<MenuBoxListSelectProps<number, ICategoryMinimal>>["pagination"]["onChange"] = (
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
    <MenuBoxListSelect<number, ICategoryMinimal>
      loading={isLoading}
      items={categoryList}
      pagination={{ totalItem: totalItems, onChange: onChangePage, pageCurrent: pageCurrent, pageSize: pageSize }}
      onAdd={onAdd}
    />
  );
};
export default BoxCategoriesSelector;
