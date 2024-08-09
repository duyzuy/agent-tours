import { ObjectSchema, object, string, number, array } from "yup";
import { IDestinationContentPayload, IDestinationPayload } from "@/models/management/region.interface";
import { LocalSearchFormData } from "@/models/management/localSearchDestination.interface";
import { LangCode } from "@/models/management/cms/language.interface";
import { TravelInformationNoticeData } from "../modules/travelInformationNotice";
import { PageContentStatus } from "@/models/management/cms/pageContent.interface";

const vietnameseNamePattern =
  /^[a-zA-Z0-9ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀẾỂưăạảấầẩẫậắằẳẵặẹẻẽềếểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s ]+$/;

export const noticeInformationSchema: ObjectSchema<TravelInformationNoticeData> = object({
  id: number(),
  originId: number(),
  name: string().required("Tiêu đề không được để trống."),
  descriptions: string().default(""),
  country: object({
    keyType: string().oneOf<"REGIONLIST" | "SUBREGIONLIST" | "COUNTRYLIST" | "STATEPROVINCELIST">([
      "COUNTRYLIST",
      "REGIONLIST",
      "STATEPROVINCELIST",
      "SUBREGIONLIST",
    ]),
    countryKey: string(),
    countryName: string(),
    regionKey: string(),
    subRegionKey: string(),
    stateProvinceKey: string(),
  }).required("Ảnh đại diện không bỏ trống."),
  status: string()
    .oneOf<PageContentStatus>([PageContentStatus.PUBLISH, PageContentStatus.UNPUBLISH])
    .required("Ngôn ngữ không bỏ trống"),
  lang: string().oneOf<LangCode>([LangCode.VI, LangCode.EN]).required("Ngôn ngữ không bỏ trống"),
});
// recId: number;
// cat: "REGIONLIST" | "SUBREGIONLIST" | "COUNTRYLIST" | "STATEPROVINCELIST";
// countryKey: string;
// countryName: string;
// regionKey: string;
// stateProvinceKey: string;
// subRegionKey: string;
