import { useQuery } from "@tanstack/react-query";
import { queryCore } from "../var";
import { regionAPIs } from "@/services/management/cores/region.service";

export const useGetRegionList = () => {
    return useQuery({
        queryKey: [queryCore.GET_LIST_REGION],
        queryFn: () => regionAPIs.getCountryList(),
        select: (data) => data.result,
    });
};
