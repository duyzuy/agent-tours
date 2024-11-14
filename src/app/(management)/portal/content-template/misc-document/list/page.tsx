"use client";
import React, { useState } from "react";
import PageContainer from "@/components/admin/PageContainer";
import TableListPage from "@/components/admin/TableListPage";
import { columns } from "./columns";
import useCRUDMiscDocument from "../modules/useCRUDMiscDocument";
import { useGetMiscDocumentListQuery } from "@/queries/cms/miscDocument";
import { IMiscDocument } from "@/models/management/cms/miscDocument.interface";
import DrawerDocument, { DrawerDocumentProps } from "../_components/DrawerDocument";

const MiscDocumentPage = () => {
  const [showDrawer, setShowDrawer] = useState(false);
  const [editRecord, setEditRecord] = useState<IMiscDocument>();
  const [action, setAction] = useState<"create" | "edit">("create");

  const { data: miscDocument, isLoading } = useGetMiscDocumentListQuery();

  const { onUpdate, onCreate, onDelete } = useCRUDMiscDocument();

  const setEdit = (record: IMiscDocument) => {
    setAction("edit");
    setEditRecord(record);
    setShowDrawer(true);
  };

  const closeDrawer = () => {
    setShowDrawer(false);
    setEditRecord(undefined);
  };
  const createContent = () => {
    setShowDrawer(true);
    setAction("create");
  };

  const handleSubmitForm: DrawerDocumentProps["onSubmit"] = (formData) => {
    if (action === "create") {
      onCreate(formData, () => {
        setShowDrawer(false);
      });
    }
    if (action === "edit") {
      onUpdate(formData, () => {
        closeDrawer();
      });
    }
  };

  return (
    <PageContainer
      name="Document"
      modelName="Document"
      onClick={createContent}
      breadCrumItems={[{ title: "Document" }]}
    >
      <TableListPage<IMiscDocument>
        scroll={{ x: 1000 }}
        modelName="Document"
        dataSource={miscDocument?.list || []}
        rowKey={"id"}
        size="small"
        columns={columns}
        isLoading={isLoading}
        onEdit={(record) => setEdit(record)}
        onDelete={(record) => onDelete(record.id)}
        pagination={{
          total: miscDocument?.totalItems,
          pageSize: miscDocument?.pageSize,
          current: miscDocument?.pageCurrent,
        }}
        showActionsLess={false}
        fixedActionsColumn={false}
      />
      <DrawerDocument
        action={action}
        isOpen={showDrawer}
        onClose={closeDrawer}
        onSubmit={handleSubmitForm}
        initialValue={editRecord}
      />
    </PageContainer>
  );
};
export default MiscDocumentPage;
