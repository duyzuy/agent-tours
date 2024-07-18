// import { LINKS } from "@/constants/links";
// import { IMenuItem } from "@/models/menu";
// export const getPrefixPath = (objType: IMenuItem["object"], slug: string) => {
//     if (objType === "post") {
//         return `/${LINKS.post}/${slug}`;
//     }
//     if (objType === "category") {
//         return `/${LINKS.category}/${slug}`;
//     }
//     if (objType === "product_brand") {
//         return `/${LINKS.brand}/${slug}`;

//     }
//     if (objType === "product_cat") {
//         return `/${LINKS.productCategory}/${slug}`;
//     }
//     if (objType === "product") {
//         return `/${LINKS.product}/${slug}`;
//     }

//     return slug;
// };

import { IMenuItem } from "@/models/management/cms/menu.interface";

export type MenuItemType = Omit<IMenuItem, "cat" | "type" | "menuPosition" | "children"> & {
  children: MenuItemType[];
};

export const getMenuListFomatedTypes = (items: IMenuItem[]) => {
  return items.reduce<MenuItemType[]>((acc, item) => {
    let childItems: MenuItemType[] = [];
    if (item.children !== null && item.children.length) {
      childItems = getMenuListFomatedTypes(item.children);
    }
    let menuSlug = "";

    if (item.menuType === "templateType") {
      if (item.objectType === "cmsTemplate") {
        menuSlug = ["template", item.objectSlug].join("/");
      }
      if (item.objectType === "destination") {
        menuSlug = ["destination", item.objectSlug].join("/");
      }

      if (item.objectType === "page") {
        menuSlug = ["page", item.objectSlug].join("/");
      }

      if (item.objectType === "tour") {
        menuSlug = ["tour", item.objectSlug].join("/");
      }
      if (item.objectType === "visaTemplate") {
        menuSlug = ["visa", item.objectSlug].join("/");
      }
    }
    if (item.menuType === "custom") {
      if (item.objectType === "custom") {
        menuSlug = item.slug;
      }
    }
    acc = [
      ...acc,
      {
        ...item,
        slug: menuSlug,
        children: childItems || [],
      },
    ];
    return acc;
  }, []);
};
