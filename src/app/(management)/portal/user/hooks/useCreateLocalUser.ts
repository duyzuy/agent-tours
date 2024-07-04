"use client";
import { useState } from "react";
import { ValidationError } from "yup";
import { localUserSchema } from "./validate";
import useMessage from "@/hooks/useMessage";
import { useCreateLocalUserMutation } from "@/mutations/managements/localUser";
import { ILocalUserPayload } from "@/models/management/localUser.interface";
import { useQueryClient } from "@tanstack/react-query";
import { GET_LOCAL_USER_LIST } from "@/queries/var";

export type TCreateUserErrorFields = Partial<
    Record<keyof ILocalUserPayload, string>
>;

const useCreateLocalUser = () => {
    const [errors, setErrors] = useState<TCreateUserErrorFields>();
    const { mutate: makeCreateUser } = useCreateLocalUserMutation();
    const message = useMessage();
    const queryClient = useQueryClient();
    const onCreateUser = (payload: ILocalUserPayload, cb?: () => void) => {
        localUserSchema
            .validate(payload, { abortEarly: false })
            .then((dataSchema) => {
                makeCreateUser(
                    {
                        ...dataSchema,
                    },
                    {
                        onSuccess: (data) => {
                            console.log(data);
                            onClearValidationCreateError();
                            message.success("Tạo tài khoản thành công");
                            queryClient.invalidateQueries({
                                queryKey: [GET_LOCAL_USER_LIST],
                            });
                            cb?.();
                        },
                        onError: (error) => {
                            console.log({ error });
                            message.error(error.message);
                        },
                    },
                );
            })
            .catch((error) => {
                if (error instanceof ValidationError) {
                    let errors: TCreateUserErrorFields = {};
                    error.inner.forEach((err) => {
                        errors[err.path as keyof TCreateUserErrorFields] =
                            err.message;
                    });
                    setErrors(errors);
                }
            });
    };

    const onClearValidationCreateError = () => {
        setErrors(undefined);
    };
    return {
        onCreateUser,
        errors,
        onClearValidationCreateError,
    };
};
export default useCreateLocalUser;
