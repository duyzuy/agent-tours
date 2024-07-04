import { templateSellableAPIs } from "@/services/management/cores/templateSellable";

import {
  ITemplateSaleableListRs,
  ITemplateSellablePayload,
  ITemplateSellableUpdatePayload,
} from "@/models/management/core/templateSellable.interface";
import { useCustomMutation } from "../useCustomMutation";

export const useCreateTemplateSellableMutation = () => {
  return useCustomMutation<ITemplateSaleableListRs, ITemplateSellablePayload>({
    mutationFn: (payload) => templateSellableAPIs.create(payload),
  });
};

export const useApprovalTemplateSellableMutation = () => {
  return useCustomMutation<ITemplateSaleableListRs, number>({
    mutationFn: (recordId) => templateSellableAPIs.confirm(recordId),
  });
};

export const useUpdateTemplateSellableMutation = () => {
  return useCustomMutation<ITemplateSaleableListRs, ITemplateSellableUpdatePayload & { recordId: number }>({
    mutationFn: (payload) => templateSellableAPIs.edit(payload.recordId, payload),
  });
};

export const useDeleteTemplateSellableMutation = () => {
  return useCustomMutation<ITemplateSaleableListRs, number>({
    mutationFn: (recId) => templateSellableAPIs.delete(recId),
  });
};
