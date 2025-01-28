import React, { useEffect, useState } from "react";
import { Empty, Spin, Tabs, Pagination, Divider } from "antd";

import type { TabsProps } from "antd";
import { IMediaFolder, IMediaFolderListRs } from "@/models/management/media.interface";
import classNames from "classnames";
import { isEmpty, isEqual } from "lodash";
import MediaFolderItem from "@/components/admin/media/MediaFolderItem";

import { MediaFolderUpdateFormData } from "../media.interface";

import CreateFolderForm, { CreateFolderFormProps } from "./CreateFolderForm";
import { useGetMediaFolders } from "@/modules/admin/manageMedia/hooks/useGetMediaFolders";
import { useMediaManager, useMediaManagerSelector } from "../mediaContext";
import { useCreateMediaFolder, useUpdateMediaFolder } from "@/modules/admin/manageMedia";

export interface IMediaFolderProps {
  onOpen?: (item: IMediaFolderListRs["result"][0]) => void;
  hasRoleCreate?: boolean;
}
type FolderTabKeys = "folderList" | "addFolder";
const MediaFolderWraper = ({ onOpen, hasRoleCreate = false }: IMediaFolderProps) => {
  const [folderTabKey, setFolderTabKey] = useState<FolderTabKeys>("folderList");

  const onChangeTab: TabsProps["onChange"] = (activeKey) => {
    setFolderTabKey(activeKey as FolderTabKeys);
  };

  const { mutate: createFolder, isPending: isLoadingCreate } = useCreateMediaFolder();

  const handleCreateFolder: CreateFolderFormProps["onSubmit"] = (data, cb) => {
    createFolder(data, {
      onSuccess(data, variables, context) {
        cb?.();
      },
    });
  };
  let tabFolderItems: TabsProps["items"] = [
    {
      key: "folderList",
      label: "Thư mục",
      children: <MediaFolderWraper.PanelList />,
    },
  ];

  if (hasRoleCreate) {
    tabFolderItems = [
      ...tabFolderItems,
      {
        key: "addFolder",
        label: "Thêm thư mục",
        children: (
          <CreateFolderForm
            onCancel={() => setFolderTabKey("folderList")}
            onSubmit={handleCreateFolder}
            onChangeTabPanel={() => setFolderTabKey("folderList")}
            loading={isLoadingCreate}
          />
        ),
      },
    ];
  }

  return (
    <Tabs
      defaultActiveKey="folderList"
      destroyInactiveTabPane={true}
      activeKey={folderTabKey}
      items={tabFolderItems}
      onChange={onChangeTab}
    />
  );
};
export default MediaFolderWraper;

MediaFolderWraper.PanelList = function MediaFolderPanelList() {
  const { mutate: updateFolder, isPending: isLoadingUpdate } = useUpdateMediaFolder();

  const folderQueryParams = useMediaManagerSelector((state) => state.queryParams.folder);
  const selectedFolder = useMediaManagerSelector((state) => state.selectedFolder);
  const [pagination, setPagination] = useState({
    current: 1,
    total: 0,
    pageSize: 10,
  });
  const { data: folderData, isLoading } = useGetMediaFolders({
    enabled: true,
    queryParams: folderQueryParams,
  });
  const [state, dispatch] = useMediaManager();

  const handleOpenFolder = (folder: IMediaFolder) => {
    dispatch({ type: "SET_FOLDER", payload: folder });
    dispatch({
      type: "SET_QUERY_FILES",
      payload: {
        ...state.queryParams.file,
        requestObject: {
          ...state.queryParams.file.requestObject,
          mediaInFolderRecid: folder.id,
        },
      },
    });
  };
  const handleOpenRootFolder = () => {
    dispatch({ type: "SET_ROOT_FOLDER" });
  };

  const handleChangePage = (page: number, pageSize: number) => {
    dispatch({
      type: "SET_QUERY_FOLDER",
      payload: {
        ...state.queryParams.folder,
        pageSize: pageSize,
        pageCurrent: page,
      },
    });
  };

  const handleUpdateFolder: MediaFolderListProps["onSave"] = (formData, cb) => {
    updateFolder(formData, {
      onSuccess(data, variables, context) {
        cb?.();
      },
    });
  };
  useEffect(() => {
    if (folderData) {
      setPagination({
        current: folderData.pageCurrent,
        pageSize: folderData.pageSize,
        total: folderData.totalItems,
      });
    }
  }, [folderData]);
  return (
    <React.Fragment>
      <Pagination
        {...pagination}
        showLessItems
        showSizeChanger={false}
        size="small"
        defaultCurrent={1}
        defaultPageSize={10}
        onChange={handleChangePage}
      />
      <Divider style={{ margin: "12px 0" }} />
      <MediaFolderItem
        folderName="Thư mục gốc"
        editAble={false}
        onOpen={handleOpenRootFolder}
        folderColor="text-amber-600"
        isSelected={true}
      />
      {isLoading ? (
        <Spin tip="Loading..." size="small">
          <div style={{ padding: 50, borderRadius: 4 }}></div>
        </Spin>
      ) : folderData?.list.length ? (
        <MediaFolderWraper.FolderList
          items={folderData.list}
          depth={1}
          className="pl-2"
          selectedId={selectedFolder?.id}
          isLoading={isLoadingUpdate}
          onSave={handleUpdateFolder}
          onOpen={handleOpenFolder}
        />
      ) : (
        <Empty
          imageStyle={{ height: 40 }}
          description={<span className="text-xs text-gray-500">Không có thư mục nào</span>}
          className="py-6"
        />
      )}
    </React.Fragment>
  );
};
interface MediaFolderListProps {
  items: IMediaFolderListRs["result"];
  onSave?: (formData: MediaFolderUpdateFormData, cb?: () => void) => void;
  selectedId?: number;
  onOpen?: (item: IMediaFolderListRs["result"][0]) => void;
  depth: number;
  className?: string;
  isLoading?: boolean;
}

MediaFolderWraper.FolderList = function MediaFolderList({
  items,
  selectedId,
  depth,
  className = "",
  onSave,
  onOpen,
  isLoading,
}: MediaFolderListProps) {
  const [expandKeys, setExpandKeys] = useState<string[]>([]);

  const handleExpandFolder = (key: string) => {
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

  return (
    <ul
      className={classNames(`folder-list depth-${depth}`, {
        [className]: className,
        "border-l ml-3": depth > 0,
      })}
    >
      {items.map((item) => (
        <li className="py-1" key={item.key}>
          <MediaFolderItem
            folderName={item.folderName}
            isExpanded={hasExpandedFolder(item.key, expandKeys)}
            onOpen={() => onOpen?.(item)}
            isSelected={isEqual(selectedId, item.id)}
            onExpand={() => handleExpandFolder(item.key)}
            hasChildren={!isEmpty(item.children)}
            item={item}
            onOk={onSave}
            loading={isLoading}
          />
          {!isEmpty(item.children) && hasExpandedFolder(item.key, expandKeys) ? (
            <MediaFolderWraper.FolderList
              items={item.children}
              depth={depth + 1}
              className={`pl-2`}
              selectedId={selectedId}
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
