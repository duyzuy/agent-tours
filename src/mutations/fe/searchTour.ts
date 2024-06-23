import { useMutation } from "@tanstack/react-query";
import { FeSearchTourQueryParams } from "@/models/fe/searchTour.interface";
import { searchTourAPIs } from "@/services/fe/searchTour";

export const useGetTourListMutation = () => {
    return useMutation({
        mutationFn: (payload: FeSearchTourQueryParams) =>
            searchTourAPIs.getList(payload),
    });
};
