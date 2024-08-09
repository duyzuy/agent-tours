import { useQuery } from "@tanstack/react-query";
import { queryCMS } from "../var";
import { cmsTravelNoticeAPIs } from "@/services/management/cms/cmsTravelNotice";
import { TravelInformationNoticeQueryParams } from "@/models/management/cms/cmsStateProvinceNotice";

export const useGetTravelInformationNoticeListQuery = (queryParams?: TravelInformationNoticeQueryParams) => {
  return useQuery({
    queryKey: [queryCMS.GET_TRAVEL_INFORMATION_NOTICE_LIST, { ...queryParams }],
    queryFn: () => cmsTravelNoticeAPIs.getList(queryParams),
    select: (data) => {
      return {
        list: data.result,
        pageSize: data.pageSize,
        pageCurrent: data.pageCurrent,
        totalItems: data.totalItems,
      };
    },
  });
};

export const useGetTravelInformationNoticeDetailQuery = ({ originId }: { originId?: number }) => {
  return useQuery({
    queryKey: [queryCMS.GET_TRAVEL_INFORMATION_NOTICE_DETAIL, { originId }],
    queryFn: () => cmsTravelNoticeAPIs.getDetail(originId),
    select: (data) => {
      return data.result;
    },
  });
};
