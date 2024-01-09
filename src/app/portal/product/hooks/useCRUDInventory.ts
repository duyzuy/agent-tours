import {
    IInventoryPayload,
    InventoryFormData,
} from "@/models/management/core/inventory.interface";
import {
    useApprovalInventoryMutation,
    useCreateInventoryMutation,
    useUpdateInventoryMutation,
    useDeleteInventoryMutation,
} from "@/mutations/managements/inventory";

import { inventorySchema, inventoryUpdateSchema } from "./validation";
import useMessage from "@/hooks/useMessage";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { ValidationError } from "yup";
import { queryCore } from "@/queries/var";
export type TInventoryErrorsField = Partial<
    Record<keyof IInventoryPayload, string>
>;
const useCRUDInventory = () => {
    const { mutate: makeCreateInventory } = useCreateInventoryMutation();
    const { mutate: makeUpdateInventory } = useUpdateInventoryMutation();
    const { mutate: makeApprovalInventory } = useApprovalInventoryMutation();
    const { mutate: makeDeleteInventory } = useDeleteInventoryMutation();

    const [errors, setErrors] = useState<TInventoryErrorsField>();
    const queryClient = useQueryClient();
    const message = useMessage();
    const onCreateInventory = (
        formData: InventoryFormData,
        cb?: () => void,
    ) => {
        inventorySchema
            .validate(formData, { abortEarly: false })
            .then((schema) => {
                console.log({ schema });
                makeCreateInventory(schema, {
                    onSuccess: (data, variables) => {
                        message.success(`Tạo ${variables.name} thành công`);
                        onResetFieldsErrors();
                        queryClient.invalidateQueries({
                            queryKey: [queryCore.GET_INVENTORY_LIST],
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
                    let errors: TInventoryErrorsField = {};
                    error.inner.forEach((err) => {
                        if (!errors[err.path as keyof TInventoryErrorsField]) {
                            errors[err.path as keyof TInventoryErrorsField] =
                                err.message;
                        }
                    });
                    setErrors(errors);
                }
            });
    };
    const onUpdateInventory = (
        recId: number,
        formData: InventoryFormData,
        cb?: () => void,
    ) => {
        inventoryUpdateSchema
            .validate(formData, { abortEarly: false })
            .then((schema) => {
                makeUpdateInventory(
                    { recId, name: formData.name },
                    {
                        onSuccess: (data, variables) => {
                            message.success(`Cập nhật thành công`);
                            onResetFieldsErrors();
                            queryClient.invalidateQueries({
                                queryKey: [queryCore.GET_INVENTORY_LIST],
                            });
                            cb?.();
                        },
                        onError: (error, variables) => {
                            console.log({ error, variables });
                            message.error(error.message);
                        },
                    },
                );
            })
            .catch((error) => {
                if (error instanceof ValidationError) {
                    let errors: TInventoryErrorsField = {};
                    error.inner.forEach((err) => {
                        if (!errors[err.path as keyof TInventoryErrorsField]) {
                            errors[err.path as keyof TInventoryErrorsField] =
                                err.message;
                        }
                    });
                    setErrors(errors);
                }
            });
    };
    const onApprovalInventory = (recId: number, cb?: () => void) => {
        makeApprovalInventory(
            { recId: recId },
            {
                onSuccess: (data, variables) => {
                    message.success(`Duyệt thành công`);
                    queryClient.invalidateQueries({
                        queryKey: [queryCore.GET_INVENTORY_LIST],
                    });
                    cb?.();
                },
                onError: (error, variables) => {
                    console.log({ error, variables });
                    message.error(error.message);
                },
            },
        );
    };
    const onDeleteInventory = (recId: number, cb?: () => void) => {
        makeDeleteInventory(
            { recId: recId },
            {
                onSuccess: (data, variables) => {
                    message.success(`Xoá thành công`);
                    queryClient.invalidateQueries({
                        queryKey: [queryCore.GET_INVENTORY_LIST],
                    });
                    cb?.();
                },
                onError: (error, variables) => {
                    console.log({ error, variables });
                    message.error(error.message);
                },
            },
        );
    };
    const onResetFieldsErrors = () => {
        setErrors(undefined);
    };

    return {
        onCreateInventory,
        onUpdateInventory,
        onApprovalInventory,
        onDeleteInventory,
        errors,
    };
};
export default useCRUDInventory;
