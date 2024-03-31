import React, { useState } from "react";
import MediaFiles, { IMediaFilesProps } from "./MediaFiles";
import MediaFolder from "./MediaFolder";
import { mediaConfig } from "@/configs";
import { useGetMediaFiles, useGetMediaFolders } from "@/queries/media";
import {
    IMediaFileListRs,
    QueryParamsMediaFiles,
} from "@/models/management/media.interface";
import useMediaFolder from "../../modules/useMediaFolder";
import useMediaFile from "../../modules/useMediaFile";
import classNames from "classnames";
import {
    IMediaFolderListRs,
    IMediaFolderPayload,
} from "@/models/management/media.interface";
export interface MediaUploadContainerProps {
    className?: string;
    onSelect: IMediaFilesProps["onSelect"];
    selectedFiles: IMediaFileListRs["result"];
}

export enum EActionType {
    CREATE = "create",
    EDIT = "edit",
}

const MediaUploadContainer: React.FC<MediaUploadContainerProps> = ({
    className = "",
    onSelect,
    selectedFiles,
}) => {
    const { data: folderList, isLoading: isLoadingFolder } =
        useGetMediaFolders();

    const defaultQueryParams = new QueryParamsMediaFiles(0, 1, 50);

    const [queryMediaFileParams, setQueryMediaFileParams] =
        useState(defaultQueryParams);

    const { data: fileList, isLoading: isLoadingFile } =
        useGetMediaFiles(queryMediaFileParams);

    const { onCreateFolder, onUpdateFolder } = useMediaFolder();

    const onUploadMediaFile = useMediaFile();

    const handleSubmitFormData = ({
        action,
        payload,
        id,
        cb,
    }: {
        action: EActionType;
        payload: IMediaFolderPayload;
        id?: number;
        cb?: () => void;
    }) => {
        console.log(action, payload);
        if (action === EActionType.CREATE) {
            onCreateFolder(payload, () => {
                cb?.();
            });
        }

        if (action === EActionType.EDIT && id) {
            onUpdateFolder(payload, () => {
                cb?.();
            });
        }
    };

    /**
     * Refetch Files when open other folder.
     * @param item
     */
    const handleOnpenFilesInFolder = (
        item: IMediaFolderListRs["result"][0],
    ) => {
        setQueryMediaFileParams((prev) => ({
            ...prev,
            mediaInFolderRecid: item.id,
        }));
    };

    return (
        <div
            className={classNames("flex h-full", {
                [className]: className,
            })}
        >
            <div className="col-left w-[260px] h-full pr-4 border-r">
                <MediaFolder
                    items={folderList || []}
                    isLoading={isLoadingFolder}
                    onSave={(record, cb) =>
                        handleSubmitFormData({
                            action: EActionType.EDIT,
                            payload: record,
                            id: record.id,
                            cb,
                        })
                    }
                    onCreateFolder={(data, cb) =>
                        handleSubmitFormData({
                            action: EActionType.CREATE,
                            payload: data,
                            cb,
                        })
                    }
                    onOpen={handleOnpenFilesInFolder}
                />
            </div>
            <MediaFiles
                items={fileList || []}
                isLoading={isLoadingFile}
                onUpload={onUploadMediaFile}
                folderList={folderList || []}
                accept={mediaConfig.accept}
                maxfileSize={mediaConfig.maxfileSize}
                selectedFiles={selectedFiles}
                onSelect={onSelect}
            />
        </div>
    );
};
export default MediaUploadContainer;
