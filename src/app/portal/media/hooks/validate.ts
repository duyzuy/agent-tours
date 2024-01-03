import { ObjectSchema, object, string, number } from "yup";

import {
    IMediaFilePayload,
    IMediaFolderPayload,
} from "@/models/management/media.interface";

const vietnameseNamePattern =
    /^[a-zA-Z0-9ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀẾỂưăạảấầẩẫậắằẳẵặẹẻẽềếểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s]+$/;

export const mediaFolderSchema: ObjectSchema<IMediaFolderPayload> = object({
    folderName: string()
        .required("Tên thư mục không để trống.")
        .matches(
            vietnameseNamePattern,
            "Tên thư mục không được chứa ký tự đặc biệt.",
        )
        .max(30, "Tên thư mục không quá 20 ký tự."),

    folderSlug: string().required("Slug folder không để trống."),
    parentSlug: string().default(""),
    folderPath: string().default("/uploads"),
    parent: number().default(0),
});
