import React, { forwardRef, memo, useCallback, useEffect, useMemo, useState } from "react";
import MenuItemSortable, { MenuItemSortableProps } from "./MenuItemSortable";
import { IMenuItem, MenuObjectType, MenuPositionType } from "@/models/management/cms/menu.interface";

import { SortableContext, horizontalListSortingStrategy } from "@dnd-kit/sortable";

interface MenuSortableContainerProps {
  depth: number;
  onDelete?: MenuItemSortableProps["onDelete"];
  onEdit?: MenuItemSortableProps["onEdit"];
  getItemList?: (parentId?: number) => IMenuItem[];

  item: IMenuItem;
  isContainer?: boolean;
  // name: string;
  // itemId: number;
}

const MenuSortableContainer: React.FC<MenuSortableContainerProps> = ({
  depth,
  item,
  onEdit,
  getItemList,
  onDelete,

  isContainer,
  // name,
  // itemId,
}) => {
  const itemList = getItemList?.(item.id) || [];

  // console.log("Menu Sortable container", depth);
  return (
    <MenuItemSortable
      data={item}
      // name={name}
      // itemId={itemId}
      // objectType={objectType}

      className={depth !== 0 ? "ml-[60px]" : ""}
      isContainer={isContainer}
      depth={depth}
      onEdit={onEdit}
    >
      {itemList.length ? (
        // <DropableContainer id={itemId} depth={depth}></DropableContainer>
        <SortableContext items={itemList} strategy={horizontalListSortingStrategy}>
          {itemList.map((item, _index) => {
            if (getItemList?.(item.id).length) {
              return (
                <MenuSortableContainer
                  key={item.id}
                  item={item}
                  // name={item.name}
                  // itemId={item.id}
                  getItemList={getItemList}
                  depth={depth + 1}
                  isContainer={true}
                  onDelete={onDelete}
                  onEdit={onEdit}
                />
              );
            } else {
              return (
                <MenuItemSortable
                  key={item.id}
                  data={item}
                  // name={item.name}
                  // itemId={item.id}
                  // objectType={item.objectType}

                  className="ml-[60px]"
                  isContainer={false}
                  depth={depth + 1}
                  onDelete={onDelete}
                  onEdit={onEdit}
                />
              );
            }
          })}
        </SortableContext>
      ) : null}
    </MenuItemSortable>
  );
};
export default memo(MenuSortableContainer);
