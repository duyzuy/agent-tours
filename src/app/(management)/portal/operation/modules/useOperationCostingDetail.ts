import {
  useCreateOperationCostingDetailMutation,
  useUpdateOperationCostingDetailMutation,
  useToggleLockOperationCostingDetailMutation,
  useCompleteOperationCostingDetailMutation,
  useDeleteOperationCostingDetailMutation,
} from "@/mutations/managements/operation";

import { OperationCostingDetailFormData } from "./operation.interface";
import { useQueryClient } from "@tanstack/react-query";
import useMessage from "@/hooks/useMessage";
import { queryCore } from "@/queries/var";
import { EStockType } from "@/models/management/core/inventoryType.interface";
import { OperationCostingDetailPayload } from "@/models/management/core/operationCostingDetail.interface";
import dayjs from "dayjs";
import { DATE_TIME_FORMAT } from "@/constants/common";

const useOperationCostingDetail = () => {
  const { mutate: create } = useCreateOperationCostingDetailMutation();
  const { mutate: makeDelete } = useDeleteOperationCostingDetailMutation();
  const { mutate: update } = useUpdateOperationCostingDetailMutation();
  const { mutate: toggleLock } = useToggleLockOperationCostingDetailMutation();
  const { mutate: complete } = useCompleteOperationCostingDetailMutation();

  const queryClient = useQueryClient();
  const message = useMessage();

  const onCreate = (formData: OperationCostingDetailFormData, cb?: () => void) => {
    const { costingDataType, ...restPayload } = formData;

    let payload: OperationCostingDetailPayload = {
      ...restPayload,
      type: costingDataType?.type,
      details: costingDataType?.details,
    };

    if (payload.type === EStockType.AIRTICKET || payload.type === EStockType.INSURANCE) {
      const arrivalDate = dayjs(payload?.details?.arrivalDate, { locale: "en" }).format(DATE_TIME_FORMAT);
      const departureDate = dayjs(payload?.details?.departureDate, { locale: "en" }).format(DATE_TIME_FORMAT);
      payload = {
        ...payload,
        details: { ...payload.details, arrivalDate, departureDate },
      };
    }

    if (payload.type === EStockType.CRUISE || payload.type === EStockType.VEHICLE) {
      const pickUpDate = dayjs(payload?.details?.pickUpDate, { locale: "en" }).format(DATE_TIME_FORMAT);

      payload = {
        ...payload,
        details: { ...payload.details, pickUpDate },
      };
    }

    if (payload.type === EStockType.ROOM) {
      const checkIn = dayjs(payload?.details?.checkIn, { locale: "en" }).format(DATE_TIME_FORMAT);
      const checkOut = dayjs(payload?.details?.checkOut, { locale: "en" }).format(DATE_TIME_FORMAT);

      payload = {
        ...payload,
        details: { ...payload.details, checkIn, checkOut },
      };
    }

    create(payload, {
      onSuccess(data, variables, context) {
        cb?.();
        queryClient.invalidateQueries({ queryKey: [queryCore.GET_OPERATION_COSTING_LIST_DETAIL] });
        queryClient.invalidateQueries({ queryKey: [queryCore.GET_OPERATION_COSTING_LIST] });
        message.success("Tạo thành công");
      },
      onError(error, variables, context) {
        console.log(error);
        message.error(error.message);
      },
    });
  };
  const onUpdate = (formData: OperationCostingDetailFormData, cb?: () => void) => {
    const { costingDataType, ...restPayload } = formData;

    let payload: OperationCostingDetailPayload = {
      ...restPayload,
      type: costingDataType?.type,
      details: costingDataType?.details,
    };

    if (payload.type === EStockType.AIRTICKET || payload.type === EStockType.INSURANCE) {
      const arrivalDate = dayjs(payload?.details?.arrivalDate, { locale: "en" }).format(DATE_TIME_FORMAT);
      const departureDate = dayjs(payload?.details?.departureDate, { locale: "en" }).format(DATE_TIME_FORMAT);
      payload = {
        ...payload,
        details: { ...payload.details, arrivalDate, departureDate },
      };
    }

    if (payload.type === EStockType.CRUISE || payload.type === EStockType.VEHICLE) {
      const pickUpDate = dayjs(payload?.details?.pickUpDate, { locale: "en" }).format(DATE_TIME_FORMAT);

      payload = {
        ...payload,
        details: { ...payload.details, pickUpDate },
      };
    }

    if (payload.type === EStockType.ROOM) {
      const checkIn = dayjs(payload?.details?.checkIn, { locale: "en" }).format(DATE_TIME_FORMAT);
      const checkOut = dayjs(payload?.details?.checkOut, { locale: "en" }).format(DATE_TIME_FORMAT);

      payload = {
        ...payload,
        details: { ...payload.details, checkIn, checkOut },
      };
    }

    update(payload, {
      onSuccess(data, variables, context) {
        cb?.();
        queryClient.invalidateQueries({ queryKey: [queryCore.GET_OPERATION_COSTING_LIST_DETAIL] });
        queryClient.invalidateQueries({ queryKey: [queryCore.GET_OPERATION_COSTING_LIST] });
        message.success("Cập nhật thành công");
      },
      onError(error, variables, context) {
        console.log(error);
        message.error(error.message);
      },
    });
  };
  const onToggleLock = (formData: { costingDetailsId?: number; isLocked?: boolean }, cb?: () => void) => {
    toggleLock(formData, {
      onSuccess(data, variables, context) {
        cb?.();
        queryClient.invalidateQueries({ queryKey: [queryCore.GET_OPERATION_COSTING_LIST_DETAIL] });
        queryClient.invalidateQueries({ queryKey: [queryCore.GET_OPERATION_COSTING_LIST] });
        message.success("Cập nhật thành công");
      },
      onError(error, variables, context) {
        console.log(error);
        message.error(error.message);
      },
    });
  };
  const onComplete = (costingDetailId: number, cb?: () => void) => {
    complete(costingDetailId, {
      onSuccess(data, variables, context) {
        cb?.();
        queryClient.invalidateQueries({ queryKey: [queryCore.GET_OPERATION_COSTING_LIST_DETAIL] });
        queryClient.invalidateQueries({ queryKey: [queryCore.GET_OPERATION_COSTING_LIST] });
        message.success("Cập nhật thành công");
      },
      onError(error, variables, context) {
        console.log(error);
        message.error(error.message);
      },
    });
  };
  const onDelete = (costingDetailId: number, cb?: () => void) => {
    makeDelete(costingDetailId, {
      onSuccess(data, variables, context) {
        cb?.();
        queryClient.invalidateQueries({ queryKey: [queryCore.GET_OPERATION_COSTING_LIST_DETAIL] });
        queryClient.invalidateQueries({ queryKey: [queryCore.GET_OPERATION_COSTING_LIST] });
        message.success("Cập nhật thành công");
      },
      onError(error, variables, context) {
        console.log(error);
        message.error(error.message);
      },
    });
  };
  return {
    onCreate,
    onUpdate,
    onToggleLock,
    onComplete,
    onDelete,
  };
};
export default useOperationCostingDetail;
