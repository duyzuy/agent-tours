import { useState } from "react";
import { IDestinationPayload } from "@/models/management/region.interface";
import { destinationSchema } from "./validate";
import { ValidationError } from "yup";
import {
    useCreateDestinationMutation,
    useUpdateDestinationMutation,
} from "@/mutations/managements/destination";
import useMessage from "@/hooks/useMessage";
import { useQueryClient } from "@tanstack/react-query";
import { queryMisc } from "@/queries/var";
import { Status } from "@/models/common.interface";
export type TDestinationErrorsField = Partial<
    Record<
        keyof Pick<
            IDestinationPayload,
            "codeKey" | "codeName" | "listStateProvince" | "status"
        >,
        string
    >
>;

const useCRUDDestination = () => {
    const { mutate: makeCreateDestination } = useCreateDestinationMutation();
    const { mutate: makeUpdateDestination } = useUpdateDestinationMutation();
    const message = useMessage();
    const queryClient = useQueryClient();
    const [errors, setErrors] = useState<TDestinationErrorsField>({});

    const onCreate = (payload: IDestinationPayload, cb?: () => void) => {
        destinationSchema
            .validate(payload, { abortEarly: false })
            .then((schema) => {
                console.log({ schema });
                makeCreateDestination(schema, {
                    onSuccess: (data, variables) => {
                        message.success(`Tạo ${variables.codeName} thành công`);
                        onResetFieldsErrors();
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
            })
            .catch((error) => {
                if (error instanceof ValidationError) {
                    let errors: TDestinationErrorsField = {};
                    error.inner.forEach((err) => {
                        errors[err.path as keyof TDestinationErrorsField] =
                            err.message;
                    });
                    setErrors(errors);
                }
            });
    };

    const onUpdate = (
        id: number,
        payload: IDestinationPayload,
        cb?: () => void,
    ) => {
        destinationSchema
            .validate(payload, { abortEarly: false })
            .then((schema) => {
                makeUpdateDestination(
                    {
                        id: id,
                        ...schema,
                    },
                    {
                        onSuccess: (data, variables) => {
                            message.success(
                                `Cập nhật ${variables.codeName} thành công`,
                            );
                            onResetFieldsErrors();
                            queryClient.invalidateQueries({
                                queryKey: [queryMisc.GET_DESTINATION_LIST],
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
                    let errors: TDestinationErrorsField = {};
                    error.inner.forEach((err) => {
                        if (
                            !errors[err.path as keyof TDestinationErrorsField]
                        ) {
                            errors[err.path as keyof TDestinationErrorsField] =
                                err.message;
                        }
                    });
                    setErrors(errors);
                }
            });
    };

    const onUpdateStatus = (id: number, status: Status, cb?: () => void) => {
        makeUpdateDestination(
            {
                id: id,
                status: status,
            },
            {
                onSuccess: (data, variables) => {
                    message.success(
                        `${
                            (status === Status.OK && "Kích hoạt") ||
                            (status === Status.OX && "Ngừng kích hoạt") ||
                            "Xoá"
                        } thành công`,
                    );
                    onResetFieldsErrors();
                    queryClient.invalidateQueries({
                        queryKey: [queryMisc.GET_DESTINATION_LIST],
                    });
                    cb?.();
                },
                onError: (error, variables) => {
                    message.error(error.message);
                },
            },
        );
    };

    const onResetFieldsErrors = () => {};

    return {
        onCreate,
        onUpdate,
        onUpdateStatus,
        errors,
    };
};
export default useCRUDDestination;
