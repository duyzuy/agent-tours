import useMessage from "@/hooks/useMessage";
import { useQueryClient } from "@tanstack/react-query";
import { useConfigPricingSellableMudation } from "@/mutations/managements/sellable";
import { queryCore } from "@/queries/var";
import { SellablePriceConfigFormData } from "@/models/management/core/priceConfig.interface";

const useConfigPriceSellable = () => {
    const { mutate: makeConfigPrice } = useConfigPricingSellableMudation();

    const message = useMessage();
    const queryClient = useQueryClient();

    const onUpdatePriceConfig = (
        formdata: SellablePriceConfigFormData,
        cb?: () => void,
    ) => {
        makeConfigPrice(formdata, {
            onSuccess: (data, variables) => {
                message.success(`Lưu thành công`);

                queryClient.invalidateQueries({
                    queryKey: [
                        queryCore.GET_SELLABLE_PRICE_CONFIGS,
                        variables.sellableRecId,
                    ],
                });
                queryClient.invalidateQueries({
                    queryKey: [queryCore.GET_SELLABLE_LIST],
                });
                cb?.();
            },
            onError: (error) => {
                message.error(error.message);
            },
        });
    };

    return {
        onUpdate: onUpdatePriceConfig,
    };
};
export default useConfigPriceSellable;
