import { BaseResponse } from "@/models/common.interface";
import { coreApi } from "../coreApi";
import {
    VendorListRs,
    VendorRs,
    VendorQueryParams,
    IVendor,
    VendorUpdatePayload,
} from "@/models/management/vendor.interface";
import { VendorPayload } from "@/models/management/vendor.interface";

export const vendorAPIs = {
    getList: async (queryParams?: VendorQueryParams) => {
        return await coreApi.post<VendorListRs, BaseResponse<null>>(
            "core/SourceVendor_List",
            {
                requestObject: {
                    ...queryParams?.requestObject,
                },
                pageCurrent: queryParams?.pageCurrent,
                pageSize: queryParams?.pageSize,
            },
        );
    },
    create: async (payload?: VendorPayload) => {
        return await coreApi.post<VendorRs, BaseResponse<null>>(
            "core/SourceVendor_Addnew",
            {
                requestObject: {
                    ...payload,
                },
            },
        );
    },
    update: async (payload?: VendorUpdatePayload) => {
        return await coreApi.post<VendorRs, BaseResponse<null>>(
            "core/SourceVendor_Edit",
            {
                requestObject: {
                    ...payload,
                },
            },
        );
    },
    delete: async (recId?: number) => {
        return await coreApi.post<VendorRs, BaseResponse<null>>(
            "core/SourceVendor_Delete",
            {
                requestObject: {
                    recId,
                },
            },
        );
    },
    approval: async (recId?: number) => {
        return await coreApi.post<VendorRs, BaseResponse<null>>(
            "core/SourceVendor_Confirm",
            {
                requestObject: {
                    recId,
                },
            },
        );
    },
    deactive: async (recId?: number) => {
        return await coreApi.post<VendorRs, BaseResponse<null>>(
            "core/SourceVendor_Deactive",
            {
                requestObject: {
                    recId,
                },
            },
        );
    },
    active: async (recId?: number) => {
        return await coreApi.post<VendorRs, BaseResponse<null>>(
            "core/SourceVendor_Active",
            {
                requestObject: {
                    recId,
                },
            },
        );
    },
};
