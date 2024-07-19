"use client";
import React, { useState } from "react";
import PageContainer from "@/components/admin/PageContainer";
import useLocalUserPermissions from "@/hooks/useLocalUserPermissions";
import { useGetMediaFolders, useGetMediaFiles } from "@/queries/media";
import {
  IMediaFolderListRs,
  MediaTypes,
  QueryParamsMediaFiles,
  QueryParamsMediaFolders,
} from "@/models/management/media.interface";
import MediaFolder from "./_components/MediaUploadContainer/MediaFolder";
import MediaFiles from "./_components/MediaUploadContainer/MediaFiles";
import { ERolesFunctions } from "@/constants/permission.constant";

const MediaPage = () => {
  const initQueryFolters = new QueryParamsMediaFolders(1, 20);
  const [queryFolder, setQueryFolder] = useState(initQueryFolters);
  const { data: folderData, isLoading: isLoadingFolder } = useGetMediaFolders(queryFolder);

  const [queryMediaFileParams, setQueryMediaFileParams] = useState(
    () =>
      new QueryParamsMediaFiles(
        { mediaType: [MediaTypes.FILE, MediaTypes.ICON, MediaTypes.IMAGE], mediaInFolderRecid: 0, objectType: "MEDIA" },
        1,
        60,
      ),
  );

  const { data: filesData, isLoading: isLoadingFileList } = useGetMediaFiles(queryMediaFileParams);

  const [pers, checkPermission] = useLocalUserPermissions();

  // console.log(
  //   checkPermission?.([
  //     ERolesFunctions.MEDIA_CREATE,
  //     ERolesFunctions.MEDIA_LIST,
  //     ERolesFunctions.MEDIA_UPDATE,
  //     ERolesFunctions.MEDIA_DELETE,
  //   ]),
  // );
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
            items={folderData?.list || []}
            isLoading={isLoadingFolder}
            onOpen={handleOnpenFilesInFolder}
            hasRoleCreate={checkPermission?.([ERolesFunctions.MEDIA_CREATE])}
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
          items={filesData?.list || []}
          isLoading={isLoadingFileList}
          hasRoleCreate={checkPermission?.([ERolesFunctions.MEDIA_CREATE])}
          paginations={{
            onChangePage: (page, pageSize) => {
              setQueryMediaFileParams((oldData) => ({ ...oldData, pageCurrent: page }));
            },
            totalItems: filesData?.totalItems,
            pageSize: filesData?.pageSize,
            currentPage: filesData?.pageCurrent,
          }}
        />
      </div>
    </PageContainer>
  );
};
export default MediaPage;
