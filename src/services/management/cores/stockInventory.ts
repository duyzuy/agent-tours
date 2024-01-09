import { BaseResponse } from "@/models/management/common.interface";
import { coreApi } from "../coreApi";
import {
    IStockListOfInventoryRs,
    IStockInventoryTypeRs,
    IStockPayload,
    IStock,
    IStockConfirmPayload,
} from "@/models/management/core/stockInventory.interface";

export const stockInventoryAPIs = {
    getStockType: async (type: string) => {
        return await coreApi.post<IStockInventoryTypeRs, BaseResponse<null>>(
            "core/MiscInventoryStockType",
            {
                requestObject: {
                    type,
                },
                localUsername: "99",
            },
        );
    },
    getStockList: async (inventoryId: number) => {
        return await coreApi.post<IStockListOfInventoryRs, BaseResponse<null>>(
            "core/InventoryStock_List",
            {
                requestObject: {
                    inventoryId,
                },
                localUsername: "99",
            },
        );
    },
    create: async (payload: IStockPayload) => {
        return await coreApi.post<BaseResponse<IStock>, BaseResponse<null>>(
            "core/InventoryStock_Addnew",
            {
                requestObject: {
                    ...payload,
                },
                localUsername: "99",
            },
        );
    },
    confirm: async (payload: IStockConfirmPayload) => {
        return await coreApi.post<BaseResponse<IStock>, BaseResponse<null>>(
            "core/InventoryStock_Confirm",
            {
                requestObject: {
                    ...payload,
                },
                localUsername: "99",
            },
        );
    },
    adjustQuantity: async (payload: {
        inventoryStockId: number;
        quantity: number;
    }) => {
        return await coreApi.post<BaseResponse<IStock>, BaseResponse<null>>(
            "core/InventoryStock_Adjust",
            {
                requestObject: {
                    ...payload,
                },
                localUsername: "99",
            },
        );
    },
};
