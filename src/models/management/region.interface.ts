import { LangCode } from "./cms/language.interface";
import { BaseResponse, Status } from "../common.interface";

export interface IStateProvince {
    recId: number;
    cat: "REGIONLIST" | "SUBREGIONLIST" | "COUNTRYLIST" | "STATEPROVINCELIST";
    countryKey: string;
    countryName: string;
    regionKey: string;
    stateProvinceKey: string;
    subRegionKey: string;
}
export interface IDestination {
    cat: string;
    id: number;
    codeKey: string;
    codeName: string;
    status: Status;
    listStateProvince: IStateProvince[];
}

export interface IDestinationPayload {
    codeName: string;
    codeKey: string;
    status: Status; // status: "OK" => đang sử dụng (active) | "XX" => bị xoá | "OX" => de-active
    listStateProvince: IStateProvince[];
}

export interface IDestinationEditPayload
    extends Partial<Omit<IDestinationPayload, "codeKey">> {
    id: number;
}

export class DestinationFormData implements IDestinationPayload {
    codeName: string;
    codeKey: string;
    status: Status;
    listStateProvince: IStateProvince[];

    constructor(
        codeName: string,
        codeKey: string,
        listStateProvince: IStateProvince[],
    ) {
        this.codeKey = codeKey;
        this.codeName = codeName;
        this.status = Status.OX;
        this.listStateProvince = listStateProvince;
    }
}
export interface IStateProvinceListRs extends BaseResponse<IStateProvince[]> {}
export interface IDestinationListRs extends BaseResponse<IDestination[]> {}
export interface IDestinationRs extends BaseResponse<IDestination> {}

//content
export interface IDestinationContentDetail {
    id: number;
    cat: string;
    type: string;
    codeKey: string;
    title: string;
    descriptions: string;
    shortDescriptions: string;
    thumb: number;
    thumbPath: string;
    slug: string;
    lang: LangCode;
    status: string;
}

export interface IDestinationContentPayload {
    id?: number;
    codeKey?: string;
    title?: string;
    descriptions?: string;
    shortDescriptions?: string;
    thumb?: number;
    slug?: string;
    lang?: LangCode;
}

export interface IDestinationContentRs
    extends BaseResponse<IDestinationContentDetail> {}
export interface IDestinationContentsRs
    extends BaseResponse<IDestinationContentDetail[]> {}

export interface IDestinationGetContentQueryParams {
    codekey: string;
}
