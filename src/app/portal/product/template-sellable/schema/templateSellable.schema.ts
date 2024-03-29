import { object, string, ObjectSchema, number, array } from "yup";

import { EInventoryType } from "@/models/management/core/inventoryType.interface";
import { EProductType } from "@/models/management/core/productType.interface";
import { Status } from "@/models/management/common.interface";
import { TemplateSellableFormData } from "../modules/templateSellable.interface";
import { IDestination } from "@/models/management/region.interface";

export const templateSellableSchema: ObjectSchema<TemplateSellableFormData> =
    object({
        cmsIdentity: string().required("Template CMS không bỏ trống."),
        type: string()
            .oneOf<EProductType>([EProductType.EXTRA, EProductType.TOUR])
            .required("Loại sản phẩm không bỏ trống."),
        code: string().required("Code không bỏ trống"),
        name: string().required("Tên template không bỏ trống."),
        destListJson: array()
            .of(
                object<IDestination>().shape({
                    cat: string()
                        .oneOf<IDestination["cat"]>(["DESTLIST"])
                        .required("Cat không bỏ trống"),
                    id: number().required(),
                    codeKey: string().required(),
                    codeName: string().required(),
                    status: string()
                        .oneOf<Status>([
                            Status.OK,
                            Status.QQ,
                            Status.XX,
                            Status.OX,
                        ])
                        .required("Trạng thái không bỏ trống."),
                    listStateProvince: array().required().default([]),
                }),
            )
            .min(1, "Nhóm điểm đến không bỏ trống")
            .default([]),
        inventoryTypeList: array<EInventoryType[]>()
            .required("Loại inventory không bỏ trống.")
            .default([]),
        status: string()
            .oneOf<Status>([Status.OK, Status.QQ, Status.XX, Status.OX])
            .required("Trạng thái không bỏ trống."),
    });
