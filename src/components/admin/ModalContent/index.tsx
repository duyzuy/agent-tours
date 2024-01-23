import React, { memo } from "react";
import { Modal } from "antd";

interface Props {
    onClose?: () => void;
    isShowModal: boolean;
    title?: string;

    descriptions?: string | React.ReactNode;
    confirmLoading?: boolean;
}
const ModalContent: React.FC<Props> = ({
    isShowModal,
    onClose,
    title = "",
    descriptions = "",
}) => {
    return (
        <Modal open={isShowModal} onCancel={onClose} footer={null} width={450}>
            <div className="body">
                <div className="content py-2 text-center">
                    <p className="font-bold text-center mb-3 text-lg">
                        {title}
                    </p>
                    <p className="text-gray-500">{descriptions}</p>
                </div>
            </div>
        </Modal>
    );
};

export default memo(ModalContent);
