import { useMutation } from "@tanstack/react-query";
import {
    ILocalUserPayload,
    ILocalUser,
    ILocalUserChangePasswordPayLoad,
} from "@/models/management/localUser.interface";
import { localUserAPIs } from "@/services/management/localUser.service";
import { localAuthAPIs } from "@/services/management/localAuth.service";
import { BaseResponse } from "@/models/common.interface";
import {
    ILocalUserProfileRs,
    ILocalUserProfilePayload,
} from "@/models/management/localAuth.interface";

export const useCreateLocalUserMutation = () => {
    return useMutation<ILocalUser, BaseResponse<null>, ILocalUserPayload>({
        mutationFn: (payload) => localUserAPIs.createLocalUser(payload),
    });
};

export const useUpdateLocalUserMutation = (recordId: number) => {
    return useMutation<ILocalUser, BaseResponse<null>, ILocalUserPayload>({
        mutationFn: (payload) =>
            localUserAPIs.updateLocalUser(recordId, payload),
    });
};

export const useUpdateStatusLocalUserMutation = () => {
    return useMutation<
        ILocalUser,
        BaseResponse<null>,
        { recordId: number; status: ILocalUserPayload["status"] }
    >({
        mutationFn: (payload) =>
            localUserAPIs.updateStatusLocalUser(
                payload.recordId,
                payload.status,
            ),
    });
};

export const useLocalUserChangePasswordMutation = () => {
    return useMutation<
        ILocalUser,
        BaseResponse<null>,
        ILocalUserChangePasswordPayLoad
    >({
        mutationFn: (payload) => localUserAPIs.changePassword(payload),
    });
};

export const useLocalUserProfileUpdateMutation = () => {
    return useMutation<
        ILocalUserProfileRs,
        BaseResponse<null>,
        ILocalUserProfilePayload
    >({
        mutationFn: (payload) => localAuthAPIs.update(payload),
    });
};
