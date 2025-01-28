import { ObjectSchema, object, string, number } from "yup";
import { MediaFolderCreateFormData, MediaFolderUpdateFormData } from "./media.interface";

const vietnameseNamePattern =
  /^[a-zA-Z0-9ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀẾỂưăạảấầẩẫậắằẳẵặẹẻẽềếểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s]+$/;

export const mediaFolderUpdateSchema: ObjectSchema<MediaFolderUpdateFormData> = object({
  id: number().required("Thếu ID Folder."),
  folderName: string()
    .required("Tên thư mục không để trống.")
    .matches(vietnameseNamePattern, "Tên thư mục không được chứa ký tự đặc biệt.")
    .max(30, "Tên thư mục không quá 20 ký tự."),
  parent: number().default(0),
  key: string(),
});

export const mediaFolderCreateSchema: ObjectSchema<MediaFolderCreateFormData> = object({
  folderName: string()
    .required("Tên thư mục không để trống.")
    .matches(vietnameseNamePattern, "Tên thư mục không được chứa ký tự đặc biệt.")
    .max(30, "Tên thư mục không quá 20 ký tự."),
  folderSlug: string().required("Slug folder không để trống."),
  parentSlug: string().default(""),
  folderPath: string().required("Thiếu folder path."),
  parent: number().default(0),
  oldFolderName: string(),
});
