import { Drawer, DrawerProps, Form, Input, Row, Col, Space, Button } from "antd";
import FormItem from "@/components/base/FormItem";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { OperationFormData } from "../modules/operation.interface";
import { operationSchema } from "../schema/operation.schema";
import SellableCodeListSelector, { SellableCodeListSelectorProps } from "./SellableCodeListSelector";
import PicListSelector, { PicListSelectorProps } from "./PicListSelector";
import { IOperation } from "@/models/management/core/operation.interface";
import { useEffect, useMemo } from "react";
import { isEqualObject } from "@/utils/compare";

export type DrawerOperationProps = DrawerProps & {
  action?: "create" | "edit";
  onClose?: () => void;
  onSubmit?: (data: OperationFormData, action?: "create" | "edit") => void;
  isSubmiting?: boolean;
  initialValue?: IOperation;
};
const DrawerOperation: React.FC<DrawerOperationProps> = ({
  action,
  onClose,
  open,
  onSubmit,
  initialValue,
  isSubmiting,
}) => {
  const initFormData = new OperationFormData(undefined, undefined, undefined, undefined);

  const { setValue, getValues, handleSubmit, control, watch } = useForm<OperationFormData>({
    resolver: yupResolver(operationSchema),
    defaultValues: { ...initFormData },
  });

  const handleChangePic: PicListSelectorProps["onChange"] = (value, data) => {
    setValue("pic", {
      recId: data.recId,
      fullname: data.fullname,
      email: data.email,
      username: data.username,
      phoneNumber: data.phoneNumber,
    });
  };
  const handleChangeCode: SellableCodeListSelectorProps["onChange"] = (value, option) => {
    setValue("sellableCode", option.code);
    setValue("sellableId", option.recId);
  };

  const isDisabledButton = useMemo(() => {
    const values = getValues();
    return isEqualObject(
      ["pic", "sellableCode"],
      { pic: initialValue?.pic?.recId, sellableCode: initialValue?.sellableCode },
      { pic: values.pic?.recId, sellableCode: values.sellableCode },
    );
  }, [getValues(), initialValue, open, watch()]);

  useEffect(() => {
    const initData = initialValue
      ? new OperationFormData(
          initialValue.id,
          initialValue.pic ? initialValue.pic : undefined,
          initialValue.sellableCode,
          initialValue.sellableId,
        )
      : initFormData;

    Object.keys(initData).forEach((key) => {
      setValue(key as keyof OperationFormData, initData[key as keyof OperationFormData]);
    });
  }, [initialValue, open]);

  return (
    <Drawer
      title={action === "create" ? "Thêm mới" : "Chỉnh sửa"}
      destroyOnClose
      width={550}
      onClose={onClose}
      open={open}
      styles={{
        body: {
          paddingBottom: 80,
        },
      }}
    >
      <Form layout="vertical">
        <Controller
          control={control}
          name="pic"
          render={({ field, fieldState: { error } }) => (
            <FormItem label="Người phụ trách" required validateStatus={error ? "error" : ""} help={error?.message}>
              <PicListSelector value={field?.value?.recId} onChange={handleChangePic} />
            </FormItem>
          )}
        />
        <Controller
          control={control}
          name="sellableCode"
          render={({ field, fieldState: { error } }) => (
            <FormItem label="Sản phẩm" required validateStatus={error ? "error" : ""} help={error?.message}>
              <SellableCodeListSelector value={field?.value} onChange={handleChangeCode} disabled={action === "edit"} />
            </FormItem>
          )}
        />
        <Space>
          <Button disabled={isSubmiting} onClick={onClose}>
            Huỷ
          </Button>
          <Button
            type="primary"
            onClick={handleSubmit((data) => onSubmit?.(data, action))}
            disabled={isDisabledButton}
            loading={isSubmiting}
          >
            Lưu
          </Button>
        </Space>
      </Form>
    </Drawer>
  );
};
export default DrawerOperation;
