import { getAgToken } from "@/utils/common";
import { client } from "@/services/api";
import { BaseResponse } from "@/models/management/common.interface";
import { LangCode } from "@/models/management/cms/language.interface";
import {
    CMSTemplatePayload,
    CMSTemplateListRs,
    CMSTemplateQueryParams,
} from "@/models/management/cms/cmsTemplate.interface";
export const cmsTemplateAPIs = {
    create: async (payload?: CMSTemplatePayload) => {
        return await client.post<CMSTemplateListRs, BaseResponse<null>>(
            "local/cms_template_Addnew",
            {
                headers: {
                    Authorization: `Bearer ${encodeURIComponent(
                        getAgToken() || "",
                    )}`,
                },
                params: {
                    requestObject: {
                        ...payload,
                    },
                },
            },
        );
    },
    getList: async (queryParams?: CMSTemplateQueryParams) => {
        return await client.post<CMSTemplateListRs, BaseResponse<null>>(
            "local/cms_template_List",
            {
                headers: {
                    Authorization: `Bearer ${encodeURIComponent(
                        getAgToken() || "",
                    )}`,
                },
                params: {
                    requestObject: {
                        ...queryParams?.requestObject,
                    },
                    pageCurrent: queryParams?.pageCurrent,
                    pageSize: queryParams?.pageSize,
                },
            },
        );
    },
};
