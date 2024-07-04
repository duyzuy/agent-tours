import { BaseResponse } from "@/models/common.interface";
import { sellableAPIs } from "@/services/management/cores/sellable";
import { ISellablePayload, SellableConfirmPayload } from "@/models/management/core/sellable.interface";
import { SellablePriceConfigPayload, SellablePriceConfigRs } from "@/models/management/core/priceConfig.interface";
import { useCustomMutation } from "../useCustomMutation";

//create folder in public/uploads folder.

export const useCreateSellableMutation = () => {
  return useCustomMutation<BaseResponse<any>, ISellablePayload>({
    mutationFn: (payload) => sellableAPIs.create(payload),
  });
};

export const useApprovalSellableMutation = () => {
  return useCustomMutation<BaseResponse<any>, SellableConfirmPayload>({
    mutationFn: (payload) => sellableAPIs.approval(payload),
  });
};

export const useConfigPricingSellableMudation = () => {
  return useCustomMutation<SellablePriceConfigRs, SellablePriceConfigPayload>({
    mutationFn: (payload) => sellableAPIs.updateSellablePriceConfigs(payload),
  });
};
