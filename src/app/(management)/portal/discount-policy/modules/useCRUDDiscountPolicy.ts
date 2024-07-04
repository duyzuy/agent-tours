import { IDiscountPolicyPayload } from "@/models/management/core/discountPolicy.interface";
import {
    useCreateDiscountPolicyMutation,
    useDeactiveDiscountPolicyMutation,
    useActiveDiscountPolicyMutation,
} from "@/mutations/managements/discount";
import { DiscountPolicyFormData } from "./discountPolicy.interface";
import { useQueryClient } from "@tanstack/react-query";
import useMessage from "@/hooks/useMessage";

import { queryCore } from "@/queries/var";
const useCRUDDiscountPolicy = () => {
    const { mutate: doCreate } = useCreateDiscountPolicyMutation();
    const { mutate: doActive } = useActiveDiscountPolicyMutation();
    const { mutate: doDeactive } = useDeactiveDiscountPolicyMutation();

    const queryClient = useQueryClient();
    const message = useMessage();
    const onCreate = (formData: DiscountPolicyFormData, cb?: () => void) => {
        const payload = convertFormDataToPayload(formData);
        doCreate(payload, {
            onSuccess(data, variables, context) {
                message.success("Tạo thành công.");

                queryClient.invalidateQueries({
                    queryKey: [queryCore.GET_DISCOUNT_POLICY_LIST],
                });
                cb?.();
            },
            onError(error, variables, context) {
                message.success(error.message);
                console.log(error);
            },
        });
    };

    const onActive = (
        payload: { recId: number } | { code: string } | undefined,
        cb?: () => void,
    ) => {
        doActive(payload, {
            onSuccess(data, variables, context) {
                message.success("Kích hoạt thành công.");

                queryClient.invalidateQueries({
                    queryKey: [queryCore.GET_DISCOUNT_POLICY_LIST],
                });
                cb?.();
            },
            onError(error, variables, context) {
                message.success(error.message);
                console.log(error);
            },
        });
    };
    const onDeactive = (
        payload: { recId: number } | { code: string } | undefined,
        cb?: () => void,
    ) => {
        doDeactive(payload, {
            onSuccess(data, variables, context) {
                message.success("Huỷ kích hoạt thành công.");

                queryClient.invalidateQueries({
                    queryKey: [queryCore.GET_DISCOUNT_POLICY_LIST],
                });
                cb?.();
            },
            onError(error, variables, context) {
                message.success(error.message);
                console.log(error);
            },
        });
    };
    const convertFormDataToPayload = (
        formData: DiscountPolicyFormData,
    ): IDiscountPolicyPayload => {
        let {
            name,
            descriptions,
            destJson,
            timeJson,
            tourCodeJson,
            isValidByTime,
            isValidbyDest,
            isValidbyTourCode,
            isValidByDayofweek,
            dayOfWeek,
            code,
            discountAmount,
            type,
            maxUseTimes,
            blackoutJson,
            status,
            validFrom,
            validTo,
        } = formData;

        const blackoutByDate = blackoutJson?.byDate?.reduce<string[]>(
            (acc, item) => {
                if (item) {
                    acc = [...acc, item];
                }
                return acc;
            },
            [],
        );

        const blackoutByDateRange = blackoutJson?.byDaterange?.reduce<
            { fromDate: string; toDate: string }[]
        >((acc, item) => {
            if (item && item.fromDate && item.toDate) {
                acc = [
                    ...acc,
                    { fromDate: item.fromDate, toDate: item.toDate },
                ];
            }
            return acc;
        }, []);

        let payload: IDiscountPolicyPayload = {
            name,
            descriptions,
            timeJson,
            tourCodeJson,
            isValidByTime,
            isValidbyDest,
            isValidbyTourCode,
            code,
            discountAmount,
            type,
            dayOfWeek,
            isValidByDayofweek,
            maxUseTimes,
            blackoutJson: {
                byDate: blackoutByDate ?? [],
                byDaterange: blackoutByDateRange ?? [],
            },
            destJson,
            validTo,
            validFrom,
            status,
        };

        return payload;
    };
    return {
        onCreate,
        onActive,
        onDeactive,
    };
};
export default useCRUDDiscountPolicy;
