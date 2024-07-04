import { getAgToken } from "@/utils/common";
import { client } from "@/services/api";
import { BaseResponse } from "@/models/common.interface";
import {
    VisaTemplateKeyListResponse,
    VisaTemplateKeyPayload,
    VisaTemplateQueryParams,
} from "@/models/management/cms/visaTemplate.interface";
import { VisaTemplateContentListResponse } from "@/models/management/cms/visaTemplateContent.interface";
export const visaTemplateAPIs = {
    getTemplateKeyList: async (queryParams?: VisaTemplateQueryParams) => {
        return await client.post<
            VisaTemplateKeyListResponse,
            BaseResponse<null>
        >("local/cms_visaTemplateKey_List", {
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
        });
    },

    createTemplateKey: async (payload?: VisaTemplateKeyPayload) => {
        return await client.post<
            VisaTemplateContentListResponse,
            BaseResponse<null>
        >("local/cms_visaTemplate_Addnew_ByKey", {
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
        });
    },
    // createContent: async (payload?: CMSTemplateContentPayload) => {
    //     return await client.post<ICMSTemplate, BaseResponse<null>>(
    //         "local/cms_template_Addnew",
    //         {
    //             headers: {
    //                 Authorization: `Bearer ${encodeURIComponent(
    //                     getAgToken() || "",
    //                 )}`,
    //             },
    //             params: {
    //                 requestObject: {
    //                     ...payload,
    //                 },
    //             },
    //         },
    //     );
    // },
    // getList: async (queryParams?: CMSTemplateQueryParams) => {
    //     return await client.post<CMSTemplateListRs, BaseResponse<null>>(
    //         "local/cms_templateKey_List",
    //         {
    //             headers: {
    //                 Authorization: `Bearer ${encodeURIComponent(
    //                     getAgToken() || "",
    //                 )}`,
    //             },
    //             params: {
    //                 requestObject: {
    //                     ...queryParams?.requestObject,
    //                 },
    //                 pageCurrent: queryParams?.pageCurrent,
    //                 pageSize: queryParams?.pageSize,
    //             },
    //         },
    //     );
    // },
    // getListContent: async (queryParams?: CMSTemplateQueryParams) => {
    //     return await client.post<CMSTemplateContentListRs, BaseResponse<null>>(
    //         "local/cms_template_List",
    //         {
    //             headers: {
    //                 Authorization: `Bearer ${encodeURIComponent(
    //                     getAgToken() || "",
    //                 )}`,
    //             },
    //             params: {
    //                 requestObject: {
    //                     ...queryParams?.requestObject,
    //                 },
    //                 pageCurrent: queryParams?.pageCurrent,
    //                 pageSize: queryParams?.pageSize,
    //             },
    //         },
    //     );
    // },
    // updateTemplateContent: async (payload?: CMSTemplateContentPayload) => {
    //     return await client.post<CMSTemplateContentListRs, BaseResponse<null>>(
    //         "local/cms_template_Edit",
    //         {
    //             headers: {
    //                 Authorization: `Bearer ${encodeURIComponent(
    //                     getAgToken() || "",
    //                 )}`,
    //             },
    //             params: {
    //                 requestObject: {
    //                     ...payload,
    //                 },
    //             },
    //         },
    //     );
    // },
    // updateStatusTemplateContent: async (payload?: {
    //     id: number;
    //     status: PageContentStatus;
    // }) => {
    //     return await client.post<CMSTemplateContentListRs, BaseResponse<null>>(
    //         "local/cms_template_UpdateStatus",
    //         {
    //             headers: {
    //                 Authorization: `Bearer ${encodeURIComponent(
    //                     getAgToken() || "",
    //                 )}`,
    //             },
    //             params: {
    //                 requestObject: {
    //                     ...payload,
    //                 },
    //             },
    //         },
    //     );
    // },

    // updateTemplate: async (payload?: CMSTemplatePayload) => {
    //     return await client.post<CMSTemplateRs, BaseResponse<null>>(
    //         "local/cms_template_EditKey",
    //         {
    //             headers: {
    //                 Authorization: `Bearer ${encodeURIComponent(
    //                     getAgToken() || "",
    //                 )}`,
    //             },
    //             params: {
    //                 requestObject: {
    //                     ...payload,
    //                 },
    //             },
    //         },
    //     );
    // },
    // createTemplateContentIncludeAndNote: async (
    //     payload?: CMSTemplateContentMetaDataPayload,
    // ) => {
    //     return await client.post<
    //         CMSTemplateContentMetaDataRs,
    //         BaseResponse<null>
    //     >("local/cms_template_includedandnote_Addnew", {
    //         headers: {
    //             Authorization: `Bearer ${encodeURIComponent(
    //                 getAgToken() || "",
    //             )}`,
    //         },
    //         params: {
    //             requestObject: {
    //                 ...payload,
    //             },
    //         },
    //     });
    // },
    // updateTemplateContentIncludeAndNote: async (
    //     payload?: CMSTemplateContentMetaDataPayload,
    // ) => {
    //     return await client.post<
    //         CMSTemplateContentMetaDataRs,
    //         BaseResponse<null>
    //     >("local/cms_template_includedandnote_Edit", {
    //         headers: {
    //             Authorization: `Bearer ${encodeURIComponent(
    //                 getAgToken() || "",
    //             )}`,
    //         },
    //         params: {
    //             requestObject: {
    //                 ...payload,
    //             },
    //         },
    //     });
    // },
    // createTemplateContentItinerary: async (
    //     payload?: CMSTemplateContentMetaDataPayload,
    // ) => {
    //     return await client.post<
    //         CMSTemplateContentMetaDataRs,
    //         BaseResponse<null>
    //     >("local/cms_template_itinerary_Addnew", {
    //         headers: {
    //             Authorization: `Bearer ${encodeURIComponent(
    //                 getAgToken() || "",
    //             )}`,
    //         },
    //         params: {
    //             requestObject: {
    //                 ...payload,
    //             },
    //         },
    //     });
    // },
    // updateTemplateContentItinerary: async (
    //     payload?: CMSTemplateContentMetaDataPayload,
    // ) => {
    //     return await client.post<
    //         CMSTemplateContentMetaDataRs,
    //         BaseResponse<null>
    //     >("local/cms_template_itinerary_Edit", {
    //         headers: {
    //             Authorization: `Bearer ${encodeURIComponent(
    //                 getAgToken() || "",
    //             )}`,
    //         },
    //         params: {
    //             requestObject: {
    //                 ...payload,
    //             },
    //         },
    //     });
    // },
    // deleteTemplateContent: async (recId?: number) => {
    //     return await client.post<CMSTemplateContentRs, BaseResponse<null>>(
    //         "local/Cms_Delete",
    //         {
    //             headers: {
    //                 Authorization: `Bearer ${encodeURIComponent(
    //                     getAgToken() || "",
    //                 )}`,
    //             },
    //             params: {
    //                 requestObject: {
    //                     recId,
    //                     type: "DETAILS",
    //                     cat: "cms_template",
    //                 },
    //             },
    //         },
    //     );
    // },
};
