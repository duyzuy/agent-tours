import { BaseResponse } from "@/models/management/common.interface";
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
                localUsername: "99",
            },
        );
    },
    getOne: async (recId: number) => {
        return await coreApi.post<IInventoryListRs, BaseResponse<null>>(
            "core/Inventory_List",
            {
                requestObject: { recId },
                localUsername: "99",
            },
        );
    },
    create: async (payload: IInventoryPayload) => {
        return await coreApi.post<IInventoryListRs, BaseResponse<null>>(
            "core/Inventory_Addnew",
            {
                requestObject: { ...payload },
                localUsername: "99",
            },
        );
    },
    update: async (recId: number, name: string) => {
        return await coreApi.post<IInventoryListRs, BaseResponse<null>>(
            "core/Inventory_Edit",
            {
                requestObject: { recId, name },
                localUsername: "99",
            },
        );
    },
    approve: async (recId: number) => {
        return await coreApi.post<IInventoryListRs, BaseResponse<null>>(
            "core/Inventory_Confirm",
            {
                requestObject: { recId },
                localUsername: "99",
            },
        );
    },
    delete: async (recId: number) => {
        return await coreApi.post<IInventoryListRs, BaseResponse<null>>(
            "core/Inventory_Delete",
            {
                requestObject: { recId },
                localUsername: "99",
            },
        );
    },
};
