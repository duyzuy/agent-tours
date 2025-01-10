"use client";
import React, { useState } from "react";
import PageContainer from "@/components/admin/PageContainer";
import DrawerVendorForm, { DrawerVendorFormProps } from "./_components/DrawerVendorForm";
import TableListPage from "@/components/admin/TableListPage";
import { vendorColumns } from "./columns";
import { IVendor, VendorQueryParams } from "@/models/management/vendor.interface";
import useManageVendor from "./modules/useManageVendor";
import { useGetVendorDetailCoreQuery, useGetVendorListCoreQuery } from "@/queries/core/vendor";
import FilterVendor from "./_components/FilterVendor";
import { useRouter } from "next/navigation";
import { isUndefined } from "lodash";

const ManageVendorPage = () => {
  const [actionType, setActionType] = useState<DrawerVendorFormProps["actionType"]>();
  const [showDrawer, setShowDrawer] = useState(false);
  const [vendorId, setVendorId] = useState<number>();
  const { onCreate, onApproval, onDeactive, onActive, onUpdate } = useManageVendor();

  const { data: vendorDetail, isLoading: loadingVendorDetail } = useGetVendorDetailCoreQuery({
    recId: vendorId,
    enabled: !isUndefined(vendorId),
  });

  const router = useRouter();

  const initQueryParams = new VendorQueryParams({ status: undefined, shortName: "", fullName: "" }, 1, 10);
  const [queryParams, setQueryParams] = useState(initQueryParams);
  const { data: vendorData, isLoading } = useGetVendorListCoreQuery({
    enabled: true,
    queryParams: queryParams,
  });

  const createVendor = () => {
    setShowDrawer(true);
    setActionType("CREATE");
  };
  const hideDrawer = () => {
    setShowDrawer(false);
    setActionType(undefined);
    setVendorId(undefined);
  };
  const setEditVendor = (recId: number) => {
    setVendorId(recId);
    setShowDrawer(true);
    setActionType("EDIT");
  };

  const handleSubmitVendorForm: DrawerVendorFormProps["onSubmit"] = (action, formData) => {
    if (action === "CREATE") {
      onCreate(formData, hideDrawer);
    }
    if (action === "EDIT") {
      onUpdate(formData, hideDrawer);
    }
  };
  return (
    <PageContainer
      name={"Quản lý Vendor"}
      modelName="Vendor"
      breadCrumItems={[{ title: "Quản lý Vendor" }]}
      onClick={createVendor}
    >
      <FilterVendor setFilter={setQueryParams} value={queryParams.requestObject} />
      <TableListPage<IVendor>
        modelName="Vendor"
        dataSource={vendorData ? vendorData.list : []}
        scroll={{ x: 1040 }}
        rowKey={"recId"}
        isLoading={isLoading}
        columns={vendorColumns}
        fixedActionsColumn={false}
        showActionsLess={false}
        // onEdit={({ recId }) => setEditVendor(recId)}
        // onView={({ recId }) => router.push(`/portal/product/manage-vendor/${recId}`)}
        pagination={{
          current: vendorData?.pageCurrent,
          pageSize: vendorData?.pageSize,
          total: vendorData?.totalItems,
          onChange: (page) =>
            setQueryParams((prev) => ({
              ...prev,
              pageCurrent: page,
            })),
        }}
      />
      <DrawerVendorForm
        isOpen={showDrawer}
        actionType={actionType}
        onCancel={hideDrawer}
        initialValues={vendorDetail}
        onSubmit={handleSubmitVendorForm}
        // onApproval={(recId) => onApproval(recId)}
        // onDeactive={onDeactive}
        // onActive={onActive}
      />
    </PageContainer>
  );
};
export default ManageVendorPage;
