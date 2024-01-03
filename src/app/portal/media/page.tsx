"use client";
import React, { useState } from "react";
import PageContainer from "@/components/admin/PageContainer";
import useLocalUserPermissions from "@/hooks/useLocalUserPermissions";
import useUploadMedia from "./hooks/useUploadMedia";
import useCRUDMediaFolder from "./hooks/useCRUDFolder";
import { useGetMediaFolders, useGetMediaFiles } from "@/queries/media";
import {
    IMediaFolderListRs,
    IMediaFolderPayload,
    QueryParamsMediaFiles,
} from "@/models/management/media.interface";
import MediaFolder from "./_components/MediaUploadContainer/MediaFolder";
import MediaFiles from "./_components/MediaUploadContainer/MediaFiles";
import { mediaConfig } from "@/configs";

enum EActionType {
    CREATE = "create",
    EDIT = "edit",
}

const MediaPage = () => {
    const { data: folderList, isLoading: isLoadingFolder } =
        useGetMediaFolders();

    const defaultQueryParams = new QueryParamsMediaFiles(0, 1, 50);

    const [queryMediaFileParams, setQueryMediaFileParams] =
        useState(defaultQueryParams);

    const { data: fileList, isLoading: isLoadingFile } =
        useGetMediaFiles(queryMediaFileParams);

    const { onCreateFolder, onUpdateFolder, errors, onResetFieldsErrors } =
        useCRUDMediaFolder();

    const onUploadMediaFile = useUploadMedia();

    const [pers, checkPermission] = useLocalUserPermissions();

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
            onUpdateFolder(id, payload, () => {
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
        <PageContainer
            name="Quản lý Media"
            className="h-full"
            modelName="mục"
            hideAddButton={true}
            breadCrumItems={[{ title: "Media" }]}
        >
            <div className="flex h-full">
                <div className="col-left w-[260px] h-full pr-4 border-r">
                    <MediaFolder
                        items={folderList || []}
                        errors={errors}
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
                        onResetErrorsField={onResetFieldsErrors}
                    />
                </div>
                <MediaFiles
                    items={fileList || []}
                    isLoading={isLoadingFile}
                    onUpload={onUploadMediaFile}
                    folderList={folderList || []}
                    accept={mediaConfig.accept}
                    maxfileSize={mediaConfig.maxfileSize}
                />
            </div>
        </PageContainer>
    );
};
export default MediaPage;
