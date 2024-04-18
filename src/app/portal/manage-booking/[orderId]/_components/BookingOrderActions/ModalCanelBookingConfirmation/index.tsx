import React, { memo } from "react";
import { Button, Input, Modal, Space } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import FormItem from "@/components/base/FormItem";
import { Form } from "antd";
interface Props {
    onConfirm?: () => void;
    onCancel?: () => void;
    isShowModal?: boolean;
    title?: string;
    descriptions?: string;
    confirmLoading?: boolean;
    render?: () => React.ReactNode;
}
const ModalCancelBookingConfirmation: React.FC<Props> = ({
    onConfirm,
    isShowModal,
    onCancel,
    title = "",
    descriptions = "",
    confirmLoading = false,
    render,
}) => {
    const renderModalFooter = () => {
        return (
            <div className="px-2 flex items-center flex-1 justify-center">
                <Button onClick={onCancel} className="w-32">
                    Quay lại
                </Button>
                <Button
                    onClick={onConfirm}
                    type="primary"
                    danger
                    className="w-32"
                >
                    Xác nhận huỷ
                </Button>
            </div>
        );
    };

    return (
        <Modal
            open={isShowModal}
            onCancel={onCancel}
            footer={renderModalFooter}
            width={420}
        >
            <div className="body pt-4">
                <div className="icon text-red-500 text-center">
                    <ExclamationCircleOutlined className="text-5xl" />
                </div>
                <div className="content py-2 text-center">
                    <p className="font-bold text-center py-2 text-lg">
                        {title}
                    </p>
                    <p className="text-gray-500">{descriptions}</p>
                    <div className="h-8"></div>

                    {render?.()}
                </div>
            </div>
        </Modal>
    );
};

export default ModalCancelBookingConfirmation;
