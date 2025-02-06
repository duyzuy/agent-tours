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
      if (item.objectType === "category") {
        menuSlug = ["category", item.objectSlug].join("/");
      }

      if (item.objectType === "tag") {
        menuSlug = ["tag", item.objectSlug].join("/");
      }
      if (item.objectType === "post") {
        menuSlug = ["post", item.objectSlug].join("/");
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
        slug: item.objectType === "custom" ? menuSlug : `/${menuSlug}`,
        children: childItems || [],
      },
    ];
    return acc;
  }, []);
};
