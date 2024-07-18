import { BaseResponse } from "@/models/common.interface";
import { LangCode } from "./language.interface";

export type MenuPositionType = "primary" | "secondary" | "footer";
export type MenuType = "custom" | "templateType" | "";
export type MenuObjectType = "custom" | "page" | "tour" | "cmsTemplate" | "visaTemplate" | "destination" | "";

export interface IMenuItem {
  cat: "cms_frontendMenu_item";
  type: "cms_frontendMenu";
  id: number;
  parentId: number;
  menuPosition: MenuPositionType;
  lang: LangCode;
  slug: string;
  menuType: MenuType;
  name: string;
  thumb: string;
  icon: string;
  objectType: MenuObjectType;
  description: string;
  objectId: number;
  objectSlug: string;
  isMega: boolean;
  order: number;
  children: IMenuItem[] | null;
}

// export interface IMenuItem {
//   id: number;
//   menu_order: number;
//   menu_item_parent: number;
//   title: string;
//   type_label: string;
//   description: string;
//   object_id: number;
//   type: "taxonomy" | "post_type" | "custom";
//   object:
//       | "custom"
//       | "post"
//       | "product_cat"
//       | "category"
//       | "product_brand"
//       | "product";
//   object_slug: string;
//   object_src: string | null;
//   child_items: IMenuItem[];
//   menu_thumbnail: string | null;
// }

export interface MenuItemPayload {
  parentId?: number;
  menuPosition?: MenuPositionType;
  lang?: LangCode;
  slug?: string;
  menuType?: MenuType;
  name?: string;
  thumb?: string;
  icon?: string;
  excerpt?: string;
  objectType?: MenuObjectType;
  description?: string;
  objectId?: number;
  objectSlug?: string;
  isMega?: boolean;
  order?: number;
}

export class MenuItemFormData implements MenuItemPayload {
  parentId?: number;
  menuPosition?: MenuPositionType;
  lang?: LangCode;
  slug?: string;
  menuType?: MenuType;
  name?: string;
  thumb?: string;
  icon?: string;
  objectType?: MenuObjectType;
  description?: string;
  objectId?: number;
  objectSlug?: string;
  isMega?: boolean;
  order?: number;

  constructor(
    parentId: number | undefined,
    menuPosition: MenuPositionType,
    lang: LangCode | undefined,
    slug: string | undefined,
    menuType: MenuType,
    name: string | undefined,
    thumb: string | undefined,
    icon: string | undefined,
    objectType: MenuObjectType,
    description: string | undefined,
    objectId: number | undefined,
    objectSlug: string | undefined,
    isMega: boolean | undefined,
    order: number | undefined,
  ) {
    this.parentId = parentId;
    this.menuPosition = menuPosition;
    this.lang = lang;
    this.slug = slug;
    this.menuType = menuType;
    this.name = name;
    this.thumb = thumb;
    this.objectType = objectType;
    this.description = description;
    this.objectId = objectId;
    this.objectSlug = objectSlug;
    this.isMega = isMega;
    this.order = order;
    this.icon = icon;
  }
}
export interface MenuListResponse extends BaseResponse<IMenuItem[]> {}
export interface MenuItemResponse extends BaseResponse<IMenuItem> {}
