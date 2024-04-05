import { BaseResponse, Status } from "./common.interface";

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
    cat: "DESTLIST";
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
    cat: string;
    type: string;
    id: number;
    codeKey: string;
    title: string;
    descriptions: string;
    shortDescriptions: string;
    thumb: number;
    thumbPath: string;
    slug: string;
    lang: "vi" | "en";
    status: string;
}

export interface IDestinationContentPayload
    extends Pick<
        IDestinationContentDetail,
        | "codeKey"
        | "title"
        | "descriptions"
        | "shortDescriptions"
        | "thumb"
        | "slug"
        | "lang"
    > {}

export class DestinationContentFormData implements IDestinationContentPayload {
    codeKey: string;
    title: string;
    descriptions: string;
    shortDescriptions: string;
    thumb: number;
    slug: string;
    lang: "vi" | "en";

    constructor(
        title: string,
        descriptions: string,
        shortDescriptions: string,
        thumb: number,
        slug: string,
        codeKey: string,
        lang: "vi" | "en",
    ) {
        this.title = title;
        this.descriptions = descriptions;
        this.shortDescriptions = shortDescriptions;
        this.thumb = thumb;
        this.title = title;
        this.slug = slug;
        this.lang = lang;
        this.codeKey = codeKey;
    }
}
export interface IDestinationContentPayload
    extends Pick<
        IDestinationContentDetail,
        | "codeKey"
        | "title"
        | "descriptions"
        | "shortDescriptions"
        | "thumb"
        | "slug"
        | "lang"
    > {}

export interface IDestinationContentRs
    extends BaseResponse<IDestinationContentDetail> {}
export interface IDestinationContentsRs
    extends BaseResponse<IDestinationContentDetail[]> {}

export interface IDestinationGetContentQueryParams {
    codekey: string;
}
