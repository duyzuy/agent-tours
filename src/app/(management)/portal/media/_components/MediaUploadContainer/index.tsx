import React, { useMemo, useState } from "react";
import MediaFiles, { IMediaFilesProps } from "./MediaFiles";
import MediaFolder from "./MediaFolder";
import { useGetMediaFiles, useGetMediaFolders } from "@/queries/media";
import {
  IMediaFileListRs,
  MediaTypes,
  QueryParamsMediaFiles,
  QueryParamsMediaFolders,
} from "@/models/management/media.interface";
import classNames from "classnames";
import { IMediaFolderListRs } from "@/models/management/media.interface";
import useLocalUserPermissions from "@/hooks/useLocalUserPermissions";
import { ERolesFunctions } from "@/constants/permission.constant";
export interface MediaUploadContainerProps {
  className?: string;
  onSelect: IMediaFilesProps["onSelect"];
  selectedFiles: IMediaFileListRs["result"];
  mediaTypes: MediaTypes[];
}

export enum EActionType {
  CREATE = "create",
  EDIT = "edit",
}

const MediaUploadContainer: React.FC<MediaUploadContainerProps> = ({
  className = "",
  onSelect,
  selectedFiles,
  mediaTypes,
}) => {
  const [queryFolter, setQueryFolder] = useState(() => new QueryParamsMediaFolders(1, 20));
  const { data: folderData, isLoading: isLoadingFolder } = useGetMediaFolders(queryFolter);

  const [queryMediaFileParams, setQueryMediaFileParams] = useState(
    () => new QueryParamsMediaFiles({ mediaType: mediaTypes, mediaInFolderRecid: 0, objectType: "MEDIA" }, 1, 30),
  );

  // const [queryMediaFileParams, setQueryMediaFileParams] = useState(initQueryFiles);

  const { data: fileData, isLoading: isLoadingFile } = useGetMediaFiles(queryMediaFileParams);

  /**
   * Refetch Files when open other folder.
   * @param item
   */
  const handleOnpenFilesInFolder = (item: IMediaFolderListRs["result"][0]) => {
    setQueryMediaFileParams((prev) => ({
      ...prev,
      requestObject: {
        ...prev.requestObject,
        mediaInFolderRecid: item.id,
      },
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
        items={fileData?.list || []}
        isLoading={isLoadingFile}
        selectedFiles={selectedFiles}
        onSelect={onSelect}
        hasRoleCreate={hasRoleCreate}
        paginations={{
          onChangePage: (page, pageSize) => {
            setQueryMediaFileParams((oldData) => ({ ...oldData, pageCurrent: page }));
          },
          totalItems: fileData?.totalItems,
          pageSize: fileData?.pageSize,
          currentPage: fileData?.pageCurrent,
        }}
      />
    </div>
  );
};
export default MediaUploadContainer;
