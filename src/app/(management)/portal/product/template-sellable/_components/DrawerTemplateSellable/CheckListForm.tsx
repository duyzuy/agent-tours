import { Button, Form, Input, Modal, Space } from "antd";
import FormItem from "@/components/base/FormItem";
import { TemplateSellableFormData } from "../../modules/templateSellable.interface";
import { memo, useRef, useState } from "react";
import classNames from "classnames";
import MediaUploadDrawler, { MediaUploadProps } from "@/app/(management)/portal/media/_components/MediaUploadDrawler";
import { MediaTypes } from "@/models/management/media.interface";
import { DeleteOutlined, EditOutlined, PaperClipOutlined, PlusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { mediaConfig } from "@/configs";
import Link from "next/link";
import { isUndefined } from "lodash";

type CheckListItem = Required<TemplateSellableFormData>["checkListJson"][0];
export interface CheckListFormProps {
  items?: CheckListItem[];
  onAdd?: (item: CheckListItem, index?: number) => void;
  onRemove?: (index: number) => void;
  className?: string;
}
const CheckListForm: React.FC<CheckListFormProps> = ({ items, onAdd, onRemove, className = "" }) => {
  const [formData, setFormData] = useState<CheckListItem>({ name: "", descriptions: "", link: "" });
  const [editIndexItem, setEditIndexItem] = useState<number>();
  const [openModal, setOpenModal] = useState(false);
  const [openMedia, setOpenMedia] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const onChangeForm = (key: keyof CheckListItem, value: CheckListItem[keyof CheckListItem]) => {
    setFormData((oldData) => ({ ...oldData, [key]: value }));
  };
  const handleConfirm = () => {
    onAdd?.(formData, editIndexItem);
    setFormData({ name: "", descriptions: "", link: "" });
    setOpenModal(false);
  };
  const setCancel = () => {
    setOpenModal(false);
    setEditIndexItem(undefined);
    setFormData({ name: "", descriptions: "", link: "" });
  };
  const setCreate = () => {
    setOpenModal(true);
  };

  const setOpenMediaSelector = () => {
    setOpenMedia(true);
  };
  const onConfirmMedia: MediaUploadProps["onConfirm"] = (files) => {
    setFormData((oldData) => ({ ...oldData, link: `${mediaConfig.rootApiPath}/${files[0].fullPath}` }));
  };
  const setEdit = (item: CheckListItem, index: number) => {
    setFormData({ ...item });
    setOpenModal(true);
    setEditIndexItem(index);
  };

  return (
    <>
      <div
        ref={modalRef}
        className={classNames("checklist-container mb-6", {
          [className]: className,
        })}
      >
        <div className="items-center gap-x-3">
          <span className="block mb-2">Hồ sơ giấy tờ bắt buộc</span>
          <Button size="small" onClick={setCreate} icon={<PlusOutlined />} type="dashed">
            Thêm
          </Button>
        </div>
        <div className="check-list flex flex-col gap-y-3 pt-3">
          {items?.map(({ name, descriptions, link }, _index) => (
            <div className="check-list-item border p-3 rounded-md relative" key={_index}>
              <div className="absolute right-2 top-2 w-fit">
                <Space>
                  <Button
                    type="text"
                    shape="circle"
                    size="small"
                    icon={<EditOutlined />}
                    className="!text-primary-default"
                    onClick={() => setEdit({ name, descriptions, link }, _index)}
                  />
                  <Button
                    type="text"
                    shape="circle"
                    size="small"
                    icon={<DeleteOutlined />}
                    className="!text-red-600"
                    onClick={() => onRemove?.(_index)}
                  />
                </Space>
              </div>
              <div className="mb-3">
                <div>
                  <span className="font-semibold">{name}</span>
                </div>
                <p className="text-xs">{descriptions}</p>
              </div>
              {link ? (
                <>
                  <p>Biểu mẫu: </p>
                  <p className="py-2">
                    <Link href={link} className="flex items-start gap-x-2" target="_blank">
                      <PaperClipOutlined className="mt-1" />
                      <span className="text-xs">{link}</span>
                    </Link>
                  </p>
                </>
              ) : null}
            </div>
          ))}
        </div>
      </div>
      <Modal
        title="Hồ sơ giấy tờ"
        centered
        open={openModal}
        onOk={handleConfirm}
        onCancel={setCancel}
        destroyOnClose={true}
        okText="Lưu"
        cancelText="Huỷ"
        // getContainer={() => {
        //   return modalRef.current ? modalRef.current : document.body;
        // }}
      >
        <Form component="div" layout="vertical">
          <FormItem label="Tên">
            <Input
              value={formData?.name}
              placeholder="Tên"
              onChange={(evt) => onChangeForm("name", evt.target.value)}
            />
          </FormItem>
          <FormItem label="Mô tả">
            <Input.TextArea
              value={formData?.descriptions}
              placeholder="Mô tả"
              rows={2}
              onChange={(evt) => onChangeForm("descriptions", evt.target.value)}
            />
          </FormItem>

          <div className="border-b pb-3">
            <Button type="dashed" size="small" onClick={setOpenMediaSelector}>
              {formData.link ? "Thay file" : "Chọn file"}
            </Button>
            {formData.link ? (
              <p className="py-2">
                <Link href={formData.link} className="flex items-start gap-x-2" target="_blank">
                  <PaperClipOutlined className="mt-1" />
                  <span className="text-xs">{formData.link}</span>
                </Link>
              </p>
            ) : null}
          </div>
        </Form>
      </Modal>
      <MediaUploadDrawler
        isOpen={openMedia}
        mode="single"
        mediaTypes={[MediaTypes.FILE]}
        onClose={() => setOpenMedia(false)}
        onConfirm={onConfirmMedia}
      />
    </>
  );
};
export default memo(CheckListForm);
