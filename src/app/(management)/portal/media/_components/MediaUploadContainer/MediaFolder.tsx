import React, { useMemo, useState } from "react";
import { Empty, Spin, Tabs, Space, Input, Button, Pagination } from "antd";
import FormItem from "@/components/base/FormItem";
import type { PaginationProps, TabsProps } from "antd";
import { IMediaFolder, IMediaFolderListRs } from "@/models/management/media.interface";
import classNames from "classnames";
import { isEmpty, isEqual } from "lodash";
import MediaFolderItem from "@/components/admin/media/MediaFolderItem";
import styled from "styled-components";
import FolderCreateForm from "./FolderCreateForm";
import { MediaFolderUpdateFormData } from "../../modules/media.interface";
import { HandleSubmit, useFormSubmit } from "@/hooks/useFormSubmit";
import { mediaFolderUpdateSchema } from "../../schema/media.schema";
import useMediaFolder, { UseMediaFolderProps } from "../../modules/useMediaFolder";
export interface IMediaFolderProps {
  items: IMediaFolderListRs["result"];
  isLoading?: boolean;
  onOpen?: (item: IMediaFolderListRs["result"][0]) => void;
  hasRoleCreate?: boolean;
  paginations?: {
    onChangePage?: PaginationProps["onChange"];
    currentPage?: number;
    totalItems?: number;
    pageSize?: number;
  };
}
type FolderTabKeys = "folderList" | "addFolder";
const MediaFolder = ({ items, isLoading, onOpen, paginations, hasRoleCreate = false }: IMediaFolderProps) => {
  const [folderTabKey, setFolderTabKey] = useState<FolderTabKeys>("folderList");
  const { onCreateFolder, onUpdateFolder, isCreating, isUpdateing } = useMediaFolder();

  const onChangeTab: TabsProps["onChange"] = (activeKey) => {
    setFolderTabKey(activeKey as FolderTabKeys);
  };
  const { onChangePage, currentPage, totalItems, pageSize } = paginations || {};

  const renderFolderList = () => {
    return (
      <React.Fragment>
        <div className="pagination pt-4 pb-6 border-b rounded-md mb-3">
          <Pagination
            simple
            showLessItems
            showSizeChanger={false}
            size="small"
            current={currentPage}
            total={totalItems}
            pageSize={pageSize}
            onChange={onChangePage}
          />
        </div>
        {isLoading ? (
          <Spin tip="Loading..." size="small">
            <div style={{ padding: 50, borderRadius: 4 }}></div>
          </Spin>
        ) : (
          <>
            {items.length ? (
              <MediaFolder.FolderList
                items={items}
                depth={1}
                isLoading={isUpdateing}
                onSave={onUpdateFolder}
                onOpen={onOpen}
              />
            ) : (
              <Empty
                imageStyle={{ height: 40 }}
                description={<span className="text-xs text-gray-500">Không có thư mục nào</span>}
                className="py-6"
              />
            )}
          </>
        )}
      </React.Fragment>
    );
  };

  let tabFolderItems: TabsProps["items"] = [
    {
      key: "folderList",
      label: "Thư mục",
      children: renderFolderList(),
    },
  ];

  if (hasRoleCreate) {
    tabFolderItems = [
      ...tabFolderItems,
      {
        key: "addFolder",
        label: "Thêm thư mục",
        children: (
          <FolderCreateForm
            onCancel={() => setFolderTabKey("folderList")}
            onCreate={onCreateFolder}
            onChangeTabPanel={() => setFolderTabKey("folderList")}
            folderList={items}
            isLoading={isCreating}
          />
        ),
      },
    ];
  }

  return (
    <div className="media-folder">
      <Tabs
        defaultActiveKey="folderList"
        destroyInactiveTabPane={true}
        activeKey={folderTabKey}
        items={tabFolderItems}
        onChange={onChangeTab}
      />
    </div>
  );
};
export default MediaFolder;

