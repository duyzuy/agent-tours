import { BaseResponse } from "../common.interface";
import { ITravelInformationNotice } from "../management/cms/cmsStateProvinceNotice";

export interface FeTravelInformationNotice extends ITravelInformationNotice {}

export interface FeTravelInformationNoticeResponse extends BaseResponse<FeTravelInformationNotice[]> {}
