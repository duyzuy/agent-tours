"use client";
import PageContainer from "@/components/admin/PageContainer";
import TableListPage from "@/components/admin/TableListPage";
const PageManagement = () => {
    return (
        <>
            <PageContainer
                name="Trang nội dung"
                modelName="trang"
                onClick={() => {}}
                breadCrumItems={[{ title: "Trang nội dung" }]}
            >
                <TableListPage<any>
                    scroll={{ x: 1000 }}
                    modelName="Trang nội dung"
                    dataSource={[]}
                    rowKey={"localUser_RoleKey"}
                    columns={[]}
                    isLoading={false}
                />
            </PageContainer>
        </>
    );
};
export default PageManagement;
