"use client";
import React, { useCallback, useState } from "react";
import PageContainer from "@/components/admin/PageContainer";

import DrawerVendor, {
    DrawerVendorProps,
    EActionType,
} from "./_components/DrawerVendor";
import TableListPage from "@/components/admin/TableListPage";
import { vendorColumns } from "./columns";
import {
    IVendor,
    VendorQueryParams,
} from "@/models/management/vendor.interface";
import useManageVendor from "./modules/useManageVendor";
import { useGetVendorListCoreQuery } from "@/queries/core/vendor";
import { Status } from "@/models/management/common.interface";
import ModalVendorDetail from "./_components/ModalVendorDetail";
import FilterVendor from "./_components/FilterVendor";
const ManageVendorPage = () => {
    const [actionType, setActionType] =
        useState<DrawerVendorProps["actionType"]>();
    const [showDrawer, setShowDrawer] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [viewRecord, setViewRecord] = useState<IVendor>();
    const [editRecord, setEditRecord] = useState<IVendor>();

    const { onCreate, onDelete, onApproval, onUpdate, onDeactive, onActive } =
        useManageVendor();

    const initQueryParams = new VendorQueryParams(
        { status: undefined, shortName: "", fullName: "" },
        1,
        10,
    );
    const [queryParams, setQueryParams] = useState(initQueryParams);
    const { data: vendorData, isLoading } = useGetVendorListCoreQuery({
        enabled: true,
        queryParams: queryParams,
    });

    const onCreateVendor = () => {
        setShowDrawer(true);
        setActionType(EActionType.CREATE);
    };
    const hideDrawer = () => {
        setShowDrawer(false);
        setActionType(undefined);
    };
    const setEditVendor = (record: IVendor) => {
        setEditRecord(record);
        setActionType(EActionType.EDIT);
        setShowDrawer(true);
    };
    const onCloseModal = useCallback(() => {
        setShowModal(false);
    }, []);
    const onViewDetail = useCallback((record: IVendor) => {
        setShowModal(true);
        setViewRecord(record);
    }, []);

    const handleSubmitVendorForm: DrawerVendorProps["onSubmit"] = (
        action,
        formData,
    ) => {
        if (action === EActionType.CREATE) {
            onCreate(formData, hideDrawer);
        }
        if (action === EActionType.EDIT) {
            onUpdate(formData, hideDrawer);
        }
    };
    return (
        <PageContainer
            name={"Quản lý Vendor"}
            modelName="Vendor"
            breadCrumItems={[{ title: "Quản lý Vendor" }]}
            onClick={onCreateVendor}
        >
            <FilterVendor
                setFilter={setQueryParams}
                value={queryParams.requestObject}
            />
            <TableListPage<IVendor>
                modelName="Vendor"
                dataSource={vendorData ? vendorData.list : []}
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
                // hideEdit={(record) => record.status !== Status.OK}
                onView={onViewDetail}
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
            <DrawerVendor
                isOpen={showDrawer}
                actionType={actionType}
                initialValues={editRecord}
                onCancel={hideDrawer}
                onSubmit={handleSubmitVendorForm}
                onApproval={(recId) => onApproval(recId)}
                onDeactive={onDeactive}
                onActive={onActive}
            />
            <ModalVendorDetail
                open={showModal}
                onClose={onCloseModal}
                data={viewRecord}
            />
        </PageContainer>
    );
};
export default ManageVendorPage;
