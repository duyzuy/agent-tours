import { IInventoryPayload } from "@/models/management/core/inventory.interface";

import {
    useCreateSellableMutation,
    useApprovalSellableMutation,
} from "@/mutations/managements/sellable";

import useMessage from "@/hooks/useMessage";
import { useQueryClient } from "@tanstack/react-query";

import { queryCore } from "@/queries/var";
import {
    ISellablePayload,
    SellableConfirmFormData,
    SellableConfirmPayload,
    SellableFormData,
} from "@/models/management/core/sellable.interface";
export type TInventoryErrorsField = Partial<
    Record<keyof IInventoryPayload, string>
>;
const useCRUDSellable = () => {
    const { mutate: makeCreateSellable } = useCreateSellableMutation();
    const { mutate: makeApproval } = useApprovalSellableMutation();

    const queryClient = useQueryClient();
    const message = useMessage();

    const onCreateSellable = (formData: SellableFormData, cb?: () => void) => {
        makeCreateSellable(formData as ISellablePayload, {
            onSuccess: (data, variables) => {
                message.success(`Tạo thành công`);

                queryClient.invalidateQueries({
                    queryKey: [
                        queryCore.GET_SELLABLE_LIST,
                        {
                            sellableTemplateId: variables.sellableTemplateId,
                        },
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
    const onApprovalSellable = (
        formData: SellableConfirmFormData,
        cb?: () => void,
    ) => {
        const sellablePayload = convertSellableFormDataToPayload(formData);

        console.log(sellablePayload);
        makeApproval(sellablePayload, {
            onSuccess: (data, variables) => {
                message.success(`Duyệt thành công`);

                queryClient.invalidateQueries({
                    queryKey: [queryCore.GET_SELLABLE_LIST],
                });
                cb?.();
            },
            onError: (error, variables) => {
                console.log({ error, variables });
                message.error(error.message);
            },
        });
    };
    const convertSellableFormDataToPayload = (
        formData: SellableConfirmFormData,
    ): SellableConfirmPayload => {
        const {
            extraInventories,
            otherSellables,
            extraStocks,
            stocks,
            inventories,
            recId,
            cap,
            closeDate,
            valid,
            validTo,
            start,
            end,
        } = formData;

        const extraInventoriesPayload = extraInventories.reduce<
            SellableConfirmPayload["extraInventories"]
        >((acc, inv) => {
            return [...acc, { qty: inv.qty, recId: inv.inventory.recId }];
        }, []);
        const inventoriesPayload = inventories.reduce<
            SellableConfirmPayload["inventories"]
        >((acc, inv) => {
            return [...acc, { qty: inv.qty, recId: inv.inventory.recId }];
        }, []);

        const extraStocksPayload = extraStocks.reduce<
            SellableConfirmPayload["extraStocks"]
        >((acc, inv) => {
            return [...acc, { qty: inv.qty, recId: inv.stock.recId }];
        }, []);

        const stocksPayload = stocks.reduce<SellableConfirmPayload["stocks"]>(
            (acc, inv) => {
                return [...acc, { qty: inv.qty, recId: inv.stock.recId }];
            },
            [],
        );
        const otherSellablesPayload = otherSellables.reduce<
            SellableConfirmPayload["otherSellables"]
        >((acc, inv) => {
            return [...acc, { qty: inv.qty, recId: inv.sellable.recId }];
        }, []);

        return {
            recId,
            cap,
            closeDate,
            valid,
            validTo,
            start,
            end,
            extraInventories: extraInventoriesPayload,
            inventories: inventoriesPayload,
            extraStocks: extraStocksPayload,
            stocks: stocksPayload,
            otherSellables: otherSellablesPayload,
        };
    };
    return {
        onCreate: onCreateSellable,
        onApproval: onApprovalSellable,
    };
};
export default useCRUDSellable;