interface IMediaFolderListProps {
  items: IMediaFolderListRs["result"];
  openKeys?: string[];
  onSave: UseMediaFolderProps["onUpdateFolder"];
  onOpen?: (item: IMediaFolderListRs["result"][0]) => void;
  depth: number;
  className?: string;
  isLoading?: boolean;
}
MediaFolder.FolderList = function MediaFolderList({
  items,
  depth,
  className = "",
  onSave,
  onOpen,
  isLoading,
}: IMediaFolderListProps) {
  const initFormEditItem = useMemo(() => new MediaFolderUpdateFormData(undefined, undefined, undefined, undefined), []);
  const [formData, setFormData] = useState(initFormEditItem);
  const [editItem, setEditItem] = useState<IMediaFolderListRs["result"][0]>();

  const [expandKeys, setExpandKeys] = useState<string[]>([]);

  const [selectedKey, setSelectedKey] = useState<string>();

  const onExpand = (key: string) => {
    setExpandKeys((prev) => {
      let newKeys = [...prev];
      if (prev.includes(key)) {
        const indexOfkey = prev.indexOf(key);
        newKeys.splice(indexOfkey, 1);
        return [...newKeys];
      } else {
        return [...newKeys, key];
      }
    });
  };

  const { handlerSubmit, errors } = useFormSubmit({
    schema: mediaFolderUpdateSchema,
  });

  const onEdit = (item: IMediaFolder) => {
    setEditItem(item);
    setFormData((oldData) => ({
      ...oldData,
      id: item.id,
      oldFolderName: item.folderName,
      folderName: item.folderName,
      parent: item.parent,
    }));
  };

  const onCancelEdit = () => {
    setEditItem(undefined);
    setFormData(initFormEditItem);
  };

  const onChangeFolderName = (value: string) => {
    setFormData((oldData) => ({
      ...oldData,
      folderName: value,
    }));
  };

  const onOpenFolder = (item: IMediaFolder) => {
    setSelectedKey(item.key);
    onOpen?.(item);
  };
  const onSubmitForm: HandleSubmit<MediaFolderUpdateFormData> = (formData) => {
    onSave(formData, () => {
      setEditItem(undefined);
    });
  };

  return (
    <ul
      className={classNames(`folders depth-${depth}`, {
        [className]: className,
        "border-l ml-[8px]": depth > 1,
      })}
    >
      {items.map((item) => (
        <li className="cat-1 py-2" key={item.key}>
          <MediaFolderItem
            folderName={item.folderName}
            isExpanded={hasExpandedFolder(item.key, expandKeys)}
            onEdit={() => onEdit(item)}
            isEditting={isEqual(editItem?.key, item.key)}
            onOpen={() => onOpenFolder(item)}
            isSelected={isEqual(selectedKey, item.key)}
            onExpand={() => onExpand(item.key)}
            hasChildren={!isEmpty(item.children)}
            renderEditForm={() => (
              <Space className="edit-input" align="start">
                <StyledFormItem
                  required
                  validateStatus={errors?.folderName ? "error" : ""}
                  help={errors?.folderName || ""}
                  className="mb-0 text-xs"
                >
                  <Input
                    placeholder="Tên thư mục"
                    value={formData?.folderName}
                    size="small"
                    onChange={(e) => onChangeFolderName(e.target.value)}
                    disabled={isLoading}
                  />
                </StyledFormItem>
                <FormItem>
                  <Space>
                    <Button onClick={onCancelEdit} size="small" disabled={isLoading}>
                      Huỷ
                    </Button>
                    <Button
                      type="primary"
                      size="small"
                      onClick={() => handlerSubmit(formData, onSubmitForm)}
                      disabled={isEqual(formData?.folderName, editItem?.folderName)}
                      loading={isLoading}
                    >
                      Lưu
                    </Button>
                  </Space>
                </FormItem>
              </Space>
            )}
          />
          {!isEmpty(item.children) && hasExpandedFolder(item.key, expandKeys) ? (
            <MediaFolder.FolderList
              items={item.children}
              depth={depth + 1}
              className={`pl-${depth * 4}`}
              onSave={onSave}
              onOpen={onOpen}
            />
          ) : null}
        </li>
      ))}
    </ul>
  );
};

const hasExpandedFolder = (key: string, listKey: string[]) => listKey.includes(key);

const StyledFormItem = styled(FormItem)`
  .travel-form-item-explain-error {
    font-size: 10px;
  }
`;
