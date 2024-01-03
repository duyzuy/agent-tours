"use client";
import React, { useCallback, useState } from "react";
import { Drawer, Space, Button } from "antd";
import useUploadMedia from "../../media/hooks/useUploadMedia";
import useCRUDMediaFolder from "../../media/hooks/useCRUDFolder";
import PageContainer from "@/components/admin/PageContainer";

import useLocalUserPermissions from "@/hooks/useLocalUserPermissions";

import { useGetMediaFolders, useGetMediaFiles } from "@/queries/media";
import {
    IMediaFolderListRs,
    IMediaFolderPayload,
    QueryParamsMediaFiles,
} from "@/models/management/media.interface";
// import MediaContainer from "@/components/admin/MediaContainer";

interface IMediaUploadProps {
    onClose: () => void;
    isOpen: boolean;
}
const MediaUpload: React.FC<IMediaUploadProps> = ({ onClose, isOpen }) => {
    const { data: folderList, isLoading: isLoadingFolder } =
        useGetMediaFolders();
    const defaultQueryParams = new QueryParamsMediaFiles(0, 1, 50);
    const { data: fileList, isLoading: isLoadingFile } =
        useGetMediaFiles(defaultQueryParams);
    return (
        <React.Fragment>
            <Drawer
                title="Media"
                placement={"bottom"}
                width={500}
                height="85vh"
                onClose={onClose}
                open={isOpen}
                extra={
                    <Space>
                        <Button onClick={onClose}>Cancel</Button>
                        <Button type="primary" onClick={onClose}>
                            OK
                        </Button>
                    </Space>
                }
            >
                {/* <MediaContainer
                    isLoadingFolder={isLoadingFolder}
                    isLoadingFile={isLoadingFile}
                    folderItems={folderList || []}
                    fileItems={fileList || []}
                    onOpenFolder={() => {}}
                    onUploadFile={() => {}}
                /> */}
            </Drawer>
        </React.Fragment>
    );
};
export default MediaUpload;
