import { BaseResponse, Status } from "../../common.interface";
import { IDestination } from "../region.interface";

export interface ITemplateSellable {
  recId: number;
  cmsIdentity: string;
  sellableTemplateId: number;
  type: string; //1.2 producttype
  code: string;
  name: string;
  inventoryTypeList: string; //1.1 inventoryType: chuỗi split bởi ||, ví dụ: AIR||HOTEL||GUIDE
  destListJson: string; //json cửa mảng [DestList], có thể có nhiều Destlist
  checkListJson: string; // json {name, descriptions, link}
  tourItinerary: string;
  airItinerary: string;
  counter: string;
  depart: string;
  sysFstUser: string;
  sysFstUpdate: string;
  sysLstUser: string;
  sysLstUpdate: string;
  sysBelongTo: string;
  logStatus: string;
  status: Status;
}

interface RequestObject {
  recId?: number;
  andType?: string; //3 biến and.... là điều kiện search AND, có thể truyền 1 trong 3 hoặc cả 3
  andCodeLike?: string;
  andDestIn?: string;
  status?: Status;
}

export class TemplateSellableQueryParams {
  requestObject?: RequestObject;
  pageCurrent?: number;
  pageSize?: number;

  constructor(requestObject: RequestObject | undefined, pageCurrent: number | undefined, pageSize: number | undefined) {
    this.requestObject = requestObject;
    this.pageCurrent = pageCurrent;
    this.pageSize = pageSize;
  }
}
export interface ITemplateSellablePayload {
  cmsIdentity: string;
  type: string; //1.2 producttype
  code: string;
  name: string;
  inventoryTypeList: string; //1.1 inventoryType: chuỗi split bởi ||, ví dụ: AIR||HOTEL||GUIDE
  destListJson: IDestination[]; //json cửa mảng [DestList], có thể có nhiều Destlist
  checkListJson: {
    name: string;
    descriptions: string;
    link: string;
  }[];
  status: Status;
}
export interface ITemplateSellableUpdatePayload
  extends Pick<ITemplateSellablePayload, "cmsIdentity" | "name" | "inventoryTypeList" | "destListJson"> {}

export interface ITemplateSaleableListRs extends BaseResponse<ITemplateSellable[]> {}
export interface ITemplateSaleableDetailRs extends BaseResponse<ITemplateSellable> {}
