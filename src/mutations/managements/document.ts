import { useCustomMutation } from "../useCustomMutation";
import { documentAPIs } from "@/services/management/cores/document";
import { DocumentPayload } from "@/models/management/core/document.interface";

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
