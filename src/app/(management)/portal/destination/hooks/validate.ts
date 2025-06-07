import { ObjectSchema, object, string, number, array } from "yup";
import { IDestinationContentPayload, IDestinationPayload } from "@/models/management/region.interface";
import { Status } from "@/models/common.interface";
import { LocalSearchFormData } from "@/models/management/localSearchDestination.interface";

const vietnameseNamePattern =
  /^[a-zA-Z0-9ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀẾỂưăạảấầẩẫậắằẳẵặẹẻẽềếểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s ]+$/;

export const destinationSchema: ObjectSchema<IDestinationPayload> = object({
  codeName: string()
    .required("Tên thư mục không để trống.")
    .matches(vietnameseNamePattern, "Tên thư mục không được chứa ký tự đặc biệt.")
    .max(30, "Tên thư mục không quá 20 ký tự."),

  codeKey: string().required("Slug folder không để trống."),
  listStateProvince: array(
    object({
      recId: number().required("Id không bỏ trống"),
      cat: string()
        .oneOf<
          IDestinationPayload["listStateProvince"][0]["cat"]
        >(["REGIONLIST", "COUNTRYLIST", "STATEPROVINCELIST", "SUBREGIONLIST"])
        .required("cat không bỏ trống"),
      regionKey: string().required("RegionKey không bỏ trống."),
      countryKey: string().default(""),
      countryName: string().default(""),
      stateProvinceKey: string().default(""),
      subRegionKey: string().default(""),
    }),
  ).required("Vui lòng chọn tỉnh thành"),
  status: string()
    .oneOf<IDestinationPayload["status"]>([Status.OK, Status.OX, Status.XX])
    .required("Trạng thái không bỏ trống."),
});

export const localSearchSchema: ObjectSchema<LocalSearchFormData> = object({
  name: string()
    .required("Tên nhóm không để trống.")
    .matches(vietnameseNamePattern, "Tên nhóm không được chưa ký tự đặc biệt."),
  engName: string()
    .required("Tên nhóm không để trống.")
    .matches(vietnameseNamePattern, "Tên nhóm không được chưa ký tự đặc biệt."),
  regionKey: string(),
  subRegionKey: string(),
  keyType: string(),
  countryKey: string(),
  stateProvinceKey: string(),

  order: number()
    // .moreThan(0, "Chưa chọn ảnh đại diện.")
    .required("Số thứ tự không bỏ trống."),
  status: string().oneOf<"OK" | "OX" | "XX">(["OK", "OX", "XX"]).required("Status không bỏ trống."),
});
