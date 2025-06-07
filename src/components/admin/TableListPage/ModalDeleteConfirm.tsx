import React, { memo, useCallback, useState } from "react";
import { Button, Modal } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";

interface ModalDeleteConfirmProps {
  onConfirm?: () => void;
  onCancel?: () => void;
  isShowModal: boolean;
  title?: string;
  descriptions?: string;
  confirmLoading?: boolean;
}
const ModalDeleteConfirmComp = ({
  onConfirm,
  isShowModal,
  onCancel,
  title = "",
  descriptions = "",
  confirmLoading = false,
}: ModalDeleteConfirmProps) => {
  const renderModalFooter = () => {
    return (
      <div className="px-2 flex items-center flex-1 justify-center">
        <Button onClick={onCancel} className="w-24">
          Huỷ bỏ
        </Button>
        <Button onClick={onConfirm} type="primary" className="w-24">
          Xác nhận
        </Button>
      </div>
    );
  };

  return (
    <Modal open={isShowModal} onCancel={onCancel} footer={renderModalFooter} width={380} closeIcon={null}>
      <div className="body py-4">
        <div className="icon text-red-600 text-center">
          <ExclamationCircleOutlined className="text-5xl" />
        </div>
        <div className="content py-2 text-center">
          <p className="font-bold text-center py-2 text-lg">{title}</p>
          <p className="text-gray-500">{descriptions}</p>
        </div>
      </div>
    </Modal>
  );
};

function useModalDeleteConfirm() {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = useCallback(() => {
    setIsOpen(true);
  }, []);
  const closeModal = useCallback(() => {
    setIsOpen(false);
  }, []);
  return { isOpen, closeModal, openModal };
}

const ModalDeleteConfirm = Object.assign(memo(ModalDeleteConfirmComp), {
  useModal: useModalDeleteConfirm,
});

export default ModalDeleteConfirm;
