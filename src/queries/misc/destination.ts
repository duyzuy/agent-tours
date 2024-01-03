import { useQuery } from "@tanstack/react-query";
import { queryMisc, queryCMS } from "../var";
import { getAgToken } from "@/utils/common";
import { destinationAPIs } from "@/services/management/misc/destination";
import { isEmpty } from "lodash";

export const useGetDestinationsQuery = () => {
    const token = getAgToken() || "";

    return useQuery({
        queryKey: [queryMisc.GET_DESTINATION_LIST],
        queryFn: () => destinationAPIs.getDestinationList(),
        enabled: Boolean(token),
        select: (data) => {
            return data.result;
        },
    });
};

export const useGetDestinationDetailMICSQuery = (id: number) => {
    const token = getAgToken() || "";

    return useQuery({
        queryKey: [queryMisc.GET_DESTINATION_DETAIL, id],
        queryFn: () => destinationAPIs.getDestinationDetail(id),
        enabled: Boolean(token),
        select: (data) => {
            return data.result[0];
        },
    });
};

export const useGetDestinationDetailCMSQuery = (codekey: string) => {
    const token = getAgToken() || "";

    return useQuery({
        queryKey: [queryCMS.GET_DESTINATION_CMS_DETAIL, codekey],
        queryFn: () => destinationAPIs.getCMSContent({ codekey }),
        enabled: Boolean(token) && Boolean(codekey),
        select: (data) => {
            return data.result;
        },
    });
};
