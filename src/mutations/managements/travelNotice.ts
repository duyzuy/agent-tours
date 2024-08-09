import { useCustomMutation } from "../useCustomMutation";
import { cmsTravelNoticeAPIs } from "@/services/management/cms/cmsTravelNotice";
import { TravelInformationNoticePayload } from "@/models/management/cms/cmsStateProvinceNotice";
import { PageContentStatus } from "@/models/management/cms/pageContent.interface";

export const useCreateTravelNoticeMutation = () => {
  return useCustomMutation({
    mutationFn: (payload: TravelInformationNoticePayload) => cmsTravelNoticeAPIs.create(payload),
  });
};

export const useUpdateTravelNoticeMutation = () => {
  return useCustomMutation({
    mutationFn: (payload: TravelInformationNoticePayload) => cmsTravelNoticeAPIs.update(payload),
  });
};

export const useUpdateStatusTravelNoticeMutation = () => {
  return useCustomMutation({
    mutationFn: (payload?: { id?: number; status?: PageContentStatus }) => cmsTravelNoticeAPIs.updateStatus(payload),
  });
};

export const useDeleteTravelNoticeMutation = () => {
  return useCustomMutation({
    mutationFn: (id: number) => cmsTravelNoticeAPIs.delete(id),
  });
};
