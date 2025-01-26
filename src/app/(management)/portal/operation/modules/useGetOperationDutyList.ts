import { operationDutyAPIs } from "@/services/management/cores/operation";
import { OperationDutyQueryParams } from "@/models/management/core/operation/operationDuty.interface";
import { queryCore } from "@/queries/var";
import { useTQuery } from "@/lib/reactQueryHooks";

const useGetOperationDutyList = ({
  queryParams,
  enabled,
}: {
  queryParams: OperationDutyQueryParams;
  enabled: boolean;
}) => {
  return useTQuery({
    queryFn: () => operationDutyAPIs.getList(queryParams),
    select: (data) => data.result,
    queryKey: [queryCore.GET_OPERATION_DUTY_LIST],
    enabled,
  });
};

export default useGetOperationDutyList;
