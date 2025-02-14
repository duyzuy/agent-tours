import { memo, useEffect, useMemo, useState } from "react";
import { Drawer, DrawerProps, Form, Input, Space, Button } from "antd";
import FormItem from "@/components/base/FormItem";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { OperationFormData } from "../modules/operation.interface";
import { operationSchema } from "../schema/operation.schema";
import PicListSelector, { PicListSelectorProps } from "./PicListSelector";
import SellableCodeListSelector, { SellableCodeListSelectorProps } from "./SellableCodeListSelector";
import { isEqualObject } from "@/utils/compare";
import { useDebounce } from "@/hooks/useDebounce";
import { IOperation } from "@/models/management/core/operation/operation.interface";

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
  const [querySearch, setQuerySearch] = useState("");
  const deferedQuerySearch = useDebounce(querySearch, 800);
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
    setQuerySearch(initialValue?.sellableCode || "");
  }, [initialValue, open]);

  return (
    <Drawer
      title={action === "create" ? "Tạo điều hành" : `Sửa #${initialValue?.id}`}
      destroyOnClose
      width={550}
      onClose={onClose}
      open={open}
      footer={
        <Space className="py-3">
          <Button
            type="primary"
            onClick={handleSubmit((data) => onSubmit?.(data, action))}
            disabled={isDisabledButton}
            loading={isSubmiting}
          >
            Lưu
          </Button>
          <Button disabled={isSubmiting} onClick={onClose}>
            Huỷ
          </Button>
        </Space>
      }
    >
      <Form layout="vertical">
        <Controller
          control={control}
          name="pic"
          render={({ field: { value }, fieldState: { error } }) => (
            <FormItem label="Người phụ trách" required validateStatus={error ? "error" : ""} help={error?.message}>
              <PicListSelector value={value?.recId} onChange={handleChangePic} />
            </FormItem>
          )}
        />

        <Controller
          control={control}
          name="sellableCode"
          render={({ field, fieldState: { error } }) => (
            <FormItem label="Chọn sản phẩm" required validateStatus={error ? "error" : ""} help={error?.message}>
              {action === "edit" ? (
                field.value
              ) : (
                <>
                  <Input
                    value={querySearch}
                    onChange={(evt) => setQuerySearch(evt.target.value)}
                    placeholder="Nhập mã sản phẩm..."
                  />
                  <div className="mb-3"></div>
                  <SellableCodeListSelector
                    value={field?.value}
                    onChange={handleChangeCode}
                    query={deferedQuerySearch}
                  />
                </>
              )}
            </FormItem>
          )}
        />
      </Form>
    </Drawer>
  );
};
export default memo(DrawerOperation);
