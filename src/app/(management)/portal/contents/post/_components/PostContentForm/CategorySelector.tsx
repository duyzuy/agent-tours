import React, { useEffect, memo, useState } from "react";
import { Space, Pagination, Spin, Checkbox } from "antd";
import { useGetCategoryListLangQuery, useGetCategoryParentListQuery } from "@/queries/cms/category";
import { LangCode } from "@/models/management/cms/language.interface";
import classNames from "classnames";
import { CategoryQueryParamsData } from "../../../category/modules/category.interface";
import { ICategoryMinimal } from "@/models/management/category.interface";
export interface CategorySelectorProps {
  lang: LangCode;
  value?: number;
  className?: string;
  excludeIds?: number[];
  onChange?: (value: number, option: ICategoryMinimal) => void;
  error?: string;
}
const CategorySelector = ({ lang, value, className = "", excludeIds, onChange, error }: CategorySelectorProps) => {
  const [queryParams, setQueryParams] = useState(new CategoryQueryParamsData({ lang: lang }, 1, 10));

  const { data: categoryData, isLoading } = useGetCategoryListLangQuery({ queryParams: queryParams });

  useEffect(() => {
    setQueryParams((oldData) => ({ ...oldData, requestObject: { ...oldData.requestObject, lang: lang } }));
  }, [lang]);
  return (
    <div
      className={classNames("box border rounded-[4px]", {
        [className]: className,
      })}
    >
      <div className="category">
        <div className="py-4 border-b px-4">
          <p className="font-bold">Danh mục cha</p>
        </div>
        {error ? <div className="error text-red-500 text-xs px-4 py-2">{error}</div> : null}
        <div className="category-list h-[250px] overflow-hidden overflow-y-auto px-4 py-4">
          {isLoading ? (
            <Spin />
          ) : (
            <CategorySelector.List items={categoryData?.list} value={value} onChange={onChange} depth={0} />
          )}
        </div>
        <div className="py-3 border-t">
          <Pagination
            pageSize={categoryData?.pageSize ?? 1}
            total={categoryData?.totalItems}
            current={categoryData?.pageCurrent}
            size="small"
            disabled={isLoading}
            onChange={(page) =>
              setQueryParams((prev) => ({
                ...prev,
                pageCurrent: page,
              }))
            }
          />
        </div>
      </div>
    </div>
  );
};
export default memo(CategorySelector);

interface CategorySelectorListProps {
  items?: ICategoryMinimal[];
  value?: number;
  onChange?: (value: number, option: ICategoryMinimal) => void;
  depth?: number;
}
CategorySelector.List = function CategorySelectorList({
  items,
  onChange,
  value,
  depth = 0,
}: CategorySelectorListProps) {
  return (
    <div
      className={classNames(`cat-selector-list depth-${depth}`, {
        "pl-6": depth === 1,
        "pl-12": depth === 2,
      })}
    >
      {items?.map((item) => (
        <div className="cat-selector-item" key={item.id}>
          <div className="cat-selector-item mb-2">
            <Checkbox
              value={item.id}
              key={item.id}
              checked={item.id === value}
              onChange={(e) => onChange?.(e.target.value, item)}
            >
              {item.name}
            </Checkbox>
          </div>
          {item.children ? (
            <CategorySelectorList items={item.children} value={value} onChange={onChange} depth={depth + 1} />
          ) : null}
        </div>
      ))}
    </div>
  );
};
