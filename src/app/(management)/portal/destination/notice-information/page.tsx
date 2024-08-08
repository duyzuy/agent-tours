"use client";
import React, { useCallback, useState } from "react";
import PageContainer from "@/components/admin/PageContainer";
import TableListPage from "@/components/admin/TableListPage";
import { columnsDestinationList } from "./columns";

import { useGetRegionList } from "@/queries/core/region";

import { useGetDestinationsQuery } from "@/queries/cms/destination";
import { IDestinationListRs, IDestinationPayload } from "@/models/management/region.interface";
import { Status } from "@/models/common.interface";
import { useRouter } from "next/navigation";

const GroupDestinationPage = () => {
  const [editRecord, setEditRecord] = useState<IDestinationListRs["result"][0]>();

  const { data: regionList, isLoading } = useGetRegionList();
  const { data: destinationList, isLoading: isLoadingDestinationList } = useGetDestinationsQuery();

  return (
    <React.Fragment>
      <PageContainer
        name="Thông tin lưu ý"
        modelName="Thông tin lưu ý"
        onClick={() => {}}
        breadCrumItems={[{ title: "Thông tin lưu ý" }]}
      >
        {/* <TableListPage<IDestinationListRs["result"][0]>
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
        /> */}
      </PageContainer>
    </React.Fragment>
  );
};
export default GroupDestinationPage;
