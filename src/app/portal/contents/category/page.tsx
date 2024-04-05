"use client";
import PageContainer from "@/components/admin/PageContainer";
import TableListPage from "@/components/admin/TableListPage";
const CategoryPage = () => {
    return (
        <>
            <PageContainer
                name="Danh mục nội dung"
                modelName="danh mục"
                onClick={() => {}}
                breadCrumItems={[{ title: "Danh mục nội dung" }]}
            >
                <TableListPage<any>
                    scroll={{ x: 1000 }}
                    modelName="Danh mục nội dung"
                    dataSource={[]}
                    rowKey={"localUser_RoleKey"}
                    columns={[]}
                    isLoading={false}
                />
            </PageContainer>
        </>
    );
};
export default CategoryPage;
