import { BaseResponse } from "@/models/common.interface";
import { coreApi } from "../coreApi";
import {
  IOperationStatus,
  OperationListResponse,
  OperationPayload,
  OperationQueryParams,
  OperationResponse,
} from "@/models/management/core/operation/operation.interface";

import {
  OperationStatusQueryParams,
  OperationStatusResponse,
} from "@/models/management/core/operationStatus.interface";
import {
  OperationDeadlineListResponse,
  OperationDeadlinePassengerRemarkPayload,
  OperationDeadlinePayload,
  OperationDeadlineQueryParams,
  OperationDeadlineResponse,
  OperationDeadlineUpdatePayload,
  OperationReamarkResponse,
} from "@/models/management/core/operation/operationDeadline.interface";
import {
  OperationCostingListResponse,
  OperationCostingParams,
  OperationCostingPayload,
  OperationCostingResponse,
} from "@/models/management/core/operation/operationCosting.interface";
import {
  OperationCostingDetailPayload,
  OperationCostingListDetailResponse,
} from "@/models/management/core/operation/operationCostingDetail.interface";
import {
  RoomingListResponse,
  RoomingPayload,
  RoomingHandOverPayload,
} from "@/models/management/booking/rooming.interface";
import {
  OperationThingTodoListResponse,
  OperationThingTodoQueryParams,
} from "@/models/management/core/operation/operationThingTodo.interface";
import {
  OperationDutyListResponse,
  OperationDutyQueryParams,
  UpdateOperationDutyPayload,
  UpdateOperationDutyResponse,
} from "@/models/management/core/operation/operationDuty.interface";

export const operationAPIs = {
  create: async (payload: OperationPayload) => {
    return await coreApi.post<OperationResponse, BaseResponse<null>>("core/OperationCode_Addnew", {
      requestObject: { ...payload },
    });
  },
  detail: async (id?: number) => {
    return await coreApi.post<OperationResponse, BaseResponse<null>>("core/OperationCode_Details", {
      requestObject: { id },
    });
  },
  update: async (payload: OperationPayload) => {
    return await coreApi.post<OperationResponse, BaseResponse<null>>("core/OperationCode_Edit", {
      requestObject: { ...payload },
    });
  },
  updateStatus: async (payload: { id?: number; status?: IOperationStatus }) => {
    return await coreApi.post<OperationResponse, BaseResponse<null>>("core/OperationCode_UpdateStatus", {
      requestObject: { ...payload },
    });
  },
  getList: async (queryParams?: OperationQueryParams) => {
    return await coreApi.post<OperationListResponse, BaseResponse<null>>("core/OperationCode_List", {
      requestObject: {
        ...queryParams?.requestObject,
      },
      orderBy: queryParams?.orderBy,
    });
  },
  getStatus: async (params: OperationStatusQueryParams) => {
    return await coreApi.post<OperationStatusResponse, BaseResponse<null>>("core/OperationCode_GetStatus", {
      requestObject: { ...params },
    });
  },
};

export const operationDeadlineAPIs = {
  create: async (payload?: OperationDeadlinePayload) => {
    return await coreApi.post<OperationDeadlineResponse, BaseResponse<null>>("core/OperationDeadline_Addnew", {
      requestObject: { ...payload },
    });
  },
  detail: async (id?: number) => {
    return await coreApi.post<OperationResponse, BaseResponse<null>>("core/OperationDeadline_Details", {
      requestObject: { id },
    });
  },
  update: async (payload?: OperationDeadlineUpdatePayload) => {
    return await coreApi.post<OperationResponse, BaseResponse<null>>("core/OperationDeadline_Edit", {
      requestObject: { ...payload },
    });
  },
  getList: async (queryParams: OperationDeadlineQueryParams) => {
    return await coreApi.post<OperationDeadlineListResponse, BaseResponse<null>>("core/OperationDeadline_List", {
      requestObject: {
        ...queryParams.requestObject,
      },
      pageCurrent: queryParams.pageCurrent,
      pageSize: queryParams.pageSize,
      orderBy: queryParams.orderBy,
    });
  },
  updateReamark: async (payload?: OperationDeadlinePassengerRemarkPayload) => {
    return await coreApi.post<OperationReamarkResponse, BaseResponse<null>>(
      "core/OperationCode_UpdatePassengerDeadlineRemarks",
      {
        requestObject: { ...payload },
      },
    );
  },
};

