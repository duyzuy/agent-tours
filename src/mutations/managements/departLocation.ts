import { useCustomMutation } from "../useCustomMutation";
import { miscDepartAPIs } from "@/services/management/cms/miscDepart";
import { MiscDepartPayload } from "@/models/management/cms/miscDepartLocation.interface";

export const useCreateMiscDepartLocationMutation = () => {
  return useCustomMutation({
    mutationFn: (payload: MiscDepartPayload) => miscDepartAPIs.create(payload),
  });
};

export const useUpdateMiscDepartLocationMutation = () => {
  return useCustomMutation({
    mutationFn: (payload: MiscDepartPayload) => miscDepartAPIs.update(payload),
  });
};

export const useDeleteMiscDepartLocationMutation = () => {
  return useCustomMutation({
    mutationFn: (recId: number) => miscDepartAPIs.delete(recId),
  });
};
