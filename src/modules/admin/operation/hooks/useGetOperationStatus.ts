import { useTQuery } from "@/lib/reactQueryHooks";
import { OperationStatusPayload } from "@/models/management/core/operation/OperationStatus.interface";
import { queryCore } from "@/queries/var";
import { operationAPIs } from "@/services/management/cores/operation";

export const useGetOperationStatus = ({
  queryParams,
  enabled = true,
}: {
  queryParams: OperationStatusPayload;
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
