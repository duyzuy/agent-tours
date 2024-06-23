import { useMutation } from "@tanstack/react-query";
import {
    CustomerInformationResponse,
    ICusTomerRegisterPayload,
    ICustomerLoginPayload,
} from "@/models/customerAuth.interface";
import { authAPIs } from "@/services/fe/auth";
import { BaseResponse } from "@/models/common.interface";

export const useCustomerLoginMutation = () => {
    return useMutation({
        mutationFn: (payload: ICustomerLoginPayload) => authAPIs.login(payload),
    });
};

export const useCustomerRegisterMutation = () => {
    return useMutation<
        CustomerInformationResponse,
        BaseResponse<null>,
        ICustomerLoginPayload
    >({
        mutationFn: (payload) => authAPIs.register(payload),
    });
};

export const useCustomerGetProfileMutation = () => {
    return useMutation({
        mutationFn: () => authAPIs.getProfile(),
    });
};
