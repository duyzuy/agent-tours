import { FeSearchProductFormData, FeSearchTourQueryParams } from "@/models/fe/searchTour.interface";
import { searchTourAPIs } from "@/services/fe/searchTour";
import { useCustomMutation } from "../useCustomMutation";

export const useGetTourListMutation = () => {
  return useCustomMutation({
    mutationFn: (payload: FeSearchTourQueryParams) => searchTourAPIs.getList(payload),
  });
};

export const useSearchTourMutation = () => {
  return useCustomMutation({
    mutationFn: (payload?: FeSearchProductFormData) => searchTourAPIs.search(payload),
  });
};
