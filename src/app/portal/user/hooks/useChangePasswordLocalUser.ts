import { useState } from "react";
import { ValidationError } from "yup";
import useMessage from "@/hooks/useMessage";
import { localUserChangePasswordSchema } from "./validate";
import { useLocalUserChangePasswordMutation } from "@/mutations/managements/localUser";

import {
    ILocalUserChangePasswordPayLoad,
    ILocalUserChangePasswordFormData,
} from "@/model/LocalUser.interface";

export type TLocalUserChangePasswordErrorsField = Partial<
    Record<keyof ILocalUserChangePasswordFormData, string>
>;
const useChangePasswordLocalUser = () => {
    const { mutate: makeChangePassword } = useLocalUserChangePasswordMutation();
    const [errors, setErrors] = useState<TLocalUserChangePasswordErrorsField>();
    const message = useMessage();

    const onLocalUserChangePassword = (
        payload: ILocalUserChangePasswordFormData,
        cb?: () => void,
    ) => {
        localUserChangePasswordSchema
            .validate(payload, { abortEarly: false })
            .then((dataSchema) => {
                makeChangePassword(
                    {
                        ...dataSchema,
                    },
                    {
                        onSuccess: (data) => {
                            console.log(data);
                            setErrors(undefined);
                            message.success("Đổi mật khẩu thành công.");
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
                    let errors: TLocalUserChangePasswordErrorsField = {};
                    error.inner.forEach((err) => {
                        if (
                            !errors[
                                err.path as keyof TLocalUserChangePasswordErrorsField
                            ]
                        ) {
                            errors[
                                err.path as keyof TLocalUserChangePasswordErrorsField
                            ] = err.message;
                        }
                    });
                    setErrors(errors);
                }
            });
    };

    return {
        onLocalUserChangePassword,
        errors,
    };
};
export default useChangePasswordLocalUser;
