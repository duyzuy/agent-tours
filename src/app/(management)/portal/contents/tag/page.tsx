"use client";
import PageContainer from "@/components/admin/PageContainer";
import TableListPage from "@/components/admin/TableListPage";
const TagPage = () => {
    return (
        <>
            <PageContainer
                name="Thẻ nội dung"
                modelName="thẻ"
                onClick={() => {}}
                breadCrumItems={[{ title: "Thẻ nội dung" }]}
            >
                <TableListPage<any>
                    scroll={{ x: 1000 }}
                    modelName="Thẻ"
                    dataSource={[]}
                    rowKey={"localUser_RoleKey"}
                    columns={[]}
                    isLoading={false}
                />
            </PageContainer>
        </>
    );
};
export default TagPage;
