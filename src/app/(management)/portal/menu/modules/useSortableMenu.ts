import { DragStartEvent, DragMoveEvent, DragEndEvent } from "@dnd-kit/core";
import useMenuManager from "../hooks/useMenuManager";
const useSortableMenu = () => {
  const [menuManager, dispatch] = useMenuManager();

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over?.id) {
      // setItemList((items) => {
      //   const oldIndex = items.findIndex((item) => item.id === active.id);
      //   const newIndex = items.findIndex((item) => item.id === over.id);
      //   return arrayMove(itemList, oldIndex, newIndex);
      // });
    }
    // setActiveItem(null);
  };
  const handleDragStart = (event: DragStartEvent) => {
    // const { active } = event;
    // const activeItem = itemList.find((item) => item.id === active.id);
    // activeItem && setActiveItem(activeItem);
  };
  const handleDragMove = (event: DragMoveEvent) => {
    const { active, over, delta, collisions } = event;

    // setItemList((items) => {
    //   let updateItems = [...items];
    //   if (over && active.id !== over?.id) {
    //     const oldIndex = items.findIndex((item) => item.id === active.id);
    //     const overIndex = items.findIndex((item) => item.id === over.id);
    //     if (delta.x > 100) {
    //       updateItems.splice(overIndex, 1, {
    //         ...items[overIndex],
    //         children: [...(items[overIndex].children || []), items[oldIndex]],
    //       });
    //     }
    //   } else {
    //   }

    //   return updateItems;
    // });

    console.log(event.delta);
  };

  return {
    handleDragEnd,
    handleDragStart,
    handleDragMove,
  };
};

export default useSortableMenu;
