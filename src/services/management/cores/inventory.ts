import { BaseResponse } from "@/models/common.interface";
import { coreApi } from "../coreApi";
import {
    IInventoryListRs,
    IInventoryPayload,
    InventoryQueryParams,
} from "@/models/management/core/inventory.interface";

export const inventoryAPIs = {
    getList: async (queryParams?: InventoryQueryParams) => {
        return await coreApi.post<IInventoryListRs, BaseResponse<null>>(
            "core/Inventory_List",
            {
                requestObject: {
                    ...queryParams?.requestObject,
                },
                pageCurrent: queryParams?.pageCurrent,
                pageSize: queryParams?.pageSize,
            },
        );
    },
    getOne: async (recId: number) => {
        return await coreApi.post<IInventoryListRs, BaseResponse<null>>(
            "core/Inventory_List",
            {
                requestObject: { recId },
            },
        );
    },
    create: async (payload: IInventoryPayload) => {
        return await coreApi.post<IInventoryListRs, BaseResponse<null>>(
            "core/Inventory_Addnew",
            {
                requestObject: { ...payload },
            },
        );
    },
    update: async (recId: number, name: string) => {
        return await coreApi.post<IInventoryListRs, BaseResponse<null>>(
            "core/Inventory_Edit",
            {
                requestObject: { recId, name },
            },
        );
    },
    approve: async (recId: number) => {
        return await coreApi.post<IInventoryListRs, BaseResponse<null>>(
            "core/Inventory_Confirm",
            {
                requestObject: { recId },
            },
        );
    },
    delete: async (recId: number) => {
        return await coreApi.post<IInventoryListRs, BaseResponse<null>>(
            "core/Inventory_Delete",
            {
                requestObject: { recId },
            },
        );
    },
};
