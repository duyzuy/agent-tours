"use client";
import MenuList from "./MenuList";
import { MenuItem } from "../menuConfig";
import { TRoleCondition } from "@/constants/permission.constant";
import { useAdminPermission } from "@/modules/admin/auth/store/AdminPermissionContext";

interface MenuContentProps {
  items?: MenuItem[];
}
const MenuContent: React.FC<MenuContentProps> = ({ items = [] }) => {
  const [_, checkPermession] = useAdminPermission();

  const adminMenuMappingRule = mappingRolePermission(items, checkPermession);

  return <MenuList items={adminMenuMappingRule} defaultSelectedKeys={["dashboard"]} />;
};
export default MenuContent;

const mappingRolePermission = (items: MenuItem[], checkPermession: (conds: TRoleCondition) => boolean) => {
  return items.reduce<MenuItem[]>((acc, item) => {
    const childItems = item.children?.reduce<MenuItem[]>((childItems, childItem) => {
      if (!childItem.rolepers) {
        childItems = [...childItems, childItem];
      }
      if (childItem.rolepers && checkPermession(childItem.rolepers)) {
        childItems = [...childItems, childItem];
      }
      return childItems;
    }, []);

    if (!item.rolepers) {
      acc = [...acc, { ...item, children: childItems }];
    }

    if (item.rolepers && checkPermession(item.rolepers)) {
      acc = [...acc, { ...item, children: childItems }];
    }
    return acc;
  }, []);
};
