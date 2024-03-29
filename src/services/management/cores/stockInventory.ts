import { BaseResponse } from "@/models/management/common.interface";
import { coreApi } from "../coreApi";
import {
    IStockListOfInventoryRs,
    IStockTypeRs,
    IStockPayload,
    IStock,
    IStockConfirmPayload,
    IStockAdjustPayload,
    IStockAdjustment,
    StockQueryParams,
} from "@/models/management/core/stock.interface";

export const stockInventoryAPIs = {
    getStockType: async (type: string) => {
        return await coreApi.post<IStockTypeRs, BaseResponse<null>>(
            "core/MiscInventoryStockType",
            {
                requestObject: {
                    type,
                },
                localUsername: "99",
            },
        );
    },
    getStockList: async (queryParams?: StockQueryParams) => {
        return await coreApi.post<IStockListOfInventoryRs, BaseResponse<null>>(
            "core/InventoryStock_List",
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
    getStockDetail: async (inventoryStockId: number) => {
        return await coreApi.post<
            BaseResponse<IStockAdjustment[]>,
            BaseResponse<null>
        >("core/InventoryStock_Details", {
            requestObject: {
                inventoryStockId,
            },
            localUsername: "99",
        });
    },

    adjustQuantity: async (payload: IStockAdjustPayload) => {
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
