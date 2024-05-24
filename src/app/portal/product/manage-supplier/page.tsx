"use client";
import React, { useCallback, useState } from "react";
import PageContainer from "@/components/admin/PageContainer";

import DrawerVendor, {
    DrawerSupplierProps,
    EActionType,
} from "./_components/DrawerSupplier";
import TableListPage from "@/components/admin/TableListPage";
import { vendorColumns } from "./columns";
import {
    ISupplier,
    SupplierQueryParams,
} from "@/models/management/supplier.interface";
import useManageSupplier from "./modules/useManageSupplier";
import { useGetSupplierListCoreQuery } from "@/queries/core/supplier";
import { Status } from "@/models/management/common.interface";
import ModalRecordDetail from "./_components/ModalRecordDetail";
import FilterFormData from "./_components/FilterFormData";

const ManageSupplierPage = () => {
    const [actionType, setActionType] =
        useState<DrawerSupplierProps["actionType"]>();
    const [showDrawer, setShowDrawer] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [viewRecord, setViewRecord] = useState<ISupplier>();
    const [editRecord, setEditRecord] = useState<ISupplier>();

    const { onCreate, onDelete, onApproval, onUpdate, onDeactive, onActive } =
        useManageSupplier();

    const initQueryParams = new SupplierQueryParams(
        { status: undefined, shortName: "", fullName: "", vendorId: undefined },
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
        setActionType(EActionType.CREATE);
    };
    const hideDrawer = () => {
        setShowDrawer(false);
        setActionType(undefined);
    };
    const setEditVendor = (record: ISupplier) => {
        setEditRecord(record);
        setActionType(EActionType.EDIT);
        setShowDrawer(true);
    };
    const onCloseModal = useCallback(() => {
        setShowModal(false);
    }, []);
    const onViewDetail = useCallback((record: ISupplier) => {
        setShowModal(true);
        setViewRecord(record);
    }, []);

    const handleSubmitForm: DrawerSupplierProps["onSubmit"] = (
        action,
        formData,
    ) => {
        console.log(action, formData);
        if (action === EActionType.CREATE) {
            onCreate(formData, hideDrawer);
        }
        if (action === EActionType.EDIT) {
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
            <FilterFormData
                setFilter={setQueryParams}
                value={queryParams.requestObject}
            />
            <TableListPage<ISupplier>
                modelName="Vendor"
                dataSource={supplierData ? supplierData.list : []}
                scroll={{ x: 1040 }}
                rowKey={"recId"}
                isLoading={isLoading}
                columns={vendorColumns}
                fixedActionsColumn={false}
                showActionsLess={false}
                onEdit={setEditVendor}
                onDelete={(record) => onDelete(record.recId, hideDrawer)}
                // onApproval={(record) => onApproval(record.recId, hideDrawer)}
                // hideApproval={(record) => record.status === Status.OK}
                // hideEdit={(record) => record.status === Status.OK}
                onView={onViewDetail}
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
            <DrawerVendor
                isOpen={showDrawer}
                actionType={actionType}
                initialValues={editRecord}
                onCancel={hideDrawer}
                onSubmit={handleSubmitForm}
                onApproval={(recId) => onApproval(recId, hideDrawer)}
                onDeactive={onDeactive}
                onActive={onActive}
            />
            <ModalRecordDetail
                open={showModal}
                onClose={onCloseModal}
                data={viewRecord}
            />
        </PageContainer>
    );
};
export default ManageSupplierPage;
