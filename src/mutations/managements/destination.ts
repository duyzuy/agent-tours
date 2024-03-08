import { destinationAPIs } from "@/services/management/misc/destination";
import { localSearchAPIs } from "@/services/management/misc/localSearch";
import { useMutation } from "@tanstack/react-query";
import { BaseResponse } from "@/models/management/common.interface";
import {
    IDestinationContentPayload,
    IDestinationContentRs,
    IDestinationEditPayload,
    IDestinationPayload,
    IDestinationRs,
} from "@/models/management/region.interface";
import {
    ILocalSeachDestination,
    LocalSearchPayload,
} from "@/models/management/localSearchDestination.interface";

//create folder in public/uploads folder.

export const useCreateDestinationMutation = () => {
    return useMutation<IDestinationRs, BaseResponse<null>, IDestinationPayload>(
        {
            mutationFn: (payload) => destinationAPIs.createDestination(payload),
        },
    );
};

export const useUpdateDestinationMutation = () => {
    return useMutation<
        IDestinationRs,
        BaseResponse<null>,
        IDestinationEditPayload
    >({
        mutationFn: (payload) => destinationAPIs.updateDestination(payload),
    });
};

export const useCreateDestinationCMSContentMutation = () => {
    return useMutation<
        IDestinationContentRs,
        BaseResponse<null>,
        IDestinationContentPayload
    >({
        mutationFn: (payload) => destinationAPIs.createCMSContent(payload),
    });
};

export const useUpdateDestinationCMSContentMutation = () => {
    return useMutation<
        IDestinationContentRs,
        BaseResponse<null>,
        IDestinationContentPayload & { id: number }
    >({
        mutationFn: (payload) =>
            destinationAPIs.updateCMSContent({ ...payload }),
    });
};

export const useCreateLocalSearchMutation = () => {
    return useMutation<
        BaseResponse<ILocalSeachDestination>,
        BaseResponse<null>,
        LocalSearchPayload
    >({
        mutationFn: (payload) => localSearchAPIs.create(payload),
        onSuccess(data, variables, context) {
            return data.result;
        },
    });
};

export const useUpdateLocalSearchMutation = () => {
    return useMutation<
        BaseResponse<ILocalSeachDestination>,
        BaseResponse<null>,
        LocalSearchPayload & { id: number }
    >({
        mutationFn: (payload) => localSearchAPIs.update({ ...payload }),
    });
};
