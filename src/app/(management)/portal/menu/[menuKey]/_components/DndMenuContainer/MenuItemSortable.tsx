import { memo } from "react";
import { IMenuItem } from "@/models/management/cms/menu.interface";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import MenuItem from "@/components/admin/menu/MenuItem";

export interface MenuItemSortableProps {
  data: IMenuItem;
  onDelete?: (id: number) => void;
  onCancel?: () => void;
  children?: React.ReactNode;
  className?: string;
  isContainer?: Boolean;
  depth?: number;
  onEdit?: (data: IMenuItem, depth?: number) => void;
  // name: string;
  // itemId: number;
  // objectType: MenuObjectType;
}
const MenuItemSortable: React.FC<MenuItemSortableProps> = (
  { onDelete, onEdit, children, className = "", isContainer, data, depth }, // objectType,
) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: data.id,
    data: {
      type: isContainer ? "container" : "item",
      depth: depth,
    },
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <MenuItem
      attributes={attributes}
      data={data}
      // itemId={itemId}
      // name={name}
      depth={depth}
      listeners={listeners}
      dragging={isDragging}
      ref={setNodeRef}
      className={className}
      style={style}
      onDelete={onDelete}
      onEdit={onEdit}
    >
      {children}
    </MenuItem>
  );
};
export default memo(MenuItemSortable);
