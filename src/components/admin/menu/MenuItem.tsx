import { DraggableAttributes } from "@dnd-kit/core";
import { SyntheticListenerMap } from "@dnd-kit/core/dist/hooks/utilities";
import classNames from "classnames";
import React, { memo } from "react";
import { isUndefined } from "lodash";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import ModalDeleteConfirm from "./ModalDeleteConfirm";
import { useState } from "react";
import { IMenuItem } from "@/models/management/cms/menu.interface";
import { forwardRef } from "react";

interface MenuItemProps {
  className?: string;
  dragging?: boolean;
  attributes?: DraggableAttributes;
  listeners?: SyntheticListenerMap;
  data: IMenuItem;
  name?: string;
  itemId?: number;
  depth?: number;
  style?: React.CSSProperties;
  onDelete?: (id: number) => void;
  onEdit?: (data: IMenuItem, depth?: number) => void;
  children?: React.ReactNode;
}

export function MenuItem2() {}
const MenuItem = forwardRef<HTMLDivElement, MenuItemProps>(function MenuItem(
  { className = "", dragging, listeners, attributes, itemId, name, depth, style, data, children, onDelete, onEdit },
  ref,
) {
  const [showModalConfirm, setShowModalConfirm] = useState(false);

  return (
    <div
      className={classNames(`menu-item w-fit border item-${data.id}`, {
        "border-dashed border-gray-400": dragging,
        "border-transparent": !dragging,
        [className]: className,
        [`depth-${depth}`]: !isUndefined(depth),
      })}
      ref={ref}
      style={style}
    >
      <div
        className={classNames("menu-item-wraper", {
          "opacity-0": dragging,
        })}
      >
        <div className="menu-item-wraper flex items-center justify-between bg-gray-50 border hover:border-gray-400 w-[480px]">
          <div className="item-name flex-1 pl-4 py-3 cursor-move" {...attributes} {...listeners}>
            <p className="font-[500] flex line-clamp-1 overflow-ellipsis w-full">
              <span className="mr-2 text-gray-400">[{data.id}]</span>
              <span className="block">{data.name}</span>
            </p>
          </div>
          <div className="item-type w-fit text-left flex items-center pr-1">
            <span className="label mr-1 text-xs text-gray-500">{data.objectType}</span>
            <span
              className="cursor-pointer w-6 h-6 text-xs flex items-center justify-center hover:bg-slate-200 rounded-full"
              onClick={() => onEdit?.(data, depth)}
            >
              <EditOutlined />
            </span>
            <span
              className="text-red-500 cursor-pointer w-6 h-6 flex items-center justify-center hover:bg-red-100 rounded-full text-xs"
              onClick={() => setShowModalConfirm(true)}
            >
              <DeleteOutlined />
            </span>
          </div>
          <ModalDeleteConfirm
            isShowModal={showModalConfirm}
            title="Xoá menu item"
            descriptions={`Bạn có chắc chắn muốn xoá menu item - "${data.name}"`}
            onCancel={() => setShowModalConfirm(false)}
            onConfirm={() => data && onDelete?.(data.id)}
          />
        </div>
        {children}
      </div>
    </div>
  );
});
export default MenuItem;
