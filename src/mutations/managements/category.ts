import { useCustomMutation } from "../useCustomMutation";
import { PageContentStatus } from "@/models/management/cms/pageContent.interface";
import { categoryAPIs } from "@/services/management/cms/category";
import { CategoryPayload } from "@/models/management/category.interface";

export const useCreateCategoryMutation = () => {
  return useCustomMutation({
    mutationFn: (payload: CategoryPayload) => categoryAPIs.create(payload),
  });
};

export const useUpdateCategoryMutation = () => {
  return useCustomMutation({
    mutationFn: (payload: CategoryPayload) => categoryAPIs.update(payload),
  });
};

export const useUpdateStatusMutation = () => {
  return useCustomMutation({
    mutationFn: (payload: { id: number; status: PageContentStatus }) => categoryAPIs.updateStatus(payload),
  });
};

export const useDeleteMutation = () => {
  return useCustomMutation({
    mutationFn: (id: number) => categoryAPIs.delete(id),
  });
};
