import { stockInventoryAPIs } from "@/services/management/cores/stockInventory";
import { BaseResponse } from "@/models/common.interface";
import {
  IStock,
  IStockAdjustPayload,
  IStockConfirmPayload,
  IStockPayload,
} from "@/models/management/core/stock.interface";
import { useCustomMutation } from "../useCustomMutation";

//create folder in public/uploads folder.

export const useCreateStockMutation = () => {
  return useCustomMutation<BaseResponse<IStock>, IStockPayload>({
    mutationFn: (payload) => stockInventoryAPIs.create(payload),
  });
};

export const useConfirmStockMutation = () => {
  return useCustomMutation<BaseResponse<IStock>, IStockConfirmPayload>({
    mutationFn: (payload) => stockInventoryAPIs.confirm(payload),
  });
};
