import { ObjectSchema, object, string, array, number, ref } from "yup";

import {
    CustomerLoginFormData,
    CustomerRegisterFormData,
} from "../modules/customerAuth.interface";

export const customerRegisterSchema: ObjectSchema<CustomerRegisterFormData> =
    object({
        faceBookId: string(),
        googleId: string(),
        username: string().required("username.required"),
        email: string().required("email.required").email("email.invalid"),
        phoneNumber: string(),
        password: string()
            .required("password.required")
            .min(8, "password.minLength"),
        passwordConfirm: string()
            .required("passwordConfirm.required")
            .min(8, "passwordConfirm.minLength")
            .oneOf([ref("password")], "passwordConfirm.notMatch"),
    });

export const customerLoginSchema: ObjectSchema<CustomerLoginFormData> = object({
    faceBookId: string(),
    googleId: string(),
    username: string().required("username.required"),
    email: string(),
    phoneNumber: string(),
    password: string()
        .required("password.required")
        .min(5, "password.minLength"),
});
