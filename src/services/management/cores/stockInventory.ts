import { BaseResponse } from "@/models/common.interface";
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
        });
    },

    adjustQuantity: async (payload: IStockAdjustPayload) => {
        return await coreApi.post<BaseResponse<IStock>, BaseResponse<null>>(
            "core/InventoryStock_Adjust",
            {
                requestObject: {
                    ...payload,
                },
            },
        );
    },
};
