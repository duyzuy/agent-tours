import { client } from "@/services/api";
import { LangCode } from "@/models/management/cms/language.interface";
import {
  IMenuItem,
  MenuItemPayload,
  MenuItemResponse,
  MenuListResponse,
  MenuPositionType,
} from "@/models/management/cms/menu.interface";

export const menuAPIs = {
  create: async (payload: MenuItemPayload) => {
    return await client.post<MenuItemResponse>("local/cms_frontendMenu_Addnew", {
      isAuth: true,
      body: {
        requestObject: {
          ...payload,
        },
      },
    });
  },
  updateItem: async (payload: MenuItemPayload & { id: number }) => {
    return await client.post<MenuItemResponse>("local/cms_frontendMenu_Edit", {
      isAuth: true,
      body: {
        requestObject: {
          ...payload,
        },
      },
    });
  },
  updateList: async (items: IMenuItem[]) => {
    return await client.post<MenuItemResponse>("local/cms_frontendMenu_Update", {
      isAuth: true,
      body: {
        requestObject: {
          menuItems: [...items],
        },
      },
    });
  },
  getList: async (payload: { menuPosition: MenuPositionType; lang: LangCode }) => {
    return await client.post<MenuListResponse>("local/cms_frontendMenu_List", {
      isAuth: true,
      body: {
        requestObject: {
          ...payload,
        },
        orderBy: {
          sortColumn: "id",
          direction: "asc",
        },
      },
    });
  },
  delete: async (id: number) => {
    return await client.post<MenuItemResponse>("local/Cms_Delete", {
      isAuth: true,
      body: {
        requestObject: {
          cat: "cms_frontendMenu_item",
          type: "cms_frontendMenu",
          recId: id,
        },
      },
    });
  },
};
