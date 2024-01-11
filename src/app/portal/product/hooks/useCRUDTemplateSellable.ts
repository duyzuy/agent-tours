import { useState } from "react";
import { StockInventoryFormData } from "@/models/management/core/stockInventory.interface";

import { templateSellableSchema } from "./validation";
import useMessage from "@/hooks/useMessage";
import { useQueryClient } from "@tanstack/react-query";

import { ValidationError } from "yup";
import { queryCore } from "@/queries/var";

import { useCreateTemplateSellableMutation } from "@/mutations/managements/templateSellable";
import {
    ITemplateSellablePayload,
    TemplateSellableFormData,
} from "@/models/management/core/templateSellable.interface";
import { isEmpty } from "lodash";
export type TTemplateSellableErrorsField = Partial<
    Record<keyof TemplateSellableFormData, string>
>;
const useCRUDTemplateSellable = () => {
    const { mutate: makeCreateTemplateSellable } =
        useCreateTemplateSellableMutation();

    const message = useMessage();
    const queryClient = useQueryClient();
    const [errors, setErrors] = useState<TTemplateSellableErrorsField>();

    const onCreateTemplateSellable = (
        formdata: TemplateSellableFormData,
        cb?: () => void,
    ) => {
        const payload = correctSellableFormdataToPayload(formdata);

        templateSellableSchema
            .validate(
                {
                    ...payload,
                },
                { abortEarly: false },
            )
            .then((schema) => {
                makeCreateTemplateSellable(schema, {
                    onSuccess: (data, variables) => {
                        message.success(`Tạo Template thành công`);
                        onResetFieldsErrors();
                        // queryClient.invalidateQueries({
                        //     queryKey: [queryCore.GET_STOCK_LIST_INVENTORY],
                        // });
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
                    let errors: TTemplateSellableErrorsField = {};
                    error.inner.forEach((err) => {
                        if (
                            !errors[
                                err.path as keyof TTemplateSellableErrorsField
                            ]
                        ) {
                            errors[
                                err.path as keyof TTemplateSellableErrorsField
                            ] = err.message;
                        }
                    });
                    setErrors(errors);
                }
            });
    };
    const correctSellableFormdataToPayload = (
        formdata: TemplateSellableFormData,
    ): ITemplateSellablePayload => {
        // const destinationListJson = JSON.stringify(formdata.destListJson);
        const formatInventoryTypeList = formdata.inventoryTypeList.reduce(
            (acc, invt) => {
                return acc.concat(isEmpty(acc) ? "" : "||", invt);
            },
            "",
        );
        return {
            ...formdata,
            // destListJson: destinationListJson,
            inventoryTypeList: formatInventoryTypeList,
        } as ITemplateSellablePayload;
    };
    const onResetFieldsErrors = () => {
        setErrors(undefined);
    };
    return {
        onCreate: onCreateTemplateSellable,
        errors,
    };
};
export default useCRUDTemplateSellable;
