"use client";
import React, { useCallback, useState } from "react";
import { Drawer, Space, Button } from "antd";
import MediaUploadContainer, {
    MediaUploadContainerProps,
} from "../MediaUploadContainer";
import { IMediaFilesProps } from "../MediaUploadContainer/MediaFiles";

import useMessage from "@/hooks/useMessage";
import { isEmpty } from "lodash";

export interface IMediaUploadProps {
    onClose: () => void;
    isOpen: boolean;
    isMultipleSelect?: boolean;
    exceptsSelect?: string[];
    onConfirm?: (files: MediaUploadContainerProps["selectedFiles"]) => void;
    initialValues?: MediaUploadContainerProps["selectedFiles"];
}
const MediaUploadDrawler: React.FC<IMediaUploadProps> = ({
    onClose,
    isOpen,
    exceptsSelect = ["IMAGE", "ICON", "FILE"],
    isMultipleSelect = false,
    initialValues = [],
    onConfirm,
}) => {
    const [selectedFiles, setSelectedFiles] = useState<
        MediaUploadContainerProps["selectedFiles"]
    >([]);

    const message = useMessage();

    const onSelectingFile: IMediaFilesProps["onSelect"] = (file) => {
        //Check file selected excepts.
        if (!exceptsSelect.includes(file.type)) {
            message.info(`Không cho phép chọn loại ${file.type} .`);
            return;
        }

        let newSelectedFiles = [...selectedFiles];
        const fileIndex = newSelectedFiles.findIndex(
            (item) => item.key === file.key,
        );

        if (fileIndex !== -1) {
            newSelectedFiles.splice(fileIndex, 1);
        } else {
            if (isMultipleSelect) {
                newSelectedFiles = [...newSelectedFiles, file];
            } else {
                newSelectedFiles = [file];
            }
        }

        setSelectedFiles(() => [...newSelectedFiles]);
    };

    const onConfirmSelect = () => {
        !isEmpty(selectedFiles) && onConfirm?.(selectedFiles);
        onClose();
    };
    return (
        <React.Fragment>
            <Drawer
                title="Media"
                placement={"bottom"}
                width={500}
                height="85vh"
                onClose={onClose}
                open={isOpen}
                destroyOnClose={true}
                zIndex={9999999}
                extra={
                    <Space>
                        <Button onClick={onClose}>Huỷ</Button>
                        <Button
                            type="primary"
                            onClick={onConfirmSelect}
                            disabled={isEmpty(selectedFiles)}
                        >
                            Chọn
                        </Button>
                    </Space>
                }
            >
                <MediaUploadContainer
                    className="container-media"
                    onSelect={onSelectingFile}
                    selectedFiles={selectedFiles}
                />
            </Drawer>
        </React.Fragment>
    );
};
export default MediaUploadDrawler;
