import { useCustomMutation } from "../useCustomMutation";

import { LeadingPayload } from "@/models/management/leading.interface";
import { leadingAPIs } from "@/services/management/cms/leading";

export const useCreateOneLeadingMutation = () => {
  return useCustomMutation({
    mutationFn: (payload: LeadingPayload) => leadingAPIs.createOne(payload),
  });
};

export const useCreateMultipleLeadingMutation = () => {
  return useCustomMutation({
    mutationFn: (payload?: LeadingPayload[]) => leadingAPIs.createMultiple(payload),
  });
};

export const useUpdateLeadingMutation = () => {
  return useCustomMutation({
    mutationFn: (payload: LeadingPayload) => leadingAPIs.update(payload),
  });
};
