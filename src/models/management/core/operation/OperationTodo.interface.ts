import { EInventoryType } from "../inventoryType.interface";
import { IOperationStatus } from "./operation.interface";
import { BaseResponse } from "@/models/common.interface";
export interface IOperationTodoItem {
  type?: EInventoryType; //optional inventoryTypes visa | landpackage| ...
  status?: IOperationStatus;
  numberOfDayFromToday?: number; //default 3 ngày, bắt buộc truyền >= 3
}

export interface OperationTodoListResponse extends BaseResponse<IOperationTodoItem[]> {}
