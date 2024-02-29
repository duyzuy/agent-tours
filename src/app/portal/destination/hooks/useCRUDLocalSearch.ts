import { useCreateLocalSearchMutation } from "@/mutations/managements/destination";
import useMessage from "@/hooks/useMessage";
import { useQueryClient } from "@tanstack/react-query";
import { queryMisc } from "@/queries/var";
import { LocalSearchFormData } from "@/models/management/localSearchDestination.interface";

const useCRUDLocalSearch = () => {
    const { mutate: makeCreateLocalSearch } = useCreateLocalSearchMutation();
    const message = useMessage();
    const queryClient = useQueryClient();

    const onCreate = (payload: LocalSearchFormData, cb?: () => void) => {
        makeCreateLocalSearch(payload, {
            onSuccess: (data, variables) => {
                message.success(`Tạo  thành công`);

                queryClient.invalidateQueries({
                    queryKey: [queryMisc.GET_DESTINATION_LIST],
                });
                cb?.();
            },
            onError: (error, variables) => {
                console.log({ error, variables });
                message.error(error.message);
            },
        });
    };

    return {
        onCreate,
    };
};
export default useCRUDLocalSearch;
