import { ObjectSchema, object, string, array, number, ref } from "yup";
export const PASSWORD_MIN_LENGTH = 8;
import {
  CustomerCreatePasswordFormData,
  CustomerForgotPasswordFormData,
  CustomerLoginFormData,
  CustomerRegisterFormData,
} from "./customerAuth.interface";

export const customerRegisterSchema: ObjectSchema<CustomerRegisterFormData> = object({
  faceBookId: string(),
  googleId: string(),
  username: string().required("username.required"),
  email: string().required("email.required").email("email.invalid"),
  phoneNumber: string(),
  password: string().required("password.required").min(8, "password.minLength"),
  passwordConfirm: string()
    .required("passwordConfirm.required")
    .min(PASSWORD_MIN_LENGTH, "passwordConfirm.minLength")
    .oneOf([ref("password")], "passwordConfirm.notMatch"),
});

export const customerLoginSchema: ObjectSchema<CustomerLoginFormData> = object({
  faceBookId: string(),
  googleId: string(),
  username: string().required("username.required"),
  email: string(),
  phoneNumber: string(),
  password: string().required("password.required").min(5, "password.minLength"),
});

export const customerForgotPasswordSchema: ObjectSchema<CustomerForgotPasswordFormData> = object({
  username: string().required("username.required"),
  email: string().required("email.required").email("email.invalid"),
});

export const customerCreatePasswordSchema: ObjectSchema<CustomerCreatePasswordFormData> = object({
  id: number().required("id.required"),
  password: string().required("password.required").min(PASSWORD_MIN_LENGTH, "password.minLength"),
  passwordConfirm: string()
    .required("passwordConfirm.required")
    .min(8, "passwordConfirm.minLength")
    .oneOf([ref("password")], "passwordConfirm.notMatch"),
});
