"use client";
import { AdminLayout } from "@/components/layouts";
import AdminAuthorized from "./_components/authWrapper/AdminAuthorized";
// import MediaUploadManager from "./_components/MediaUploadManager";

interface Props {
    children: React.ReactNode;
}
export default function DashboardLayout({ children }: Props) {
    return (
        <AdminAuthorized>
            <AdminLayout>{children}</AdminLayout>
            {/* <MediaUploadManager /> */}
        </AdminAuthorized>
    );
}
