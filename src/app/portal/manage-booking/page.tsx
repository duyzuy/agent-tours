"use client";
import PageContainer from "@/components/admin/PageContainer";
import TableListPage from "@/components/admin/TableListPage";
export default function ManageBookingPage() {
    return (
        <PageContainer
            name="Quản lý booking"
            modelName="Quản lý booking"
            breadCrumItems={[{ title: "Quản lý booking" }]}
            hideAddButton
        >
            <div className=""></div>
            <TableListPage dataSource={[]} columns={[]} />
        </PageContainer>
    );
}
