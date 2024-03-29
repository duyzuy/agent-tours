import {
    IStock,
    IStockConfirmPayload,
    IStockPayload,
} from "@/models/management/core/stock.interface";
import {
    StockAdjustFormData,
    StockConfirmFormData,
    StockFormData,
} from "./stock.interface";
import useMessage from "@/hooks/useMessage";
import { useQueryClient } from "@tanstack/react-query";
import { queryCore } from "@/queries/var";
import {
    useCreateStockMutation,
    useConfirmStockMutation,
    useAdjustStockQuantityMutation,
} from "@/mutations/managements/stock";
import { BaseResponse } from "@/models/management/common.interface";

const useCRUDStockInventory = () => {
    const { mutate: makeCreateStock } = useCreateStockMutation();
    const { mutate: makeConfirmStock } = useConfirmStockMutation();
    const { mutate: makeAdjustStockQuantity } =
        useAdjustStockQuantityMutation();
    const message = useMessage();
    const queryClient = useQueryClient();

    const onCreateStock = (
        { data }: { data: StockFormData },
        cb?: () => void,
    ) => {
        makeCreateStock(data as IStockPayload, {
            onSuccess: (data, variables) => {
                message.success(`Tạo stock thành công`);
                queryClient.invalidateQueries({
                    queryKey: [queryCore.GET_STOCK_LIST_INVENTORY],
                });
                cb?.();
            },
            onError: (error, variables) => {
                console.log({ error, variables });
                message.error(error.message);
            },
        });
    };
    const onConfirmStock = (
        formData: StockConfirmFormData,
        cb?: (
            response: BaseResponse<IStock>,
            variables: IStockConfirmPayload,
        ) => void,
    ) => {
        makeConfirmStock(formData as IStockConfirmPayload, {
            onSuccess: (response, variables) => {
                message.success(`Duyệt stock thành công`);
                queryClient.invalidateQueries({
                    queryKey: [queryCore.GET_STOCK_LIST_INVENTORY],
                });
                cb?.(response, variables);
            },
            onError: (error, variables) => {
                console.log({ error, variables });
                message.error(error.message);
            },
        });
    };

    const onAdjustStockQuantity = (
        formData: StockAdjustFormData,
        cb?: () => void,
    ) => {
        makeAdjustStockQuantity(formData, {
            onSuccess: (data, variables) => {
                message.success(`Thêm số lượng stock thành công`);
                queryClient.invalidateQueries({
                    queryKey: [queryCore.GET_STOCK_LIST_INVENTORY],
                });
                queryClient.invalidateQueries({
                    queryKey: [
                        queryCore.GET_STOCK_DETAIL_INVENTORY,
                        formData.inventoryStockId,
                    ],
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
        onCreate: onCreateStock,
        onConfirm: onConfirmStock,
        onAdjustQuantity: onAdjustStockQuantity,
    };
};
export default useCRUDStockInventory;
