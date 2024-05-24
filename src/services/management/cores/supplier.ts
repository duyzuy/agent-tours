import { BaseResponse } from "@/models/management/common.interface";
import { coreApi } from "../coreApi";
import {
    SupplierListRs,
    SupplierPayload,
    SupplierQueryParams,
    SupplierRs,
} from "@/models/management/supplier.interface";

export const supplierAPIs = {
    getList: async (queryParams?: SupplierQueryParams) => {
        return await coreApi.post<SupplierListRs, BaseResponse<null>>(
            "core/SourceSupplier_List",
            {
                requestObject: {
                    ...queryParams?.requestObject,
                },
                pageCurrent: queryParams?.pageCurrent,
                pageSize: queryParams?.pageSize,
                localUsername: "99",
            },
        );
    },
    create: async (payload?: SupplierPayload) => {
        return await coreApi.post<SupplierRs, BaseResponse<null>>(
            "core/SourceSupplier_Addnew",
            {
                requestObject: {
                    ...payload,
                },
                localUsername: "99",
            },
        );
    },
    update: async (payload?: SupplierPayload) => {
        return await coreApi.post<SupplierRs, BaseResponse<null>>(
            "core/SourceSupplier_Edit",
            {
                requestObject: {
                    ...payload,
                },
                localUsername: "99",
            },
        );
    },
    delete: async (recId?: number) => {
        return await coreApi.post<SupplierRs, BaseResponse<null>>(
            "core/SourceSupplier_Delete",
            {
                requestObject: {
                    recId,
                },
                localUsername: "99",
            },
        );
    },
    approval: async (recId?: number) => {
        return await coreApi.post<SupplierRs, BaseResponse<null>>(
            "core/SourceSupplier_Confirm",
            {
                requestObject: {
                    recId,
                },
                localUsername: "99",
            },
        );
    },
    deactive: async (recId?: number) => {
        return await coreApi.post<SupplierRs, BaseResponse<null>>(
            "core/SourceSupplier_Deactive",
            {
                requestObject: {
                    recId,
                },
                localUsername: "99",
            },
        );
    },
    active: async (recId?: number) => {
        return await coreApi.post<SupplierRs, BaseResponse<null>>(
            "core/SourceSupplier_Active",
            {
                requestObject: {
                    recId,
                },
                localUsername: "99",
            },
        );
    },
};
