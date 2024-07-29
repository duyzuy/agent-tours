"use client";
import { useMemo, useState } from "react";
import PageContainer from "@/components/admin/PageContainer";
import TableListPage from "@/components/admin/TableListPage";
import { useGetCategoryListLangQuery } from "@/queries/cms/category";
import { useRouter } from "next/navigation";
import { CategoryQueryParamsData } from "../modules/category.interface";
import { CategoryType, columns } from "./columns";
import { CategoryListResponse } from "@/models/management/category.interface";
import { LINKS } from "@/constants/links.constant";
const CategoryPage = () => {
  const initQueryParams = new CategoryQueryParamsData(undefined, 1, 20);
  const [queryParams, setQueryParams] = useState(initQueryParams);
  const { data, isLoading } = useGetCategoryListLangQuery({ queryParams: queryParams });
  const router = useRouter();

  const getPageListWithoutChild = (items: CategoryListResponse["result"]) => {
    return (
      items.reduce<CategoryType[]>((acc, item) => {
        if (item.children && item.children.length) {
          const childofItem = getPageListWithoutChild(item.children);
          acc = [...acc, { ...item, children: childofItem }];
        } else {
          const { children, ...restItem } = item;
          acc = [...acc, { ...restItem }];
        }
        return acc;
      }, []) || []
    );
  };
  const categoryList = useMemo(() => getPageListWithoutChild(data?.list || []), [data]);

  return (
    <>
      <PageContainer
        name="Danh mục nội dung"
        modelName="danh mục"
        onClick={() => router.push(LINKS.CategoryCreate)}
        breadCrumItems={[{ title: "Danh mục nội dung" }]}
      >
        <TableListPage<CategoryType>
          scroll={{ x: 1000 }}
          modelName="Danh mục nội dung"
          size="small"
          dataSource={categoryList}
          rowKey={"id"}
          columns={columns}
          isLoading={isLoading}
          onEdit={(record) => router.push(`/portal/contents/category/${record.originId}`)}
        />
      </PageContainer>
    </>
  );
};
export default CategoryPage;
