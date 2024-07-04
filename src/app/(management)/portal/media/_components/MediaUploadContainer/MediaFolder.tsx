import React, { useMemo, useState } from "react";
import { Empty, Spin, Tabs, Space, Input, Button } from "antd";
import FormItem from "@/components/base/FormItem";
import type { TabsProps } from "antd";
import {
    IMediaFolder,
    IMediaFolderListRs,
} from "@/models/management/media.interface";
import classNames from "classnames";
import { isEmpty, isEqual } from "lodash";
import MediaFolderItem from "@/components/admin/media/MediaFolderItem";
import styled from "styled-components";
import FolderCreateForm, { FolderCreateFormProps } from "./FolderCreateForm";
import { MediaFolderUpdateFormData } from "../../modules/media.interface";
import { HandleSubmit, useFormSubmit } from "@/hooks/useFormSubmit";
import { mediaFolderUpdateSchema } from "../../schema/media.schema";

export interface IMediaFolderProps {
    items: IMediaFolderListRs["result"];
    isLoading?: boolean;
    onSave: (formData: MediaFolderUpdateFormData, cb?: () => void) => void;
    onOpen?: (item: IMediaFolderListRs["result"][0]) => void;
    onCreateFolder: FolderCreateFormProps["onCreate"];
}
type FolderTabKeys = "folderList" | "addFolder";
const MediaFolder = ({
    items,
    isLoading,
    onSave,
    onOpen,
    onCreateFolder,
}: IMediaFolderProps) => {
    const [folderTabKey, setFolderTabKey] =
        useState<FolderTabKeys>("folderList");

    const onChangeTab: TabsProps["onChange"] = (activeKey) => {
        setFolderTabKey(activeKey as FolderTabKeys);
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
                                    depth={1}
                                    onSave={onSave}
                                    onOpen={onOpen}
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
                <FolderCreateForm
                    onCancel={() => setFolderTabKey("folderList")}
                    onCreate={onCreateFolder}
                    onChangeTabPanel={() => setFolderTabKey("folderList")}
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
    items: IMediaFolderListRs["result"];
    openKeys?: string[];
    onSave: IMediaFolderProps["onSave"];
    onOpen?: (item: IMediaFolderListRs["result"][0]) => void;
    depth: number;
    className?: string;
}
MediaFolder.FolderList = function MediaFolderList({
    items,
    depth,
    className = "",
    onSave,
    onOpen,
}: IMediaFolderListProps) {
    const initFormEditItem = useMemo(
        () =>
            new MediaFolderUpdateFormData(
                undefined,
                undefined,
                undefined,
                undefined,
            ),
        [],
    );
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
    const onSubmitForm: HandleSubmit<MediaFolderUpdateFormData> = (
        formData,
    ) => {
        onSave(formData, () => {
            setEditItem(undefined);
        });
    };

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
                                    validateStatus={
                                        errors?.folderName ? "error" : ""
                                    }
                                    help={errors?.folderName || ""}
                                    className="mb-0 text-xs"
                                >
                                    <Input
                                        placeholder="Tên thư mục"
                                        value={formData?.folderName}
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
                                            onClick={() =>
                                                handlerSubmit(
                                                    formData,
                                                    onSubmitForm,
                                                )
                                            }
                                            disabled={isEqual(
                                                formData?.folderName,
                                                editItem?.folderName,
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
                            onSave={onSave}
                            onOpen={onOpen}
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
