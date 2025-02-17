import { useEffect, useMemo, memo } from "react";
import { Drawer, Space, Button, Form, Row, Col, Input } from "antd";
import FormItem from "@/components/base/FormItem";
import { BookingOrderCustomerFormData } from "../../../modules/bookingOrder.interface";
import { orderCustomerSchema } from "../../../schema/bookingOrder.schema";
import { ICustomerInformation } from "@/models/management/booking/customer.interface";
import { isEqualObject } from "@/utils/compare";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
export interface CustomerFormDrawerProps {
  isOpen?: boolean;
  onClose?: () => void;
  initialValues?: ICustomerInformation;
  onSubmit?: (data: BookingOrderCustomerFormData) => void;
  loading?: boolean;
}

const DrawerCustomerInformation: React.FC<CustomerFormDrawerProps> = ({
  isOpen,
  onClose,
  onSubmit,
  initialValues,
  loading,
}) => {
  const initForm = new BookingOrderCustomerFormData("", "", "", "", "");

  const { control, getValues, setValue, watch, handleSubmit } = useForm({
    defaultValues: { ...initForm },
    resolver: yupResolver(orderCustomerSchema),
  });

  const isDisableButton = useMemo(() => {
    const formValues = getValues();
    return isEqualObject(["custAddress", "custEmail", "custName", "custPhoneNumber", "rmk"], formValues, initialValues);
  }, [watch()]);

  /*
   * INITIAL FORM Data
   */
  useEffect(() => {
    const reInitForm = initialValues
      ? new BookingOrderCustomerFormData(
          initialValues.custName,
          initialValues.custPhoneNumber,
          initialValues.custEmail,
          initialValues.custAddress,
          initialValues.rmk,
        )
      : initForm;

    Object.entries(reInitForm).forEach(([key, value]) => {
      setValue(
        key as keyof BookingOrderCustomerFormData,
        value as BookingOrderCustomerFormData[keyof BookingOrderCustomerFormData],
      );
    });
  }, [initialValues]);

  return (
    <Drawer
      title="Sửa thông tin người đặt"
      width={650}
      onClose={onClose}
      open={isOpen}
      maskClosable={false}
      closeIcon={null}
      footer={
        <Space className="py-3">
          <Button
            onClick={onSubmit && handleSubmit(onSubmit)}
            type="primary"
            disabled={isDisableButton}
            className="w-28"
            loading={loading}
          >
            Lưu
          </Button>
          <Button onClick={onClose} className="w-28">
            Huỷ
          </Button>
        </Space>
      }
    >
      <Form layout="vertical" disabled={loading}>
        <Row gutter={16}>
          <Col span={12}>
            <Controller
              control={control}
              name="custName"
              render={({ field, fieldState: { error } }) => (
                <FormItem label="Họ và tên" validateStatus={error ? "error" : ""} help={error?.message} required>
                  <Input {...field} placeholder="Họ và tên" />
                </FormItem>
              )}
            />
          </Col>
          <Col span={12}>
            <Controller
              control={control}
              name="custEmail"
              render={({ field, fieldState: { error } }) => (
                <FormItem label="Email" validateStatus={error ? "error" : ""} help={error?.message} required>
                  <Input {...field} placeholder="Email" />
                </FormItem>
              )}
            />
          </Col>
          <Col span={12}>
            <Controller
              control={control}
              name="custPhoneNumber"
              render={({ field, fieldState: { error } }) => (
                <FormItem label="Số điện thoại" validateStatus={error ? "error" : ""} help={error?.message} required>
                  <Input {...field} placeholder="Số điện thoại" />
                </FormItem>
              )}
            />
          </Col>
          <Col span={12}>
            <Controller
              control={control}
              name="custAddress"
              render={({ field, fieldState: { error } }) => (
                <FormItem label="Địa chỉ" validateStatus={error ? "error" : ""} help={error?.message} required>
                  <Input {...field} placeholder="Địa chỉ" />
                </FormItem>
              )}
            />
          </Col>
          <Col span={24}>
            <Controller
              control={control}
              name="rmk"
              render={({ field, fieldState: { error } }) => (
                <FormItem label="Ghi chú" validateStatus={error ? "error" : ""} help={error?.message} required>
                  <Input.TextArea {...field} placeholder="Ghi chú" />
                </FormItem>
              )}
            />
          </Col>
        </Row>
      </Form>
    </Drawer>
  );
};
export default memo(DrawerCustomerInformation);
