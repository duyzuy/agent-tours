import { Status } from "@/models/common.interface";

export interface IComment {
  recId: number;
  orderId: number;
  comment: string;
  status: Status;
  sysFstUser: string;
  sysFstUpdate: string;
  sysLstUser: string;
  sysLstUpdate: string;
  sysBelongTo: string;
  logStatus: string;
}
