"use client";
import React, { useState, useCallback } from "react";
import PageContainer from "@/components/admin/PageContainer";
import TableListPage from "@/components/admin/TableListPage";

import { useGetRegionList } from "@/queries/core/region";

import { useGetLocalSearchListMISCQuery } from "@/queries/misc/destination";

import { LocalSearchDestinationListRs } from "@/models/management/localSearchDestination.interface";
import DrawerGroupSearch, {
    DrawerGroupSearchProps,
    EActionType,
    TDrawerSearch,
} from "./_components/DrawerGroupSearch";
import useCRUDLocalSearch from "../hooks/useCRUDLocalSearch";
import { columnsSearchDestination } from "./columnsSearchDestination";

const GroupDestinationPage = () => {
    const [editRecord, setEditRecord] =
        useState<LocalSearchDestinationListRs["result"][0]>();

    const { data: regionList, isLoading } = useGetRegionList();

    const { data: localSearchList, isLoading: isLoadingSearchDesList } =
        useGetLocalSearchListMISCQuery();

    const { onCreate, onUpdate } = useCRUDLocalSearch();

    const [actionType, setActionType] = useState<EActionType>(
        EActionType.CREATE,
    );
    const [isOpenDrawler, setOpenDrawler] = useState(false);

    const onHandleDrawer = (drawer: TDrawerSearch) => {
        setEditRecord(() =>
            drawer.action === EActionType.EDIT ? drawer.record : undefined,
        );
        setOpenDrawler(true);
        setActionType(() => drawer.action);
    };

    const handleSubmitFormData: DrawerGroupSearchProps["onSubmit"] = (
        actionType,
        data,
    ) => {
        if (actionType === EActionType.CREATE) {
            onCreate(data, () => {
                onCloseDrawlerAndReset();
            });
        }

        if (actionType === EActionType.EDIT && editRecord) {
            onUpdate(editRecord.id, data, () => {
                onCloseDrawlerAndReset();
            });
        }
    };

    // const onDelete = (record: IDestinationListRs["result"][0]) => {
    //     onUpdateStatus(record.id, Status.XX);
    // };

    const onCloseDrawlerAndReset = () => {
        setOpenDrawler(false);
        setEditRecord(undefined);
    };

    return (
        <React.Fragment>
            <PageContainer
                name="Nhóm search"
                modelName="Nhóm search"
                onClick={() => onHandleDrawer({ action: EActionType.CREATE })}
                breadCrumItems={[{ title: "Nhóm search" }]}
            >
                <TableListPage<LocalSearchDestinationListRs["result"][0]>
                    scroll={{ x: 1000 }}
                    rowKey={"id"}
                    modelName="Nhóm search"
                    dataSource={localSearchList || []}
                    columns={columnsSearchDestination}
                    onEdit={(record) =>
                        onHandleDrawer({
                            action: EActionType.EDIT,
                            record: record,
                        })
                    }
                    onDelete={(record) => {}}
                    isLoading={isLoadingSearchDesList}
                />
            </PageContainer>

            <DrawerGroupSearch
                isOpen={isOpenDrawler}
                actionType={actionType}
                onClose={onCloseDrawlerAndReset}
                initialValues={editRecord}
                regionList={regionList || []}
                onSubmit={handleSubmitFormData}
            />
        </React.Fragment>
    );
};
export default GroupDestinationPage;
