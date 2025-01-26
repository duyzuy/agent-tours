import { useMemo } from "react";
import { Button, Divider, Space } from "antd";
import useOperation from "../../modules/useOperation";
import { useQueryClient } from "@tanstack/react-query";
import { IOperationStatus } from "@/models/management/core/operation/operation.interface";
import { queryCore } from "@/queries/var";

interface OperationActionsProps {
  operationId: number;
  status: IOperationStatus;
}
const OperationActions: React.FC<OperationActionsProps> = ({ status, operationId }) => {
  const { onUpdateStatus } = useOperation();
  const queryClient = useQueryClient();
  const onUpdateStatusThenRevalidateQuery = (status: IOperationStatus) => {
    onUpdateStatus(
      { id: operationId, status: status },
      {
        onSuccess(data, variables, context) {
          queryClient.invalidateQueries({ queryKey: [queryCore.GET_OPERATION_DETAIL] });
        },
      },
    );
  };

  const operationActions = useMemo(() => {
    //NEW - default sau khi tạo => ACCEPTED, CANCELED
    //ACCEPTED - đã nhận: vẫn được update roomingList + checkList => HANDOVERED, PENDINGCANCELED
    //HANDOVERED - đã bàn giao: vẫn được book thêm dịch vụ Costing => LOCKED, PENDINGCANCELED
    //LOCKED - khoá: vẫn có thể thanh toán => HANDOVERED, PENDINGCANCELED, DONE
    //PENDINGCANCELED - đã huỷ, vẫn có thể thanh toán => HANDOVERED, CANCELED
    //CANCELED - xong, chỉ xem
    //DONE - xong, chỉ xem

    if (status === "DONE" || status === "CANCELED") return;

    let actions: { key: string; label: React.ReactNode; className?: string; onClick?: () => void }[] = [
      {
        key: "accept",
        label: <span className="text-emerald-600">Duyệt</span>,
        onClick: () => onUpdateStatusThenRevalidateQuery("ACCEPTED"),
        className: "!text-emerald-600 !bg-emerald-50",
      },
      {
        key: "handOver",
        label: <span className="text-amber-500">Bàn giao</span>,
        onClick: () => onUpdateStatusThenRevalidateQuery("HANDOVERED"),
        className: "!bg-amber-100 !text-amber-500",
      },
      {
        key: "lock",
        label: <span>Khoá</span>,
        onClick: () => onUpdateStatusThenRevalidateQuery("LOCKED"),
        className: "!bg-gray-100 !text-gray-600",
      },
      {
        key: "pendingCancel",
        label: <span className="text-pink-600">Chờ huỷ</span>,
        onClick: () => onUpdateStatusThenRevalidateQuery("PENDINGCANCELED"),
        className: "!text-pink-600 !bg-pink-100",
      },
      {
        key: "cancel",
        label: <span className="text-white">Huỷ</span>,
        onClick: () => onUpdateStatusThenRevalidateQuery("CANCELED"),
        className: "!bg-red-600 !text-red-600",
      },
      {
        key: "done",
        label: <span className="text-emerald-600">Hoàn thành</span>,
        onClick: () => onUpdateStatusThenRevalidateQuery("DONE"),
        className: "!bg-emerald-50 !text-emerald-600",
      },
    ];

    if (status === "NEW") {
      actions = actions.filter((item) => item?.key === "accept" || item?.key === "cancel");
    }
    if (status === "ACCEPTED") {
      actions = actions.filter((item) => item?.key === "handOver" || item?.key === "pendingCancel");
    }
    if (status === "HANDOVERED") {
      actions = actions.filter((item) => item?.key === "lock" || item?.key === "pendingCancel");
    }
    if (status === "LOCKED") {
      actions = actions.filter(
        (item) => item?.key === "handOver" || item?.key === "pendingCancel" || item?.key === "done",
      );
    }
    if (status === "PENDINGCANCELED") {
      actions = actions.filter((item) => item?.key === "handOver" || item?.key === "cancel");
    }
    return actions;
  }, [status]);

  return (
    <>
      {status === "NEW" ? <p className="mb-3">Duyệt để tiến hành điều hành.</p> : null}
      <Space>
        {operationActions?.map((act) => (
          <Button key={act.key} onClick={act.onClick} className={act.className} type="text">
            {act.label}
          </Button>
        ))}
      </Space>
      <Divider />
    </>
  );
};
export default OperationActions;
