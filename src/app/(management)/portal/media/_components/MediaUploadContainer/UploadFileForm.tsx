import React, { useMemo, useState } from "react";
import { Upload, Button, Form, Row, Col, Empty, TreeSelect, TreeSelectProps } from "antd";
import { UploadFile, UploadProps } from "antd/es/upload";
import { UploadOutlined } from "@ant-design/icons";
import FormItem from "@/components/base/FormItem";
import { IMediaFolderListRs } from "@/models/management/media.interface";
import useMessage from "@/hooks/useMessage";
import { isEmpty } from "lodash";
import { mediaConfig } from "@/configs";

export interface UploadFileFormProps {
  uploading?: boolean;
  onUpload: (payload: { folder: FolderItemTree; fileList: UploadFile[] }, cb?: () => void) => void;
  folderList: IMediaFolderListRs["result"];
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

const UploadFileForm: React.FC<UploadFileFormProps> = ({ uploading, onUpload, folderList, onResetTab }) => {
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

  const folderTreeOptions = useMemo(() => {
    let option: FolderItemTree = {
      id: 0,
      title: "Thư mục gốc",
      slug: "uploads",
      path: "uploads",
      value: "uploads",
      nestedSlug: ["uploads"],
      children: [],
    };

    const getFolderListTree = (
      items: IMediaFolderListRs["result"],
      parentId: number,
      parentFolderSlug: string[],
      path: string,
    ) => {
      let folders: FolderItemTree[] = [];

      items.forEach((item) => {
        let chilFolders: FolderItemTree[] = [];

        if (item.children && item.children.length) {
          chilFolders = getFolderListTree(
            item.children,
            item.id,
            [...parentFolderSlug, item.folderSlug],
            `${parentFolderSlug}/${item.folderSlug}`,
          );
        }

        folders = [
          ...folders,
          {
            id: item.id,
            title: item.folderName,
            slug: item.folderSlug,
            nestedSlug: [...parentFolderSlug, item.folderSlug],
            path: `${path}/${item.folderSlug}`,
            parentId: parentId,
            value: item.key,
            children: chilFolders,
          },
        ];
      });

      return folders;
    };
    if (!isEmpty(folderList)) {
      //   let items: FolderItemTree[] = [];

      const itemsListTree = getFolderListTree(folderList, 0, [mediaConfig.rootFolder], mediaConfig.rootFolder);
      //   console.log(latestFolter);
      //   folderList.forEach((fold) => {
      //     let childs: FolderItemTree[] = [];

      //     if (!isEmpty(fold.children)) {
      //       fold.children.forEach((child) => {
      //         childs = [
      //           ...childs,
      //           {
      //             id: child.id,
      //             title: child.folderName,
      //             value: child.folderSlug,
      //             nestedSlug: [mediaConfig.rootFolder, fold.folderSlug, child.folderSlug],
      //             path: `${mediaConfig.rootFolder}/${fold.folderSlug}/${child.folderSlug}`,
      //             parentId: fold.id,
      //             children: [],
      //           },
      //         ];
      //       });
      //     }

      //     items = [
      //       ...items,
      //       {
      //         id: fold.id,
      //         title: fold.folderName,
      //         value: fold.folderSlug,
      //         nestedSlug: [mediaConfig.rootFolder, fold.folderSlug],
      //         path: `${mediaConfig.rootFolder}/${fold.folderSlug}`,
      //         parentId: 0,
      //         children: childs,
      //       },
      //     ];
      //   });
      option = {
        ...option,
        children: itemsListTree,
      };
    }
    return [option];
  }, [folderList]);

  console.log(folderTreeOptions);
  const onSelect: TreeSelectProps<string, FolderItemTree>["onSelect"] = (value, item) => {
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
                    treeData={folderTreeOptions}
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
            accept={mediaConfig.accept}
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
