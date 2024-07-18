import { useQuery } from "@tanstack/react-query";
import { queryCMS } from "../var";

import { cmsTemplateAPIs } from "@/services/management/cms/cmsTemplate";
import { visaTemplateAPIs } from "@/services/management/cms/visaTemplate";
import { getAgToken } from "@/utils/common";

import { VisaTemplateQueryParams } from "@/models/management/cms/visaTemplate.interface";
import { VisaTemplateContentMinimalQueryParams } from "@/models/management/cms/visaTemplateContent.interface";

export const useGetVisaTemplateKeyListQuery = (queryParams?: VisaTemplateQueryParams) => {
  return useQuery({
    queryKey: [queryCMS.GET_VISA_TEMPLATE_LIST, { ...queryParams }],
    queryFn: () => visaTemplateAPIs.getTemplateKeyList(queryParams),
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

export const useGetVisaTemplateContentMinimalListQuery = (
  queryParams: VisaTemplateContentMinimalQueryParams,
  enabled?: boolean,
) => {
  return useQuery({
    queryKey: [queryCMS.GET_VISA_TEMPLATE_CONTENT_SHORT_LIST, { ...queryParams }],
    queryFn: () => visaTemplateAPIs.getTemplateContentMinimalList(queryParams),
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

export const useGetVisaTemplateKeyMinimalListQuery = (queryParams?: VisaTemplateQueryParams) => {
  return useQuery({
    queryKey: [queryCMS.GET_VISA_TEMPLATE_SHORT_LIST, { ...queryParams }],
    queryFn: () => visaTemplateAPIs.getTemplateKeyMinimalList(queryParams),
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

export const useGetVisaTemplateDetailQuery = (code: string) => {
  return useQuery({
    queryKey: [queryCMS.GET_VISA_TEMPLATE_DETAIL, code],
    queryFn: () => visaTemplateAPIs.getTemplateKeyDetail({ requestObject: { code: code } }),
    select: (data) => {
      return data.result;
    },
    enabled: Boolean(getAgToken()),
  });
};
