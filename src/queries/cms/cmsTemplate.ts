import { useQuery } from "@tanstack/react-query";
import { queryCMS } from "../var";

import { cmsTemplateAPIs } from "@/services/management/cms/cmsTemplate";
import { getAgToken } from "@/utils/common";
import {
    IPageContentDetailRs,
    PageContentQueryParams,
} from "@/models/management/cms/pageContent.interface";
import { LangCode } from "@/models/management/cms/language.interface";
import { isUndefined } from "lodash";
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
