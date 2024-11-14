"use client";
import React, { useState } from "react";
import PageContainer from "@/components/admin/PageContainer";
import TableListPage from "@/components/admin/TableListPage";
import { columns } from "./columns";
import useCRUDMiscDepartLocation from "../modules/useCRUDMiscDepartLocation";
import { useGetMiscDepartLocationsQuery } from "@/queries/cms/miscDepart";
import DrawerDepartLocation, { DrawerDepartLocationProps } from "../_components/DrawerDepartLocation";
import { IDepartLocation } from "@/models/management/cms/miscDepartLocation.interface";

const MiscDepartLocationPage = () => {
  const [showDrawer, setShowDrawer] = useState(false);
  const [editRecord, setEditRecord] = useState<IDepartLocation>();
  const [action, setAction] = useState<"create" | "edit">("create");

  const { data: miscDepartLocations, isLoading } = useGetMiscDepartLocationsQuery();

  const { onUpdate, onCreate, onDelete } = useCRUDMiscDepartLocation();

  const setEdit = (record: IDepartLocation) => {
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

  const handleSubmitForm: DrawerDepartLocationProps["onSubmit"] = (formData) => {
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
      name="Điểm khởi hành"
      modelName="Điểm khởi hành"
      onClick={createContent}
      breadCrumItems={[{ title: "Điểm khởi hành" }]}
    >
      <TableListPage<IDepartLocation>
        scroll={{ x: 1000 }}
        modelName="Điểm khởi hành"
        dataSource={miscDepartLocations?.list || []}
        rowKey={"id"}
        size="small"
        columns={columns}
        isLoading={isLoading}
        onEdit={(record) => setEdit(record)}
        onDelete={(record) => onDelete(record.id)}
        pagination={{
          total: miscDepartLocations?.totalItems,
          pageSize: miscDepartLocations?.pageSize,
          current: miscDepartLocations?.pageCurrent,
        }}
        showActionsLess={false}
        fixedActionsColumn={false}
      />
      <DrawerDepartLocation
        action={action}
        isOpen={showDrawer}
        onClose={closeDrawer}
        onSubmit={handleSubmitForm}
        initialValue={editRecord}
      />
    </PageContainer>
  );
};
export default MiscDepartLocationPage;
