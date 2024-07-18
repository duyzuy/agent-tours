import React, { useCallback, useState, memo, useMemo, useEffect, useLayoutEffect } from "react";
import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  MouseSensor,
  useSensor,
  TouchSensor,
  useSensors,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  DragOverEvent,
  UniqueIdentifier,
  pointerWithin,
  DragMoveEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { isUndefined } from "lodash";
import { IMenuItem, MenuPositionType } from "@/models/management/cms/menu.interface";
import { LangCode } from "@/models/management/cms/language.interface";
import MenuSortableContainer from "./MenuSortableContainer";
import MenuItemSortable, { MenuItemSortableProps } from "./MenuItemSortable";
import DrawerMenuItem from "../../../_components/DrawerMenuItem";
import { Button } from "antd";

export interface DndMenuContainerProps {
  items: IMenuItem[];
  menuKey: MenuPositionType;
  lang: LangCode;
  onDelete?: MenuItemSortableProps["onDelete"];
  onUpdateSortList?: (items: IMenuItem[]) => void;
  loading?: boolean;
}
const DndMenuContainer: React.FC<DndMenuContainerProps> = ({
  items,
  menuKey,
  lang,
  onDelete,
  onUpdateSortList,
  loading,
}) => {
  const [editItem, setEditItem] = useState<{ data: IMenuItem; depth?: number } | undefined>();
  const [activeItem, setActiveItem] = useState<IMenuItem | undefined>();
  const [itemList, setItemList] = useState<IMenuItem[]>(() => items);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),

    useSensor(MouseSensor, {
      // Require the mouse to move by 10 pixels before activating
      activationConstraint: {
        distance: 10,
        delay: 250,
      },
    }),
    useSensor(TouchSensor, {
      // Press delay of 250ms, with tolerance of 5px of movement
      activationConstraint: {
        delay: 250,
        tolerance: 5,
      },
    }),
  );

  const onEditMenuItem: Required<MenuItemSortableProps>["onEdit"] = useCallback((item, depth) => {
    setEditItem({ data: item, depth: depth });
  }, []);

  const onCancelEditMenuItem = useCallback(() => {
    setEditItem(undefined);
  }, []);

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    const activeItem = itemList.find((item) => item.id === active.id);
    setActiveItem(activeItem);
  };
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    const {
      id: activeId,
      data: { current },
    } = active;
    console.log(active, over);
    if (over && activeId !== over?.id) {
      setItemList((oldItems) => {
        const oldIndex = oldItems.findIndex((item) => item.id === activeId);
        const newIndex = oldItems.findIndex((item) => item.id === over.id);

        return arrayMove(itemList, oldIndex, newIndex);
      });
    }
    setActiveItem(undefined);
  };

  const checkItemHasChild = (activeId: UniqueIdentifier, overId: UniqueIdentifier) => {
    const childOfActivetems = itemList.filter((pItem) => pItem.parentId === activeId);

    const checkChildren = (items: IMenuItem[], overId: UniqueIdentifier) => {
      let isExists = false;

      for (let i = 0; i < items.length; i++) {
        if (items[i].id === overId) {
          isExists = true;
          break;
        } else {
          const childs = itemList.filter((pItem) => pItem.parentId === items[i].id);
          if (childs.length) {
            const isExistChild = checkChildren(childs, overId);
            if (isExistChild === true) {
              isExists = true;
              break;
            }
          }
        }
      }
      return isExists;
    };

    if (!childOfActivetems.length) {
      return false;
    } else {
      return checkChildren(childOfActivetems, overId);
    }
  };
  const handleDragOver = useCallback((event: DragOverEvent) => {
    const { active, over, delta } = event;

    const { id: activeId } = active;
    if (!over) {
      return;
    }

    /**
     * check if active items has child over item will return
     */
    if (checkItemHasChild(active.id, over.id)) {
      return;
    }

    const overId = over.id;

    setItemList((oldItems) => {
      const activeIndexRoot = oldItems.findIndex((item) => item.id === activeId);

      let updateItem = [...oldItems];

      if (activeId !== overId) {
        if (delta.x > 30) {
          updateItem.splice(activeIndexRoot, 1, {
            ...oldItems[activeIndexRoot],
            parentId: overId as number,
          });
        } else {
          const overOItem = oldItems.find((item) => item.id === overId);

          /**
           * update parentId
           */
          updateItem.splice(activeIndexRoot, 1, {
            ...oldItems[activeIndexRoot],
            parentId: overOItem ? overOItem.parentId : 0,
          });
        }

        const oldIndexActiveItemInRoot = updateItem.findIndex((item) => item.id === activeId);
        const oldOverIndexItemInRoot = updateItem.findIndex((item) => item.id === overId);

        updateItem = arrayMove(updateItem, oldIndexActiveItemInRoot, oldOverIndexItemInRoot);
      }

      return updateItem;
    });
  }, []);

  const getItemList = (parentId?: number) => {
    if (isUndefined(parentId)) {
      return itemList.filter((item) => item.parentId === 0);
    }
    return itemList.filter((item) => item.parentId === parentId);
  };

  const renderDragOver = (activeItem: IMenuItem) => {
    if (getItemList(activeItem.id) && getItemList(activeItem.id).length) {
      return <MenuSortableContainer item={activeItem} key={activeItem.id} getItemList={getItemList} depth={0} />;
    } else {
      return <MenuItemSortable data={activeItem} key={activeItem.id} />;
    }
  };

  const onUpdateList = () => {
    let sortedItemList = [...itemList];
    sortedItemList.forEach((item, _index) => {
      sortedItemList.splice(_index, 1, {
        ...sortedItemList[_index],
        order: _index + 1,
      });
    });

    onUpdateSortList?.(sortedItemList);
  };

  const enableSubmitButton = useMemo(() => {
    if (itemList.length === items.length) {
      return items.some(
        (rootItem, _index) => rootItem.id !== itemList[_index].id || rootItem.parentId !== itemList[_index].parentId,
      );
    }
    return false;
  }, [itemList, items]);

  useEffect(() => {
    setItemList(() => items);
  }, [items]);
  return (
    <>
      <DndContext
        sensors={sensors}
        collisionDetection={pointerWithin}
        onDragEnd={handleDragEnd}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}

        // measuring={{
        //   droppable: {
        //     strategy: MeasuringStrategy.Always,
        //   },
        // }}
      >
        <SortableContext
          id={`root-menu-${menuKey}-${lang}`}
          items={getItemList()}
          strategy={verticalListSortingStrategy}
        >
          {getItemList().map((mItem) => {
            if (getItemList(mItem.id).length) {
              return (
                <MenuSortableContainer
                  key={mItem.id}
                  depth={0}
                  isContainer={true}
                  item={mItem}
                  onDelete={onDelete}
                  getItemList={getItemList}
                  onEdit={onEditMenuItem}
                />
              );
            } else {
              return (
                <MenuItemSortable
                  key={mItem.id}
                  data={mItem}
                  isContainer={false}
                  depth={0}
                  onDelete={onDelete}
                  onEdit={onEditMenuItem}
                />
              );
            }
          })}
        </SortableContext>
        <DragOverlay adjustScale={false}>{activeItem ? renderDragOver(activeItem) : null}</DragOverlay>
      </DndContext>
      <DrawerMenuItem
        initialValues={editItem}
        onClose={onCancelEditMenuItem}
        isOpen={!isUndefined(editItem)}
        menuPosition={menuKey}
        lang={lang}
      />
      <div className="footer pt-6 mt-6 border-t">
        <Button
          type="primary"
          htmlType="button"
          className="bg-primary-default"
          onClick={onUpdateList}
          disabled={!enableSubmitButton}
          loading={loading}
        >
          Lưu menu
        </Button>
      </div>
    </>
  );
};
export default memo(DndMenuContainer);
