import { formOfPaymentAPIs } from "@/services/management/cores/formOfPayment";
import { queryCore } from "@/queries/var";
import { FormOfPaymmentQueryParams } from "@/models/management/core/formOfPayment.interface";
import { useTQuery } from "@/lib/reactQueryHooks";

export const useGetFormOfPaymentList = ({
  enabled = false,
  queryParams,
}: {
  enabled: boolean;
  queryParams: FormOfPaymmentQueryParams;
}) => {
  return useTQuery({
    queryKey: [queryCore.GET_FORM_OF_PAYMENT_LIST],
    queryFn: () => formOfPaymentAPIs.getList(queryParams),
    select: (data) => data.result,
    enabled: enabled,
  });
};
