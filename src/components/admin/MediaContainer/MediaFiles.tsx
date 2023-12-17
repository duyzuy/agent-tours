import React, { memo, useState } from "react";
import { Tabs, TabsProps, UploadFile } from "antd";
import {
    IMediaFileListRs,
    IMediaFolderListRs,
} from "@/models/management/media.interface";
import MediaFileListTab from "./_components/MediaFileListTab";
import MediaUploadTab, {
    TFolderSelect,
} from "./_components/MediaFileUploadTab";

interface IMediaFiles {
    accept?: string;
    maxfileSize?: number;
    items: IMediaFileListRs["result"];
    isLoading?: boolean;
    onUpload: (
        payload: { folder: TFolderSelect; fileList: UploadFile[] },
        cb?: () => void,
    ) => void;
    uploading?: boolean;
    folderList: IMediaFolderListRs["result"];
}
type MediaFileTablist = "mediaFiles" | "upload";
const MediaFiles: React.FC<IMediaFiles> = ({
    accept,
    items,
    isLoading = false,
    onUpload,
    uploading = false,
    maxfileSize = 2,
    folderList,
}) => {
    const [mediaTab, setMediaTab] = useState<MediaFileTablist>("mediaFiles");
    const onResetTab = () => {
        setMediaTab("mediaFiles");
    };
    const onChangeTab = (activeKey: string) => {
        setMediaTab(activeKey as MediaFileTablist);
    };
    const itemsTab: TabsProps["items"] = [
        {
            key: "mediaFiles",
            label: "Thư viện",
            children: <MediaFileListTab items={items} isLoading={isLoading} />,
        },
        {
            key: "upload",
            label: "Tải file",
            children: (
                <MediaUploadTab
                    accept={accept}
                    maxfileSize={maxfileSize}
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
