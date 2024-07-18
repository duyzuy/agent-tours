import { menuAPIs } from "@/services/management/cms/menu";

import { useCustomMutation } from "../useCustomMutation";
import { IMenuItem, MenuItemPayload } from "@/models/management/cms/menu.interface";

export const useCreateMenuItemMutation = () => {
  return useCustomMutation({
    mutationFn: async (payloadList: MenuItemPayload[]) => {
      return Promise.all(payloadList.map(async (item) => await menuAPIs.create(item)));
      // return menuAPIs.create(payloadList);
    },
  });
};

export const useDeleteMenuItemMutation = () => {
  return useCustomMutation({
    mutationFn: (id: number) => menuAPIs.delete(id),
  });
};

export const useUpdateMenuItemMutation = () => {
  return useCustomMutation({
    mutationFn: (payload: MenuItemPayload & { id: number }) => menuAPIs.updateItem(payload),
  });
};

export const useUpdateMenuListMutation = () => {
  return useCustomMutation({
    mutationFn: (payload: IMenuItem[]) => menuAPIs.updateList(payload),
  });
};
