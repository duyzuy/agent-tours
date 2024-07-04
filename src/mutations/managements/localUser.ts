import {
  ILocalUserPayload,
  ILocalUser,
  ILocalUserChangePasswordPayLoad,
} from "@/models/management/localUser.interface";
import { localUserAPIs } from "@/services/management/localUser.service";
import { localAuthAPIs } from "@/services/management/localAuth.service";
import { ILocalUserProfileRs, ILocalUserProfilePayload } from "@/models/management/localAuth.interface";
import { useCustomMutation } from "../useCustomMutation";

export const useCreateLocalUserMutation = () => {
  return useCustomMutation<ILocalUser, ILocalUserPayload>({
    mutationFn: (payload) => localUserAPIs.createLocalUser(payload),
  });
};

export const useUpdateLocalUserMutation = (recordId: number) => {
  return useCustomMutation<ILocalUser, ILocalUserPayload>({
    mutationFn: (payload) => localUserAPIs.updateLocalUser(recordId, payload),
  });
};

export const useUpdateStatusLocalUserMutation = () => {
  return useCustomMutation<ILocalUser, { recordId: number; status: ILocalUserPayload["status"] }>({
    mutationFn: (payload) => localUserAPIs.updateStatusLocalUser(payload.recordId, payload.status),
  });
};

export const useLocalUserChangePasswordMutation = () => {
  return useCustomMutation<ILocalUser, ILocalUserChangePasswordPayLoad>({
    mutationFn: (payload) => localUserAPIs.changePassword(payload),
  });
};

export const useLocalUserProfileUpdateMutation = () => {
  return useCustomMutation<ILocalUserProfileRs, ILocalUserProfilePayload>({
    mutationFn: (payload) => localAuthAPIs.update(payload),
  });
};
