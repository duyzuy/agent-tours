import { ObjectSchema, object, string, array, number, mixed } from "yup";

import { LeadingFormData } from "../modules/leading.interface";
import { LeadingSource, LeadingStatus } from "@/models/management/leading.interface";

export const leadingSchema: ObjectSchema<LeadingFormData> = object({
  recId: number(),
  phone: string().required("Số điện thoại không bỏ trống."),
  paxName: string(),
  remark: string(),
  status: string()
    .oneOf<LeadingStatus>(["BLACKLIST", "CALLBACKLATER", "LOSS", "NEW", "NORESPONSE", "WIN"])
    .required("Trạng thái không hợp lệ."),
  source: string()
    .oneOf<LeadingSource>([
      "FACEBOOK",
      "FLYER",
      "NEW",
      "NEWSPAPER",
      "OTHER",
      "POSTER",
      "RETURNED",
      "TELESALE",
      "TIKTOK",
      "ZALO",
    ])
    .required("Trạng thái không hợp lệ."),
});
