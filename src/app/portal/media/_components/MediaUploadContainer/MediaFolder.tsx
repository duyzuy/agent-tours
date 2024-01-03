import React, { useState } from "react";
import { Empty, Spin, Tabs, Space, Input, Button } from "antd";
import FormItem from "@/components/base/FormItem";
import type { TabsProps } from "antd";
import {
    IMediaFolderListRs,
    IMediaFolderPayload,
} from "@/models/management/media.interface";
import classNames from "classnames";
import { isEmpty, isEqual } from "lodash";
import { TMediaFolderErrorsField } from "@/app/portal/media/hooks/useCRUDFolder";
import MediaFolderItem from "@/components/admin/media/MediaFolderItem";
import styled from "styled-components";
import CreateFolderForm, { CreateFolderFormProps } from "./CreateFolderForm";

type TabKeys = "folderList" | "addFolder";
type TMediaFolder = IMediaFolderListRs["result"][0];

export interface IMediaFolderProps {
    items: IMediaFolderListRs["result"];
    isLoading?: boolean;
    errors?: TMediaFolderErrorsField;
    onSave?: (item: TMediaFolder, cb?: () => void) => void;
    onOpen?: (item: TMediaFolder) => void;
    onCreateFolder?: (formData: IMediaFolderPayload, cb?: () => void) => void;
    onResetErrorsField?: () => void;
}

