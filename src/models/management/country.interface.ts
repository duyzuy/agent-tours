import { BaseResponse } from "./common.interface";
import { IMediaFile } from "./media.interface";

export interface ICountry {
    id: number;
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
    status: "OK" | "XX" | "OX";
    listStateProvince: ICountry[];
}
export interface IDestinationPayload {
    codeName: string;
    codeKey: string;
    status: "OK" | "XX" | "OX"; // status: "OK" => đang sử dụng (active) | "XX" => bị xoá | "OX" => de-active
    listStateProvince: ICountry[];
}

export interface IDestinationEditPayload
    extends Partial<Omit<IDestinationPayload, "codeKey">> {
    id: number;
}

export class DestinationPayload implements IDestinationPayload {
    codeName: string;
    codeKey: string;
    status: "OK" | "XX" | "OX";
    listStateProvince: ICountry[];

    constructor(
        codeName: string,
        codeKey: string,
        listStateProvince: ICountry[],
    ) {
        this.codeKey = codeKey;
        this.codeName = codeName;
        this.status = "OX";
        this.listStateProvince = listStateProvince;
    }
}
export interface ICountryListRs extends BaseResponse<ICountry[]> {}
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

export interface IDestinationContentFormData
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

export class DestinationContentFormData implements IDestinationContentFormData {
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
