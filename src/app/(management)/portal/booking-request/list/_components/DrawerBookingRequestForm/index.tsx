import React, { memo, useCallback, useEffect, useMemo, useState } from "react";
import { Form, Input, Space, Radio, Button, Drawer, Row, Col } from "antd";
import { isEqual } from "lodash";
import FormItem from "@/components/base/FormItem";

import { bookingRequestSchema } from "../../../module/bookingRequest.schema";
import { BookingRequestFormData } from "../../../module/bookingRequest.interface";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { EInventoryType } from "@/models/management/core/inventoryType.interface";
import { IBookingRequestDetail } from "@/models/management/bookingRequest/bookingRequest.interface";
import { RangePickerProps } from "antd/es/date-picker";
import CustomRangePicker from "@/components/admin/CustomRangePicker";
import { TIME_FORMAT } from "@/constants/common";
import dayjs from "dayjs";
import { stringToDate } from "@/utils/date";

type DrawerAction = "CREATE" | "EDIT";
export type TDrawlerCreateAction = {
  type: "CREATE";
};
export type TDrawlerEditAction = {
  type: "EDIT";
  record: IBookingRequestDetail;
};
export type TDrawlerAction = TDrawlerCreateAction | TDrawlerEditAction;

export interface DrawerBookingRequestFormProps {
  isOpen?: boolean;
  onCancel?: () => void;
  actionType?: DrawerAction;
  initialValues?: IBookingRequestDetail;
  onSubmit?: (action: DrawerAction, formData: BookingRequestFormData) => void;
}

