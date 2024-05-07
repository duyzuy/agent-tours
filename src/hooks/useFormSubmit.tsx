import { ValidationError, Schema } from "yup";
import { useState, useEffect, useCallback } from "react";

type FieldKeys<T> = keyof (T extends Array<infer U>
    ? U
    : T extends object
    ? T
    : never);

type ErrorFields<T> = Partial<Record<FieldKeys<T>, string>>;

type ErrorsMesssageType<T> = T extends Array<infer U>
    ? Array<{
          index: number;
          data: ErrorFields<U>;
      }>
    : T extends object
    ? ErrorFields<T>
    : never;

interface UseSubmitForm<T extends object | undefined> {
    schema?: Schema<T>;
}
export type HandleSubmit<T> = (data: T) => void;

export function useFormSubmit<T extends object | undefined>({
    schema,
}: UseSubmitForm<T>) {
    const [errors, setErrors] = useState<ErrorsMesssageType<T>>();

    const handlerSubmit = (formData: T, onSubmit?: HandleSubmit<T>) => {
        schema
            ? schema
                  .validate(formData, { abortEarly: false })
                  .then((data) => {
                      onSubmit?.(formData);
                      setErrors(undefined);
                  })
                  .catch((error) => {
                      if (error instanceof ValidationError) {
                          let errors:
                              | ErrorFields<T>
                              | {
                                    index: number;
                                    data: ErrorFields<T>;
                                }[] = Array.isArray(formData) ? [] : {};

                          error.inner.forEach((err) => {
                              const { path } = err;
                              if (path) {
                                  const pathSplit = path.split(".");

                                  const indexOfErr = Number(
                                      pathSplit[0].replace(/\D/g, ""),
                                  );

                                  if (
                                      pathSplit.length > 1 &&
                                      Array.isArray(errors)
                                  ) {
                                      if (isNaN(indexOfErr)) {
                                          throw new Error(
                                              "index of Error is not number",
                                          );
                                      }

                                      const indexErr = errors.findIndex(
                                          (err) => err.index === indexOfErr,
                                      );

                                      if (indexErr !== -1) {
                                          errors.splice(indexErr, 1, {
                                              ...errors[indexErr],
                                              data: {
                                                  ...errors[indexErr].data,
                                                  [pathSplit[1]]: err.message,
                                              },
                                          });
                                      } else {
                                          errors = [
                                              ...errors,
                                              {
                                                  index: indexOfErr,
                                                  data: {
                                                      [pathSplit[1]]:
                                                          err.message,
                                                  },
                                              },
                                          ] as ErrorsMesssageType<T>;
                                      }
                                  } else {
                                      errors = {
                                          ...(errors || {}),
                                          [path]: err.message,
                                      };
                                  }
                              }
                          });

                          setErrors(() => {
                              return errors as ErrorsMesssageType<T>;
                          });
                      }
                  })
            : onSubmit?.(formData);
    };

    const extractErrorInstant = (error: ValidationError) => {
        const { inner, errors } = error;

        let errObject = {};
        inner.forEach((innerErr) => {
            const { path, message } = innerErr;

            const pathArr = path?.split(".");

            pathArr;
        });
        //   const errIndex =
        //       pathSplit[0].match(/(?<=\[).+?(?=\])/g); remove two [ and ]
        //   const indexOfErr = Number(
        //     pathSplit[0].replace(/\D/g, ""),
        // );
        //   .match(/.+(?=\[)/g)

        //   const matches = str.match(/\[.+?\]/g);
    };

    const clearErrors = useCallback(() => setErrors(undefined), []);

    return { handlerSubmit, errors, clearErrors };
}
