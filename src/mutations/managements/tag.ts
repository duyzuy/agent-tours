import { useCustomMutation } from "../useCustomMutation";
import { tagAPIs } from "@/services/management/cms/tag";
import { TagPayload } from "@/models/management/tag.interface";
import { PageContentStatus } from "@/models/management/cms/pageContent.interface";

export const useCreateTagMutation = () => {
  return useCustomMutation({
    mutationFn: (payload: TagPayload) => tagAPIs.create(payload),
  });
};

export const useUpdateTagMutation = () => {
  return useCustomMutation({
    mutationFn: (payload: TagPayload) => tagAPIs.update(payload),
  });
};

export const useUpdateStatusMutation = () => {
  return useCustomMutation({
    mutationFn: (payload: { id: number; status: PageContentStatus }) => tagAPIs.updateStatus(payload),
  });
};

export const useDeleteTagMutation = () => {
  return useCustomMutation({
    mutationFn: (id: number) => tagAPIs.delete(id),
  });
};
