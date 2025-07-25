import React, { memo, useState } from "react";
import FormItem from "@/components/base/FormItem";
import CustomTimePicker from "../CustomTimePicker";
import CustomDatePicker from "../CustomDatePicker";
import { templateDefault } from "@/constants/cmsTemplate.constant";
import { PageContentStatus } from "@/models/management/cms/pageContent.interface";
import { DatePickerProps, TimePickerProps, Button, Select, SelectProps, Tag, Switch, SwitchProps } from "antd";
import { Dayjs } from "dayjs";
import { CheckCircleOutlined, CheckOutlined, CloseOutlined } from "@ant-design/icons";
import ModalDeleteConfirm from "./ModalDeleteConfirm";

export interface PublishingProps {
  label?: string;
  dateValue?: Dayjs;
  timeValue?: Dayjs;
  templateList?: { label: string; value: string }[];
  templateValue?: string;
  onChangeDate?: DatePickerProps["onChange"];
  onChangeTime?: TimePickerProps["onChange"];
  onApproval?: () => void;
  onSaveForApproval?: () => void;
  onSaveAndPublish?: () => void;
  onDelete?: () => void;
  disableSubmit?: boolean;
  disableSaveForApproval?: boolean;
  disableApproval?: boolean;
  hideApproval?: boolean;
  hideDelete?: boolean;
  hideSaveForApproval?: boolean;
  onChangeTemplate?: SelectProps["onChange"];
  action?: "create" | "update";
  status?: PageContentStatus;
  onChangeStatus?: SwitchProps["onChange"];
  loading?: boolean;
  errors?: {
    publishDate?: string;
  };
}
const Publishing: React.FC<PublishingProps> = ({
  label = "Đăng bài viết",
  templateList,
  templateValue,
  onChangeDate,
  onChangeTime,
  onApproval,
  onSaveAndPublish,
  onSaveForApproval,
  onDelete,
  dateValue,
  timeValue,
  disableSubmit,
  disableSaveForApproval,
  hideApproval = !onApproval,
  hideDelete = !onDelete,
  hideSaveForApproval = false,
  disableApproval,
  onChangeTemplate,
  action = "create",
  status,
  onChangeStatus,
  loading,
  errors,
}) => {
  const [showModalDelete, setShowModalDelete] = useState(false);

  const showModal = () => setShowModalDelete(true);

  const closeModal = () => setShowModalDelete(false);

  const confirmDelete = () => {
    onDelete?.();
    closeModal();
  };
  return (
    <div className="box border rounded-[4px] mb-6">
      <div className="py-4 border-b px-4">
        <p className="font-bold">{label}</p>
      </div>
      <div className="px-4">
        <div className="h-6"></div>
        <div className="mb-6 flex items-center justify-between">
          <span>
            <span className="inline-block w-24">Trạng thái:</span>
            {action === "create" ? (
              "--"
            ) : (
              <>
                {(status === PageContentStatus.PUBLISH && <Tag color="green">Đã kích hoạt</Tag>) ||
                  (status === PageContentStatus.PENDING && <Tag color="yellow">Chờ duyệt</Tag>) ||
                  (status === PageContentStatus.UNPUBLISH && <Tag color="red">Chưa kích hoạt</Tag>) ||
                  "--"}
              </>
            )}
          </span>
          {action === "update" && status !== PageContentStatus.PENDING ? (
            <Switch
              checkedChildren={<CheckOutlined />}
              unCheckedChildren={<CloseOutlined />}
              checked={status === PageContentStatus.PUBLISH}
              onChange={onChangeStatus}
            />
          ) : null}
        </div>
        {templateList ? (
          <FormItem label="Chọn template">
            <Select<string>
              options={templateList ?? [templateDefault]}
              value={templateValue ? templateValue : templateDefault.value}
              onChange={onChangeTemplate}
            />
          </FormItem>
        ) : null}
        {onChangeDate && onChangeTime ? (
          <FormItem
            label="Ngày hiển thị"
            validateStatus={errors?.publishDate ? "error" : ""}
            help={errors?.publishDate || ""}
          >
            <div className="flex items-center gap-x-4">
              <CustomDatePicker
                onChange={onChangeDate}
                value={dateValue}
                format={"DD/MM/YYYY"}
                placeholder="Chọn ngày"
                picker="date"
                className="flex-1"
              />
              <CustomTimePicker
                onChange={onChangeTime}
                value={timeValue}
                placeholder="Chọn giờ"
                className="w-28"
                format={"HH:mm"}
              />
            </div>
          </FormItem>
        ) : null}

        {hideApproval ? null : (
          <div className="mb-4">
            <Button
              className="flex-1"
              block
              type="primary"
              ghost
              onClick={onApproval}
              disabled={disableApproval}
              loading={loading}
            >
              Xét duyệt
            </Button>
          </div>
        )}

        <div className="publishing-actions flex gap-x-4 mb-4">
          {hideSaveForApproval ? null : (
            <Button
              className="flex-1"
              block
              onClick={onSaveForApproval}
              disabled={disableSaveForApproval}
              loading={loading}
            >
              Lưu và chờ duyệt
            </Button>
          )}
          <Button
            type="primary"
            className=" bg-primary-default flex-1"
            block
            disabled={disableSubmit}
            onClick={onSaveAndPublish}
            loading={loading}
          >
            {action === "create" ? "Lưu và duyệt" : "Cập nhật"}
          </Button>

          {onDelete && !hideDelete ? (
            <Button type="primary" ghost danger onClick={showModal} loading={loading}>
              Xoá
            </Button>
          ) : null}
        </div>
      </div>
      <ModalDeleteConfirm
        title="Xoá bài"
        descriptions="Nội dung sau khi xoá sẽ không thể phục hồi, bạn vẫn muốn xoá?"
        isShowModal={showModalDelete}
        onCancel={closeModal}
        onConfirm={confirmDelete}
      />
    </div>
  );
};
export default memo(Publishing);
