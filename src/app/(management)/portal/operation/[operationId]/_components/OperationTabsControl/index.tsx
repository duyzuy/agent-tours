import { useMemo } from "react";
import { Tabs } from "antd";
import { IOperationStatus } from "@/models/management/core/operation/operation.interface";

import { useGetOperationStatus } from "@/modules/admin/operation/hooks/useGetOperationStatus";
import DeadlineContainer from "./DeadlineContainer";
import CostingContainer from "./CostingContainer";
import RoomingContainer from "./RoomingContainer";
import TourLeaderContainer from "./TourLeaderContainer";
import GeneralInformationContainer from "./GeneralInformationContainer";

interface OperationTabsControlProps {
  operationId: number;
  sellableId: number;
  status: IOperationStatus;
}
const OperationTabsControl: React.FC<OperationTabsControlProps> = ({ operationId, status, sellableId }) => {
  const { data: operationStatus, isLoading } = useGetOperationStatus({
    queryParams: { operationId: operationId },
    enabled: !!operationId,
  });

  const isEditDeadline = useMemo(() => {
    return status === "ACCEPTED";
  }, [status]);

  const isEditCosting = useMemo(() => {
    return status === "HANDOVERED" || status === "ACCEPTED";
  }, [status]);

  const isEditRooming = useMemo(() => {
    return status === "ACCEPTED" && operationStatus?.roomingList.roomingListStatus === "IN_PROGRESS";
  }, [status, operationStatus]);

  if (!operationStatus) return null;

  return (
    <Tabs
      type="card"
      defaultActiveKey="information"
      items={[
        {
          key: "information",
          label: "Thông tin chung",
          children: (
            <GeneralInformationContainer
              passengerList={operationStatus?.passengerList}
              orderList={operationStatus?.orderList}
              totalCosting={operationStatus?.totalCosting}
              totalSale={operationStatus?.totalSale}
              roomingList={operationStatus?.roomingList}
            />
          ),
        },
        {
          key: "deadline",
          label: "Deadline",
          children: <DeadlineContainer operationId={operationId} editAble={isEditDeadline} />,
        },
        {
          key: "costing",
          label: "Phí & dịch vụ",
          children: (
            <CostingContainer
              operationId={operationId}
              totalCosting={operationStatus?.totalCosting ?? 0}
              editAble={isEditCosting}
            />
          ),
        },
        {
          key: "rooming",
          label: "Xếp phòng",
          children: (
            <RoomingContainer
              operationId={operationId}
              editAble={isEditRooming}
              status={operationStatus?.roomingList.roomingListStatus}
            />
          ),
        },
        {
          key: "tourLeader",
          label: "Tour leader",
          children: (
            <TourLeaderContainer
              sellableId={sellableId}
              maximumDutyAmount={operationStatus.numberDutyBookingRequired}
              dutyBookingList={operationStatus.dutyBookingList}
            />
          ),
        },
      ]}
    />
  );
};
export default OperationTabsControl;
