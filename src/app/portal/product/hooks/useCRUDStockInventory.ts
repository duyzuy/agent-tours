import { useState } from "react";
import {
    IStockConfirmPayload,
    StockInventoryAdjustFormData,
    StockInventoryConfirmFormData,
    StockInventoryFormData,
} from "@/models/management/core/stockInventory.interface";

import {
    inventorySchema,
    inventoryUpdateSchema,
    stockAdjustSchema,
    stockConfirmSchema,
    stockSchema,
} from "./validation";
import useMessage from "@/hooks/useMessage";
import { useQueryClient } from "@tanstack/react-query";

import { ValidationError } from "yup";
import { queryCore } from "@/queries/var";
import {
    useCreateStockMutation,
    useConfirmStockMutation,
    useAdjustStockQuantityMutation,
} from "@/mutations/managements/stock";
export type TStockErrorsField = Partial<
    Record<keyof StockInventoryFormData, string>
>;
const useCRUDStockInventory = () => {
    const { mutate: makeCreateStock } = useCreateStockMutation();
    const { mutate: makeConfirmStock } = useConfirmStockMutation();
    const { mutate: makeAdjustStockQuantity } =
        useAdjustStockQuantityMutation();
    const message = useMessage();
    const queryClient = useQueryClient();
    const [errors, setErrors] = useState<TStockErrorsField>();

    const onCreateStock = (
        {
            data,
            isCreateSeries,
        }: { data: StockInventoryFormData; isCreateSeries: boolean },
        cb?: () => void,
    ) => {
        stockSchema
            .validate(
                {
                    ...data,
                    isCreateSeries: isCreateSeries,
                },
                { abortEarly: false },
            )
            .then((schema) => {
                makeCreateStock(schema, {
                    onSuccess: (data, variables) => {
                        message.success(`Tạo stock thành công`);
                        onResetFieldsErrors();
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
            })
            .catch((error) => {
                if (error instanceof ValidationError) {
                    let errors: TStockErrorsField = {};
                    error.inner.forEach((err) => {
                        if (!errors[err.path as keyof TStockErrorsField]) {
                            errors[err.path as keyof TStockErrorsField] =
                                err.message;
                        }
                    });
                    setErrors(errors);
                }
            });
    };
    const onConfirmStock = (
        payload: StockInventoryConfirmFormData,
        cb?: () => void,
    ) => {
        stockConfirmSchema
            .validate(payload, { abortEarly: false })
            .then((schema) => {
                makeConfirmStock(schema, {
                    onSuccess: (data, variables) => {
                        message.success(`Duyệt stock thành công`);
                        onResetFieldsErrors();
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
            })
            .catch((error) => {
                if (error instanceof ValidationError) {
                    let errors: TStockErrorsField = {};
                    error.inner.forEach((err) => {
                        if (!errors[err.path as keyof TStockErrorsField]) {
                            errors[err.path as keyof TStockErrorsField] =
                                err.message;
                        }
                    });
                    setErrors(errors);
                }
            });
    };

    const onAdjustStockQuantity = (
        payload: StockInventoryAdjustFormData,
        cb?: () => void,
    ) => {
        stockAdjustSchema
            .validate(payload, { abortEarly: false })
            .then((schema) => {
                makeAdjustStockQuantity(schema, {
                    onSuccess: (data, variables) => {
                        message.success(`Duyệt stock thành công`);
                        onResetFieldsErrors();
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
            })
            .catch((error) => {
                if (error instanceof ValidationError) {
                    let errors: TStockErrorsField = {};
                    error.inner.forEach((err) => {
                        if (!errors[err.path as keyof TStockErrorsField]) {
                            errors[err.path as keyof TStockErrorsField] =
                                err.message;
                        }
                    });
                    setErrors(errors);
                }
            });
    };

    const onResetFieldsErrors = () => {
        setErrors(undefined);
    };
    return {
        onCreate: onCreateStock,
        onConfirm: onConfirmStock,
        onAdjustQuantity: onAdjustStockQuantity,
        errors,
    };
};
export default useCRUDStockInventory;
