import React, { memo, useMemo, useState } from "react";
import { useExtendBookingTimeLimit } from "../../modules/useExtendBookingTimeLimit";
import { IBookingTimeLitmit } from "@/models/management/core/bookingTimeLimit.interface";
import { Button, Steps, StepProps, InputNumber, Form, Space, Popover, PopoverProps, FormProps } from "antd";
import { formatDate } from "@/utils/date";
import { ClockCircleOutlined, CloseCircleOutlined, ExclamationCircleOutlined, PlusOutlined } from "@ant-design/icons";

interface BookingTimeLimitationProps {
  items?: IBookingTimeLitmit[];
  orderId?: number;
  isBookingCanceled?: boolean;
}

const BookingTimeLimitation: React.FC<BookingTimeLimitationProps> = ({ items = [], orderId, isBookingCanceled }) => {
  const currentStep = useMemo(() => {
    let current = 0;
    if (!items) return current;

    const sortedItems = items.sort((a, b) => {
      return new Date(a.deadline).getTime() - new Date(b.deadline).getTime();
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
      <Space className="mb-3">
        <h4 className="font-[500] text-[16px]">Thời gian thực hiện thanh toán</h4>
        {isBookingCanceled ? null : <ExtendBookingTimeLimitButton orderId={orderId} />}
      </Space>
      <Steps
        status="finish"
        current={currentStep}
        items={items.map<StepProps>((item, _index) => {
          return {
            title: formatDate(item.deadline),
            description: `${item.isCompleted === true ? "Đã thanh toán" : "Chờ thanh toán"}`,
            icon: item.isExpired ? (
              <CloseCircleOutlined className="!text-red-600" />
            ) : _index === currentStep ? (
              <ExclamationCircleOutlined className="!text-amber-600" />
            ) : (
              <ClockCircleOutlined />
            ),
          };
        })}
      />
    </div>
  );
};
export default memo(BookingTimeLimitation);

type ExtendBookingTimeFormFields = {
  hours: number;
};
const ExtendBookingTimeLimitButton = ({ orderId }: { orderId?: number }) => {
  const [form] = Form.useForm<ExtendBookingTimeFormFields>();
  const { mutate: extendBookingTime, isPending } = useExtendBookingTimeLimit();
  const [open, setOpen] = useState(false);

  const handleSubmit: FormProps["onFinish"] = (data) => {
    if (!orderId) return;

    extendBookingTime(
      { orderId: orderId, postponeHours: data.hours },
      {
        onSuccess(data, variables, context) {
          form.resetFields();
          setOpen(false);
        },
      },
    );
  };

  const onOpenChange: PopoverProps["onOpenChange"] = (newOpen) => {
    setOpen(newOpen);
  };

  const closePopOver = () => {
    setOpen(false);
    form.resetFields();
  };
  const hours = Form.useWatch("hours", form);
  const isDisabledButton = hours === 0 || !hours;

  return (
    <Popover
      open={open}
      title="Gia hạn thanh toán"
      trigger="click"
      onOpenChange={onOpenChange}
      content={
        <>
          <Form<ExtendBookingTimeFormFields>
            form={form}
            initialValues={{ hours: 0 }}
            layout="vertical"
            onFinish={handleSubmit}
            disabled={isPending}
          >
            <Form.Item<ExtendBookingTimeFormFields> name="hours" label="Thời gian thêm (Giờ)">
              <InputNumber min={0} max={99} style={{ width: "100%" }} />
            </Form.Item>
            <Space>
              <Button type="primary" loading={isPending} htmlType="submit" disabled={isDisabledButton}>
                Lưu
              </Button>
              <Button onClick={closePopOver}>Huỷ</Button>
            </Space>
          </Form>
        </>
      }
    >
      <Button size="small" type="dashed" icon={<PlusOutlined />}>
        Thêm hạn thanh toán
      </Button>
    </Popover>
  );
};
