import { ObjectSchema, object, string, number, array } from "yup";
import {
    IDestinationContentPayload,
    IDestinationPayload,
} from "@/models/management/country.interface";

const vietnameseNamePattern =
    /^[a-zA-Z0-9ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀẾỂưăạảấầẩẫậắằẳẵặẹẻẽềếểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s ]+$/;

export const destinationSchema: ObjectSchema<IDestinationPayload> = object({
    codeName: string()
        .required("Tên thư mục không để trống.")
        .matches(
            vietnameseNamePattern,
            "Tên thư mục không được chứa ký tự đặc biệt.",
        )
        .max(30, "Tên thư mục không quá 20 ký tự."),

    codeKey: string().required("Slug folder không để trống."),
    listStateProvince: array(
        object({
            id: number().required("Id không bỏ trống"),
            cat: string()
                .oneOf<IDestinationPayload["listStateProvince"][0]["cat"]>([
                    "REGIONLIST",
                    "COUNTRYLIST",
                    "STATEPROVINCELIST",
                    "SUBREGIONLIST",
                ])
                .required("cat không bỏ trống"),
            regionKey: string().required("RegionKey không bỏ trống."),
            countryKey: string().default(""),
            countryName: string().default(""),
            stateProvinceKey: string().default(""),
            subRegionKey: string().default(""),
        }),
    ).required("Vui lòng chọn tỉnh thành"),
    status: string()
        .oneOf<IDestinationPayload["status"]>(["OK", "OX", "XX"])
        .required("Trạng thái không bỏ trống."),
});

export const destinationContentSchema: ObjectSchema<IDestinationContentPayload> =
    object({
        title: string()
            .required("Tiêu đề không được để trống.")
            .matches(
                vietnameseNamePattern,
                "Tên thư mục không được chứa ký tự đặc biệt.",
            ),
        codeKey: string().required("Vui lòng chọn nhóm điểm đến."),
        descriptions: string().default(""),
        shortDescriptions: string().default(""),
        thumb: number()
            // .moreThan(0, "Chưa chọn ảnh đại diện.")
            .required("Ảnh đại diện không bỏ trống."),
        slug: string().required("Đường dẫn không bỏ trống."),
        lang: string()
            .oneOf<IDestinationContentPayload["lang"]>(["vi", "en"])
            .required("Ngôn ngữ không bỏ trống"),
    });
