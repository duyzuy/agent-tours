import {
    object,
    string,
    ObjectSchema,
    StringSchema,
    boolean,
    number,
    array,
    date,
} from "yup";
import { IInventoryPayload } from "@/models/management/core/inventory.interface";
import { EInventoryType } from "@/models/management/core/inventoryType.interface";
import { EProductType } from "@/models/management/core/productType.interface";
import { Status } from "@/models/management/common.interface";
import {
    StockInventoryConfirmFormData,
    StockInventoryAdjustFormData,
    StockInventoryFormData,
} from "@/models/management/core/stockInventory.interface";
import ExploreSection from "@/app/[locale]/_components/ExploreSection";
import { ITemplateSellablePayload } from "@/models/management/core/templateSellable.interface";
import { IDestination } from "@/models/management/region.interface";

export const inventorySchema: ObjectSchema<IInventoryPayload> = object({
    cmsIdentity: string().default(""),
    // isCreate: boolean().default(true),
    // type: string().when("isCreate", {
    //     is: true,
    //     then: (schema) =>
    //         schema
    //             .oneOf<IInventoryPayload["type"]>([
    //                 EInventoryType.AIR,
    //                 EInventoryType.GUIDE,
    //                 EInventoryType.HOTEL,
    //                 EInventoryType.INSURANCE,
    //                 EInventoryType.LANDPACKAGE,
    //                 EInventoryType.RESTAURANT,
    //                 EInventoryType.TRANSPORT,
    //                 EInventoryType.VISA,
    //             ])
    //             .required("Type không bỏ trống"),
    //     otherwise: (schema) => schema.optional(),
    // }),
    type: string()
        .oneOf<IInventoryPayload["type"]>([
            EInventoryType.AIR,
            EInventoryType.GUIDE,
            EInventoryType.HOTEL,
            EInventoryType.INSURANCE,
            EInventoryType.LANDPACKAGE,
            EInventoryType.RESTAURANT,
            EInventoryType.TRANSPORT,
            EInventoryType.VISA,
        ])
        .required("Type không bỏ trống."),
    code: string().required("Code không bỏ trống."),
    name: string().required("Tên không bỏ trống."),
    productType: string()
        .oneOf<IInventoryPayload["productType"]>([
            EProductType.EXTRA,
            EProductType.TOUR,
        ])
        .required("ProductType không bỏ trống."),
    isStock: boolean().default(false),
    status: string()
        .oneOf<IInventoryPayload["status"]>([
            Status.OK,
            Status.QQ,
            Status.XX,
            Status.OX,
        ])
        .required("Trạng thái không bỏ trống."),
});

export const inventoryUpdateSchema: ObjectSchema<{ name: string }> = object({
    name: string().required("Tên không bỏ trống."),
});

/**
 *
 * Stock Schema
 *
 */

export const stockSchema: ObjectSchema<StockInventoryFormData> = object({
    inventoryId: number().required("inventoryId Bị thiếu."),
    isCreateSeries: boolean().default(false),
    type: string().required("Type không bỏ trống."),
    code: string().required("Code không bỏ trống."),
    description: string().required("Mô tả không bỏ trống."),
    cap: number()
        .required("Số lượng không bỏ trống.")
        .min(1, "Tối thiểu lớn hơn 1."),
    valid: string().required("Không bỏ trống"),
    validTo: string().required("Không bỏ trống"),
    start: string().required("Không bỏ trống"),
    end: string().required("Không bỏ trống"),
    fromValidTo: string().when("isCreateSeries", {
        is: true,
        then: (schema) => schema.required("Ngày kết thúc không bỏ trống."),
        otherwise: (schema) => schema.optional(),
    }),
    everyDayofweek: array().of(string().required()).default([]),
    //Sunday Monday Tuesday Wednesday Thursday Friday Saturday (global/us locale)
    repeatAfter: number().default(0),
    exclusives: array()
        .when("isCreateSeries", {
            is: true,
            then: (schema) =>
                schema.of(
                    object({
                        // from: date()
                        //     .transform(function (value, originalValue) {
                        //         if (this.isType(value)) {
                        //             return value;
                        //         }
                        //         console.log(value);
                        //         // const result = parse(originalValue, "dd.MM.yyyy", new Date());
                        //         return originalValue;
                        //     })
                        //     .required("Không bỏ trống."),
                        from: string().required("Chọn ngày bắt đầu."),
                        to: string().required("Chọn ngày kết thúc."),
                    }),
                ),
            otherwise: (schema) => schema.optional(),
        })
        .default([]),
});

export const stockConfirmSchema: ObjectSchema<StockInventoryConfirmFormData> =
    object({
        recId: number().required("recId Bị thiếu."),
        cap: number()
            .required("Số lượng không bỏ trống.")
            .positive()
            .integer("Không phải là số.")
            .min(1, "Số lượng tối thiểu lớn hơn 1."),
        description: string().required("Mô tả không bỏ trống"),
        valid: string().required("Không bỏ trống").defined(),
        validTo: string().required("Không bỏ trống").defined(),
        start: string().required("Không bỏ trống").defined(),
        end: string().required("Không bỏ trống").defined(),
    });

export const stockAdjustSchema: ObjectSchema<StockInventoryAdjustFormData> =
    object({
        inventoryStockId: number().required("inventoryStockId Bị thiếu."),
        quantity: number()
            .positive("Phải là số")
            .required("Số lượng không bỏ trống."),
        rmk: string().required("Mô tả không bỏ trống"),
    });

/**
 *
 * Template Sellable
 *
 */

export const templateSellableSchema: ObjectSchema<ITemplateSellablePayload> =
    object({
        cmsIdentity: string().required("Template CMS không bỏ trống."),
        type: string().required("Loại sản phẩm không bỏ trống"),
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
        inventoryTypeList: string().required("Loại inventory không bỏ trống."),
        status: string()
            .oneOf<Status>([Status.OK, Status.QQ, Status.XX, Status.OX])
            .required("Trạng thái không bỏ trống."),
    });