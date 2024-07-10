import { translationAPIs } from "@/services/management/cms/transtation";
import {
  ITranslationPayload,
  ITranslationListRs,
  ITranslationRs,
} from "@/models/management/cms/translations.interface";
import { useCustomMutation } from "../useCustomMutation";

export const useCreateTranslationMutation = () => {
  return useCustomMutation<ITranslationListRs, ITranslationPayload>({
    mutationFn: (payload) => translationAPIs.create(payload),
  });
};

export const useUpdateTranslationMutation = () => {
  return useCustomMutation<ITranslationRs, ITranslationPayload>({
    mutationFn: (payload) => translationAPIs.update(payload),
  });
};

export const useDeleteTranslationMutation = () => {
  return useCustomMutation<ITranslationRs, number>({
    mutationFn: (id) => translationAPIs.delete(id),
  });
};
