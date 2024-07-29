import React, { useEffect, memo, useState } from "react";
import { Space, Pagination, Spin, Checkbox } from "antd";
import { useGetPageContentListParentByLangQuery } from "@/queries/cms/content";
import { LangCode } from "@/models/management/cms/language.interface";
import { PageContentQueryParams } from "@/models/management/cms/pageContent.interface";
import classNames from "classnames";

export interface PageParentListProps {
  lang: LangCode;
  value?: number;
  className?: string;
  excludeIds?: number[];
  onChange?: (value: number) => void;
}
const PageParentList: React.FC<PageParentListProps> = ({ lang, value, className = "", excludeIds, onChange }) => {
  const [pagination, setPaginations] = useState<{
    pageCurrent?: number;
    pageSize?: number;
    totalItems?: number;
  }>();
  const [queryParams, setQueryParams] = useState(
    new PageContentQueryParams({ lang: lang, excludes: excludeIds }, 1, 10),
  );

  const { data: pageParentData, isLoading } = useGetPageContentListParentByLangQuery(queryParams);

  useEffect(() => {
    if (!isLoading && pageParentData) {
      setPaginations({
        pageCurrent: pageParentData.pageCurrent,
        pageSize: pageParentData.pageSize,
        totalItems: pageParentData.totalItems,
      });
    }
  }, [pageParentData, isLoading]);

  return (
    <div
      className={classNames("box border rounded-[4px]", {
        [className]: className,
      })}
    >
      <div className="category">
        <div className="py-4 border-b px-4">
          <p className="font-bold">Trang nội dung cha</p>
        </div>
        <div className="category-list h-[250px] overflow-hidden overflow-y-auto px-4 py-4">
          {(isLoading && <Spin />) || (
            <Space direction="vertical">
              {pageParentData?.list.map((page) => (
                <Checkbox
                  value={page.id}
                  key={page.id}
                  checked={page.id === value}
                  onChange={(e) => onChange?.(e.target.value)}
                >
                  {page.name}
                </Checkbox>
              ))}
            </Space>
          )}
        </div>
        <div className="py-3 border-t">
          <Pagination
            pageSize={pagination?.pageSize}
            total={pagination?.totalItems}
            current={pagination?.pageCurrent}
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
export default memo(PageParentList);
