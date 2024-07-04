import { pageContentAPIs } from "@/services/management/cms/pageContent";
import { IPageContentPayload } from "@/models/management/cms/pageContent.interface";
import { useCustomMutation } from "../useCustomMutation";

export const useCreatePageContentMutation = () => {
  return useCustomMutation({
    mutationFn: (payload: IPageContentPayload) => pageContentAPIs.create(payload),
  });
};

export const useUpdatePageContentMutation = () => {
  return useCustomMutation({
    mutationFn: (payload: IPageContentPayload) => pageContentAPIs.update(payload),
  });
};

export const usePublishPageContentMutation = () => {
  return useCustomMutation({
    mutationFn: (id: number) => pageContentAPIs.publish(id),
  });
};

export const useUnPublishPageContentMutation = () => {
  return useCustomMutation({
    mutationFn: (id: number) => pageContentAPIs.unPublish(id),
  });
};
