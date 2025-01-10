"use client";
import React, { useState } from "react";
import PageContainer from "@/components/admin/PageContainer";
import DrawerSupplierForm, { DrawerSupplierFormProps } from "./_components/DrawerSupplierForm";
import TableListPage from "@/components/admin/TableListPage";
import { supplierColumn } from "./columns";
import { ISupplier, SupplierQueryParams } from "@/models/management/supplier.interface";
import useManageSupplier from "./modules/useManageSupplier";
import { useGetSupplierListCoreQuery } from "@/queries/core/supplier";
import FilterFormData from "./_components/FilterFormData";
import { useRouter } from "next/navigation";

const ManageSupplierPage = () => {
  const [showDrawer, setShowDrawer] = useState(false);
  const router = useRouter();
  const { onCreate, onUpdate } = useManageSupplier();
  const initQueryParams = new SupplierQueryParams(
    { status: undefined, shortName: "", fullName: "", vendorId: undefined, includeVendor: true },
    1,
    10,
  );
  const [queryParams, setQueryParams] = useState(initQueryParams);
  const { data: supplierData, isLoading } = useGetSupplierListCoreQuery({
    enabled: true,
    queryParams: queryParams,
  });

  const onCreateSupplier = () => {
    setShowDrawer(true);
  };
  const hideDrawer = () => {
    setShowDrawer(false);
  };

  const handleSubmitForm: DrawerSupplierFormProps["onSubmit"] = (action, formData) => {
    if (action === "CREATE") {
      onCreate(formData, hideDrawer);
    }
    if (action === "EDIT") {
      onUpdate(formData, hideDrawer);
    }
  };

  return (
    <PageContainer
      name={"Quản lý Supplier"}
      modelName="Supplier"
      breadCrumItems={[{ title: "Quản lý Supplier" }]}
      onClick={onCreateSupplier}
    >
      <FilterFormData setFilter={setQueryParams} value={queryParams.requestObject} />
      <TableListPage<ISupplier>
        modelName="Vendor"
        dataSource={supplierData ? supplierData.list : []}
        scroll={{ x: 1040 }}
        rowKey={"recId"}
        isLoading={isLoading}
        columns={supplierColumn}
        pagination={{
          current: supplierData?.pageCurrent,
          pageSize: supplierData?.pageSize,
          total: supplierData?.totalItems,
          onChange: (page) =>
            setQueryParams((prev) => ({
              ...prev,
              pageCurrent: page,
            })),
        }}
      />
      <DrawerSupplierForm isOpen={showDrawer} actionType={"CREATE"} onCancel={hideDrawer} onSubmit={handleSubmitForm} />
    </PageContainer>
  );
};
export default ManageSupplierPage;
