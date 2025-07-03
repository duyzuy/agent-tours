import React, { memo, useMemo, useState } from "react";
import { MinusOutlined, PlusOutlined, FolderOpenFilled, FolderFilled, EditOutlined } from "@ant-design/icons";
import classNames from "classnames";
import { Button, Card, Form, Input, Space } from "antd";
import styled from "styled-components";
import FormItem from "@/components/base/FormItem";
import { MediaFolderUpdateFormData } from "@/modules/admin/manageMedia/media.interface";
import { useFormSubmit } from "@/hooks/useFormSubmit";
import { mediaFolderUpdateSchema } from "@/modules/admin/manageMedia/media.schema";
import { IMediaFolder, IMediaFolderListRs } from "@/models/management/media.interface";
export interface MediaFolderItemProps {
  folderName?: string;
  isExpanded?: boolean;
  isSelected?: boolean;
  hasChildren?: boolean;
  editAble?: boolean;
  folderColor?: string;
  item?: IMediaFolderListRs["result"][number];
  loading?: boolean;
  onExpand?: () => void;
  onOpen?: () => void;
  onOk?: (formData: MediaFolderUpdateFormData, cb?: () => void) => void;
}

const MediaFolderItem = ({
  folderName,
  isExpanded,
  isSelected,
  hasChildren,
  editAble,
  folderColor,
  item,
  loading,
  onExpand,
  onOpen,
  onOk,
}: MediaFolderItemProps) => {
  const [editing, setEditing] = useState(false);

  const handleSubmitForm: MediaFolderItemEditFormProps["onSubmit"] = (formData) => {
    onOk?.(formData, () => {
      setEditing(false);
    });
  };

  if (editing) {
    return (
      <MediaFolderItem.EditForm
        value={item || undefined}
        loading={loading}
        disabled={loading}
        onCancel={() => setEditing(false)}
        onSubmit={handleSubmitForm}
      />
    );
  }
  return (
    <div
      className={classNames("flex items-center justify-between hover:bg-gray-100 px-2 py-1 rounded-md relative", {
        "bg-gray-100": isSelected,
      })}
    >
      <MediaFolderItem.Name
        folderName={folderName}
        onEdit={() => setEditing(true)}
        onOpen={onOpen}
        isSelected={isSelected}
        className="group/item cursor-pointer"
        editAble={editAble}
        folderColor={folderColor}
      />
      {hasChildren ? (
        <Button
          type="text"
          size="small"
          shape="circle"
          onClick={onExpand}
          icon={isExpanded ? <MinusOutlined /> : <PlusOutlined />}
          className="!flex !items-center justify-center ml-2"
        />
      ) : null}
    </div>
  );
};
export default memo(MediaFolderItem);

interface IFolderItemNameProps {
  folderName?: string;
  className?: string;
  onEdit?: () => void;
  onOpen?: () => void;
  isSelected?: boolean;
  editAble?: boolean;
  folderColor?: string;
}
MediaFolderItem.Name = function MediaFolderItemName({
  folderName,
  className = "",
  onEdit,
  onOpen,
  isSelected = false,
  editAble = true,
  folderColor = "text-blue-600",
}: IFolderItemNameProps) {
  return (
    <div
      className={classNames("flex flex-1", {
        [className]: className,
      })}
    >
      <div className="folder-icon relative w-6 h-6 mr-2">
        <span
          className={classNames("text-lg block", {
            [folderColor]: folderColor,
          })}
        >
          {isSelected ? <FolderOpenFilled /> : <FolderFilled />}
        </span>
        {editAble ? (
          <Button
            icon={<EditOutlined />}
            onClick={onEdit}
            type="text"
            size="small"
            className="group/edit invisible group-hover/item:visible !absolute left-0 top-0 !bg-gray-100"
          />
        ) : null}
      </div>
      <span
        className={classNames("line-clamp-2 flex-1", {
          "text-primary-default": isSelected,
        })}
        onClick={onOpen}
      >
        {folderName}
      </span>
    </div>
  );
};

interface MediaFolderItemEditFormProps {
  value?: Pick<IMediaFolder, "id" | "folderName" | "key" | "parent">;
  disabled?: boolean;
  loading?: boolean;
  onChangeForm?: () => void;
  onSubmit?: (data: MediaFolderUpdateFormData) => void;
  onCancel?: () => void;
}
MediaFolderItem.EditForm = function MediaFolderItemEditForm({
  disabled,
  loading,
  value,
  onSubmit,
  onCancel,
}: MediaFolderItemEditFormProps) {
  const { handlerSubmit, errors, clearErrors } = useFormSubmit({
    schema: mediaFolderUpdateSchema,
  });

  const [editFormData, setEditFormData] = useState(
    () => new MediaFolderUpdateFormData(value?.id, value?.folderName, value?.parent, value?.key),
  );

  const onChangeFolderName = (value: string) => {
    setEditFormData((oldData) => ({
      ...oldData,
      folderName: value,
    }));
  };
  const isDisabledButton = useMemo(() => {
    return editFormData.folderName === value?.folderName;
  }, [editFormData]);

  return (
    <Card size="small">
      <Form layout="vertical" disabled={disabled}>
        <StyledFormItem
          required
          validateStatus={errors?.folderName ? "error" : ""}
          help={errors?.folderName || ""}
          className="mb-0 text-xs"
        >
          <Input
            placeholder="Tên thư mục"
            value={editFormData?.folderName}
            size="small"
            onChange={(e) => onChangeFolderName(e.target.value)}
          />
        </StyledFormItem>

        <Space>
          <Button
            type="primary"
            size="small"
            onClick={() => handlerSubmit(editFormData, onSubmit)}
            loading={loading}
            disabled={isDisabledButton}
          >
            Lưu
          </Button>
          <Button onClick={onCancel} size="small">
            Huỷ
          </Button>
        </Space>
      </Form>
    </Card>
  );
};

const StyledFormItem = styled(FormItem)`
  .travel-form-item-explain-error {
    font-size: 10px;
  }
`;
