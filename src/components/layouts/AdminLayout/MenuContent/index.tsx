"use client";
import MenuList from "./MenuList";
import { MenuItemTypeWithRole } from "../menuConfig";
import { TRoleCondition } from "@/constants/permission.constant";
import { useAdminPermission } from "@/modules/admin/auth/store/AdminPermissionContext";

interface MenuContentProps {
  items?: MenuItemTypeWithRole[];
}
const MenuContent: React.FC<MenuContentProps> = ({ items = [] }) => {
  const [_, checkPermession] = useAdminPermission();

  const adminMenuMappingRule = mappingRolePermission(items, checkPermession);

  return <MenuList items={adminMenuMappingRule} defaultSelectedKeys={["dashboard"]} />;
};
export default MenuContent;

const mappingRolePermission = (items: MenuItemTypeWithRole[], checkPermession: (conds: TRoleCondition) => boolean) => {
  return items.reduce<MenuItemTypeWithRole[]>((acc, item) => {
    const childItems = item.children?.reduce<MenuItemTypeWithRole[]>((accChilItems, childItem) => {
      if (!childItem.rolepers || (childItem.rolepers && checkPermession(childItem.rolepers))) {
        accChilItems = [...accChilItems, childItem];
      }
      return accChilItems;
    }, []);

    if (!item.rolepers || (item.rolepers && checkPermession(item.rolepers))) {
      acc = [...acc, { ...item, children: childItems }];
    }
    return acc;
  }, []);
};
