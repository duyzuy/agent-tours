import { useMutation } from "@tanstack/react-query";
import { BaseResponse } from "@/models/management/common.interface";
import { sellableAPIs } from "@/services/management/cores/sellable";
import {
    ISellablePayload,
    SellableConfirmPayload,
} from "@/models/management/core/sellable.interface";

//create folder in public/uploads folder.

export const useCreateSellableMutation = () => {
    return useMutation<BaseResponse<any>, BaseResponse<null>, ISellablePayload>(
        {
            mutationFn: (payload) => sellableAPIs.create(payload),
        },
    );
};

export const useApprovalSellableMutation = () => {
    return useMutation<
        BaseResponse<any>,
        BaseResponse<null>,
        SellableConfirmPayload
    >({
        mutationFn: (payload) => sellableAPIs.approval(payload),
    });
};
