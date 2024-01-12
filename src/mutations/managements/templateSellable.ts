import { useMutation } from "@tanstack/react-query";
import { BaseResponse } from "@/models/management/common.interface";
import { templateSellableAPIs } from "@/services/management/cores/templateSellable";

import {
    ITemplateSaleableListRs,
    ITemplateSellablePayload,
    ITemplateSellableUpdatePayload,
} from "@/models/management/core/templateSellable.interface";

//create folder in public/uploads folder.

export const useCreateTemplateSellableMutation = () => {
    return useMutation<
        ITemplateSaleableListRs,
        BaseResponse<null>,
        ITemplateSellablePayload
    >({
        mutationFn: (payload) => templateSellableAPIs.create(payload),
    });
};

export const useApprovalTemplateSellableMutation = () => {
    return useMutation<ITemplateSaleableListRs, BaseResponse<null>, number>({
        mutationFn: (recordId) => templateSellableAPIs.confirm(recordId),
    });
};

export const useUpdateTemplateSellableMutation = () => {
    return useMutation<
        ITemplateSaleableListRs,
        BaseResponse<null>,
        ITemplateSellableUpdatePayload & { recordId: number }
    >({
        mutationFn: (payload) =>
            templateSellableAPIs.edit(payload.recordId, payload),
    });
};

export const useDeleteTemplateSellableMutation = () => {
    return useMutation<ITemplateSaleableListRs, BaseResponse<null>, number>({
        mutationFn: (recId) => templateSellableAPIs.delete(recId),
    });
};
