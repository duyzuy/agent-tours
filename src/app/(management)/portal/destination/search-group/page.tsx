"use client";
import React, { useState } from "react";
import PageContainer from "@/components/admin/PageContainer";
import TableListPage from "@/components/admin/TableListPage";

import { useGetLocalSearchListMISCQuery } from "@/queries/cms/destination";

import { LocalSearchDestinationListRs } from "@/models/management/localSearchDestination.interface";
import DrawerGroupSearch, { DrawerGroupSearchProps, TDrawerSearch } from "./_components/DrawerGroupSearch";
import useCRUDLocalSearch from "../hooks/useCRUDLocalSearch";
import { columnsSearchDestination } from "./columnsSearchDestination";
import { LocalSearchQueryParams } from "@/models/management/localSearchDestination.interface";

const GroupDestinationPage = () => {
  const [editRecord, setEditRecord] = useState<LocalSearchDestinationListRs["result"][0]>();

  const initSearchQueryParams = new LocalSearchQueryParams({}, 1, 20, { sortColumn: "id", direction: "desc" });
  const { data: localSearchList, isLoading: isLoadingSearchDesList } = useGetLocalSearchListMISCQuery({
    enabled: true,
    queryParams: initSearchQueryParams,
  });

  const { onCreate, onUpdate, onDelete } = useCRUDLocalSearch();

  const [actionType, setActionType] = useState<DrawerGroupSearchProps["actionType"]>();
  const [isOpenDrawler, setOpenDrawler] = useState(false);

  const onHandleDrawer = (drawer: TDrawerSearch) => {
    setEditRecord(() => (drawer.action === "EDIT" ? drawer.record : undefined));
    setOpenDrawler(true);
    setActionType(() => drawer.action);
  };

  const handleSubmitFormData: DrawerGroupSearchProps["onSubmit"] = (actionType, data) => {
    if (actionType === "CREATE") {
      onCreate(data, () => {
        onCloseDrawlerAndReset();
      });
    }

    if (actionType === "EDIT" && editRecord) {
      onUpdate(editRecord.id, data, () => {
        onCloseDrawlerAndReset();
      });
    }
  };

  const onCloseDrawlerAndReset = () => {
    setOpenDrawler(false);
    setEditRecord(undefined);
  };

  return (
    <React.Fragment>
      <PageContainer
        name="Nhóm search"
        modelName="Nhóm search"
        onClick={() => onHandleDrawer({ action: "CREATE" })}
        breadCrumItems={[{ title: "Nhóm search" }]}
      >
        <TableListPage<LocalSearchDestinationListRs["result"][0]>
          scroll={{ x: 1000 }}
          rowKey={"id"}
          modelName="Nhóm search"
          dataSource={localSearchList || []}
          columns={columnsSearchDestination}
          showActionsLess={false}
          onEdit={(record) =>
            onHandleDrawer({
              action: "EDIT",
              record: record,
            })
          }
          onDelete={(record) => onDelete(record.id)}
          isLoading={isLoadingSearchDesList}
        />
      </PageContainer>

      <DrawerGroupSearch
        isOpen={isOpenDrawler}
        actionType={actionType}
        onClose={onCloseDrawlerAndReset}
        initialValues={editRecord}
        onSubmit={handleSubmitFormData}
      />
    </React.Fragment>
  );
};
export default GroupDestinationPage;
