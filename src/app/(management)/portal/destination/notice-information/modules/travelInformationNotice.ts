import { LangCode } from "@/models/management/cms/language.interface";
import { PageContentStatus } from "@/models/management/cms/pageContent.interface";
import { TravelInformationNoticePayload } from "@/models/management/cms/cmsStateProvinceNotice";

export class TravelInformationNoticeData implements TravelInformationNoticePayload {
  id?: number;
  originId?: number;
  lang?: LangCode;
  status?: PageContentStatus;
  name?: string;
  descriptions?: string;
  country?: {
    keyType?: "REGIONLIST" | "SUBREGIONLIST" | "COUNTRYLIST" | "STATEPROVINCELIST";
    regionKey?: string;
    subRegionKey?: string;
    countryKey?: string;
    stateProvinceKey?: string;
  };
  constructor(
    id: number | undefined,
    originId: number | undefined,
    lang: LangCode | undefined,
    status: PageContentStatus | undefined,
    name: string | undefined,
    descriptions: string | undefined,
    country:
      | {
          keyType?: "REGIONLIST" | "SUBREGIONLIST" | "COUNTRYLIST" | "STATEPROVINCELIST";
          regionKey?: string;
          subRegionKey?: string;
          countryKey?: string;
          stateProvinceKey?: string;
        }
      | undefined,
  ) {
    this.id = id;
    this.originId = originId;
    this.lang = lang;
    this.status = status;
    this.name = name;
    this.descriptions = descriptions;
    this.country = country;
  }
}
