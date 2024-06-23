import { EProductType } from "../management/core/productType.interface";

export interface FeSearchTourPayload {
    byCode?: string;
    byDest?: {
        countryKey: string;
        stateProvinceKey: string;
        keyType: string;
        regionKey: string;
        subRegionKey: string;
    }[];
    byInventoryType?: [];
    byMonth?: string;
    byProductType: EProductType[];
    byTemplateCode?: string;
    byTemplateCmsIdentity?: string;
}

export class FeSearchTourQueryParams {
    requestObject?: FeSearchTourPayload;
    pageCurrent?: number;
    pageSize?: number;
    constructor(
        requestObject: FeSearchTourPayload | undefined,
        pageCurrent?: number | undefined,
        pageSize?: number | undefined,
    ) {
        (this.requestObject = requestObject), (this.pageCurrent = pageCurrent);
        this.pageSize = pageSize;
    }
}
