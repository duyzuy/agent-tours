"use client";
import React, { useState } from "react";
import PageContainer from "@/components/admin/PageContainer";
import TableListPage from "@/components/admin/TableListPage";
import { useRouter } from "next/navigation";

import { useGetVisaTemplateKeyMinimalListQuery } from "@/queries/cms/visaTemplate";
import { columns } from "./columns";

import { IVisaTemplateKeyMinimalItem, VisaTemplateQueryParams } from "@/models/management/cms/visaTemplate.interface";
import DrawerCMSTemplate, { DrawerCMSTemplateProps } from "../_components/DrawerCMSTemplate";
import useCRUDVisaTemplateKey from "../modules/useCRUDVisaTemplateKey";

const CMSTemplatePageList = () => {
  const router = useRouter();
  const [showDrawer, setShowDrawer] = useState(false);
  const [editRecord, setEditRecord] = useState<IVisaTemplateKeyMinimalItem>();
  const [action, setAction] = useState<"create" | "edit">("create");
  const [queryParams, setQueryParams] = useState(() => new VisaTemplateQueryParams(undefined, 1, 10));
  const onEditCSMTemplate = (record: IVisaTemplateKeyMinimalItem) => {
    setAction("edit");
    setEditRecord(record);
    setShowDrawer(true);
  };

  const { data: templateData, isLoading } = useGetVisaTemplateKeyMinimalListQuery(queryParams);

  const closeDrawer = () => {
    setShowDrawer(false);
    setEditRecord(undefined);
  };
  const createContent = () => {
    setShowDrawer(true);
    setAction("create");
  };
  const { createTemplateKey, updateTemplate } = useCRUDVisaTemplateKey();
  const handleSubmitForm: DrawerCMSTemplateProps["onSubmit"] = (formData) => {
    if (action === "create") {
      createTemplateKey(formData, () => {
        setShowDrawer(false);
      });
    }
    if (action === "edit") {
      updateTemplate(formData, () => {
        closeDrawer();
      });
    }
  };

  return (
    <PageContainer
      name="Visa template"
      modelName="visa template"
      onClick={createContent}
      breadCrumItems={[{ title: "Danh sách visa template" }]}
    >
      <TableListPage<IVisaTemplateKeyMinimalItem>
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
