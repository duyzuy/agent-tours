import { BaseResponse } from "@/models/common.interface";
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
  status: "NEW" | "DONE" | "PRE_DEADLINE" | "EXPIRED";
}

export interface OperationDeadlineUpdatePayload {
  id?: number;
  preDeadline?: string;
  deadline?: string;
  remark?: string;
}
export interface OperationDeadlineCreatePayload {
  operationId?: number;
  type?: EInventoryType;
  preDeadline?: string; //có thể truyền hoặc không, phải < deadLine
  deadline?: string;
  remark?: string;
}

export type OperationDeadlinePayload = OperationDeadlineCreatePayload | OperationDeadlineUpdatePayload;

export interface OperationDeadlineListResponse extends BaseResponse<IOperationDeadline[]> {}
export interface OperationDeadlineResponse extends BaseResponse<IOperationDeadline> {}