const DrawerBookingRequestForm: React.FC<DrawerBookingRequestFormProps> = ({
  actionType,
  onCancel,
  onSubmit,
  isOpen,
  initialValues,
}) => {
  const initFormData = new BookingRequestFormData(
    undefined,
    "",
    undefined,
    undefined,
    "",
    "",
    "",
    "",
    "",
    "",
    0,
    0,
    "",
    "",
    "",
    "",
    "",
    "",
  );
  const { control, getValues, setValue, clearErrors, watch, handleSubmit } = useForm<BookingRequestFormData>({
    resolver: yupResolver(bookingRequestSchema),
    defaultValues: { ...initFormData },
  });

  console.log(getValues(), initialValues);
  const [currentInventoriesTypeList, setCurrentInventoriesTypeList] = useState<EInventoryType[]>();

  const onChangeStartDateAndDate: RangePickerProps["onChange"] = (date, dateStr) => {
    setValue("startDate", date ? date[0]?.toISOString() : undefined);
    setValue("endDate", date ? date[1]?.toISOString() : undefined);
  };

  const onClose = useCallback(() => {
    onCancel?.();
    clearErrors();
  }, []);

  const isDisableUpdateButton = useMemo(() => {
    return isEqual(initialValues?.custName, getValues("custName"));
  }, [watch()]);

  useEffect(() => {
    if (initialValues && actionType === "EDIT") {
      const updateFormData = new BookingRequestFormData(
        initialValues.requestId,
        initialValues.requestName,
        stringToDate(initialValues.startDate).toDate().toString(),
        stringToDate(initialValues.endDate).toDate().toString(),
        initialValues.custName,
        initialValues.custPhoneNumber,
        initialValues.custEmail,
        initialValues.custAddress,
        initialValues.referenceId,
        initialValues.referenceName,
        initialValues.tourPrice,
        initialValues.extraPrice,
        initialValues.invoiceName,
        initialValues.invoiceCompanyName,
        initialValues.invoiceAddress,
        initialValues.invoiceTaxCode,
        initialValues.invoiceEmail,
        initialValues.rmk,
      );
      Object.entries(updateFormData).forEach(([key, value]) => {
        setValue(key as keyof BookingRequestFormData, value);
      });
    } else {
      Object.entries(initFormData).forEach(([key, value]) => {
        setValue(key as keyof BookingRequestFormData, value);
      });
    }
    clearErrors();
  }, [initialValues, actionType, isOpen]);

  return (
    <Drawer
      title={actionType === "CREATE" ? "Thêm mới" : "Chỉnh sửa"}
      destroyOnClose
      width={550}
      onClose={onClose}
      open={isOpen}
      styles={{
        body: {
          paddingBottom: 80,
        },
      }}
    >
      <Form layout="vertical" className=" max-w-4xl">
        <Controller
          control={control}
          name="requestName"
          render={({ field, fieldState: { error } }) => (
            <FormItem label="Tên dịch vụ yêu cầu" required validateStatus={error ? "error" : ""} help={error?.message}>
              <Input placeholder="Tên dịch vụ yêu cầu" {...field} />
            </FormItem>
          )}
        />
        <Controller
          control={control}
          name="startDate"
          render={({ fieldState: { error } }) => (
            <FormItem label="Ngày khởi hành" validateStatus={error ? "error" : ""} help={error?.message}>
              <CustomRangePicker
                showTime={{
                  format: TIME_FORMAT,
                  hideDisabledOptions: true,
                  defaultValue: [dayjs("00:00:00", "HH:mm:ss"), dayjs("23:59:59", "HH:mm:ss")],
                }}
                placeholder={["Ngày đi", "Ngày về"]}
                format={"DD/MM/YYYY - HH:mm"}
                value={[
                  getValues("startDate") ? dayjs(getValues("startDate")) : null,
                  getValues("endDate") ? dayjs(getValues("endDate")) : null,
                ]}
                disabledDate={(date) => {
                  return dayjs().isAfter(date);
                }}
                onChange={onChangeStartDateAndDate}
                className="w-full"
              />
            </FormItem>
          )}
        />
        <Controller
          control={control}
          name="tourPrice"
          render={({ field, fieldState: { error } }) => (
            <FormItem label="Giá tour" validateStatus={error ? "error" : ""} help={error?.message}>
              <Input {...field} placeholder="Giá tour" />
            </FormItem>
          )}
        />
        <Controller
          control={control}
          name="extraPrice"
          render={({ field, fieldState: { error } }) => (
            <FormItem label="Giá dịch vụ" validateStatus={error ? "error" : ""} help={error?.message}>
              <Input {...field} placeholder="Giá dịch vụ" />
            </FormItem>
          )}
        />
        <h3 className="text-lg font-[500] mb-6">Thông tin khách hàng</h3>
        <Controller
          control={control}
          name="custName"
          render={({ field, fieldState: { error } }) => (
            <FormItem label="Họ tên" required validateStatus={error ? "error" : ""} help={error?.message}>
              <Input {...field} placeholder="Họ tên" />
            </FormItem>
          )}
        />
        <Row gutter={24}>
          <Col span={12}>
            <Controller
              control={control}
              name="custPhoneNumber"
              render={({ field, fieldState: { error } }) => (
                <FormItem label="Số điện thoại" required validateStatus={error ? "error" : ""} help={error?.message}>
                  <Input {...field} placeholder="Số điện thoại" />
                </FormItem>
              )}
            />
          </Col>
          <Col span={12}>
            <Controller
              control={control}
              name="custEmail"
              render={({ field, fieldState: { error } }) => (
                <FormItem label="Email" validateStatus={error ? "error" : ""} help={error?.message}>
                  <Input {...field} placeholder="Email" />
                </FormItem>
              )}
            />
          </Col>
        </Row>
        <Controller
          control={control}
          name="custAddress"
          render={({ field, fieldState: { error } }) => (
            <FormItem label="Địa chỉ" validateStatus={error ? "error" : ""} help={error?.message}>
              <Input {...field} placeholder="Địa chỉ" />
            </FormItem>
          )}
        />
        <Row gutter={24}>
          <Col span={12}>
            <Controller
              control={control}
              name="referenceId"
              render={({ field: { value, onChange }, fieldState: { error } }) => (
                <FormItem label="ID người giới thiệu" validateStatus={error ? "error" : ""} help={error?.message}>
                  <Input placeholder="ID người giới thiệu" onChange={onChange} value={value} />
                </FormItem>
              )}
            />
          </Col>
          <Col span={12}>
            <Controller
              control={control}
              name="referenceName"
              render={({ field: { value, onChange }, fieldState: { error } }) => (
                <FormItem label="Tên người giới thiệu" validateStatus={error ? "error" : ""} help={error?.message}>
                  <Input placeholder="Tên người giới thiệu" onChange={onChange} value={value} />
                </FormItem>
              )}
            />
          </Col>
        </Row>

        <h3 className="text-lg font-[500] mb-6">Thông tin xuất hoá đơn</h3>
        <Row gutter={24}>
          <Col span={12}>
            <Controller
              control={control}
              name="invoiceCompanyName"
              render={({ field, fieldState: { error } }) => (
                <FormItem label="Tên công ty" validateStatus={error ? "error" : ""} help={error?.message}>
                  <Input {...field} placeholder="Tên công ty" />
                </FormItem>
              )}
            />
          </Col>
          <Col span={12}>
            <Controller
              control={control}
              name="invoiceName"
              render={({ field, fieldState: { error } }) => (
                <FormItem label="Tên hoá đơn" validateStatus={error ? "error" : ""} help={error?.message}>
                  <Input {...field} placeholder="Tên hoá đơn" />
                </FormItem>
              )}
            />
          </Col>
        </Row>
        <Row gutter={24}>
          <Col span={12}>
            <Controller
              control={control}
              name="invoiceTaxCode"
              render={({ field, fieldState: { error } }) => (
                <FormItem label="Mã số thuế" validateStatus={error ? "error" : ""} help={error?.message}>
                  <Input {...field} placeholder="Mã số thuế" />
                </FormItem>
              )}
            />
          </Col>
          <Col span={12}>
            <Controller
              control={control}
              name="invoiceEmail"
              render={({ field, fieldState: { error } }) => (
                <FormItem label="Email" validateStatus={error ? "error" : ""} help={error?.message}>
                  <Input {...field} placeholder="Email" />
                </FormItem>
              )}
            />
          </Col>
        </Row>
        <Controller
          control={control}
          name="invoiceAddress"
          render={({ field, fieldState: { error } }) => (
            <FormItem label="Địa chỉ" validateStatus={error ? "error" : ""} help={error?.message}>
              <Input {...field} placeholder="Địa chỉ" />
            </FormItem>
          )}
        />
        <Controller
          control={control}
          name="rmk"
          render={({ field, fieldState: { error } }) => (
            <FormItem label="Ghi chú" required validateStatus={error ? "error" : ""} help={error?.message}>
              <Input.TextArea {...field} placeholder="Ghi chú" />
            </FormItem>
          )}
        />
      </Form>
      <div className="bottom py-4 absolute bottom-0 left-0 right-0 border-t px-6 bg-white">
        <Space>
          <Button type="default" onClick={onCancel}>
            Huỷ bỏ
          </Button>
          {actionType === "CREATE" ? (
            <>
              <Button type="primary" onClick={handleSubmit((data) => onSubmit?.(actionType, data))} disabled={false}>
                Lưu
              </Button>
            </>
          ) : actionType === "EDIT" ? (
            <>
              <Button
                type="primary"
                onClick={handleSubmit((data) => onSubmit?.(actionType, data))}
                disabled={isDisableUpdateButton}
              >
                Cập nhật
              </Button>
            </>
          ) : null}
        </Space>
      </div>
    </Drawer>
  );
};
export default memo(DrawerBookingRequestForm);
