import React, { useMemo, useState } from "react";
import MediaFiles, { IMediaFilesProps } from "./MediaFiles";
import MediaFolder from "./MediaFolder";
import { useGetMediaFiles, useGetMediaFolders } from "@/queries/media";
import { IMediaFileListRs, QueryParamsMediaFiles, QueryParamsMediaFolders } from "@/models/management/media.interface";
import classNames from "classnames";
import { IMediaFolderListRs } from "@/models/management/media.interface";
import useLocalUserPermissions from "@/hooks/useLocalUserPermissions";
import { ERolesFunctions } from "@/constants/permission.constant";
export interface MediaUploadContainerProps {
  className?: string;
  onSelect: IMediaFilesProps["onSelect"];
  selectedFiles: IMediaFileListRs["result"];
}

export enum EActionType {
  CREATE = "create",
  EDIT = "edit",
}

const MediaUploadContainer: React.FC<MediaUploadContainerProps> = ({ className = "", onSelect, selectedFiles }) => {
  const initQueryFolters = new QueryParamsMediaFolders(1, 20);
  const [queryFolter, setQueryFolder] = useState(initQueryFolters);
  const { data: folderData, isLoading: isLoadingFolder } = useGetMediaFolders(queryFolter);

  const initQueryFiles = new QueryParamsMediaFiles(0, 1, 50);

  const [queryMediaFileParams, setQueryMediaFileParams] = useState(initQueryFiles);

  const { data: fileList, isLoading: isLoadingFile } = useGetMediaFiles(queryMediaFileParams);

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
  const [pers, checkPermission] = useLocalUserPermissions();
  const hasRoleCreate = checkPermission?.([ERolesFunctions.MEDIA_CREATE]);
  return (
    <div
      className={classNames("flex h-full", {
        [className]: className,
      })}
    >
      <div className="col-left w-[260px] h-full pr-4 border-r">
        <MediaFolder
          items={folderData?.list || []}
          isLoading={isLoadingFolder}
          hasRoleCreate={hasRoleCreate}
          onOpen={handleOnpenFilesInFolder}
          paginations={{
            onChangePage: (page, pageSize) => {
              setQueryFolder((oldData) => ({ ...oldData, pageCurrent: page }));
            },
            totalItems: folderData?.totalItems,
            pageSize: folderData?.pageSize,
            currentPage: folderData?.pageCurrent,
          }}
        />
      </div>
      <MediaFiles
        items={fileList || []}
        isLoading={isLoadingFile}
        selectedFiles={selectedFiles}
        onSelect={onSelect}
        hasRoleCreate={hasRoleCreate}
      />
    </div>
  );
};
export default MediaUploadContainer;
