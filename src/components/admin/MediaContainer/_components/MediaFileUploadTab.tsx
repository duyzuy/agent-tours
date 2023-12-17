import React, { memo, useMemo, useState } from "react";
import {
    Upload,
    Button,
    Form,
    Row,
    Col,
    Empty,
    TreeSelect,
    TreeSelectProps,
} from "antd";
import { UploadFile, UploadProps, RcFile } from "antd/es/upload";
import { UploadOutlined } from "@ant-design/icons";
import FormItem from "@/components/base/FormItem";
import { IMediaFolderListRs } from "@/models/management/media.interface";
import useMessage from "@/hooks/useMessage";

import { isEmpty } from "lodash";
import { mediaConfig } from "@/configs";
interface Props {
    uploading?: boolean;
    accept?: string;
    onUpload: (
        payload: { folder: TFolderSelect; fileList: UploadFile[] },
        cb?: () => void,
    ) => void;
    folderList: IMediaFolderListRs["result"];
    maxfileSize?: number;
    onResetTab?: () => void;
}
export type TFolderSelect = {
    title: string;
    value: string;
    id: number;
    nestedSlug: string[];
    parentId?: number;
    children: TFolderSelect[];
};

const MediaUploadTab: React.FC<Props> = ({
    uploading,
    accept,
    onUpload,
    folderList,
    maxfileSize = 2,
    onResetTab,
}) => {
    const message = useMessage();

    const initFolderItem: TFolderSelect = {
        id: 0,
        title: "Thư mục gốc",
        value: "uploads",
        nestedSlug: ["uploads"],
        children: [],
    };
    const [formData, setFormData] = useState<{
        folder: TFolderSelect;
        fileList: UploadFile[];
    }>({ folder: initFolderItem, fileList: [] });

    const treeOptionSelect = useMemo(() => {
        let option: TFolderSelect = {
            id: 0,
            title: "Thư mục gốc",
            value: "uploads",
            nestedSlug: ["uploads"],
            children: [],
        };
        if (!isEmpty(folderList)) {
            let items: TFolderSelect[] = [];
            folderList.forEach((fold) => {
                let childs: TFolderSelect[] = [];

                if (!isEmpty(fold.children)) {
                    fold.children.forEach((child) => {
                        childs = [
                            ...childs,
                            {
                                id: child.id,
                                title: child.folderName,
                                value: child.folderSlug,
                                nestedSlug: [
                                    mediaConfig.rootFolder,
                                    fold.folderSlug,
                                    child.folderSlug,
                                ],
                                parentId: fold.id,
                                children: [],
                            },
                        ];
                    });
                }

                items = [
                    ...items,
                    {
                        id: fold.id,
                        title: fold.folderName,
                        value: fold.folderSlug,
                        nestedSlug: [mediaConfig.rootFolder, fold.folderSlug],
                        parentId: 0,
                        children: childs,
                    },
                ];
            });
            option = {
                ...option,
                children: items,
            };
        }
        return [option];
    }, [folderList]);

    const onSelect: TreeSelectProps<string, TFolderSelect>["onSelect"] = (
        value,
        item,
    ) => {
        setFormData((prev) => ({
            ...prev,
            folder: item,
        }));
    };

    const beforeUpload: UploadProps["beforeUpload"] = (file) => {
        const isValidFileType = isValidMediaFileTypes(file.type);

        if (!isValidFileType) {
            message.error("Định dạng file không hợp lệ");
        }
        const isValidFileSize = file.size / 1024 / 1024 < maxfileSize;

        if (!isValidFileSize) {
            message.error(`Kích thước file phải nhỏ hơn ${maxfileSize}MB!`);
        }

        if (isValidFileSize && isValidFileType) {
            setFormData((prev) => ({
                ...prev,
                fileList: [...prev.fileList, file],
            }));
        }

        return false;
    };

    const onRemoveFile: UploadProps["onRemove"] = (file) => {
        let newFiles = [...formData.fileList];
        newFiles = newFiles.filter((item) => item.uid !== file.uid);
        setFormData((prev) => ({
            ...prev,
            fileList: [...newFiles],
        }));
    };
    const onResetFiles = () => {
        setFormData({ folder: initFolderItem, fileList: [] });
        onResetTab?.();
    };
    return (
        <React.Fragment>
            <div className="upload-area mb-8 flex items-center justify-center">
                <div className="upload-form w-96">
                    <Form layout="vertical">
                        <Row gutter={16}>
                            <Col span={24}>
                                <FormItem label="Chọn thư mục lưu trữ" required>
                                    <TreeSelect
                                        defaultValue={formData.folder.value}
                                        treeLine={true}
                                        value={formData.folder.value}
                                        treeDefaultExpandAll={true}
                                        placeholder="Chọn thư mục"
                                        className="w-full"
                                        treeData={treeOptionSelect}
                                        onSelect={onSelect}
                                    />
                                </FormItem>
                            </Col>
                        </Row>
                    </Form>
                    <Upload
                        multiple={true}
                        maxCount={mediaConfig.maxCount}
                        fileList={formData.fileList}
                        listType="picture-card"
                        beforeUpload={beforeUpload}
                        onRemove={onRemoveFile}
                        accept={accept}
                        className="w-full"
                    >
                        {formData.fileList.length >=
                        mediaConfig.maxCount ? null : (
                            <div>
                                <UploadOutlined />
                                <p>Chọn file</p>
                            </div>
                        )}
                    </Upload>
                    {isEmpty(formData.fileList) ? (
                        <Empty
                            description={
                                <p className="text-gray-500">
                                    Chưa có file nào được chọn
                                </p>
                            }
                            className="pt-6"
                        />
                    ) : null}
                </div>
            </div>
            <div className="actions flex items-center justify-center mb-8">
                <Button
                    type="primary"
                    onClick={() => onUpload(formData, onResetFiles)}
                    disabled={isEmpty(formData.fileList)}
                    loading={uploading}
                >
                    {uploading ? "Uploading" : "Upload"}
                </Button>
            </div>
        </React.Fragment>
    );
};
export default memo(MediaUploadTab);

const isValidMediaFileTypes = (fileType: string) => {
    let isValid = false;
    Object.keys(mediaConfig.fileType).forEach((key: string) => {
        if (!isValid) {
            mediaConfig.fileType[
                key as keyof typeof mediaConfig.fileType
            ].forEach((type) => {
                if (fileType === type) {
                    isValid = true;
                    return;
                }
            });
        }
    });

    return isValid;
};
