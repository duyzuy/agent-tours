import { LocalUserNewPasswordPayload } from "@/models/management/localUser.interface";
import { ILocalUserPayload } from "@/models/management/localUser.interface";
import { localUserAPIs } from "@/services/management/localUser";
import { localAuthAPIs } from "@/services/management/localAuth";
import { ILocalUserProfileRs, ILocalUserProfilePayload } from "@/models/management/localAuth.interface";
import { useCustomMutation } from "../useCustomMutation";

export const useCreateLocalUserMutation = () => {
  return useCustomMutation({
    mutationFn: (payload: ILocalUserPayload) => localUserAPIs.create(payload),
  });
};

export const useUpdateLocalUserMutation = () => {
  return useCustomMutation({
    mutationFn: (payload: { recId: number } & ILocalUserPayload) => localUserAPIs.update(payload.recId, payload),
  });
};

export const useUpdateStatusLocalUserMutation = () => {
  return useCustomMutation({
    mutationFn: (payload: { recordId: number; status: ILocalUserPayload["status"] }) =>
      localUserAPIs.updateStatus(payload.recordId, payload.status),
  });
};

export const useLocalUserChangePasswordMutation = () => {
  return useCustomMutation({
    mutationFn: (payload: LocalUserNewPasswordPayload) => localUserAPIs.setNewPassword(payload),
  });
};

export const useLocalUserProfileUpdateMutation = () => {
  return useCustomMutation<ILocalUserProfileRs, ILocalUserProfilePayload>({
    mutationFn: (payload) => localAuthAPIs.update(payload),
  });
};
