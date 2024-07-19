import React, { memo, useCallback, useState } from "react";
import { Tabs, TabsProps, Spin, Empty, Pagination, PaginationProps } from "antd";
import { isEmpty } from "lodash";
import { IMediaFileListRs, IMediaFolderListRs } from "@/models/management/media.interface";
import { mediaConfig } from "@/configs";
import MediaFileItem from "@/components/admin/media/MediaFileItem";
import UploadFileForm, { UploadFileFormProps } from "./UploadFileForm";
import ModalPreview from "./ModalPreview";
import useMediaFile from "../../modules/useMediaFile";
export interface IMediaFilesProps {
  items: IMediaFileListRs["result"];
  isLoading?: boolean;
  onSelect?: (item: IMediaFileListRs["result"][0]) => void;
  selectedFiles?: IMediaFileListRs["result"];
  hasRoleCreate?: boolean;
  paginations?: MediaFilesItemListProps["paginations"];
}
type MediaFileTabPanel = "mediaFiles" | "upload";

const MediaFiles = ({
  items,
  isLoading = false,
  selectedFiles = [],
  onSelect,
  hasRoleCreate = false,
  paginations,
}: IMediaFilesProps) => {
  const [mediaTab, setMediaTab] = useState<MediaFileTabPanel>("mediaFiles");

  const { onUploadMedia: onUploadFile, isPending: isUploading } = useMediaFile();

  const onResetTab = () => {
    setMediaTab("mediaFiles");
  };
  const onChangeTab = (activeKey: string) => {
    setMediaTab(activeKey as MediaFileTabPanel);
  };

  let itemsTab: TabsProps["items"] = [
    {
      key: "mediaFiles",
      label: "Thư viện",
      children: (
        <MediaFiles.ItemList
          items={items}
          isLoading={isLoading}
          onSelect={onSelect}
          selectedFiles={selectedFiles}
          paginations={paginations}
        />
      ),
    },
  ];

  if (hasRoleCreate) {
    itemsTab = [
      ...itemsTab,
      {
        key: "upload",
        label: "Tải file",
        children: <UploadFileForm onUpload={onUploadFile} uploading={isUploading} onResetTab={onResetTab} />,
      },
    ];
  }
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
  paginations?: {
    onChangePage?: PaginationProps["onChange"];
    currentPage?: number;
    totalItems?: number;
    pageSize?: number;
  };
}
MediaFiles.ItemList = function MediaFilesItemList({
  items,
  isLoading,
  onSelect,
  selectedFiles,
  paginations,
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
    (file: IMediaFileListRs["result"][0], files: IMediaFilesProps["selectedFiles"]) => {
      return Boolean(files?.find((item) => item.key === file.key));
    },
    [],
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-2">
        <Spin />
      </div>
    );
  }
  return (
    <>
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
        <div className="thumbnail-list mb-12">
          <div className="text-right pt-4 pb-6 px-3 border-b">
            <Pagination
              total={paginations?.totalItems}
              pageSize={paginations?.pageSize}
              current={paginations?.currentPage}
              onChange={paginations?.onChangePage}
              size="small"
              showTotal={(total) => `Có tất cả ${total} items`}
            />
          </div>
          <div className="flex items-center flex-wrap gap-4 py-8 mb-12">
            {items.map((item) => (
              <MediaFileItem
                key={item.key}
                type={item.mediaType}
                item={item}
                fileType={item.extension.replace(".", "")}
                filePath={`${mediaConfig.rootApiPath}/${item.fullPath}`}
                fileName={item.slug}
                onSelect={onSelect}
                isSelected={hasSelectedFile(item, selectedFiles)}
                onPreview={onPreviewImage}
              />
            ))}
          </div>
        </div>
      )}
      <ModalPreview
        isOpen={preview.isShow}
        onClose={() => setPreview({ isShow: false, thumbnail: undefined })}
        thumbUrl={preview.thumbnail}
      />
    </>
  );
};
