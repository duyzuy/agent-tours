import { IInventoryPayload } from "@/models/management/core/inventory.interface";
import { InventoryFormData } from "./inventory.interface";
import {
  useApprovalInventoryMutation,
  useCreateInventoryMutation,
  useUpdateInventoryMutation,
  useDeleteInventoryMutation,
} from "@/mutations/managements/inventory";

import useMessage from "@/hooks/useMessage";
import { useQueryClient } from "@tanstack/react-query";
import { queryCore } from "@/queries/var";

export type TInventoryErrorsField = Record<keyof IInventoryPayload, string>;
const useCRUDInventory = () => {
  const { mutate: makeCreateInventory } = useCreateInventoryMutation();
  const { mutate: makeUpdateInventory } = useUpdateInventoryMutation();
  const { mutate: makeApprovalInventory } = useApprovalInventoryMutation();
  const { mutate: makeDeleteInventory } = useDeleteInventoryMutation();

  const queryClient = useQueryClient();
  const message = useMessage();
  const onCreateInventory = (formData: InventoryFormData, cb?: () => void) => {
    makeCreateInventory(formData, {
      onSuccess: (data, variables) => {
        message.success(`Tạo ${variables.name} thành công`);
        queryClient.invalidateQueries({
          queryKey: [queryCore.GET_INVENTORY_LIST],
        });
        cb?.();
      },
      onError: (error, variables) => {
        console.log({ error, variables });
        message.error(error.message);
      },
    });
  };
  const onUpdateInventory = (recId: number, formData: InventoryFormData, cb?: () => void) => {
    makeUpdateInventory(
      { recId, name: formData.name },
      {
        onSuccess: (data, variables) => {
          message.success(`Cập nhật thành công`);

          queryClient.invalidateQueries({
            queryKey: [queryCore.GET_INVENTORY_LIST],
          });
          cb?.();
        },
        onError: (error, variables) => {
          console.log({ error, variables });
          message.error(error.message);
        },
      },
    );
  };
  const onApprovalInventory = (recId: number, cb?: () => void) => {
    makeApprovalInventory(
      { recId: recId },
      {
        onSuccess: (data, variables) => {
          message.success(`Duyệt thành công`);
          queryClient.invalidateQueries({
            queryKey: [queryCore.GET_INVENTORY_LIST],
          });
          cb?.();
        },
        onError: (error, variables) => {
          console.log({ error, variables });
          message.error(error.message);
        },
      },
    );
  };
  const onDeleteInventory = (recId: number, cb?: () => void) => {
    makeDeleteInventory(
      { recId: recId },
      {
        onSuccess: (data, variables) => {
          message.success(`Xoá thành công`);
          queryClient.invalidateQueries({
            queryKey: [queryCore.GET_INVENTORY_LIST],
          });
          cb?.();
        },
        onError: (error, variables) => {
          console.log({ error, variables });
          message.error(error.message);
        },
      },
    );
  };

  return {
    onCreateInventory,
    onUpdateInventory,
    onApprovalInventory,
    onDeleteInventory,
  };
};
export default useCRUDInventory;
