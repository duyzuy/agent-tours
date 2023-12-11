import { useMutation } from "@tanstack/react-query";
import {
    ILocalUserPayload,
    ILocalUser,
    ILocalUserChangePasswordPayLoad,
} from "@/model/management/localUser.interface";
import { localUserAPIs } from "@/services/management/localUser.service";
import { BaseResponse } from "@/model/management/common.interface";

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
