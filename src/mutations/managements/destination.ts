import { destinationAPIs } from "@/services/management/cms/destination";
import { localSearchAPIs } from "@/services/management/cms/localSearch";
import { BaseResponse } from "@/models/common.interface";
import {
  IDestinationContentPayload,
  IDestinationContentRs,
  IDestinationEditPayload,
  IDestinationPayload,
  IDestinationRs,
} from "@/models/management/region.interface";
import { ILocalSeachDestination, LocalSearchPayload } from "@/models/management/localSearchDestination.interface";
import { useCustomMutation } from "../useCustomMutation";
//create folder in public/uploads folder.

export const useCreateDestinationMutation = () => {
  return useCustomMutation<IDestinationRs, IDestinationPayload>({
    mutationFn: (payload) => destinationAPIs.createDestination(payload),
  });
};

export const useUpdateDestinationMutation = () => {
  return useCustomMutation<IDestinationRs, IDestinationEditPayload>({
    mutationFn: (payload) => destinationAPIs.updateDestination(payload),
  });
};

export const useCreateDestinationCMSContentMutation = () => {
  return useCustomMutation<IDestinationContentRs, IDestinationContentPayload>({
    mutationFn: (payload) => destinationAPIs.createCMSContent(payload),
  });
};

export const useUpdateDestinationCMSContentMutation = () => {
  return useCustomMutation<IDestinationContentRs, IDestinationContentPayload & { id: number }>({
    mutationFn: (payload) => destinationAPIs.updateCMSContent({ ...payload }),
  });
};

export const useCreateLocalSearchMutation = () => {
  return useCustomMutation<BaseResponse<ILocalSeachDestination>, LocalSearchPayload>({
    mutationFn: (payload) => localSearchAPIs.create(payload),
  });
};

export const useUpdateLocalSearchMutation = () => {
  return useCustomMutation<BaseResponse<ILocalSeachDestination>, LocalSearchPayload & { id: number }>({
    mutationFn: (payload) => localSearchAPIs.update({ ...payload }),
  });
};
