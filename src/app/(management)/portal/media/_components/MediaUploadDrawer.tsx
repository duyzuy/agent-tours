"use client";
import React, { useState, memo } from "react";
import { Drawer, Space, Button } from "antd";
import useMessage from "@/hooks/useMessage";
import { isEmpty } from "lodash";
import { MediaTypes } from "@/models/management/media.interface";
import MediaManagerContainer, {
  MediaManagerContainerProps,
} from "@/modules/admin/manageMedia/components/MediaManagerContainer";

export interface MediaUploadDrawerProps {
  onClose?: () => void;
  isOpen?: boolean;
  mode?: "multiple" | "single";
  mediaTypes?: MediaTypes[];
  onConfirm?: (files: Exclude<MediaManagerContainerProps["selectedFiles"], undefined>) => void;
  initialValues?: MediaManagerContainerProps["selectedFiles"];
}
const MediaUploadDrawer: React.FC<MediaUploadDrawerProps> = ({
  onClose,
  isOpen = false,
  mediaTypes = [MediaTypes.FILE, MediaTypes.ICON, MediaTypes.IMAGE],
  mode = "single",
  initialValues = [],
  onConfirm,
}) => {
  const [selectedFiles, setSelectedFiles] = useState<Exclude<MediaManagerContainerProps["selectedFiles"], undefined>>(
    [],
  );

  const message = useMessage();

  const handleSelectFile: MediaManagerContainerProps["onSelect"] = (file) => {
    if (!mediaTypes.includes(file.mediaType)) {
      message.info(`Không cho phép chọn loại ${file.mediaType} .`);
      return;
    }

    setSelectedFiles((oldFiles) => {
      let newFiles = [...oldFiles];

      const fileIndex = newFiles.findIndex((item) => item.key === file.key);

      if (fileIndex !== -1) {
        newFiles.splice(fileIndex, 1);
      } else {
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
        <MediaManagerContainer
          mediaTypes={mediaTypes}
          className="container-media"
          onSelect={handleSelectFile}
          selectedFiles={selectedFiles}
        />
      </Drawer>
    </React.Fragment>
  );
};
export default memo(MediaUploadDrawer);
