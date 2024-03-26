import {
    useCreateRuleAndPolicyMutation,
    useDeleteRuleAndPolicyMutation,
} from "@/mutations/managements/ruleAndPolicy";
import { RuleAndPolicyFormData } from "./ruleAndPolicy.interface";
import useMessage from "@/hooks/useMessage";
import { useQueryClient } from "@tanstack/react-query";
import { queryCMS } from "@/queries/var";
const useRuleAndPolicy = () => {
    const { mutate: createRuleAndPolicy } = useCreateRuleAndPolicyMutation();
    const { mutate: deleteRuleAndPolicy } = useDeleteRuleAndPolicyMutation();

    const queryClient = useQueryClient();
    const message = useMessage();

    const onCreate = (data: RuleAndPolicyFormData, cb?: () => void) => {
        createRuleAndPolicy(data, {
            onSuccess(data, variables, context) {
                console.log(data, variables, context);
                queryClient.invalidateQueries({
                    queryKey: [queryCMS.GET_LOCAL_RULE_AND_POLICY_LIST],
                });
                message.success("Tạo thành công.");
                cb?.();
            },
            onError(error, variables, context) {
                message.error(error.message);
            },
        });
    };
    const onDelete = (id: number, cb?: () => void) => {
        deleteRuleAndPolicy(id, {
            onSuccess(data, variables, context) {
                console.log(data, variables, context);
                queryClient.invalidateQueries({
                    queryKey: [queryCMS.GET_LOCAL_RULE_AND_POLICY_LIST],
                });
                message.success("Xoá thành công");
                cb?.();
            },
            onError(error, variables, context) {
                message.error(error.message);
            },
        });
    };

    return {
        onCreate,
        onDelete,
    };
};
export default useRuleAndPolicy;
