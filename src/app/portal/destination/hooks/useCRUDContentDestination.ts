import { IDestinationContentPayload } from "@/models/management/region.interface";
import {
    useCreateDestinationCMSContentMutation,
    useUpdateDestinationCMSContentMutation,
} from "@/mutations/managements/destination";
import { destinationContentSchema } from "./validate";
import useMessage from "@/hooks/useMessage";
import { useState } from "react";
import { ValidationError } from "yup";
import { useQueryClient } from "@tanstack/react-query";
import { queryCMS } from "@/queries/var";

export type TDestinationsCMSContentErrorField = Partial<
    Record<keyof IDestinationContentPayload, string>
>;
const useCRUDContentDestination = () => {
    const { mutate: makeCreateCMSDestinationContent } =
        useCreateDestinationCMSContentMutation();
    const { mutate: makeUpdateCMSContent } =
        useUpdateDestinationCMSContentMutation();

    const message = useMessage();

    const [errors, setErrors] = useState<TDestinationsCMSContentErrorField>();

    const queryClient = useQueryClient();
    const onCreateCMSDestinationContent = (
        payload: IDestinationContentPayload,
        cb?: () => void,
    ) => {
        destinationContentSchema
            .validate(payload, { abortEarly: false })
            .then((schema) => {
                makeCreateCMSDestinationContent(payload, {
                    onSuccess: (data, variables) => {
                        message.success(`Tạo bài viết thành công`);
                        onResetFieldsErrors();
                        queryClient.invalidateQueries({
                            queryKey: [
                                queryCMS.GET_DESTINATION_CMS_DETAIL,
                                payload.codeKey,
                            ],
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
                    let errors: TDestinationsCMSContentErrorField = {};
                    error.inner.forEach((err) => {
                        if (
                            !errors[
                                err.path as keyof TDestinationsCMSContentErrorField
                            ]
                        ) {
                            errors[
                                err.path as keyof TDestinationsCMSContentErrorField
                            ] = err.message;
                        }
                    });
                    setErrors(errors);
                }
            });
    };

    const onUpdateCMSDestinationContent = (
        id: number,
        payload: IDestinationContentPayload,
        cb?: () => void,
    ) => {
        destinationContentSchema
            .validate(payload, { abortEarly: false })
            .then((schema) => {
                makeUpdateCMSContent(
                    { id: id, ...payload },
                    {
                        onSuccess: (data, variables) => {
                            message.success(`Cập nhật thành công`);
                            onResetFieldsErrors();
                            queryClient.invalidateQueries({
                                queryKey: [
                                    queryCMS.GET_DESTINATION_CMS_DETAIL,
                                    payload.codeKey,
                                ],
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
                    let errors: TDestinationsCMSContentErrorField = {};
                    error.inner.forEach((err) => {
                        console.log(err);
                        if (
                            !errors[
                                err.path as keyof TDestinationsCMSContentErrorField
                            ]
                        ) {
                            errors[
                                err.path as keyof TDestinationsCMSContentErrorField
                            ] = err.message;
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
        errors,
        onCreateCMSContent: onCreateCMSDestinationContent,
        onUpdateCMSContent: onUpdateCMSDestinationContent,
    };
};
export default useCRUDContentDestination;
