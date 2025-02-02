import { useTQuery } from "@/lib/reactQueryHooks";
import { OperationStatusQueryParams } from "@/models/management/core/operationStatus.interface";
import { queryCore } from "@/queries/var";
import { operationAPIs } from "@/services/management/cores/operation";

export const useGetOperationStatus = ({
  queryParams,
  enabled = true,
}: {
  queryParams: OperationStatusQueryParams;
  enabled?: boolean;
}) => {
  return useTQuery({
    queryKey: [queryCore.GET_OPERATION_STATUS, { ...queryParams }],
    queryFn: () => operationAPIs.getStatus(queryParams),
    select: (data) => data.result,
    retry: false,
    enabled: enabled,
  });
};
