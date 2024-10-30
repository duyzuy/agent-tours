import { Drawer, DrawerProps, Form, Input, Row, Col, Space, Button } from "antd";
import FormItem from "@/components/base/FormItem";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { OperationFormData } from "../modules/operation.interface";
import { operationSchema } from "../schema/operation.schema";
import SellableCodeListSelector, { SellableCodeListSelectorProps } from "./SellableCodeListSelector";
import PicListSelector, { PicListSelectorProps } from "./PicListSelector";
import { IOperation } from "@/models/management/core/operation.interface";
import { memo, Suspense, useDeferredValue, useEffect, useMemo, useState } from "react";
import { isEqualObject } from "@/utils/compare";
import SellableCodeListSelector2 from "./SellableCodeListSelector2";

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
  const deferedQuerySearch = useDeferredValue(querySearch);
  const initFormData = new OperationFormData(undefined, undefined, undefined, undefined);

  console.log(deferedQuerySearch);
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
      title={action === "create" ? "Tạo điều hành" : `Sửa #${initialValue?.id}`}
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
        {/* <Controller
          control={control}
          name="sellableCode"
          render={({ field, fieldState: { error } }) => (
            <FormItem label="Sản phẩm" required validateStatus={error ? "error" : ""} help={error?.message}>
              <SellableCodeListSelector value={field?.value} onChange={handleChangeCode} disabled={action === "edit"} />
            </FormItem>
          )}
        /> */}
        <Controller
          control={control}
          name="sellableCode"
          render={({ field, fieldState: { error } }) => (
            <>
              {action === "edit" ? (
                <div>
                  <div>Sản phẩm</div>
                  <div>{field.value}</div>
                </div>
              ) : (
                <FormItem label="Chọn sản phẩm" required validateStatus={error ? "error" : ""} help={error?.message}>
                  <Input
                    value={querySearch}
                    onChange={(evt) => setQuerySearch(evt.target.value)}
                    placeholder="Nhập mã sản phẩm..."
                  />
                  <div className="mb-3"></div>
                  <Suspense fallback="loading...">
                    <SellableCodeListSelector2
                      value={field?.value}
                      onChange={handleChangeCode}
                      query={deferedQuerySearch}
                    />
                  </Suspense>
                </FormItem>
              )}
            </>
          )}
        />
      </Form>
      <div className="bottom py-4 absolute bottom-0 left-0 right-0 border-t px-6 bg-white">
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
      </div>
    </Drawer>
  );
};
export default memo(DrawerOperation);
