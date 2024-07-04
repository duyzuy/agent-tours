import React, { useEffect, useState } from "react";
import { Button, Input, Typography } from "antd";

import {
    DeleteOutlined,
    LinkOutlined,
    UploadOutlined,
} from "@ant-design/icons";
import { mediaConfig } from "@/configs";

import MediaUploadDrawler, {
    MediaUploadProps,
} from "@/app/(management)/portal/media/_components/MediaUploadDrawler";
import { CMSTemplateContentFormData } from "../../../modules/cmsTemplate.interface";
import Link from "next/link";
import { isEmpty, isUndefined } from "lodash";

export interface FileDownloadSelectorProps {
    files?: CMSTemplateContentFormData["downloads"];
    setFiles?: (files: CMSTemplateContentFormData["downloads"]) => void;
}
const FileDownloadSelector: React.FC<FileDownloadSelectorProps> = ({
    files = [],
    setFiles,
}) => {
    const [openMedia, setOpenMedia] = useState(false);
    const [indexItem, setIndexItem] = useState(-1);

    const confirmSelect: MediaUploadProps["onConfirm"] = (fileItems) => {
        if (indexItem === -1) return;
        const fileSelect = fileItems[0];
        let newFileItems = [...files];

        const filePath = fileSelect.fullPath;
        newFileItems.splice(indexItem, 1, {
            ...newFileItems[indexItem],
            link: filePath,
        });

        setFiles?.([...newFileItems]);
    };
    const removeFileItem = (index: number) => {
        let newItems = [...files];
        newItems.splice(index, 1);
        setFiles?.(newItems);
    };
    const addFileFields = () => {
        setFiles?.([...files, { title: "", link: "" }]);
    };

    const onChangeNameFile = (index: number, value: string) => {
        let newFileItems = [...files];

        newFileItems.splice(index, 1, {
            ...newFileItems[index],
            title: value,
        });
        setFiles?.(newFileItems);
    };
    const showMediaUpload = (index: number) => {
        setIndexItem(index);
        setOpenMedia(true);
    };
    const closeMediaUpload = () => {
        setOpenMedia(false);
        setIndexItem(-1);
    };

    return (
        <>
            <Typography.Title level={4}>Files download</Typography.Title>
            <div className="files-container mb-6 rounded-md">
                <div className="list-files">
                    {files.map(({ title, link }, _index) => (
                        <div key={_index} className="block mb-6">
                            <div className="flex items-center gap-x-4">
                                <div className="flex items-center">
                                    <Button
                                        type="text"
                                        icon={<DeleteOutlined />}
                                        danger
                                        onClick={() => removeFileItem(_index)}
                                    ></Button>
                                    <Input
                                        placeholder="Tên file"
                                        value={title}
                                        onChange={(ev) =>
                                            onChangeNameFile(
                                                _index,
                                                ev.target.value,
                                            )
                                        }
                                    />
                                </div>
                                <Button
                                    type="dashed"
                                    icon={<UploadOutlined />}
                                    onClick={() => showMediaUpload(_index)}
                                >
                                    Chọn file
                                </Button>
                            </div>
                            {isEmpty(link) ? null : (
                                <p className="mt-2 line-clamp-1 max-w-sm">
                                    <Link
                                        href={`${mediaConfig.rootApiPath}/${link}`}
                                        className="flex items-center"
                                        target="_blank"
                                    >
                                        <LinkOutlined />
                                        <span className="line-clamp-1 ml-2 text-xs">
                                            {link}
                                        </span>
                                    </Link>
                                </p>
                            )}
                        </div>
                    ))}
                </div>
                <div>
                    <Button type="dashed" size="small" onClick={addFileFields}>
                        Thêm
                    </Button>
                </div>
            </div>
            <MediaUploadDrawler
                exceptsSelect={["FILE"]}
                isOpen={openMedia}
                onClose={closeMediaUpload}
                onConfirm={confirmSelect}
            />
        </>
    );
};
export default FileDownloadSelector;
