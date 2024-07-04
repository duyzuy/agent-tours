import { FeSearchTourQueryParams } from "@/models/fe/searchTour.interface";
import { searchTourAPIs } from "@/services/fe/searchTour";
import { useCustomMutation } from "../useCustomMutation";

export const useGetTourListMutation = () => {
  return useCustomMutation({
    mutationFn: (payload: FeSearchTourQueryParams) => searchTourAPIs.getList(payload),
  });
};
