import React, { memo, useMemo, useState } from "react";
import { useExtendBookingTimeLimit } from "../../modules/useExtendBookingTimeLimit";
import { IBookingTimeLitmit } from "@/models/management/core/bookingTimeLimit.interface";
import { Button, Modal, Steps, StepProps, InputNumber, Form } from "antd";
import { formatDate } from "@/utils/date";
import FormItem from "@/components/base/FormItem";
import {
    ClockCircleOutlined,
    CloseCircleOutlined,
    LoadingOutlined,
} from "@ant-design/icons";

interface BookingTimeLimitationProps {
    items?: IBookingTimeLitmit[];
    orderId?: number;
}
const BookingTimeLimitation: React.FC<BookingTimeLimitationProps> = ({
    items = [],
    orderId,
}) => {
    const { onExtendBookingTimeLimit } = useExtendBookingTimeLimit();
    const [showModal, setShowModal] = useState(false);
    const [isLoading, setLoading] = useState(false);
    const [hours, setHours] = useState(0);

    const submitExtendBookingTimeLimit = async () => {
        if (!orderId) {
            throw new Error("OrderId in valid.");
        }
        setLoading(true);
        onExtendBookingTimeLimit(
            { orderId: orderId, postponeHours: hours },
            () => {
                setLoading(false);
            },
        );
    };

    const changeHours = (value: number | null) => {
        value !== null && setHours(value);
    };

    const currentStep = useMemo(() => {
        let current = 0;
        if (!items) return current;

        const sortedItems = items.sort((a, b) => {
            return (
                new Date(a.deadline).getTime() - new Date(b.deadline).getTime()
            );
        });
        for (const timeline in sortedItems) {
            if (items[timeline].isExpired === false) {
                current = Number(timeline);
                break;
            }
        }
        return current;
    }, [items]);
    return (
        <div className="mb-6">
            <div className="mb-3">
                <p className="font-[500] text-[16px]">
                    Thời gian thực hiện thanh toán
                </p>
            </div>
            <Steps
                status="process"
                current={currentStep}
                items={items.map<StepProps>((item, _index) => {
                    return {
                        title: formatDate(item.deadline),
                        description: `${
                            item.isCompleted === true
                                ? "Đã thanh toán"
                                : "Chưa thanh toán"
                        }`,
                        icon: item.isExpired ? (
                            <CloseCircleOutlined />
                        ) : _index === currentStep ? (
                            <LoadingOutlined />
                        ) : (
                            <ClockCircleOutlined />
                        ),
                    };
                })}
            />
            <div className="mt-3">
                <Button
                    size="small"
                    type="primary"
                    ghost
                    onClick={() => setShowModal(true)}
                >
                    Thêm hạn thanh toán
                </Button>
            </div>
            <Modal
                title="Thêm thời gian gia hạn thanh toán"
                centered
                open={showModal}
                onOk={submitExtendBookingTimeLimit}
                onCancel={() => setShowModal(false)}
                okText="Lưu"
                cancelText="Huỷ"
                confirmLoading={isLoading}
            >
                <div>
                    <Form layout="vertical">
                        <FormItem label="Thời gian thêm (Giờ)">
                            <InputNumber
                                value={hours}
                                min={0}
                                max={99}
                                onChange={changeHours}
                                style={{ width: "100%" }}
                            />
                        </FormItem>
                    </Form>
                </div>
            </Modal>
        </div>
    );
};
export default memo(BookingTimeLimitation);
