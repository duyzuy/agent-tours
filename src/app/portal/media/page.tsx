"use client";
import React, { useCallback, useState } from "react";
import PageContainer from "@/components/admin/PageContainer";
import MediaFiles from "@/components/admin/MediaContainer/MediaFiles";
import MediaFolder from "@/components/admin/MediaContainer/MediaFolder";
import DrawlerMedia, { EActionType } from "./_components/DrawlerMedia";
import { TDrawlerActions } from "./_components/DrawlerMedia";

import useLocalUserPermissions from "@/hooks/useLocalUserPermissions";
import useUploadMedia from "./hooks/useUploadMedia";
import useCRUDMediaFolder from "./hooks/useCRUDFolder";
import { useGetMediaFolders, useGetMediaFiles } from "@/queries/media";
import { mediaConfig } from "@/configs";
import {
    IMediaFolderListRs,
    IMediaFolderPayload,
    QueryParamsMediaFiles,
} from "@/models/management/media.interface";

const MediaPage = () => {
    const [isOpenDrawler, setOpenDrawler] = useState(false);

    const { data: folderList, isLoading } = useGetMediaFolders();

    const defaultQueryParams = new QueryParamsMediaFiles(0, 1, 50);

    const [queryMediaFileParams, setQueryMediaFileParams] =
        useState(defaultQueryParams);

    const { data: fileList, isLoading: isLoadingFile } =
        useGetMediaFiles(queryMediaFileParams);

    const { onCreateFolder, onUpdateFolder, errors, onResetFieldsErrors } =
        useCRUDMediaFolder();

    const onUploadMediaFile = useUploadMedia();

    const [actionType, setActionType] = useState<EActionType>(
        EActionType.CREATE,
    );
    const [editRecord, setEditRecord] =
        useState<IMediaFolderListRs["result"][0]>();

    const [openedFolder, setOpenedFolder] =
        useState<IMediaFolderListRs["result"][0]>();

    const [pers, checkPermission] = useLocalUserPermissions();

    const handleSubmitFormData = (
        action: EActionType,
        payload: IMediaFolderPayload,
    ) => {
        if (action === EActionType.CREATE) {
            onCreateFolder(payload, () => {
                setOpenDrawler(false);
            });
        }

        if (action === EActionType.EDIT) {
            editRecord &&
                onUpdateFolder(editRecord.id, payload, () => {
                    setOpenDrawler(false);
                });
        }
    };

    const onCancel = () => {
        setOpenDrawler(false);
        setEditRecord(undefined);
        onResetFieldsErrors();
    };

    const handleDrawlerForm = useCallback(
        (action: TDrawlerActions) => {
            if (action.type === EActionType.EDIT) {
                setEditRecord(() => action.record);
            }
            setActionType(() => action.type);
            setOpenDrawler(() => true);
        },
        [actionType],
    );
    /**
     * Refetch Files when open other folder.
     * @param item
     */
    const handleOnpenFilesInFolder = (
        item: IMediaFolderListRs["result"][0],
    ) => {
        setOpenedFolder(item);
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
            onClick={() => handleDrawlerForm({ type: EActionType.CREATE })}
        >
            <div className="flex h-full">
                <div className="col-left w-[260px] h-full pr-4 border-r">
                    <MediaFolder
                        items={folderList || []}
                        isLoading={isLoading}
                        onEdit={(record) =>
                            handleDrawlerForm({
                                type: EActionType.EDIT,
                                record,
                            })
                        }
                        onOpen={handleOnpenFilesInFolder}
                        openedFolder={openedFolder}
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
            <DrawlerMedia
                isOpen={isOpenDrawler}
                onCancel={onCancel}
                actionType={actionType}
                onSubmit={handleSubmitFormData}
                folderList={folderList || []}
                errors={errors}
                initialValues={editRecord}
            />
        </PageContainer>
    );
};
export default MediaPage;
