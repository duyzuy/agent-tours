import { useMemo } from "react";
import { Tabs, TabsProps } from "antd";
import { IOperationStatus } from "@/models/management/core/operation/operation.interface";
import { useGetOperationStatus } from "@/modules/admin/operation/hooks/useGetOperationStatus";
import DeadlineContainer from "./DeadlineContainer";
import CostingContainer from "./CostingContainer";
import RoomingContainer from "./RoomingContainer";
import TourLeaderContainer from "./TourLeaderContainer";
import GeneralInformationContainer from "./GeneralInformationContainer";
import OrderList from "./OrderList";

interface OperationTabsControlProps {
  operationId: number;
  sellableId: number;
  status: IOperationStatus;
  sellableType: "MICE" | "EXTRA" | "TOUR";
}
const OperationTabsControl: React.FC<OperationTabsControlProps> = ({
  operationId,
  status,
  sellableId,
  sellableType,
}) => {
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

  let tabItems: TabsProps["items"] = [
    {
      key: "information",
      label: "Thông tin chung",
      children: (
        <GeneralInformationContainer
          passengerList={operationStatus?.passengerList}
          roomingList={operationStatus?.roomingList}
        />
      ),
    },
    {
      key: "orderList",
      label: "Danh sách đơn hàng",
      children: (
        <OrderList
          orderList={operationStatus?.orderList}
          totalCosting={operationStatus?.totalCosting}
          totalSale={operationStatus?.totalSale}
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
  ];

  const filterItemTabBySellableType = (items: TabsProps["items"]): TabsProps["items"] => {
    if (sellableType === "MICE") {
      return items?.filter((item) => item.key === "deadline" || item.key === "costing");
    }
    return items;
  };

  return <Tabs type="card" defaultActiveKey="information" items={filterItemTabBySellableType(tabItems)} />;
};
export default OperationTabsControl;
