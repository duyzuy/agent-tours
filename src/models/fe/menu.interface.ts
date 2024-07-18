import { BaseResponse } from "../common.interface";
import { LangCode } from "../management/cms/language.interface";
import { IMenuItem, MenuPositionType } from "../management/cms/menu.interface";

export interface FeMenuListResponse
  extends BaseResponse<{ menuPosition: MenuPositionType; lang: LangCode; menuItems: IMenuItem[] }[]> {}
