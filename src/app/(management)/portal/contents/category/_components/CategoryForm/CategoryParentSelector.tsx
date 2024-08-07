import React, { useEffect, memo, useState } from "react";
import { Space, Pagination, Spin, Checkbox } from "antd";
import { useGetCategoryParentListQuery } from "@/queries/cms/category";
import { LangCode } from "@/models/management/cms/language.interface";
import classNames from "classnames";
import { CategoryQueryParamsData } from "../../modules/category.interface";
export interface CategoryParentSelectorProps {
  lang: LangCode;
  value?: number;
  className?: string;
  excludeIds?: number[];
  onChange?: (value: number) => void;
}
const CategoryParentSelector: React.FC<CategoryParentSelectorProps> = ({
  lang,
  value,
  className = "",
  excludeIds,
  onChange,
}) => {
  const [queryParams, setQueryParams] = useState(
    new CategoryQueryParamsData({ lang: lang, excludes: excludeIds }, 1, 10),
  );

  const { data: categoryData, isLoading } = useGetCategoryParentListQuery(queryParams);

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
        <div className="category-list h-[250px] overflow-hidden overflow-y-auto px-4 py-4">
          {(isLoading && <Spin />) || (
            <Space direction="vertical">
              {categoryData?.list.map((cat) => (
                <Checkbox
                  value={cat.id}
                  key={cat.id}
                  checked={cat.id === value}
                  onChange={(e) => onChange?.(e.target.value)}
                >
                  {cat.name}
                </Checkbox>
              ))}
            </Space>
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
export default memo(CategoryParentSelector);
