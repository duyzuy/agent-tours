import React, { memo } from "react";
import { Button, Modal } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";

interface Props {
  onConfirm?: () => void;
  onCancel?: () => void;
  isShowModal?: boolean;
}
const ModalConfirmation: React.FC<Props> = ({ onConfirm, isShowModal, onCancel }) => {
  const renderModalFooter = () => {
    return (
      <div className="px-2 flex items-center flex-1 justify-center">
        <Button onClick={onCancel} className="w-32">
          Huỷ bỏ
        </Button>
        <Button onClick={onConfirm} type="primary" className="w-32">
          Đồng ý
        </Button>
      </div>
    );
  };

  return (
    <Modal open={isShowModal} onCancel={onCancel} footer={renderModalFooter} width={420}>
      <div className="body pt-4">
        <div className="icon text-blue-600 text-center">
          <ExclamationCircleOutlined className="text-5xl" />
        </div>
        <div className="content py-2 text-center">
          <p className="font-bold text-center py-2 text-lg">Rời khỏi trang</p>
          <p className="text-gray-500">
            Thông tin mới thay đổi sẽ không được lưu khi rời khỏi trang, bạn vẫn muốn di chuyển sang trang khác mà không
            lưu?.
          </p>
          <div className="h-8"></div>
        </div>
      </div>
    </Modal>
  );
};

export default memo(ModalConfirmation);
