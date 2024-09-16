"use client";
import React, { useState } from "react";
import PageContainer from "@/components/admin/PageContainer";
import TableListPage from "@/components/admin/TableListPage";
import { useRouter } from "next/navigation";

import { useGetCMSTemplateListMinimalQuery } from "@/queries/cms/cmsTemplate";
import { columns } from "./columns";

import { CMSTemplateQueryParams, ICMSTemplateMinimal } from "@/models/management/cms/cmsTemplate.interface";

import DrawerCMSTemplate, { DrawerCMSTemplateProps } from "../_components/DrawerCMSTemplate";
import useCreateCMSTemplate from "../modules/useCRUDCMSTemplate";
const CMSTemplatePageList = () => {
  const router = useRouter();
  const [showDrawer, setShowDrawer] = useState(false);
  const [editRecord, setEditRecord] = useState<ICMSTemplateMinimal>();
  const [action, setAction] = useState<"create" | "edit">("create");
  const [queryParams, setQueryParams] = useState(() => new CMSTemplateQueryParams(undefined, 1, 10));
  const onEditCSMTemplate = (record: ICMSTemplateMinimal) => {
    setAction("edit");
    setEditRecord(record);
    setShowDrawer(true);
  };

  const { data: templateData, isLoading } = useGetCMSTemplateListMinimalQuery(queryParams);

  const { onCreateTemplate, onUpdateTemplate } = useCreateCMSTemplate();

  const closeDrawer = () => {
    setShowDrawer(false);
    setEditRecord(undefined);
  };
  const handleSubmitForm: DrawerCMSTemplateProps["onSubmit"] = (formData) => {
    if (action === "create") {
      onCreateTemplate(formData, () => {
        setShowDrawer(false);
      });
    }
    if (action === "edit") {
      onUpdateTemplate(formData, () => {
        closeDrawer();
      });
    }
  };

  return (
    <PageContainer
      name="Danh sách template"
      modelName="template"
      onClick={() => setShowDrawer(true)}
      breadCrumItems={[{ title: "Danh sách template" }]}
    >
      <TableListPage<ICMSTemplateMinimal>
        scroll={{ x: 1000 }}
        modelName="Trang nội dung"
        dataSource={templateData?.list || []}
        rowKey={"code"}
        size="small"
        columns={columns}
        isLoading={isLoading}
        onEdit={(record) => onEditCSMTemplate(record)}
        pagination={{
          total: templateData?.totalItems,
          pageSize: templateData?.pageSize,
          current: templateData?.pageCurrent,
          onChange: (page) =>
            setQueryParams((params) => ({
              ...params,
              pageCurrent: page,
            })),
        }}
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
