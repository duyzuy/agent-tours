import { useCustomMutation } from "../useCustomMutation";
import { PageContentStatus } from "@/models/management/cms/pageContent.interface";
import { categoryAPIs } from "@/services/management/cms/category";
import { postAPIs } from "@/services/management/cms/post";
import { CategoryPayload } from "@/models/management/category.interface";
import { PostContentPayload } from "@/models/management/post.interface";

export const useCreatePostMutation = () => {
  return useCustomMutation({
    mutationFn: (payload: PostContentPayload) => postAPIs.create(payload),
  });
};

export const useUpdatePostMutation = () => {
  return useCustomMutation({
    mutationFn: (payload: CategoryPayload) => postAPIs.update(payload),
  });
};

export const useUpdateStatusMutation = () => {
  return useCustomMutation({
    mutationFn: (payload: { id: number; status: PageContentStatus }) => postAPIs.updateStatus(payload),
  });
};

export const useDeletePostMutation = () => {
  return useCustomMutation({
    mutationFn: (id: number) => postAPIs.delete(id),
  });
};
