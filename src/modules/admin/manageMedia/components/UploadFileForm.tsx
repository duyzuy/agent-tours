import React, { useState } from "react";
import { Upload, Button, Form } from "antd";
import { UploadProps } from "antd/es/upload";
import { UploadOutlined } from "@ant-design/icons";
import FormItem from "@/components/base/FormItem";
import useMessage from "@/hooks/useMessage";
import { isArray, isEmpty } from "lodash";
import { mediaConfig } from "@/configs";
import FolderTreeSelector, { FolderTreeSelectorProps } from "./CreateFolderForm/FolderTreeSelector";
import { MediaUploadFormData } from "../media.interface";
export interface UploadFileFormProps {
  uploading?: boolean;
  onUpload: (data: MediaUploadFormData, cb?: () => void) => void;
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
  const initFormData = new MediaUploadFormData(
    mediaConfig.rootFolder,
    mediaConfig.rootFolder,
    0,
    [],
    mediaConfig.rootFolder,
  );

  const [formData, setFormData] = useState<MediaUploadFormData>(initFormData);

  const beforeUpload: UploadProps["beforeUpload"] = (file) => {
    const isValidFileType = checkValidFileType(file.type);

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
    onResetTab?.();
    setFormData(initFormData);
  };
  const handleSelectFolder: FolderTreeSelectorProps["onSelect"] = (value, option) => {
    const folderItem = isArray(option) ? option[0] : option;

    setFormData((prev) => {
      const { folderPath } = prev;
      let newFolderPath = folderPath;
      if (folderItem.nestedSlugs) {
        newFolderPath = [...folderItem.nestedSlugs, folderItem.slug].join("/");
      }
      return {
        ...prev,
        folderId: folderItem.id,
        folderName: folderItem.title,
        folderPath: newFolderPath,
        folderSlug: folderItem.slug,
      };
    });
  };
  return (
    <React.Fragment>
      <div className="upload-area mb-8 flex items-center justify-center">
        <div className="upload-form w-96">
          <Upload
            multiple={true}
            listType="picture-card"
            accept={mediaConfig.accept}
            maxCount={mediaConfig.maxCount}
            fileList={formData.fileList}
            disabled={uploading}
            beforeUpload={beforeUpload}
            onRemove={onRemoveFile}
            className="w-full"
          >
            {formData.fileList.length >= mediaConfig.maxCount ? null : (
              <div>
                <UploadOutlined />
                <p>Chọn file</p>
              </div>
            )}
          </Upload>
          <Form layout="vertical">
            <FormItem label="Chọn thư mục lưu trữ" required>
              <FolderTreeSelector value={formData.folderSlug} onSelect={handleSelectFolder} disabled={uploading} />
            </FormItem>
            <Button
              type="primary"
              onClick={() => onUpload(formData, onResetFiles)}
              disabled={isEmpty(formData.fileList)}
              loading={uploading}
            >
              {uploading ? "Uploading" : "Upload"}
            </Button>
          </Form>
        </div>
      </div>
    </React.Fragment>
  );
};
export default UploadFileForm;

const checkValidFileType = (fileType: string) => {
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
