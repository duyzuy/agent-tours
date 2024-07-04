import { useMutation } from "@tanstack/react-query";
import {
  CustomerInformationResponse,
  ICusTomerRegisterPayload,
  ICustomerLoginPayload,
} from "@/models/customerAuth.interface";
import { authAPIs } from "@/services/fe/auth";
import { BaseResponse } from "@/models/common.interface";
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

// export const useCustomerGetProfileMutation = () => {
//   return useMutation({
//     mutationFn: () => authAPIs.getProfile(),
//   });
// };
