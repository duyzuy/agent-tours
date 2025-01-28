import React, { useMemo, useState } from "react";
import { Space, Button, Form, Input } from "antd";
import { mediaConfig } from "@/configs";
import FormItem from "@/components/base/FormItem";
import { CreateMediaFolderPayload } from "@/models/management/media.interface";
import { stringToSlug } from "@/utils/stringToSlug";
import { isArray, isEmpty, isUndefined } from "lodash";
import useMessage from "@/hooks/useMessage";
import { HandleSubmit, useFormSubmit } from "@/hooks/useFormSubmit";
import { MediaFolderCreateFormData } from "../../media.interface";
import { mediaFolderCreateSchema } from "../../media.schema";
import FolderTreeSelector, { FolderTreeSelectorProps } from "./FolderTreeSelector";

export interface CreateFolderFormProps {
  onCancel: () => void;
  onSubmit?: (formData: MediaFolderCreateFormData, cb?: () => void) => void;
  onChangeTabPanel: () => void;
  loading?: boolean;
}

const CreateFolderForm: React.FC<CreateFolderFormProps> = ({ onCancel, onSubmit, onChangeTabPanel, loading }) => {
  const { handlerSubmit, errors } = useFormSubmit({
    schema: mediaFolderCreateSchema,
  });
  const initFormData = new MediaFolderCreateFormData("", "", mediaConfig.rootFolder, 0, `/${mediaConfig.rootFolder}`);
  const [formData, setFormdata] = useState(initFormData);

  const message = useMessage();
  const onChangeFolderName = (key: keyof CreateMediaFolderPayload, value: string) => {
    setFormdata((prev) => ({
      ...prev,
      [key]: value,
      folderSlug: stringToSlug(value),
    }));
  };

  const handleSelectFolder: FolderTreeSelectorProps["onSelect"] = (value, folder) => {
    const folderItem = isArray(folder) ? folder[0] : folder;

    if (folderItem.depth >= 3) {
      message.error("Chỉ cho phép tạo tối đa 3 cấp thư mục.");
      return;
    }

    const paths = folderItem.nestedSlugs?.join("/").concat("/", folderItem.slug);

    setFormdata((prev) => ({
      ...prev,
      folderPath: paths,
      parentSlug: folderItem.slug,
      parent: folderItem.id,
    }));
  };

  const onSubmitForm: HandleSubmit<MediaFolderCreateFormData> = (formData) => {
    onSubmit?.(formData, () => {
      onChangeTabPanel();
    });
  };
  const isDisabledButton = useMemo(() => {
    return isUndefined(formData.parent) || isUndefined(formData.folderName) || formData.folderName.length < 3;
  }, [formData]);
  return (
    <Form layout="vertical" disabled={loading}>
      <FormItem
        label="Tên thư mục"
        required
        validateStatus={errors?.folderName ? "error" : ""}
        help={errors?.folderName || ""}
      >
        <Input
          placeholder="Tên thư mục"
          value={formData.folderName}
          onChange={(e) => onChangeFolderName("folderName", e.target.value)}
          disabled={loading}
        />
      </FormItem>
      <FormItem label="Thư mục cha" required>
        <FolderTreeSelector value={formData.parentSlug} onSelect={(value, item) => handleSelectFolder(value, item)} />
      </FormItem>

      <Space>
        <Button
          onClick={() => handlerSubmit(formData, onSubmitForm)}
          type="primary"
          loading={loading}
          disabled={isDisabledButton}
        >
          Lưu
        </Button>
        <Button onClick={onCancel} disabled={loading}>
          Huỷ
        </Button>
      </Space>
    </Form>
  );
};
export default CreateFolderForm;
