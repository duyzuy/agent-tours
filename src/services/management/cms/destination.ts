import {
  IDestinationEditPayload,
  IDestinationPayload,
  IDestinationListRs,
  IDestinationRs,
  IDestinationContentPayload,
  IDestinationContentRs,
  IDestinationContentsRs,
  IDestinationGetContentQueryParams,
  IDestinationMinimalListRs,
  DestinationMinimalQueryParams,
} from "@/models/management/region.interface";
import { client } from "@/services/api";

export const destinationAPIs = {
  createDestination: async (payload: IDestinationPayload) => {
    return await client.post<IDestinationRs>("local/LocalMisc_DestList_Addnew", {
      body: {
        requestObject: {
          ...payload,
        },
      },
      isAuth: true,
    });
  },
  getDestinationList: async () => {
    return await client.post<IDestinationListRs>("local/LocalMisc_DestList_Get", {
      body: {
        requestObject: {},
      },
      isAuth: true,
    });
  },
  getDestinationMinimalList: async (queryParams: DestinationMinimalQueryParams) => {
    return await client.post<IDestinationMinimalListRs>("local/Cms_DestListMinimal", {
      body: {
        requestObject: {
          ...queryParams.requestObject,
        },
        pageCurrent: queryParams.pageCurrent,
        pageSize: queryParams.pageSize,
        orderBy: queryParams.orderBy,
      },
      isAuth: true,
    });
  },
  getDestinationDetail: async (id: number) => {
    return await client.post<IDestinationListRs>("local/LocalMisc_DestList_Get", {
      body: {
        requestObject: { id },
      },
      isAuth: true,
    });
  },
  updateDestination: async (payload: IDestinationEditPayload) => {
    return await client.post<IDestinationRs>("local/LocalMisc_DestList_Edit", {
      body: {
        requestObject: {
          ...payload,
        },
      },
      isAuth: true,
    });
  },

  createCMSContent: async (payload: IDestinationContentPayload) => {
    return await client.post<IDestinationContentRs>("local/Cms_DestList_Addnew", {
      body: {
        requestObject: {
          ...payload,
        },
      },
      isAuth: true,
    });
  },
  getCMSContent: async (queryParams: IDestinationGetContentQueryParams) => {
    return await client.post<IDestinationContentsRs>("local/Cms_DestList", {
      body: {
        requestObject: {
          ...queryParams,
        },
      },
      isAuth: true,
    });
  },
  updateCMSContent: async (payload: IDestinationContentPayload & { id: number }) => {
    return await client.post<IDestinationContentRs>("local/Cms_DestList_Edit", {
      body: {
        requestObject: {
          ...payload,
        },
      },
      isAuth: true,
    });
  },
};
