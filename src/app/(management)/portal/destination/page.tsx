"use client";
import React, { useCallback, useState } from "react";
import PageContainer from "@/components/admin/PageContainer";
import TableListPage from "@/components/admin/TableListPage";
import { columnsDestinationList } from "./columnsDestinationList";
import DrawlerDestination from "./_components/DrawlerDestination";
import { EActionType, TDrawlerDestination } from "./_components/DrawlerDestination";
import { useGetRegionList } from "@/queries/core/region";
import useCRUDDestination from "./hooks/useCRUDDestination";
import { useGetDestinationsQuery } from "@/queries/cms/destination";
import { IDestinationListRs, IDestinationPayload } from "@/models/management/region.interface";
import { Status } from "@/models/common.interface";
import { useRouter } from "next/navigation";

const GroupDestinationPage = () => {
  const [editRecord, setEditRecord] = useState<IDestinationListRs["result"][0]>();

  const { data: regionList, isLoading } = useGetRegionList();
  const { data: destinationList, isLoading: isLoadingDestinationList } = useGetDestinationsQuery();

  const { onCreate, onUpdate, onUpdateStatus, errors } = useCRUDDestination();

  const [actionType, setActionType] = useState<EActionType>(EActionType.CREATE);
  const [isOpenDrawler, setOpenDrawler] = useState(false);

  const onHandleDrawlerDestination = (drawler: TDrawlerDestination) => {
    setEditRecord(() => (drawler.action === EActionType.EDIT ? drawler.record : undefined));
    setOpenDrawler(true);
    setActionType(() => drawler.action);
  };

  const router = useRouter();
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
        name="Nhóm điểm đến"
        modelName="nhóm"
        onClick={() => onHandleDrawlerDestination({ action: EActionType.CREATE })}
        breadCrumItems={[{ title: "Nhóm điểm đến" }]}
      >
        <TableListPage<IDestinationListRs["result"][number]>
          scroll={{ x: 1000 }}
          rowKey={"id"}
          modelName="nhóm điểm đến"
          showActionsLess={false}
          dataSource={destinationList || []}
          columns={columnsDestinationList}
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
