import { destinationAPIs } from "@/services/management/misc/destination";
import { useMutation } from "@tanstack/react-query";
import { BaseResponse } from "@/models/management/common.interface";
import {
    IDestinationContentDetail,
    IDestinationContentPayload,
    IDestinationContentRs,
    IDestinationEditPayload,
    IDestinationPayload,
    IDestinationRs,
} from "@/models/management/country.interface";

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
