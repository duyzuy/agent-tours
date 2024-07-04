import { AdminLayout } from "@/components/layouts";
import AdminAuthorized from "./_components/authWrapper/AdminAuthorized";
// import MediaUploadManager from "./_components/MediaUploadManager";
import type { Metadata } from "next";

import config from "@/configs";
import ThemeProvider from "@/providers/ThemeProvider";

import { RQClientProvider } from "@/providers/RQClientProvider";
import { Inter } from "next/font/google";

import "@/styles/globals.scss";
const inter = Inter({ subsets: ["latin"] });

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
