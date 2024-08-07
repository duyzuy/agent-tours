import React, { useMemo, useState } from "react";
import { Upload, Button, Form, Row, Col, Empty, TreeSelect, TreeSelectProps } from "antd";
import { UploadFile, UploadProps } from "antd/es/upload";
import { UploadOutlined } from "@ant-design/icons";
import FormItem from "@/components/base/FormItem";
import { IMediaFolderListRs } from "@/models/management/media.interface";
import useMessage from "@/hooks/useMessage";
import { isArray, isEmpty } from "lodash";
import { mediaConfig } from "@/configs";
import FolderTreeSelector, { FolderTreeSelectorProps } from "./FolderSelector";

export interface UploadFileFormProps {
  uploading?: boolean;
  onUpload: (payload: { folder: FolderItemTree; fileList: UploadFile[] }, cb?: () => void) => void;
  onResetTab?: () => void;
}
export type FolderItemTree = {
  title: string;
  slug: string;
  id: number;
  nestedSlug: string[];
  parentId?: number;
  path: string;
  value: string;
  children: FolderItemTree[];
};

const UploadFileForm: React.FC<UploadFileFormProps> = ({ uploading, onUpload, onResetTab }) => {
  const message = useMessage();

  const initFolderItem: FolderItemTree = {
    id: 0,
    title: "Thư mục gốc",
    slug: "uploads",
    nestedSlug: ["uploads"],
    path: "uploads",
    value: "uploads",
    children: [],
  };
  const [formData, setFormData] = useState<{
    folder: FolderItemTree;
    fileList: UploadFile[];
  }>({ folder: initFolderItem, fileList: [] });

  const beforeUpload: UploadProps["beforeUpload"] = (file) => {
    const isValidFileType = isValidMediaFileTypes(file.type);

    if (!isValidFileType) {
      message.error("Định dạng file không hợp lệ");
    }
    const isValidFileSize = file.size / 1024 / 1024 < mediaConfig.maxfileSize;

    if (!isValidFileSize) {
      message.error(`Kích thước file phải nhỏ hơn ${mediaConfig.maxfileSize}MB!`);
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
  const onSelectFolder: FolderTreeSelectorProps["onSelect"] = (value, option) => {
    setFormData((prev) => ({
      ...prev,
      folder: isArray(option) ? option[0] : option,
    }));
  };
  return (
    <React.Fragment>
      <div className="upload-area mb-8 flex items-center justify-center">
        <div className="upload-form w-96">
          <Form layout="vertical">
            <FormItem label="Chọn thư mục lưu trữ" required>
              <FolderTreeSelector value={formData.folder.value} onSelect={onSelectFolder} disabled={uploading} />
            </FormItem>
          </Form>
          <Upload
            multiple={true}
            maxCount={mediaConfig.maxCount}
            fileList={formData.fileList}
            listType="picture-card"
            beforeUpload={beforeUpload}
            onRemove={onRemoveFile}
            accept={mediaConfig.accept}
            disabled={uploading}
            className="w-full"
          >
            {formData.fileList.length >= mediaConfig.maxCount ? null : (
              <div>
                <UploadOutlined />
                <p>Chọn file</p>
              </div>
            )}
          </Upload>
          {isEmpty(formData.fileList) ? (
            <Empty description={<p className="text-gray-500">Chưa có file nào được chọn</p>} className="pt-6" />
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
export default UploadFileForm;

const isValidMediaFileTypes = (fileType: string) => {
  let isValid = false;
  Object.keys(mediaConfig.fileType).forEach((key: string) => {
    if (!isValid) {
      mediaConfig.fileType[key as keyof typeof mediaConfig.fileType].forEach((type) => {
        if (fileType === type) {
          isValid = true;
          return;
        }
      });
    }
  });

  return isValid;
};
