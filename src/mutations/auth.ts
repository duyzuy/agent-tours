import {
  CustomerInformationResponse,
  ICusTomerRegisterPayload,
  ICustomerForgotPasswordPayload,
  ICustomerLoginPayload,
  ICustomerSetPasswordPayload,
} from "@/models/customerAuth.interface";
import { authAPIs } from "@/services/fe/auth";
import { useCustomMutation } from "./useCustomMutation";

export const useCustomerLoginMutation = () => {
  return useCustomMutation({
    mutationFn: (payload: ICustomerLoginPayload) => authAPIs.login(payload),
  });
};

export const useCustomerRegisterMutation = () => {
  return useCustomMutation<CustomerInformationResponse, ICusTomerRegisterPayload>({
    mutationFn: (payload) => authAPIs.register(payload),
  });
};
export const useCustomerResetPasswordMutation = () => {
  return useCustomMutation({
    mutationFn: (payload: ICustomerForgotPasswordPayload) => authAPIs.resetPassword(payload),
  });
};
export const useCustomerSetNewPasswordMutation = () => {
  return useCustomMutation({
    mutationFn: (payload: ICustomerSetPasswordPayload) => authAPIs.setNewPassword(payload),
  });
};
