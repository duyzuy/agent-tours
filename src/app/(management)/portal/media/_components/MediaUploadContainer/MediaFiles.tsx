import React, { memo, useCallback, useState } from "react";
import { Tabs, TabsProps, Spin, Empty } from "antd";
import { isEmpty } from "lodash";
import {
    IMediaFileListRs,
    IMediaFolderListRs,
} from "@/models/management/media.interface";
import { mediaConfig } from "@/configs";
import MediaFileItem from "@/components/admin/media/MediaFileItem";
import UploadFileForm, { UploadFileFormProps } from "./UploadFileForm";
import ModalPreview from "./ModalPreview";

export interface IMediaFilesProps {
    items: IMediaFileListRs["result"];
    isLoading?: boolean;
    onUpload: UploadFileFormProps["onUpload"];
    uploading?: boolean;
    folderList: IMediaFolderListRs["result"];
    onSelect?: (item: IMediaFileListRs["result"][0]) => void;
    selectedFiles?: IMediaFileListRs["result"];
}
type MediaFileTabPanel = "mediaFiles" | "upload";

const MediaFiles = ({
    items,
    isLoading = false,
    onUpload,
    uploading = false,
    folderList,
    selectedFiles = [],
    onSelect,
}: IMediaFilesProps) => {
    const [mediaTab, setMediaTab] = useState<MediaFileTabPanel>("mediaFiles");
    const onResetTab = () => {
        setMediaTab("mediaFiles");
    };
    const onChangeTab = (activeKey: string) => {
        setMediaTab(activeKey as MediaFileTabPanel);
    };

    const itemsTab: TabsProps["items"] = [
        {
            key: "mediaFiles",
            label: "Thư viện",
            children: (
                <MediaFiles.ItemList
                    items={items}
                    isLoading={isLoading}
                    onSelect={onSelect}
                    selectedFiles={selectedFiles}
                />
            ),
        },
        {
            key: "upload",
            label: "Tải file",
            children: (
                <UploadFileForm
                    folderList={folderList}
                    onUpload={onUpload}
                    uploading={uploading}
                    onResetTab={onResetTab}
                />
            ),
        },
    ];

    return (
        <div className="col-right flex-1 px-6">
            <Tabs
                destroyInactiveTabPane={true}
                defaultActiveKey={mediaTab}
                activeKey={mediaTab}
                onChange={onChangeTab}
                items={itemsTab}
                indicatorSize={(origin) => origin - 16}
            />
        </div>
    );
};
export default memo(MediaFiles);

interface MediaFilesItemListProps {
    items: IMediaFilesProps["items"];
    isLoading?: IMediaFilesProps["isLoading"];
    onSelect?: IMediaFilesProps["onSelect"];
    selectedFiles?: IMediaFilesProps["selectedFiles"];
}
MediaFiles.ItemList = function MediaFilesItemList({
    items,
    isLoading,
    onSelect,
    selectedFiles,
}: MediaFilesItemListProps) {
    const [preview, setPreview] = useState<{
        isShow: boolean;
        thumbnail?: string;
    }>({ isShow: false, thumbnail: undefined });

    const onPreviewImage = useCallback((path: string) => {
        setPreview(() => ({
            isShow: true,
            thumbnail: path,
        }));
    }, []);

    const hasSelectedFile = useCallback(
        (
            file: IMediaFileListRs["result"][0],
            files: IMediaFilesProps["selectedFiles"],
        ) => {
            return Boolean(files?.find((item) => item.key === file.key));
        },
        [],
    );

    return (
        <React.Fragment>
            {isLoading ? (
                <div className="flex items-center justify-center py-2">
                    <Spin />
                </div>
            ) : (
                <React.Fragment>
                    {isEmpty(items) ? (
                        <Empty
                            description={
                                <div className="text-center">
                                    <p>Chưa có file nào trong thư mục này.</p>
                                    <p>Vui lòng chọn tải file để upload</p>
                                </div>
                            }
                        />
                    ) : (
                        <div className="thumbnail-list flex items-center flex-wrap gap-4">
                            {items.map((item) => (
                                <MediaFileItem
                                    key={item.key}
                                    type={item.type}
                                    item={item}
                                    fileType={item.fileType.replace(".", "")}
                                    filePath={`${mediaConfig.rootApiPath}/${item.fullPath}`}
                                    fileName={item.slug}
                                    onSelect={onSelect}
                                    isSelected={hasSelectedFile(
                                        item,
                                        selectedFiles,
                                    )}
                                    onPreview={onPreviewImage}
                                />
                            ))}
                        </div>
                    )}
                    <ModalPreview
                        isOpen={preview.isShow}
                        onClose={() =>
                            setPreview({ isShow: false, thumbnail: undefined })
                        }
                        thumbUrl={preview.thumbnail}
                    />
                </React.Fragment>
            )}
        </React.Fragment>
    );
};
