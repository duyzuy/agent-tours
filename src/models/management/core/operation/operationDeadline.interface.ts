import { BaseQueryParams, BaseResponse } from "@/models/common.interface";
import { EInventoryType } from "../inventoryType.interface";

export interface IOperationDeadline {
  id: number;
  operationId: number;
  sellableId: number;
  sellableCode: string;
  type: EInventoryType;
  preDeadline: string | null;
  deadline: string | null;
  remark: string;
  needRemarkEachPaxToFollow: boolean;
  status: "NEW" | "DONE" | "PRE_DEADLINE" | "EXPIRED";
}

export interface OperationDeadlineUpdatePayload {
  id?: number;
  preDeadline?: string;
  deadline?: string;
  remark?: string;
  needRemarkEachPaxToFollow?: boolean;
}
export interface OperationDeadlineCreatePayload {
  operationId?: number;
  type?: EInventoryType;
  preDeadline?: string; //có thể truyền hoặc không, phải < deadLine
  deadline?: string;
  remark?: string;
  needRemarkEachPaxToFollow?: boolean;
}

export class OperationDeadlineQueryParams
  implements BaseQueryParams<{ operationId: number; status?: "NEW" | "PRE_DEADLINE" | "EXPIRED" | "DONE" }>
{
  requestObject: { operationId: number; status?: "NEW" | "PRE_DEADLINE" | "EXPIRED" | "DONE" };
  pageCurrent?: number | undefined;
  pageSize?: number | undefined;
  orderBy?: { sortColumn?: string; direction?: "asc" | "desc" } | undefined;
  constructor(
    requestObject: { operationId: number; status?: "NEW" | "PRE_DEADLINE" | "EXPIRED" | "DONE" },
    pageCurrent: number | undefined,
    pageSize: number | undefined,
    orderBy: { sortColumn?: string; direction?: "asc" | "desc" } | undefined,
  ) {
    (this.requestObject = requestObject), (this.orderBy = orderBy), (this.pageCurrent = pageCurrent);
    this.pageSize = pageSize;
  }
}
export type OperationDeadlinePayload = OperationDeadlineCreatePayload | OperationDeadlineUpdatePayload;
export type OperationDeadlinePassengerRemarkPayload = {
  recId?: number;
  sellableId?: number;
  paxId?: number;
  deadlineId?: number;
  deadlineType?: string;
  remark?: string;
};
export interface OperationDeadlineListResponse extends BaseResponse<IOperationDeadline[]> {}
export interface OperationDeadlineResponse extends BaseResponse<IOperationDeadline> {}
