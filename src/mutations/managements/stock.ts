import { stockInventoryAPIs } from "@/services/management/cores/stockInventory";
import { useMutation } from "@tanstack/react-query";
import { BaseResponse } from "@/models/common.interface";
import {
    IStock,
    IStockAdjustPayload,
    IStockConfirmPayload,
    IStockPayload,
} from "@/models/management/core/stock.interface";

//create folder in public/uploads folder.

export const useCreateStockMutation = () => {
    return useMutation<BaseResponse<IStock>, BaseResponse<null>, IStockPayload>(
        {
            mutationFn: (payload) => stockInventoryAPIs.create(payload),
        },
    );
};

export const useConfirmStockMutation = () => {
    return useMutation<
        BaseResponse<IStock>,
        BaseResponse<null>,
        IStockConfirmPayload
    >({
        mutationFn: (payload) => stockInventoryAPIs.confirm(payload),
    });
};

export const useAdjustStockQuantityMutation = () => {
    return useMutation<
        BaseResponse<IStock>,
        BaseResponse<null>,
        IStockAdjustPayload
    >({
        mutationFn: (payload) => stockInventoryAPIs.adjustQuantity(payload),
    });
};
