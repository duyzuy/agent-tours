import { useQuery } from "@tanstack/react-query";
import { queryCore } from "../var";
import { formOfPaymentAPIs } from "@/services/management/cores/formOfPayment";

import { Status } from "@/models/common.interface";

export const useGetFormOfPaymentListCoreQuery = ({
    enabled = false,
    queryParams,
}: {
    enabled: boolean;
    queryParams: { status: Status };
}) => {
    return useQuery({
        queryKey: [queryCore.GET_FORM_OF_PAYMENT_LIST],
        queryFn: () => formOfPaymentAPIs.getList(queryParams),
        select: (data) => data.result,
        enabled: enabled,
    });
};
