import { Drawer, DrawerProps, Form, Input, Space, Button, Radio, Switch } from "antd";
import FormItem from "@/components/base/FormItem";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { OperationDeadlineFormData } from "../../../../modules/operation.interface";
import { operationCreateDeadlineSchema } from "../../../../schema/operation.schema";
import { useEffect, useMemo } from "react";

import { isEqualObject } from "@/utils/compare";
import { IOperationDeadline } from "@/models/management/core/operation/operationDeadline.interface";
import { EInventoryType } from "@/models/management/core/inventoryType.interface";
import CustomDatePicker from "@/components/admin/CustomDatePicker";

import dayjs from "dayjs";
import { FeCustomDatePickerProps } from "@/components/base/FeCustomDatePicker";
import { DATE_TIME_FORMAT, TIME_FORMAT } from "@/constants/common";

const INVENTORY_TYPE_LIST: EInventoryType[] = [
  EInventoryType.AIR,
  EInventoryType.GUIDE,
  EInventoryType.HOTEL,
  EInventoryType.INSURANCE,
  EInventoryType.LANDPACKAGE,
  EInventoryType.RESTAURANT,
  EInventoryType.TRANSPORT,
  EInventoryType.VISA,
];
export type DrawerOperationDeadlineProps = DrawerProps & {
  operationId?: number;
  action?: "create" | "edit";
  onClose?: () => void;
  onSubmit?: (data: OperationDeadlineFormData, action?: "create" | "edit") => void;
  initialValue?: IOperationDeadline;
};
const DrawerOperationDeadline: React.FC<DrawerOperationDeadlineProps> = ({
  operationId,
  action,
  onClose,
  open,
  onSubmit,
  initialValue,
}) => {
  const initFormData = new OperationDeadlineFormData(
    undefined,
    operationId,
    undefined,
    undefined,
    undefined,
    "",
    false,
  );

  const { setValue, getValues, handleSubmit, control, watch } = useForm<OperationDeadlineFormData>({
    resolver: yupResolver(operationCreateDeadlineSchema),
    defaultValues: { ...initFormData },
  });
  const deadline = getValues("deadline");
  const preDeadline = getValues("preDeadline");

  const isDisabledButton = useMemo(() => {
    const values = getValues();

    return isEqualObject<OperationDeadlineFormData>(
      ["remark", "preDeadline", "deadline", "needRemarkEachPaxToFollow", "type"],
      {
        remark: initialValue?.remark,
        type: initialValue?.type,
        deadline: initialValue?.deadline ?? undefined,
        preDeadline: initialValue?.preDeadline ?? undefined,
      },
      { remark: values.remark, type: values.type, deadline: values.deadline, preDeadline: values.preDeadline },
    );
  }, [getValues(), initialValue, open, watch()]);

  const handleChangePreDeadline: FeCustomDatePickerProps["onChange"] = (value) => {
    setValue("preDeadline", value?.locale("en").format(DATE_TIME_FORMAT));
  };
  const handleChangeDeadline: FeCustomDatePickerProps["onChange"] = (value) => {
    setValue("deadline", value?.locale("en").format(DATE_TIME_FORMAT));
  };

  useEffect(() => {
    const initData = initialValue
      ? new OperationDeadlineFormData(
          initialValue.id,
          initialValue.operationId,
          initialValue.type,
          initialValue.preDeadline ?? undefined,
          initialValue.deadline ?? undefined,
          initialValue.remark,
          initialValue.needRemarkEachPaxToFollow,
        )
      : initFormData;

    Object.keys(initData).forEach((key) => {
      setValue(key as keyof OperationDeadlineFormData, initData[key as keyof OperationDeadlineFormData]);
    });
  }, [initialValue, open]);

  return (
    <Drawer
      title={action === "create" ? "Thêm deadline mới" : "Chỉnh sửa"}
      destroyOnClose
      width={650}
      onClose={onClose}
      open={open}
      footer={
        <Space className="py-3">
          <Button onClick={onClose}>Huỷ</Button>
          <Button type="primary" onClick={handleSubmit((data) => onSubmit?.(data, action))} disabled={isDisabledButton}>
            Lưu
          </Button>
        </Space>
      }
    >
      <Form layout="vertical">
        <Controller
          control={control}
          name="type"
          render={({ field: { value, onChange }, fieldState: { error } }) => (
            <FormItem label="Loại dịch vụ" required validateStatus={error ? "error" : ""} help={error?.message}>
              <Space wrap>
                {INVENTORY_TYPE_LIST.map((item) => (
                  <Radio key={item} value={item} checked={item === value} onChange={onChange}>
                    {item}
                  </Radio>
                ))}
              </Space>
            </FormItem>
          )}
        />
        <Controller
          control={control}
          name="preDeadline"
          render={({ field, fieldState: { error } }) => (
            <FormItem label="Pre deadline" required validateStatus={error ? "error" : ""} help={error?.message}>
              <CustomDatePicker
                format={"DD/MM/YYYY - HH:mm"}
                placeholder="Pre deadline"
                showTime={{
                  format: TIME_FORMAT,
                  hideDisabledOptions: true,
                  defaultValue: dayjs("23:59:59", "HH:mm:ss"),
                }}
                value={field.value ? dayjs(field.value, { format: DATE_TIME_FORMAT }) : undefined}
                onChange={handleChangePreDeadline}
                disabledDate={(date) => {
                  return deadline ? date.isAfter(dayjs(deadline)) || date.isBefore(dayjs()) : date.isBefore(dayjs());
                }}
                className="w-full"
              />
            </FormItem>
          )}
        />
        <Controller
          control={control}
          name="deadline"
          render={({ field, fieldState: { error } }) => (
            <FormItem label="Deadline" required validateStatus={error ? "error" : ""} help={error?.message}>
              <CustomDatePicker
                placeholder="Deadline"
                showTime={{
                  format: TIME_FORMAT,
                  hideDisabledOptions: true,
                  defaultValue: dayjs("23:59:59", "HH:mm:ss"),
                }}
                value={field.value ? dayjs(field.value, { format: DATE_TIME_FORMAT }) : undefined}
                disabledDate={(date) => {
                  return !preDeadline ? dayjs().isAfter(date) : date.isBefore(dayjs(preDeadline));
                }}
                format={"DD/MM/YYYY - HH:mm"}
                onChange={handleChangeDeadline}
                className="w-full"
              />
            </FormItem>
          )}
        />
        <Controller
          control={control}
          name="needRemarkEachPaxToFollow"
          render={({ field, fieldState: { error } }) => (
            <FormItem label="Theo dõi từng khách" required validateStatus={error ? "error" : ""} help={error?.message}>
              <Switch value={field.value} checkedChildren="Có" unCheckedChildren="Không" onChange={field.onChange} />
            </FormItem>
          )}
        />
        <Controller
          control={control}
          name="remark"
          render={({ field, fieldState: { error } }) => (
            <FormItem label="Ghi chú" required validateStatus={error ? "error" : ""} help={error?.message}>
              <Input.TextArea className="w-full" {...field} />
            </FormItem>
          )}
        />
      </Form>
    </Drawer>
  );
};
export default DrawerOperationDeadline;
