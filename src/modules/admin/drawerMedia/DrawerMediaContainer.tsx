"use client";
import React, { useState, memo } from "react";
import { Drawer, Space, Button } from "antd";
import useMessage from "@/hooks/useMessage";
import { isEmpty } from "lodash";
import MediaManagerContainer, {
  MediaManagerContainerProps,
} from "@/modules/admin/manageMedia/components/MediaManagerContainer";
import { useDrawerMediaManager } from "./store/MediaContainer.context";

export interface DrawerMediaContainerProps {
  className?: string;
}
const DrawerMediaContainer: React.FC<DrawerMediaContainerProps> = ({ className }) => {
  const [{ isOpen, isMultiple, allowTypes, onSelect }, dispatch] = useDrawerMediaManager();

  const [selectedFiles, setSelectedFiles] = useState<Exclude<MediaManagerContainerProps["selectedFiles"], undefined>>(
    [],
  );

  const message = useMessage();

  const handleSelectFile: MediaManagerContainerProps["onSelect"] = (file) => {
    if (!allowTypes.includes(file.mediaType)) {
      message.info(`Không cho phép chọn loại ${file.mediaType} .`);
      return;
    }

    setSelectedFiles((oldFiles) => {
      let newFiles = [...oldFiles];

      const fileIndex = newFiles.findIndex((item) => item.key === file.key);

      if (fileIndex !== -1) {
        newFiles.splice(fileIndex, 1);
      } else {
        if (isMultiple) {
          newFiles = [...newFiles, file];
        } else {
          newFiles = [file];
        }
      }
      return newFiles;
    });
  };

  const handleConfirmSelect = () => {
    onSelect(selectedFiles);
    dispatch({ type: "RESET" });
    setSelectedFiles([]);
  };

  const closeDrawler = () => {
    dispatch({ type: "CLOSE" });
  };
  return (
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
          <Button type="primary" onClick={handleConfirmSelect} disabled={isEmpty(selectedFiles)}>
            Chọn
          </Button>
        </Space>
      }
    >
      <MediaManagerContainer
        mediaTypes={allowTypes}
        className="container-media"
        onSelect={handleSelectFile}
        selectedFiles={selectedFiles}
      />
    </Drawer>
  );
};
export default memo(DrawerMediaContainer);
