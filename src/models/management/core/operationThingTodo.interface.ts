import { BaseResponse } from "@/models/common.interface";
import { EInventoryType } from "./inventoryType.interface";

export interface IOperationThingTodo {
  deadlineId: number;
  operationId: number;
  type: EInventoryType;
  preDeadline: string;
  deadline: string;
  remark: string;
  status: "NEW" | "DONE";
}
export interface OperationThingTodoParams {
  operationId?: number;
  type?: string;
  status?: "NEW" | "DONE";
  numberOfDayFromToday?: number;
}

export class OperationThingTodoQueryParams {
  operationId?: number;
  type?: string;
  status?: "NEW" | "DONE";
  numberOfDayFromToday?: number;

  constructor(
    type: string | undefined,
    operationId: number | undefined,
    status: "NEW" | "DONE",
    numberOfDayFromToday: number | undefined,
  ) {
    this.type = type;
    this.status = status;
    this.numberOfDayFromToday = numberOfDayFromToday ?? 3;
  }
}

export interface OperationThingTodoListResponse extends BaseResponse<IOperationThingTodo[]> {}
