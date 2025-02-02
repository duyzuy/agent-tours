import { ObjectSchema, object, string, number, boolean } from "yup";

import { MenuItemFormData, MenuObjectType, MenuPositionType, MenuType } from "@/models/management/cms/menu.interface";
import { LangCode } from "@/models/management/cms/language.interface";

export const updateMenuItemSchema: ObjectSchema<MenuItemFormData> = object({
  name: string().required("Tên menu không bỏ trống."),
  parentId: number(),
  menuPosition: string().oneOf<MenuPositionType>(["footer", "primary", "secondary", "footer-info", "mobile"]),
  lang: string().oneOf<LangCode>([LangCode.VI, LangCode.EN]),
  slug: string(),
  menuType: string().oneOf<MenuType>(["custom", "templateType"]),
  thumb: string(),
  icon: string(),
  objectType: string().oneOf<MenuObjectType>([
    "cmsTemplate",
    "custom",
    "destination",
    "page",
    "tour",
    "visaTemplate",
    "category",
    "post",
    "tag",
  ]),
  description: string(),
  objectId: number(),
  objectSlug: string(),
  isMega: boolean(),
  order: number(),
  typeName: string(),
});
