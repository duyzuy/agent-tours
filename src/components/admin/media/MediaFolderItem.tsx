import React from "react";
import { MinusOutlined, PlusOutlined, FolderOpenFilled, FolderFilled, EditOutlined } from "@ant-design/icons";
import classNames from "classnames";
export interface MediaFolderItemProps {
  isEditting?: boolean;
  folderName: string;
  onExpand: () => void;
  isExpanded: boolean;
  onEdit: () => void;
  onOpen: () => void;
  isSelected: boolean;
  hasChildren: boolean;
  renderEditForm?: () => React.ReactNode;
}

const MediaFolderItem = ({
  isEditting = false,
  folderName,
  onExpand,
  isExpanded,
  onOpen,
  onEdit,
  isSelected,
  hasChildren,
  renderEditForm,
}: MediaFolderItemProps) => {
  return (
    <>
      {isEditting ? (
        renderEditForm?.()
      ) : (
        <div className="flex items-center justify-between relative">
          <MediaFolderItem.Name
            folderName={folderName}
            onEdit={onEdit}
            onOpen={onOpen}
            isSelected={isSelected}
            className="group/item cursor-pointer"
          />
          {hasChildren ? (
            <span
              className="w-6 h-6 text-xs flex items-center justify-center cursor-pointer hover:bg-gray-100 rounded-full"
              onClick={onExpand}
            >
              {isExpanded ? <MinusOutlined /> : <PlusOutlined />}
            </span>
          ) : null}
        </div>
      )}
    </>
  );
};
export default MediaFolderItem;

interface IFolderItemNameProps {
  folderName: string;
  className?: string;
  onEdit?: () => void;
  onOpen?: () => void;
  isSelected?: boolean;
}
MediaFolderItem.Name = function MediaFolderItemName({
  folderName,
  className = "",
  onEdit,
  onOpen,
  isSelected = false,
}: IFolderItemNameProps) {
  return (
    <span
      className={classNames("clear-both mr-2 hover:text-primary-default flex-1", {
        [className]: className,
      })}
    >
      <span className="mr-2 text-lg -mt-1 float-left text-primary-light">
        {isSelected ? <FolderOpenFilled /> : <FolderFilled />}
      </span>

      <span
        className={classNames("line-clamp-1", {
          "text-primary-default font-semibold": isSelected,
        })}
        onClick={onOpen}
      >
        {folderName}
      </span>
      <span
        className="group/edit invisible text-gray-400 group-hover/item:visible absolute left-0 top-0 w-6 h-6  bg-white flex items-center justify-center cursor-pointer"
        onClick={onEdit}
      >
        <EditOutlined />
      </span>
    </span>
  );
};
