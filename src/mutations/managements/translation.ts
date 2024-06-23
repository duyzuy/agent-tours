import { useMutation } from "@tanstack/react-query";
import { BaseResponse } from "@/models/common.interface";

import { translationAPIs } from "@/services/management/cms/transtation";
import {
    ITranslationPayload,
    ITranslationRs,
} from "@/models/management/cms/translations.interface";

export const useCreateTranslationMutation = () => {
    return useMutation<ITranslationRs, BaseResponse<null>, ITranslationPayload>(
        {
            mutationFn: (payload) => translationAPIs.create(payload),
        },
    );
};

export const useUpdateTranslationMutation = () => {
    return useMutation<ITranslationRs, BaseResponse<null>, ITranslationPayload>(
        {
            mutationFn: (payload) => translationAPIs.update(payload),
        },
    );
};
