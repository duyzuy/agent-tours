"use client";
import React from "react";
import PageContainer from "@/components/admin/PageContainer";
import { Tabs, TabsProps } from "antd";
import RuleAndPolicyList from "./_components/RuleAndPolicyList";
import DepoSitCreateForm from "./_components/DepoSitCreateForm";
import { PlusOutlined } from "@ant-design/icons";
import { useLocalGetRuleAndPolicyQuery } from "@/queries/ruleAndPolicy";
import useRuleAndPolicy from "./modules/useRuleAndPolicy";
import LimitTimeCreateForm from "./_components/LimitTimeCreateForm";
const RuleAndPolicyPage = () => {
    const { data: ruleAndPolicyList, isLoading } =
        useLocalGetRuleAndPolicyQuery();

    const { onCreate, onDelete } = useRuleAndPolicy();

    const tabItems: TabsProps["items"] = [
        {
            key: "ruleAndPolicyList",
            label: "Danh sách chính sách",
            children: (
                <RuleAndPolicyList
                    items={ruleAndPolicyList || []}
                    onDelete={onDelete}
                />
            ),
        },
        {
            key: "depoCreate",
            label: "Chính sách trả 1 phần",
            children: <DepoSitCreateForm onSubmit={onCreate} />,
            icon: <PlusOutlined />,
        },
        {
            key: "LimitTimeCreate",
            label: "Chính sách trả sau",
            children: <LimitTimeCreateForm onSubmit={onCreate} />,
            icon: <PlusOutlined />,
        },
    ];
    return (
        <React.Fragment>
            <PageContainer
                name="Chính sách thanh toán"
                modelName="Chính sách thanh toán"
                onClick={() => {}}
                hideAddButton
                breadCrumItems={[{ title: "Chính sách thanh toán" }]}
            >
                <Tabs defaultActiveKey="ruleAndPolicyList" items={tabItems} />
            </PageContainer>
        </React.Fragment>
    );
};
export default RuleAndPolicyPage;
