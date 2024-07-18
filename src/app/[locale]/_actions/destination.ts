"use server";
import { unstable_noStore } from "next/cache";
import { serverRequest } from "@/services/serverApi";
import { LangCode } from "@/models/management/cms/language.interface";
import { BaseResponse } from "@/models/common.interface";
import {
  FeDestinationContentDetailResponse,
  FeDestinationContentListResponse,
  FeDestinationContentQueryParams,
} from "@/models/fe/destination.interface";

export const getDestinationContentList = async (queryParams?: FeDestinationContentQueryParams) => {
  unstable_noStore();
  const response = await serverRequest.post<FeDestinationContentListResponse, BaseResponse<null>>(
    "localfront/getCms_destList_frontend",
    {
      next: { tags: ["feDestinationcontent"], revalidate: 0 },
      params: {
        ...queryParams,
      },
    },
  );
  return response?.result;
};

export const getDestinationContentDetail = async ({ slug, lang }: { slug: string; lang: LangCode }) => {
  unstable_noStore();
  const response = await serverRequest.post<FeDestinationContentDetailResponse, BaseResponse<null>>(
    "localfront/getCms_destListDetails_frontend",
    {
      next: { tags: ["feDestinationContentDetail"], revalidate: 0 },
      params: {
        requestObject: {
          slug: slug,
          lang: lang,
        },
      },
    },
  );
  return response?.result;
};
