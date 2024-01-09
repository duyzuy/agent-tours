import { useMutation } from "@tanstack/react-query";
import { BaseResponse } from "@/models/management/common.interface";
import { templateSellableAPIs } from "@/services/management/cores/templateSellable";

import {
    ITemplateSaleableListRs,
    ITemplateSellablePayload,
} from "@/models/management/core/templateSellable.interface";

//create folder in public/uploads folder.

export const useCreateTemplateSellableMutation = () => {
    return useMutation<
        ITemplateSaleableListRs,
        BaseResponse<null>,
        ITemplateSellablePayload
    >({
        mutationFn: (payload) => templateSellableAPIs.create(payload),
    });
};
