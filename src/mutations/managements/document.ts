import { useCustomMutation } from "../useCustomMutation";
import { documentAPIs } from "@/services/management/cores/document";
import { miscDocumentAPIs } from "@/services/management/cms/miscDocument";
import { DocumentPayload } from "@/models/management/core/document.interface";
import { MiscDocumentPayload } from "@/models/management/cms/miscDocument.interface";

export const useCreateDocumentMutation = () => {
  return useCustomMutation({
    mutationFn: (payload: DocumentPayload) => documentAPIs.create(payload),
  });
};

export const useUpdateDocumentMutation = () => {
  return useCustomMutation({
    mutationFn: (payload: { documentCheckListId: number } & Pick<DocumentPayload, "status">) =>
      documentAPIs.update(payload),
  });
};

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
