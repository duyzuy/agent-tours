import { useQuery } from "@tanstack/react-query";
import { queryCMS } from "../var";

import { cmsTemplateAPIs } from "@/services/management/cms/cmsTemplate";
import { getAgToken } from "@/utils/common";
import { CMSTemplateQueryParams } from "@/models/management/cms/cmsTemplate.interface";

export const useGetCMSTemplateListQuery = (
    queryParams?: CMSTemplateQueryParams,
) => {
    return useQuery({
        queryKey: [queryCMS.GET_CMS_TEMPLATE_LIST, { ...queryParams }],
        queryFn: () => cmsTemplateAPIs.getList(queryParams),
        select: (data) => {
            return {
                list: data.result,
                pageSize: data.pageSize,
                pageCurrent: data.pageCurrent,
                totalItems: data.totalItems,
            };
        },
        enabled: Boolean(getAgToken()),
    });
};

export const useGetCMSTemplateDetailQuery = (code: string) => {
    return useQuery({
        queryKey: [queryCMS.GET_CMS_TEMPLATE_DETAIL, code],
        queryFn: () =>
            cmsTemplateAPIs.getList({ requestObject: { code: code } }),
        select: (data) => {
            return data.result[0];
        },
        enabled: Boolean(getAgToken()),
    });
};
