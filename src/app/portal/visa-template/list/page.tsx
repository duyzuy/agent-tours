"use client";
import React, { useState } from "react";
import PageContainer from "@/components/admin/PageContainer";
import TableListPage from "@/components/admin/TableListPage";
import { useRouter } from "next/navigation";

import { useGetVisaTemplateKeyListQuery } from "@/queries/cms/visaTemplate";
import { columns } from "./columns";

import {
    CMSTemplateQueryParams,
    ICMSTemplate,
} from "@/models/management/cms/cmsTemplate.interface";
import { VisaTemplateQueryParams } from "@/models/management/cms/visaTemplate.interface";

import DrawerCMSTemplate, {
    DrawerCMSTemplateProps,
} from "../_components/DrawerCMSTemplate";
import useCRUDVisaTemplateKey from "../modules/useCRUDVisaTemplateKey";
const CMSTemplatePageList = () => {
    const router = useRouter();
    const [showDrawer, setShowDrawer] = useState(false);
    const [editRecord, setEditRecord] = useState<ICMSTemplate>();
    const [action, setAction] = useState<"create" | "edit">("create");
    const [queryParams, setQueryParams] = useState(
        () => new VisaTemplateQueryParams(undefined, 1, 10),
    );
    const onEditCSMTemplate = (record: ICMSTemplate) => {
        setAction("edit");
        setEditRecord(record);
        setShowDrawer(true);
    };
    const { data: templateData, isLoading } =
        useGetVisaTemplateKeyListQuery(queryParams);

    console.log(templateData);
    const closeDrawer = () => {
        setShowDrawer(false);
        setEditRecord(undefined);
    };
    const { createTemplateKey } = useCRUDVisaTemplateKey();
    const handleSubmitForm: DrawerCMSTemplateProps["onSubmit"] = (formData) => {
        if (action === "create") {
            createTemplateKey(formData, () => {
                setShowDrawer(false);
            });
        }
        // if (action === "edit") {
        //     onUpdateTemplate(formData, () => {
        //         closeDrawer();
        //     });
        // }
    };

    return (
        <PageContainer
            name="Visa template"
            modelName="visa template"
            onClick={() => setShowDrawer(true)}
            breadCrumItems={[{ title: "Danh sách visa template" }]}
        >
            <TableListPage<ICMSTemplate>
                scroll={{ x: 1000 }}
                modelName="Trang nội dung"
                dataSource={[]}
                rowKey={"code"}
                size="small"
                columns={columns}
                isLoading={isLoading}
                onEdit={(record) => onEditCSMTemplate(record)}
                // pagination={{
                //     total: templateData?.totalItems,
                //     pageSize: templateData?.pageSize,
                //     current: templateData?.pageCurrent,
                //     onChange: (page) =>
                //         setQueryParams((params) => ({
                //             ...params,
                //             pageCurrent: page,
                //         })),
                // }}
                showActionsLess={false}
                fixedActionsColumn={false}
            />
            <DrawerCMSTemplate
                action={action}
                isOpen={showDrawer}
                onClose={closeDrawer}
                onSubmit={handleSubmitForm}
                initialValue={editRecord}
            />
        </PageContainer>
    );
};
export default CMSTemplatePageList;
