import React, { useState } from "react";
import { Empty, Spin } from "antd";
import {
    FolderOpenFilled,
    FolderFilled,
    PlusOutlined,
    MinusOutlined,
    EditOutlined,
} from "@ant-design/icons";
import { IMediaFolderListRs } from "@/models/management/media.interface";
import styled from "styled-components";
import classNames from "classnames";
import { isEmpty } from "lodash";

interface Props {
    items: IMediaFolderListRs["result"];
    current?: number;
    isLoading?: boolean;
    defaultSelect?: string;
    openedFolder?: IMediaFolderListRs["result"][0];
    onEdit?: (item: IMediaFolderListRs["result"][0]) => void;
    onOpen?: (item: IMediaFolderListRs["result"][0]) => void;
}
const MediaFolder: React.FC<Props> = ({
    items,
    current,
    isLoading,
    defaultSelect = "",
    onEdit,
    onOpen,
    openedFolder,
}) => {
    return (
        <div className="media-cat">
            <div className="media-top mb-3">
                <p className="font-semibold flex justify-between py-2">
                    <span className="text-lg">Thư mục</span>
                </p>
            </div>
            {isLoading ? (
                <div className="flex items-center justify-center py-2">
                    <Spin />
                </div>
            ) : (
                <React.Fragment>
                    {items.length ? (
                        <MediaFolderList
                            items={items}
                            depth={1}
                            onEdit={onEdit}
                            value={openedFolder?.key}
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
        </div>
    );
};
export default MediaFolder;

interface IMediaFolderList {
    items: IMediaFolderListRs["result"];
    openKeys?: string[];
    value?: string;
    onEdit?: (item: IMediaFolderListRs["result"][0]) => void;
    onOpen?: (item: IMediaFolderListRs["result"][0]) => void;
    depth: number;
    className?: string;
}
const MediaFolderList = function ({
    items,
    value,
    depth,
    className = "",
    onEdit,
    onOpen,
}: IMediaFolderList) {
    const [expands, setExpands] = useState<string[]>([]);

    const onExpandFolder = (key: string) => {
        setExpands((prev) => {
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
    const hasOpen = (key: string) => expands.includes(key);
    return (
        <ul
            className={classNames(`folders ${depth}`, {
                [className]: className,
            })}
        >
            {items.map((item) => (
                <li className="cat-1 py-2" key={item.key}>
                    <div className="flex items-center justify-between relative">
                        <MediaFolderItemName
                            folderName={item.folderName}
                            isExpanded={hasOpen(item.key)}
                            onClick={() => onEdit?.(item)}
                            onOpen={() => onOpen?.(item)}
                            isSelected={value === item.key}
                            className="group/item cursor-pointer"
                        />
                        {!isEmpty(item.children) ? (
                            <span
                                className="w-6 h-6 text-xs flex items-center justify-center cursor-pointer"
                                onClick={() => onExpandFolder(item.key)}
                            >
                                {hasOpen(item.key) ? (
                                    <MinusOutlined />
                                ) : (
                                    <PlusOutlined />
                                )}
                            </span>
                        ) : null}
                    </div>
                    {!isEmpty(item.children) && hasOpen(item.key) ? (
                        <MediaFolderList
                            items={item.children}
                            depth={depth + 1}
                            className={`pl-${depth * 4}`}
                            onEdit={onEdit}
                            onOpen={onOpen}
                            value={value}
                        />
                    ) : null}
                </li>
            ))}
        </ul>
    );
};

interface IFolderItemnameProps {
    isExpanded?: boolean;
    folderName: string;
    className?: string;
    onClick?: () => void;
    onOpen?: () => void;
    isSelected?: boolean;
}
const MediaFolderItemName = function ({
    isExpanded = false,
    folderName,
    className = "",
    onClick,
    onOpen,
    isSelected = false,
}: IFolderItemnameProps) {
    return (
        <span
            className={classNames(
                "clear-both mr-2 hover:text-primary-default flex-1",
                {
                    [className]: className,
                },
            )}
            onClick={onOpen}
        >
            <span className="mr-2 text-lg -mt-1 float-left text-primary-light">
                {isExpanded ? <FolderOpenFilled /> : <FolderFilled />}
            </span>
            <span
                className={classNames("line-clamp-1 hop", {
                    "text-primary-default font-semibold": isSelected,
                })}
            >
                {folderName}
            </span>
            <span
                className="group/edit invisible text-gray-400 group-hover/item:visible absolute left-0 top-0 w-6 h-6  bg-white flex items-center justify-center cursor-pointer"
                onClick={onClick}
            >
                <EditOutlined />
            </span>
        </span>
    );
};
