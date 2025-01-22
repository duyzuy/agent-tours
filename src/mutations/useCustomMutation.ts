import { useMutation, MutationFunction } from "@tanstack/react-query";
import { BaseResponse } from "@/models/common.interface";
import { useQueryClient } from "@tanstack/react-query";

export const useCustomMutation = <TSuccess, TPayLoad extends unknown, TError extends object = BaseResponse<null>>({
  mutationFn,
  onSuccess,
}: {
  mutationFn: MutationFunction<TSuccess, TPayLoad>;
  onSuccess?: (data: TSuccess, variables: TPayLoad, context: unknown) => unknown;
}) => {
  return useMutation<TSuccess, TError, TPayLoad>({
    mutationFn: mutationFn,
    onSuccess: onSuccess,
  });
};
