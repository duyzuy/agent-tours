"use server";
import { serverRequest } from "@/services/serverApi";
import { LangCode } from "@/models/management/cms/language.interface";
import { VisaDetailsByLangResponse } from "@/models/fe/visa.interface";
import { BaseResponse } from "@/models/common.interface";

// type GetBy = "slug" | "id";
// type PayloadVisaDetailById = {
//   getBy: "id";
//   id: number;
// };
// type PayloadVisaDetailBySlug = {
//   getBy: "slug";
//   lang: LangCode;
//   slug: string;
// };
// type PayloadVisa = PayloadVisaDetailBySlug | PayloadVisaDetailById;

// export const getVisaTemplateDetails = async (payload?: PayloadVisa) => {
//   return await serverRequest.post<VisaDetailsByLangResponse, BaseResponse<null>>(
//     "localfront/getCms_visatemplateDetails",
//     {
//       next: { tags: ["visaContent"] },
//       cache: "no-store",
//       params: {
//         requestObject: {
//           lang: payload?.getBy === "slug" ? payload.lang : undefined,
//           slug: payload?.getBy === "slug" ? payload.slug : undefined,
//           id: payload?.getBy === "id" ? payload.id : undefined,
//         },
//       },
//     },
//   );
// };

export const getVisaTemplateDetail = async (payload?: { lang?: LangCode; slug?: string; id?: number }) => {
  return await serverRequest.post<VisaDetailsByLangResponse, BaseResponse<null>>(
    "localfront/getCms_visatemplateDetails",
    {
      next: { tags: ["visaContent"] },
      cache: "no-store",
      params: {
        requestObject: {
          lang: payload?.lang,
          slug: payload?.slug,
          id: payload?.id,
        },
      },
    },
  );
};
