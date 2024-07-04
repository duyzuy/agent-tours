import { translationAPIs } from "@/services/management/cms/transtation";
import { ITranslationPayload, ITranslationRs } from "@/models/management/cms/translations.interface";
import { useCustomMutation } from "../useCustomMutation";

export const useCreateTranslationMutation = () => {
  return useCustomMutation<ITranslationRs, ITranslationPayload>({
    mutationFn: (payload) => translationAPIs.create(payload),
  });
};

export const useUpdateTranslationMutation = () => {
  return useCustomMutation<ITranslationRs, ITranslationPayload>({
    mutationFn: (payload) => translationAPIs.update(payload),
  });
};
