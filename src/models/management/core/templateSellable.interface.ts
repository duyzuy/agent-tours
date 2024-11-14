import { BaseResponse, Status } from "../../common.interface";
import { IDepartLocation } from "../cms/miscDepartLocation.interface";
import { IMiscDocument } from "../cms/miscDocument.interface";
import { IDestination } from "../region.interface";
import { IDocument } from "./document.interface";
import { EInventoryType } from "./inventoryType.interface";
import { EProductType } from "./productType.interface";

export interface ITemplateSellableDetail {
  recId: number;
  cmsIdentity: string;
  sellableTemplateId: number;
  type: EProductType;
  code: string;
  name: string;
  inventoryTypeList: EInventoryType[]; //1.1 inventoryType
  destListJson: IDestination[];
  checkListJson: IMiscDocument[] | null;
  tourItinerary: string;
  airItinerary: string;
  counter: string;
  depart: IDepartLocation | null;
  sysFstUser: string;
  sysFstUpdate: string;
  sysLstUser: string;
  sysLstUpdate: string;
  sysBelongTo: string;
  logStatus: string;
  status: Status;
}

export type ITemplateSellable = ITemplateSellableDetail;

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
  cmsIdentity?: string;
  type?: string; //1.2 producttype
  code?: string;
  name?: string;
  inventoryTypeList?: EInventoryType[];
  destListJson?: Partial<IDestination>[];
  checkListJson?: Partial<IMiscDocument>[];
  depart?: Partial<IDepartLocation>;
  status?: Status;
}
export interface ITemplateSellableUpdatePayload
  extends Pick<ITemplateSellablePayload, "cmsIdentity" | "name" | "inventoryTypeList" | "destListJson"> {}

export interface ITemplateSaleableListRs extends BaseResponse<ITemplateSellable[]> {}
export interface ITemplateSaleableDetailRs extends BaseResponse<ITemplateSellableDetail> {}
