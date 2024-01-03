"use client";
import React, { useCallback, useState } from "react";
import PageContainer from "@/components/admin/PageContainer";
import TableListPage from "@/components/admin/TableListPage";
import { columnRoleGroups } from "./columns";
import DrawlerDestination from "./components/DrawlerDestination";
import {
    EActionType,
    TDrawlerDestination,
} from "./components/DrawlerDestination";
import { useGetRegionList } from "@/queries/core/region";
import useCRUDDestination from "./hooks/useCRUDDestination";
import { useGetDestinationsQuery } from "@/queries/misc/destination";
import {
    IDestinationListRs,
    IDestinationPayload,
} from "@/models/management/region.interface";
import { Status } from "@/models/management/common.interface";

const GroupDestinationPage = () => {
    const [editRecord, setEditRecord] =
        useState<IDestinationListRs["result"][0]>();

    const { data: regionList, isLoading } = useGetRegionList();
    const { data: destinationList, isLoading: isLoadingDestinationList } =
        useGetDestinationsQuery();

    const { onCreate, onUpdate, onUpdateStatus, errors } = useCRUDDestination();

    const [actionType, setActionType] = useState<EActionType>(
        EActionType.CREATE,
    );
    const [isOpenDrawler, setOpenDrawler] = useState(false);

    const onHandleDrawlerDestination = (drawler: TDrawlerDestination) => {
        setEditRecord(() =>
            drawler.action === EActionType.EDIT ? drawler.record : undefined,
        );
        setOpenDrawler(true);
        setActionType(() => drawler.action);
    };

    const handleSubmitFormData = useCallback(
        (actionType: EActionType, payload: IDestinationPayload) => {
            if (actionType === EActionType.CREATE) {
                onCreate(payload, () => {
                    onCloseDrawlerAndReset();
                });
            }

            if (actionType === EActionType.EDIT && editRecord) {
                onUpdate(editRecord.id, payload, () => {
                    onCloseDrawlerAndReset();
                });
            }
        },
        [editRecord],
    );

    const onDelete = (record: IDestinationListRs["result"][0]) => {
        onUpdateStatus(record.id, Status.XX);
    };

    const onCloseDrawlerAndReset = () => {
        setOpenDrawler(false);
        setEditRecord(undefined);
    };

    return (
        <React.Fragment>
            <PageContainer
                name="Danh sách nhóm điểm đến"
                modelName="nhóm"
                onClick={() =>
                    onHandleDrawlerDestination({ action: EActionType.CREATE })
                }
                breadCrumItems={[{ title: "Nhóm điểm đến" }]}
            >
                <TableListPage<IDestinationListRs["result"][0]>
                    scroll={{ x: 1000 }}
                    rowKey={"codeKey"}
                    modelName="nhóm điểm đến"
                    dataSource={destinationList || []}
                    columns={columnRoleGroups}
                    onEdit={(record) =>
                        onHandleDrawlerDestination({
                            action: EActionType.EDIT,
                            record,
                        })
                    }
                    onDelete={(record) => onDelete(record)}
                    isLoading={isLoadingDestinationList}
                />
            </PageContainer>

            <DrawlerDestination
                isOpen={isOpenDrawler}
                actionType={actionType}
                onClose={onCloseDrawlerAndReset}
                onUpdateStatus={onUpdateStatus}
                initialValues={editRecord}
                items={regionList || []}
                onSubmit={handleSubmitFormData}
                errors={errors}
            />
        </React.Fragment>
    );
};
export default GroupDestinationPage;
