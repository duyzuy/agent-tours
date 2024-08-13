import { BaseResponse } from "../common.interface";
import { ITravelInformationNotice } from "../management/cms/cmsStateProvinceNotice";
import { LangCode } from "../management/cms/language.interface";
import { PageContentStatus } from "../management/cms/pageContent.interface";

export interface FeTravelInformationNotice {
  recId: number;
  cmsIdentity: string;
  type: string;
  code: string;
  name: string;
  inventoryTypeList: string;
  cms: null;
  sellables: null;
  cmsMustKnow: {
    cat: "cms_travelinfo_mustknow";
    name: string;
    descriptions: string;
    country: ITravelInformationNotice["country"];
    id: number;
    originId: number;
    lang: LangCode;
    status: PageContentStatus;
    languages: any[];
  } | null;
}

export interface FeTravelInformationNoticeResponse extends BaseResponse<FeTravelInformationNotice> {}
