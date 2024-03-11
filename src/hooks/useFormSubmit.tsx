import { ValidationError, Schema } from "yup";
import { useState, useEffect } from "react";

interface UseSubmitForm<T extends object | undefined> {
    schema?: Schema<T>;
}
export type HandleSubmit<T> = (data: T) => void;
export function useFormSubmit<T extends object | undefined>({
    schema,
}: UseSubmitForm<T>) {
    type TErrorsField = Partial<Record<keyof T, string>>;

    const [errors, setErrors] = useState<TErrorsField>();

    const handlerSubmit = (formData: T, onSubmit?: HandleSubmit<T>) => {
        if (schema) {
            schema
                .validate(formData, { abortEarly: false })
                .then((data) => {
                    onSubmit?.(formData);
                    setErrors(undefined);
                })
                .catch((error) => {
                    if (error instanceof ValidationError) {
                        let errors: TErrorsField = {};
                        error.inner.forEach((err) => {
                            if (!errors[err.path as keyof TErrorsField]) {
                                errors[err.path as keyof TErrorsField] =
                                    err.message;
                            }
                        });
                        setErrors(errors);
                    }
                });
        } else {
            onSubmit?.(formData);
        }
    };
    const clearErrors = () => {
        setErrors(undefined);
    };

    return { handlerSubmit, errors, clearErrors };
}
