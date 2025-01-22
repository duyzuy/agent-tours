import { BaseResponse } from "@/models/common.interface";
import { coreApi } from "../coreApi";
import {
  IOperationStatus,
  OperationListResponse,
  OperationPayload,
  OperationQueryParams,
  OperationResponse,
  OperationStatusPayload,
  OperationStatusResponse,
} from "@/models/management/core/operation.interface";
import {
  OperationDeadlineListResponse,
  OperationDeadlinePayload,
  OperationDeadlineResponse,
  OperationDeadlineUpdatePayload,
} from "@/models/management/core/operationDeadline.interface";
import {
  OperationCostingListResponse,
  OperationCostingParams,
  OperationCostingPayload,
} from "@/models/management/core/operationCosting.interface";
import {
  OperationCostingDetailPayload,
  OperationCostingListDetailResponse,
} from "@/models/management/core/operationCostingDetail.interface";
import {
  RoomingListResponse,
  RoomingPayload,
  RoomingHandOverPayload,
} from "@/models/management/booking/rooming.interface";
import {
  OperationThingTodoListResponse,
  OperationThingTodoParams,
} from "@/models/management/core/operationThingTodo.interface";
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
  getStatus: async (payload: OperationStatusPayload) => {
    return await coreApi.post<OperationStatusResponse, BaseResponse<null>>("core/OperationCode_GetStatus", {
      requestObject: { ...payload },
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
  getList: async (operationId?: number) => {
    return await coreApi.post<OperationDeadlineListResponse, BaseResponse<null>>("core/OperationDeadline_List", {
      requestObject: { operationId },
    });
  },
};

export const operationCostingAPIs = {
  create: async (payload?: OperationCostingPayload) => {
    return await coreApi.post<any, BaseResponse<null>>("core/OperationCosting_Addnew", {
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
  getRoomingList: async (params: { sellableId?: number } | { operationId?: number }) => {
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
  getList: async (params: OperationThingTodoParams) => {
    return await coreApi.post<OperationThingTodoListResponse>("core/OperationThingToDo_List", {
      requestObject: {
        ...params,
      },
    });
  },
};
