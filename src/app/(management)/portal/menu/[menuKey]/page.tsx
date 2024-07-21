"use client";
import React, { useCallback, useMemo } from "react";
import { Empty } from "antd";
import { MENU_POSITION_LIST } from "@/constants/menu.constant";
import MenuPageWraper from "@/components/admin/menu/MenuPageWrapper";
import { IMenuItem, MenuPositionType } from "@/models/management/cms/menu.interface";
import { useMenuManagerSelector } from "../hooks/useMenuManager";
import useCRUDMenu from "../modules/useCRUDMenu";
import useUpdateList from "../modules/useUpdateList";
import { MenuItemSortableProps } from "./_components/DndMenuContainer/MenuItemSortable";
import DndMenuContainer, { DndMenuContainerProps } from "./_components/DndMenuContainer";
import useInitMenuPositionList from "../modules/useInitMenuPositionList";

interface Props {
  params: { menuKey: MenuPositionType };
}
const MenuPageType = ({ params }: Props) => {
  const { menuKey } = params;
  const { locale, menuPosition } = useMenuManagerSelector((state) => state);

  const menuListItem = useMemo(() => menuPosition[menuKey], [menuPosition, menuKey]);

  const { isLoading } = useInitMenuPositionList(menuKey, locale.key);

  const { onDelete } = useCRUDMenu();
  const { onUpdate: onUpdateListSortable, isPending } = useUpdateList();

  const isValidMenuPosition = useMemo(() => {
    return MENU_POSITION_LIST.some((item) => item.key === menuKey);
  }, []);

  /**
   *
   * Api update list after sort list
   *
   */
  const handleUpdateList: Required<DndMenuContainerProps>["onUpdateSortList"] = useCallback((items) => {
    onUpdateListSortable({ items: items, position: menuKey, lang: locale.key });
  }, []);

  /**
   *
   * @param itemId
   * Delete Menu item
   *
   */
  const handleDeleteItem: Required<MenuItemSortableProps>["onDelete"] = useCallback((recId) => {
    onDelete({ id: recId, position: menuKey, lang: locale.key });
  }, []);

  if (!isValidMenuPosition) {
    return null;
  }

  return (
    <MenuPageWraper
      menuName={
        menuKey === "primary"
          ? "Menu Chính"
          : menuKey === "secondary"
          ? "Menu secondary"
          : menuKey === "footer"
          ? "Menu footer"
          : menuKey === "footer-info"
          ? "Footer information"
          : menuKey === "mobile"
          ? "Mobile"
          : ""
      }
      loading={isLoading}
      // onSave={handleUpdateList}
    >
      {menuListItem.length ? (
        <DndMenuContainer
          items={menuListItem}
          menuKey={menuKey}
          lang={locale.key}
          onDelete={handleDeleteItem}
          onUpdateSortList={handleUpdateList}
          loading={isPending}
        />
      ) : (
        <Empty className="text-center max-w-xs" description={<span>Đang trống</span>} />
      )}
    </MenuPageWraper>
  );
};
export default MenuPageType;

const nestedAllChildToParentArr = (items: IMenuItem[], parentId = 0) => {
  const parentItems = items.filter((item) => item.parentId === parentId).sort((a, b) => a.order - b.order);

  const nestedItems = parentItems.reduce<IMenuItem[]>((acc, item, _index) => {
    const childs = nestedAllChildToParentArr(items, item.id);

    acc = [
      ...acc,
      {
        ...item,
        order: _index + 1,
        children: childs,
      },
    ];
    return acc;
  }, []);
  return nestedItems;
};