const MediaFolder = ({
    items,
    isLoading,
    onSave,
    onOpen,
    onCreateFolder,
    errors,
    onResetErrorsField,
}: IMediaFolderProps) => {
    const [folderTabKey, setFolderTabKey] = useState<TabKeys>("folderList");

    const [expandKeys, setExpandKeys] = useState<string[]>([]);
    const [editItem, setEditItem] = useState<TMediaFolder>();
    const [selectedKey, setSelectedKey] = useState<string>();

    const onExpandFolder = (key: string) => {
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

    const onCancelEdit = () => {
        setEditItem(undefined);
        onResetErrorsField?.();
    };
    const onChangeFolderName = (value: string) => {
        if (editItem) {
            const newEditItem = {
                ...editItem,
                folderName: value,
            };
            setEditItem(() => newEditItem);
        }
    };

    const onOpenFolder = (folder: TMediaFolder) => {
        setSelectedKey(folder.key);
        onOpen?.(folder);
    };
    const onUpdateFolder = () => {
        if (editItem && onSave) {
            onSave(editItem, () => {
                setEditItem(undefined);
            });
        }
    };

    const onCreateNewFolder: CreateFolderFormProps["onSubmit"] = (data) => {
        onCreateFolder?.(data, () => {
            setFolderTabKey("folderList");
        });
    };

    const onCancelCreateFolder = () => {
        onResetErrorsField?.();
        setFolderTabKey("folderList");
    };
    const onChangeTab: TabsProps["onChange"] = (activeKey) => {
        setFolderTabKey(activeKey as TabKeys);
        setEditItem(undefined);
        onResetErrorsField?.();
    };

    const tabFolderItems: TabsProps["items"] = [
        {
            key: "folderList",
            label: "Thư mục",
            children: (
                <React.Fragment>
                    {isLoading ? (
                        <div className="flex items-center justify-center py-2">
                            <Spin />
                        </div>
                    ) : (
                        <React.Fragment>
                            {items.length ? (
                                <MediaFolder.FolderList
                                    items={items}
                                    expandKeys={expandKeys}
                                    editItem={editItem}
                                    depth={1}
                                    errors={errors}
                                    onCancelEdit={onCancelEdit}
                                    onChangeFolderName={onChangeFolderName}
                                    onSetEditting={(folder) =>
                                        setEditItem(folder)
                                    }
                                    onExpand={onExpandFolder}
                                    onSave={onUpdateFolder}
                                    selectedKey={selectedKey}
                                    onOpen={(folder) => onOpenFolder(folder)}
                                />
                            ) : (
                                <Empty
                                    imageStyle={{ height: 40 }}
                                    description={
                                        <span className="text-xs text-gray-500">
                                            Không có thư mục nào
                                        </span>
                                    }
                                    className="py-6"
                                />
                            )}
                        </React.Fragment>
                    )}
                </React.Fragment>
            ),
        },
        {
            key: "addFolder",
            label: "Thêm thư mục",
            children: (
                <CreateFolderForm
                    onCancel={onCancelCreateFolder}
                    onSubmit={onCreateNewFolder}
                    errors={errors}
                    folderList={items}
                />
            ),
        },
    ];

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
    items: TMediaFolder[];
    editItem?: TMediaFolder;
    openKeys?: string[];
    selectedKey?: string;
    errors?: TMediaFolderErrorsField;
    onSave?: () => void;
    onOpen?: (item: TMediaFolder) => void;
    onSetEditting?: (item: TMediaFolder) => void;
    expandKeys: string[];
    depth: number;
    className?: string;
    onExpand: (expandKey: string) => void;
    onCancelEdit: () => void;
    onChangeFolderName: (value: string) => void;
}
MediaFolder.FolderList = function MediaFolderList({
    items,
    selectedKey,
    depth,
    className = "",
    onSave,
    errors,
    onSetEditting,
    editItem,
    expandKeys,
    onOpen,
    onExpand,
    onCancelEdit,
    onChangeFolderName,
}: IMediaFolderListProps) {
    return (
        <ul
            className={classNames(`folders ${depth}`, {
                [className]: className,
            })}
        >
            {items.map((item) => (
                <li className="cat-1 py-2" key={item.key}>
                    <MediaFolderItem
                        folderName={item.folderName}
                        isExpanded={hasExpandedFolder(item.key, expandKeys)}
                        onEdit={() => onSetEditting?.(item)}
                        isEditting={isEqual(editItem?.key, item.key)}
                        onOpen={() => onOpen?.(item)}
                        isSelected={isEqual(selectedKey, item.key)}
                        onExpand={() => onExpand(item.key)}
                        hasChildren={!isEmpty(item.children)}
                        renderEditForm={() => (
                            <Space className="edit-input" align="start">
                                <StyledFormItem
                                    required
                                    validateStatus={
                                        errors?.folderName ? "error" : ""
                                    }
                                    help={errors?.folderName || ""}
                                    className="mb-0 text-xs"
                                >
                                    <Input
                                        placeholder="Tên thư mục"
                                        value={editItem?.folderName}
                                        size="small"
                                        onChange={(e) =>
                                            onChangeFolderName(e.target.value)
                                        }
                                    />
                                </StyledFormItem>
                                <FormItem>
                                    <Space>
                                        <Button
                                            onClick={onCancelEdit}
                                            size="small"
                                        >
                                            Huỷ
                                        </Button>
                                        <Button
                                            type="primary"
                                            size="small"
                                            onClick={onSave}
                                            disabled={isEqual(
                                                editItem?.folderName,
                                                item.folderName,
                                            )}
                                        >
                                            Lưu
                                        </Button>
                                    </Space>
                                </FormItem>
                            </Space>
                        )}
                    />
                    {!isEmpty(item.children) &&
                    hasExpandedFolder(item.key, expandKeys) ? (
                        <MediaFolder.FolderList
                            items={item.children}
                            depth={depth + 1}
                            className={`pl-${depth * 4}`}
                            onSetEditting={onSetEditting}
                            onCancelEdit={onCancelEdit}
                            onChangeFolderName={onChangeFolderName}
                            onExpand={onExpand}
                            expandKeys={expandKeys}
                            editItem={editItem}
                            onSave={onSave}
                            onOpen={onOpen}
                            errors={errors}
                            selectedKey={selectedKey}
                        />
                    ) : null}
                </li>
            ))}
        </ul>
    );
};

const hasExpandedFolder = (key: string, listKey: string[]) =>
    listKey.includes(key);

const StyledFormItem = styled(FormItem)`
    .travel-form-item-explain-error {
        font-size: 10px;
    }
`;
