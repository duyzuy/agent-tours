import { useQuery } from "@tanstack/react-query";
import { queryCMS } from "../var";

import { cmsTemplateAPIs } from "@/services/management/cms/cmsTemplate";
import { getAgToken } from "@/utils/common";
import { CMSTemplateQueryParams } from "@/models/management/cms/cmsTemplate.interface";
import { CMSTemplateContentMinimalQueryParams } from "@/models/management/cms/cmsTemplateContent.interface";

export const useGetCMSTemplateListQuery = (queryParams?: CMSTemplateQueryParams) => {
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

export const useGetCMSTemplateListMinimalQuery = (queryParams?: CMSTemplateQueryParams) => {
  return useQuery({
    queryKey: [queryCMS.GET_CMS_TEMPLATE_SHORT_LIST, { ...queryParams }],
    queryFn: () => cmsTemplateAPIs.getMinimalList(queryParams),
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

export const useGetCMSTemplateContentMinimalListQuery = (
  queryParams: CMSTemplateContentMinimalQueryParams,
  enabled?: boolean,
) => {
  return useQuery({
    queryKey: [queryCMS.GET_CMS_TEMPLATE_CONTENT_MINIMAL_LIST, { ...queryParams }],
    queryFn: () => cmsTemplateAPIs.getMinimalContentList(queryParams),
    select: (data) => {
      return {
        list: data.result,
        pageSize: data.pageSize,
        pageCurrent: data.pageCurrent,
        totalItems: data.totalItems,
      };
    },
    enabled: enabled,
  });
};

export const useGetCMSTemplateDetailQuery = (code: string) => {
  return useQuery({
    queryKey: [queryCMS.GET_CMS_TEMPLATE_DETAIL, code],
    queryFn: () => cmsTemplateAPIs.getDetailsTemplateKey({ requestObject: { code: code } }),
    select: (data) => {
      return data.result;
    },
    enabled: Boolean(getAgToken()),
  });
};
