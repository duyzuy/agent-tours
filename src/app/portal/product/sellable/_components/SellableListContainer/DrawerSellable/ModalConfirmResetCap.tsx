import React, { memo } from "react";
import { Button, Modal } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";

interface Props {
    onConfirm?: () => void;
    onCancel?: () => void;
    isShowModal: boolean;
    title?: string;

    descriptions?: string;
    confirmLoading?: boolean;
}
const ModalConfirmResetCap: React.FC<Props> = ({
    onConfirm,
    isShowModal,
    onCancel,
    title = "",
    descriptions = "",
    confirmLoading = false,
}) => {
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
        <Modal
            open={isShowModal}
            onCancel={onCancel}
            footer={renderModalFooter}
            width={380}
        >
            <div className="body py-4">
                <div className="icon text-red-600 text-center">
                    <ExclamationCircleOutlined className="text-5xl" />
                </div>
                <div className="content py-2 text-center">
                    <p className="font-bold text-center py-2 text-lg">
                        {title}
                    </p>
                    <p className="text-gray-500">{descriptions}</p>
                </div>
            </div>
        </Modal>
    );
};

export default memo(ModalConfirmResetCap);
