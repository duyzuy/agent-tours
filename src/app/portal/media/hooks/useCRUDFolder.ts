import { IMediaFolderPayload } from "@/models/management/media.interface";
import useMessage from "@/hooks/useMessage";
import {
    useCreateMediaFoldersMutation,
    useUpdateFolderMutation,
} from "@/mutations/managements/media";
import { mediaFolderSchema } from "./validate";
import { useState } from "react";
import { ValidationError } from "yup";
import { useQueryClient } from "@tanstack/react-query";
import { GET_MEDIA_FOLDERS } from "@/queries/var";

export type TMediaFolderErrorsField = Partial<
    Record<keyof Pick<IMediaFolderPayload, "folderName" | "folderSlug">, string>
>;
const useCRUDMediaFolder = () => {
    const { mutate: makeCreateFolder } = useCreateMediaFoldersMutation();
    const { mutate: makeUpdateFolder } = useUpdateFolderMutation();

    const queryClient = useQueryClient();
    const [errors, setErrors] = useState<TMediaFolderErrorsField>();
    const message = useMessage();
    const onCreateFolder = (payload: IMediaFolderPayload, cb?: () => void) => {
        mediaFolderSchema
            .validate(payload, { abortEarly: false })
            .then((data) => {
                makeCreateFolder(payload, {
                    onSuccess: (data, variables) => {
                        message.success(
                            `Tạo thư mục ${variables.folderName} thành công`,
                        );
                        onResetFieldsErrors();
                        queryClient.invalidateQueries({
                            queryKey: [GET_MEDIA_FOLDERS],
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
                    let errors: TMediaFolderErrorsField = {};
                    error.inner.forEach((err) => {
                        if (
                            !errors[err.path as keyof TMediaFolderErrorsField]
                        ) {
                            errors[err.path as keyof TMediaFolderErrorsField] =
                                err.message;
                        }
                    });
                    setErrors(errors);
                }
            });
    };

    const onUpdateFolder = (
        id: number,
        payload: IMediaFolderPayload,
        cb?: () => void,
    ) => {
        mediaFolderSchema
            .validate(payload, { abortEarly: false })
            .then((data) => {
                makeUpdateFolder(
                    { id, ...payload },
                    {
                        onSuccess: (data, variables) => {
                            message.success(
                                `Cập nhật tên thư mục "${variables.folderName}" thành công`,
                            );
                            onResetFieldsErrors();
                            queryClient.invalidateQueries({
                                queryKey: [GET_MEDIA_FOLDERS],
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
                    let errors: TMediaFolderErrorsField = {};
                    error.inner.forEach((err) => {
                        if (
                            !errors[err.path as keyof TMediaFolderErrorsField]
                        ) {
                            errors[err.path as keyof TMediaFolderErrorsField] =
                                err.message;
                        }
                    });
                    setErrors(errors);
                }
            });
    };

    const onResetFieldsErrors = () => {
        setErrors(() => undefined);
    };
    return {
        onCreateFolder,
        onUpdateFolder,
        errors,
        onResetFieldsErrors,
    };
};
export default useCRUDMediaFolder;