export const operationCostingAPIs = {
  create: async (payload?: OperationCostingPayload) => {
    return await coreApi.post<OperationCostingResponse, BaseResponse<null>>("core/OperationCosting_Addnew", {
      requestObject: { ...payload },
    });
  },
  getList: async (payload?: OperationCostingParams) => {
    return await coreApi.post<OperationCostingListResponse, BaseResponse<null>>("core/OperationCosting_List", {
      requestObject: { ...payload },
    });
  },
  delete: async (costingId?: number) => {
    return await coreApi.post<any, BaseResponse<null>>("core/OperationCosting_Delete", {
      requestObject: { costingId },
    });
  },
};

export const operationCostingDetailAPIs = {
  getList: async (costingId?: number) => {
    return await coreApi.post<OperationCostingListDetailResponse, BaseResponse<null>>("core/OperationCosting_Details", {
      requestObject: { costingId },
    });
  },
  create: async (payload?: OperationCostingDetailPayload) => {
    return await coreApi.post<OperationResponse, BaseResponse<null>>("core/OperationCostingDetails_Addnew", {
      requestObject: { ...payload },
    });
  },
  update: async (payload?: OperationCostingDetailPayload) => {
    return await coreApi.post<OperationResponse, BaseResponse<null>>("core/OperationCostingDetails_Edit", {
      requestObject: { ...payload },
    });
  },
  getOne: async (costingDetailsId?: number) => {
    return await coreApi.post<OperationResponse, BaseResponse<null>>("core/OperationCostingDetails_Details", {
      requestObject: { costingDetailsId },
    });
  },
  toggleLock: async (payload?: { costingDetailsId?: number; isLocked?: boolean }) => {
    return await coreApi.post<OperationResponse, BaseResponse<null>>("core/OperationCostingDetails_Lock", {
      requestObject: { ...payload },
    });
  },
  complete: async (costingDetailsId?: number) => {
    return await coreApi.post<OperationResponse, BaseResponse<null>>("core/OperationCostingDetails_Finalize", {
      requestObject: { costingDetailsId },
    });
  },
  delete: async (costingDetailsId?: number) => {
    return await coreApi.post<OperationResponse, BaseResponse<null>>("core/OperationCostingDetails_Delete", {
      requestObject: { costingDetailsId },
    });
  },
};

export const operationRoomingAPIs = {
  getRoomingList: async (params: { sellableId?: number; orderId?: number } | { operationId?: number }) => {
    return await coreApi.post<RoomingListResponse>("core/Operation_RoomingList_List", {
      requestObject: {
        ...params,
      },
    });
  },
  updateRoomingList: async (payload: RoomingPayload) => {
    return await coreApi.post<RoomingListResponse>("core/Operation_RoomingList_Assign", {
      requestObject: {
        roomingList: payload.roomingList,
      },
    });
  },
  handOver: async (payload: RoomingHandOverPayload) => {
    return await coreApi.post<RoomingListResponse>("core/Operation_RoomingList_UpdateStatus", {
      requestObject: {
        ...payload,
      },
    });
  },
};

export const operationThingTodoAPIs = {
  getList: async (params?: OperationThingTodoQueryParams) => {
    return await coreApi.post<OperationThingTodoListResponse>("core/OperationThingToDo_List", {
      requestObject: {
        ...params?.requestObject,
      },
      orderBy: params?.orderBy,
      pageCurrent: params?.pageCurrent,
      pageSize: params?.pageSize,
    });
  },
};

export const operationDutyAPIs = {
  getList: async (params: OperationDutyQueryParams) => {
    return await coreApi.post<OperationDutyListResponse>("core/OperationCode_GetDutySupplierList", {
      requestObject: {
        ...params,
      },
    });
  },
  update: async (payload: UpdateOperationDutyPayload) => {
    return await coreApi.post<UpdateOperationDutyResponse>("core/OperationCode_UpdateDutySupplierList", {
      requestObject: {
        ...payload,
      },
    });
  },
  delete: async (payload: { dutyBookingId: number; sellableId: number; supplierId: number }) => {
    return await coreApi.post<UpdateOperationDutyResponse>("core/OperationCode_UpdateDutySupplierList", {
      requestObject: {
        sellableId: payload.sellableId,
        suppliers: [
          {
            supplierId: payload.supplierId,
            dutyBookingId: payload.dutyBookingId,
            status: "XX",
          },
        ],
      },
    });
  },
};
