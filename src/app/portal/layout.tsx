"use client";
import AdminLayout from "@/components/layouts/AdminLayout";
interface Props {
    children: React.ReactNode;
}
export default function DashboardLayout({ children }: Props) {
    return <AdminLayout>{children}</AdminLayout>;
}
