import { BaseResponse } from "./common.interface";

export interface LocalSearchListRs extends BaseResponse<any> {}

export interface LocalSearchPayload {
    name?: string;
    engName?: string;
    regionKey?: string;
    subRegionKey?: string;
    countryKey?: string;
    stateProvinceKey?: string;
    order?: number;
}
export class LocalSearchFormData implements LocalSearchPayload {
    name?: string;
    engName?: string;
    regionKey?: string;
    subRegionKey?: string;
    countryKey?: string;
    stateProvinceKey?: string;
    order?: number;

    constructor(
        name: string | undefined,
        engName: string | undefined,
        regionKey: string | undefined,
        subRegionKey: string | undefined,
        countryKey: string | undefined,
        stateProvinceKey: string | undefined,
        order: number | undefined,
    ) {
        this.name = name;
        this.engName = engName;
        this.regionKey = regionKey;
        this.subRegionKey = subRegionKey;
        this.countryKey = countryKey;
        this.stateProvinceKey = stateProvinceKey;
        this.order = order;
    }
}

export interface LocalSearch {
    regionKey: string;
    subRegionKey: string;
    countryKey: string;
    stateProvinceKey: string;
}

export class LocalSearchQueryParams {
    recId?: number;
    regionKey?: string;
    subRegionKey?: string;
    countryKey?: string;
    stateProvinceKey?: string;
    pageCurrent?: number;
    pageSize?: number;

    constructor(
        recId: number | undefined,
        regionKey: string | undefined,
        subRegionKey: string | undefined,
        countryKey: string | undefined,
        stateProvinceKey: string | undefined,
        pageCurrent: number | undefined,
        pageSize: number | undefined,
    ) {
        this.recId = recId;
        this.regionKey = regionKey;
        this.subRegionKey = subRegionKey;
        this.countryKey = countryKey;
        this.stateProvinceKey = stateProvinceKey;
        this.pageCurrent = pageCurrent;
        this.pageSize = pageSize;
    }
}
