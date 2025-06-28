import React, { memo, useCallback, useEffect, useRef, useState } from "react";
import { Tabs, TabsProps, Spin, Empty, Pagination, Divider } from "antd";
import { IMediaFileListRs, MediaTypes } from "@/models/management/media.interface";
import { mediaConfig } from "@/configs";
import MediaFileItem from "@/components/admin/media/MediaFileItem";
import UploadFileForm, { UploadFileFormProps, UploadFileFormRef } from "./UploadFileForm";
import FilePreviewModal from "@/components/admin/media/FilePreviewModal";
import { useGetMediaFiles } from "@/modules/admin/manageMedia/hooks/useGetMediaFiles";
import { useMediaManager, useMediaManagerSelector } from "../store/media.context";
import { useUploadMediaFiles } from "@/modules/admin/manageMedia";
import useMessage from "@/hooks/useMessage";
import { RcFile } from "antd/es/upload";

export interface MediaFilesWraperProps {
  onSelect?: (item: IMediaFileListRs["result"][number]) => void;
  hasRoleCreate?: boolean;
  selectedFiles?: IMediaFileListRs["result"];
  mediaTypes: MediaTypes[];
}
type MediaFileTabPanel = "mediaFiles" | "upload";

const MediaFilesWraper = ({ mediaTypes, onSelect, hasRoleCreate = false, selectedFiles }: MediaFilesWraperProps) => {
  const [mediaTab, setMediaTab] = useState<MediaFileTabPanel>("mediaFiles");
  const { mutate: uploadFiles, isPending: isUploading } = useUploadMediaFiles();
  const uploadFormRef = useRef<UploadFileFormRef>(null);

  const handleChangeTab = (activeKey: string) => {
    setMediaTab(activeKey as MediaFileTabPanel);
  };

  const handleUploadFiles: UploadFileFormProps["onUpload"] = (data) => {
    const { fileList, ...restData } = data;
    const formData = new FormData();
    data.fileList.forEach((file) => {
      formData.append("files[]", file as RcFile);
    });
    formData.append("folder", JSON.stringify(restData));

    uploadFiles(formData, {
      onSuccess(data, variables, context) {
        uploadFormRef.current?.reset();
        setMediaTab("mediaFiles");
      },
    });
  };

  let itemsTab: TabsProps["items"] = [
    {
      key: "mediaFiles",
      label: "Thư viện",
      children: <MediaFilesWraper.ItemList mediaTypes={mediaTypes} selectedFiles={selectedFiles} onSelect={onSelect} />,
    },
  ];

  if (hasRoleCreate) {
    itemsTab = [
      ...itemsTab,
      {
        key: "upload",
        label: "Upload",
        children: <UploadFileForm ref={uploadFormRef} onUpload={handleUploadFiles} uploading={isUploading} />,
      },
    ];
  }
  return (
    <Tabs
      destroyInactiveTabPane={true}
      defaultActiveKey={mediaTab}
      activeKey={mediaTab}
      onChange={handleChangeTab}
      items={itemsTab}
      indicatorSize={(origin) => origin - 16}
    />
  );
};
export default memo(MediaFilesWraper);

interface MediaFilesItemListProps {
  mediaTypes: MediaFilesWraperProps["mediaTypes"];
  onSelect: MediaFilesWraperProps["onSelect"];
  selectedFiles?: IMediaFileListRs["result"];
}

MediaFilesWraper.ItemList = function MediaFilesItemList({
  mediaTypes,
  onSelect,
  selectedFiles,
}: MediaFilesItemListProps) {
  const message = useMessage();

  // const selectedFiles = useMediaManagerSelector((state) => state.files);
  const [_, dispatch] = useMediaManager();
  const selectedFolder = useMediaManagerSelector((state) => state.selectedFolder);
  const mediaFileQueryParams = useMediaManagerSelector((state) => state.queryParams.file);

  const { data, isLoading } = useGetMediaFiles(mediaFileQueryParams);
  const [pagination, setPaginationInfo] = useState({ pageSize: 10, current: 1, total: 0 });

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
  const closePreviewModal = () => {
    setPreview({ isShow: false, thumbnail: undefined });
  };
  const handleCoppyText = (e: React.MouseEvent<HTMLElement, MouseEvent>, text: string) => {
    navigator.clipboard.writeText(text);
    message.success("Đã sao chép.");
    e.stopPropagation();
  };

  const hasSelectedFile = useCallback(
    (recId: number) => {
      return Boolean(selectedFiles?.find((item) => item.id === recId));
    },
    [selectedFiles],
  );

  const handleChangePage = (page: number, pageSize: number) => {
    dispatch({
      type: "SET_QUERY_FILES",
      payload: { ...mediaFileQueryParams, pageCurrent: page, pageSize: pageSize },
    });
  };
  useEffect(() => {
    dispatch({
      type: "SET_QUERY_FILES",
      payload: {
        ...mediaFileQueryParams,
        requestObject: {
          ...mediaFileQueryParams.requestObject,
          mediaType: mediaTypes,
        },
      },
    });
  }, [mediaTypes]);

  useEffect(() => {
    if (data) {
      setPaginationInfo({ current: data.pageCurrent, pageSize: data.pageSize, total: data.totalItems });
    }
  }, [data]);
  return (
    <>
      <div className="flex items-center justify-between pt-3">
        <div className="font-semibold text-lg">{selectedFolder?.folderName}</div>
        <Pagination
          {...pagination}
          onChange={handleChangePage}
          size="small"
          showTotal={(total) => `Có tất cả ${total} items`}
        />
      </div>
      <Divider />
      <div className="media-list py-6">
        {isLoading ? (
          <Spin>
            <div className="mx-auto w-40 h-10 flex items-center justify-center">Đang tải</div>
          </Spin>
        ) : data?.list.length ? (
          <div className="flex items-center flex-wrap gap-4">
            {data.list.map((item) => (
              <MediaFileItem
                key={item.key}
                type={item.mediaType}
                item={item}
                fileType={item.extension.replace(".", "")}
                filePath={`${mediaConfig.rootApiPath}/${item.fullPath}`}
                fileName={item.slug}
                onSelect={onSelect}
                isSelected={hasSelectedFile(item.id)}
                onPreview={onPreviewImage}
                onCoppyPath={handleCoppyText}
              />
            ))}
          </div>
        ) : (
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description={
              <div className="text-center">
                <p>Chưa có file nào trong thư mục này.</p>
                <p>Vui lòng chọn tải file để upload</p>
              </div>
            }
          />
        )}
      </div>
      <FilePreviewModal isOpen={preview.isShow} onClose={closePreviewModal} thumbUrl={preview.thumbnail} />
    </>
  );
};
