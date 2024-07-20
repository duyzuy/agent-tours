import { ObjectSchema, object, string, number, array } from "yup";
import { IDestinationContentPayload, IDestinationPayload } from "@/models/management/region.interface";
import { LocalSearchFormData } from "@/models/management/localSearchDestination.interface";
import { LangCode } from "@/models/management/cms/language.interface";

const vietnameseNamePattern =
  /^[a-zA-Z0-9ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀẾỂưăạảấầẩẫậắằẳẵặẹẻẽềếểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s ]+$/;

export const destinationContentSchema: ObjectSchema<IDestinationContentPayload> = object({
  id: number(),
  title: string()
    .required("Tiêu đề không được để trống.")
    .matches(vietnameseNamePattern, "Tên thư mục không được chứa ký tự đặc biệt."),
  codeKey: string().required("Vui lòng chọn nhóm điểm đến."),
  descriptions: string().default(""),
  shortDescriptions: string().default(""),
  thumbnail: object({
    id: number().required("Thiếu ID thumbnail"),
  }).required("Ảnh đại diện không bỏ trống."),
  images: array()
    .of(
      object({
        id: number().required("Thiếu ID thumbnail"),
      }),
    )
    .default([]),
  metaTitle: string(),
  metaDescription: string(),
  metaKeyword: string(),
  slug: string().required("Đường dẫn không bỏ trống."),
  lang: string()
    .oneOf<IDestinationContentPayload["lang"]>([LangCode.VI, LangCode.EN])
    .required("Ngôn ngữ không bỏ trống"),
});
