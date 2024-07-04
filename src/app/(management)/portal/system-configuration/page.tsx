"use client";
import PageContainer from "@/components/admin/PageContainer";
import { Row, Col, Tabs, TabsProps } from "antd";
import TabAccountConfig from "./_components/tabsContainer/TabAccountConfig";
import TabLanguage from "./_components/tabsContainer/TabLanguage";
const SystemConfigPage = () => {
    const configurationTabs: TabsProps["items"] = [
        {
            label: "Tài khoản",
            key: "account-configuration",
            children: <TabAccountConfig />,
        },
        {
            label: "Ngôn ngữ",
            key: "language-configuration",
            children: <TabLanguage />,
        },
    ];
    return (
        <PageContainer name="Cấu hình hệ thống" hideAddButton={true}>
            <Tabs
                defaultActiveKey="1"
                type="card"
                size="middle"
                style={{ marginBottom: 32 }}
                items={configurationTabs}
            />
        </PageContainer>
    );
};
export default SystemConfigPage;
