"use client";
import React, { useState } from "react";
import PageContainer from "@/components/admin/PageContainer";
import useLocalUserPermissions from "@/hooks/useLocalUserPermissions";

import useMediaFolder from "./modules/useMediaFolder";
import useMediaFile from "./modules/useMediaFile";
import { useGetMediaFolders, useGetMediaFiles } from "@/queries/media";
import { IMediaFolderListRs, QueryParamsMediaFiles } from "@/models/management/media.interface";
import MediaFolder from "./_components/MediaUploadContainer/MediaFolder";
import MediaFiles from "./_components/MediaUploadContainer/MediaFiles";

const MediaPage = () => {
  const { data: folderList, isLoading: isLoadingFolder } = useGetMediaFolders();

  const [queryMediaFileParams, setQueryMediaFileParams] = useState(() => new QueryParamsMediaFiles(0, 1, 30));

  const { data: fileList, isLoading: isLoadingFile } = useGetMediaFiles(queryMediaFileParams);

  const { onCreateFolder, onUpdateFolder } = useMediaFolder();

  const onUploadMediaFile = useMediaFile();

  const [pers, checkPermission] = useLocalUserPermissions();

  /**
   * Refetch Files when open other folder.
   * @param item
   */
  const handleOnpenFilesInFolder = (item: IMediaFolderListRs["result"][0]) => {
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
            isLoading={isLoadingFolder}
            onSave={onUpdateFolder}
            onCreateFolder={onCreateFolder}
            onOpen={handleOnpenFilesInFolder}
          />
        </div>
        <MediaFiles
          items={fileList || []}
          isLoading={isLoadingFile}
          onUpload={onUploadMediaFile}
          folderList={folderList || []}
        />
      </div>
    </PageContainer>
  );
};
export default MediaPage;
