import React, { useEffect, memo, useState } from "react";
import { Select, SelectProps } from "antd";
import { LangCode } from "@/models/management/cms/language.interface";
import classNames from "classnames";
import { TagQueryParamsData } from "../../../tag/module/tag.interface";
import { useGetTagListLangQuery } from "@/queries/cms/tag";
import { PageContentStatus } from "@/models/management/cms/pageContent.interface";
import { ITagMinimal } from "@/models/management/tag.interface";
export interface TagsSelectorProps {
  lang: LangCode;
  value?: (number | undefined)[];
  className?: string;
  onChange?: SelectProps<(number | undefined)[], ITagMinimal>["onChange"];
}
const TagsSelector: React.FC<TagsSelectorProps> = ({ lang, value, className = "", onChange }) => {
  const [queryParams, setQueryParams] = useState(
    new TagQueryParamsData({ lang: lang, status: PageContentStatus.PUBLISH }, 1, 9999),
  );

  const { data: tagData, isLoading } = useGetTagListLangQuery({ queryParams: queryParams });

  useEffect(() => {
    setQueryParams((oldData) => ({ ...oldData, requestObject: { ...oldData.requestObject, lang: lang } }));
  }, [lang]);
  return (
    <div
      className={classNames("box border rounded-[4px]", {
        [className]: className,
      })}
    >
      <div className="tags-">
        <div className="py-4 border-b px-4">
          <p className="font-bold">Thẻ bài viết</p>
        </div>
        <div className="overflow-hidden overflow-y-auto px-4 py-4">
          <Select
            mode="multiple"
            style={{ width: "100%" }}
            fieldNames={{ label: "name", value: "id" }}
            placeholder="Chọn thẻ bài viết"
            value={value}
            options={tagData?.list}
            loading={isLoading}
            onChange={onChange}
          />
        </div>
      </div>
    </div>
  );
};
export default memo(TagsSelector);
