"use client";
import React, { useState, memo } from "react";
import { Drawer, Space, Button } from "antd";
import MediaUploadContainer, { MediaUploadContainerProps } from "../MediaUploadContainer";
import { IMediaFilesProps } from "../MediaUploadContainer/MediaFiles";

import useMessage from "@/hooks/useMessage";
import { isEmpty } from "lodash";
import { MediaTypes } from "@/models/management/media.interface";

export interface MediaUploadProps {
  onClose?: () => void;
  isOpen?: boolean;
  mode?: "multiple" | "single";
  mediaTypes?: MediaTypes[];
  onConfirm?: (files: MediaUploadContainerProps["selectedFiles"]) => void;
  initialValues?: MediaUploadContainerProps["selectedFiles"];
}
const MediaUploadDrawler: React.FC<MediaUploadProps> = ({
  onClose,
  isOpen = false,
  mediaTypes = [MediaTypes.FILE, MediaTypes.ICON, MediaTypes.IMAGE],
  mode = "single",
  initialValues = [],
  onConfirm,
}) => {
  const [selectedFiles, setSelectedFiles] = useState<MediaUploadContainerProps["selectedFiles"]>([]);

  const message = useMessage();

  const onSelectingFile: IMediaFilesProps["onSelect"] = (file) => {
    //Check file selected excepts.

    if (!mediaTypes.includes(file.mediaType)) {
      message.info(`Không cho phép chọn loại ${file.mediaType} .`);
      return;
    }

    setSelectedFiles((oldFiles) => {
      let newFiles = [...oldFiles];

      const fileIndex = newFiles.findIndex((item) => item.key === file.key);

      if (fileIndex !== -1) {
        newFiles.splice(fileIndex, 1);
      }

      if (fileIndex === -1) {
        if (mode === "multiple") {
          newFiles = [...newFiles, file];
        } else {
          newFiles = [file];
        }
      }

      return newFiles;
    });
  };

  const onConfirmSelect = () => {
    !isEmpty(selectedFiles) && onConfirm?.(selectedFiles), onClose?.(), setSelectedFiles([]);
  };

  const closeDrawler = () => {
    setSelectedFiles([]);
    onClose?.();
  };
  return (
    <React.Fragment>
      <Drawer
        title="Media"
        placement={"bottom"}
        width={500}
        height="90vh"
        onClose={closeDrawler}
        open={isOpen}
        destroyOnClose={true}
        zIndex={9999999}
        extra={
          <Space>
            <Button onClick={closeDrawler}>Huỷ</Button>
            <Button type="primary" onClick={onConfirmSelect} disabled={isEmpty(selectedFiles)}>
              Chọn
            </Button>
          </Space>
        }
      >
        <MediaUploadContainer
          mediaTypes={mediaTypes}
          className="container-media"
          onSelect={onSelectingFile}
          selectedFiles={selectedFiles}
        />
      </Drawer>
    </React.Fragment>
  );
};
export default memo(MediaUploadDrawler);
