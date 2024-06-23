import { FeSearchTourQueryParams } from "@/models/fe/searchTour.interface";
import { searchTourAPIs } from "@/services/fe/searchTour";
import { useQuery } from "@tanstack/react-query";
import { queryFE } from "../var";

export const useGetTourListQuery = ({
    enable,
    queryParams,
}: {
    enable?: boolean;
    queryParams: FeSearchTourQueryParams;
}) => {
    return useQuery({
        queryKey: [queryFE.GET_TOUR_LIST],
        queryFn: () => searchTourAPIs.getList(queryParams),
        select: (data) => {
            return data.result;
        },
        retry: false,
        enabled: enable,
    });
};
