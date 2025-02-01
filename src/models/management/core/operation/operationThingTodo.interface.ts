import { BaseQueryParams, BaseResponse } from "@/models/common.interface";
import { EInventoryType } from "../inventoryType.interface";

export interface IOperationThingTodo {
  deadlineId: number;
  operationId: number;
  type: EInventoryType;
  preDeadline: string;
  deadline: string;
  remark: string;
  status: "NEW" | "DONE" | "EXPIRED" | "PRE_DEADLINE";
}

export class OperationThingTodoQueryParams
  implements
    BaseQueryParams<{
      operationId?: number;
      type?: string;
      status?: "NEW" | "DONE" | "EXPIRED" | "PRE_DEADLINE";
      numberOfDayFromToday?: number;
    }>
{
  requestObject?:
    | {
        operationId?: number;
        type?: string;
        status?: "NEW" | "DONE" | "EXPIRED" | "PRE_DEADLINE";
        numberOfDayFromToday?: number;
      }
    | undefined;
  pageCurrent?: number | undefined;
  pageSize?: number | undefined;
  orderBy?: { sortColumn?: string; direction?: "asc" | "desc" } | undefined;
  constructor(
    requestObject:
      | {
          operationId?: number;
          type?: string;
          status?: "NEW" | "DONE" | "EXPIRED" | "PRE_DEADLINE";
          numberOfDayFromToday?: number;
        }
      | undefined,
    pageCurrent: number | undefined,
    pageSize: number | undefined,
    orderBy: { sortColumn?: string; direction?: "asc" | "desc" } | undefined,
  ) {
    this.requestObject = requestObject;
    this.pageCurrent = pageCurrent;
    this.pageSize = pageSize;
    this.orderBy = orderBy;
  }
}

export interface OperationThingTodoListResponse extends BaseResponse<IOperationThingTodo[]> {}
