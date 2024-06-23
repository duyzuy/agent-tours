import { inventoryAPIs } from "@/services/management/cores/inventory";
import { useMutation } from "@tanstack/react-query";
import { BaseResponse } from "@/models/common.interface";

import {
    IInventoryListRs,
    IInventoryPayload,
} from "@/models/management/core/inventory.interface";

//create folder in public/uploads folder.

export const useCreateInventoryMutation = () => {
    return useMutation<IInventoryListRs, BaseResponse<null>, IInventoryPayload>(
        {
            mutationFn: (payload) => inventoryAPIs.create(payload),
        },
    );
};

export const useUpdateInventoryMutation = () => {
    return useMutation<
        IInventoryListRs,
        BaseResponse<null>,
        { recId: number; name: string }
    >({
        mutationFn: (payload) =>
            inventoryAPIs.update(payload.recId, payload.name),
    });
};

export const useApprovalInventoryMutation = () => {
    return useMutation<IInventoryListRs, BaseResponse<null>, { recId: number }>(
        {
            mutationFn: (payload) => inventoryAPIs.approve(payload.recId),
        },
    );
};

export const useDeleteInventoryMutation = () => {
    return useMutation<IInventoryListRs, BaseResponse<null>, { recId: number }>(
        {
            mutationFn: (payload) => inventoryAPIs.delete(payload.recId),
        },
    );
};
