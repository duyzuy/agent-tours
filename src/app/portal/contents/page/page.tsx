"use client";
import PageContainer from "@/components/admin/PageContainer";
import TableListPage from "@/components/admin/TableListPage";
import { useRouter } from "next/navigation";
import { LINKS } from "@/constants/links.constant";
const PageManagement = () => {
    const router = useRouter();
    return (
        <>
            <PageContainer
                name="Trang nội dung"
                modelName="trang"
                onClick={() => router.push(LINKS.PageCreate)}
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
