import { useCustomMutation } from "../useCustomMutation";
import { miscDocumentAPIs } from "@/services/management/cms/miscDocument";
import { MiscDocumentPayload } from "@/models/management/cms/miscDocument.interface";

/**
 * Misc document
 */

export const useCreateMiscDocumentMutation = () => {
  return useCustomMutation({
    mutationFn: (payload: MiscDocumentPayload) => miscDocumentAPIs.create(payload),
  });
};

export const useUpdateMiscDocumentMutation = () => {
  return useCustomMutation({
    mutationFn: (payload: MiscDocumentPayload) => miscDocumentAPIs.update(payload),
  });
};

export const useDeleteMiscDocumentMutation = () => {
  return useCustomMutation({
    mutationFn: (recId: number) => miscDocumentAPIs.delete(recId),
  });
};
