"use client";
import React, { useEffect, useMemo, useState } from "react";
import { Form, Input, Space, Button, Drawer, Checkbox, Row, Col, Switch, SwitchProps, Select } from "antd";
import FormItem from "@/components/base/FormItem";
import { Status } from "@/models/common.interface";
import { VendorFormData } from "../modules/manageVendor.interface";
import { vendorSchema } from "../schema/vendor.schema";
import { EVendorPaymentType, IVendorDetail } from "@/models/management/vendor.interface";
import { isEqualObject } from "@/utils/compare";
import { UseManageVendor } from "../modules/useManageVendor";
import InventoryTypeSelector, { InventoryTypeSelectorProps } from "./InventoryTypeSelector";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { VENDOR_PAYMENT_TYPES } from "@/constants/product.constant";

type DrawerActions = "CREATE" | "EDIT";

export interface DrawerVendorFormProps {
  isOpen?: boolean;
  onCancel?: () => void;
  actionType?: DrawerActions;
  initialValues?: IVendorDetail;
  onSubmit?: (actionType: DrawerActions, formData: VendorFormData, cb?: () => void) => void;
  onApproval?: UseManageVendor["onApproval"];
}

const DrawerVendorForm: React.FC<DrawerVendorFormProps> = ({
  isOpen,
  onCancel,
  actionType,
  onSubmit,
  initialValues,
  onApproval,
}) => {
  const initVendorFormData = new VendorFormData(
    undefined,
    "",
    [],
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    EVendorPaymentType.CASH,
    "",
    "",
    false,
    Status.OK,
  );
  const { control, getValues, handleSubmit, setValue, watch, clearErrors } = useForm<VendorFormData>({
    resolver: yupResolver(vendorSchema),
    defaultValues: { ...initVendorFormData },
  });
  // const [isLoadingStatus, setLoadingStatus] = useState(false);

  const selectInventoryType: InventoryTypeSelectorProps["onChange"] = (value) => {
    setValue("typeList", value);
  };

  const toggleCreateSupplier = (checked: boolean) => {
    setValue("createDefaultSupplier", checked);
  };

  useEffect(() => {
    const updateFormData = initialValues
      ? new VendorFormData(
          initialValues.recId,
          initialValues.shortName,
          initialValues.typeList,
          initialValues.fullName,
          initialValues.contact,
          initialValues.address,
          initialValues.email,
          initialValues.taxCode,
          initialValues.rmk,
          initialValues.bankName,
          initialValues.bankAccountNumber,
          initialValues.bankAddress,
          initialValues.paymentType,
          initialValues.bankSwiftcode,
          initialValues.paymentTerm,
          false,
          initialValues.status,
        )
      : initVendorFormData;
    Object.entries(updateFormData).forEach(([key, value]) => {
      setValue(key as keyof VendorFormData, value);
    });

    clearErrors();
  }, [initialValues, actionType]);

  const isDisableSubmitButton = useMemo(() => {
    return isEqualObject(
      [
        "address",
        "fullName",
        "shortName",
        "bankAccountNumber",
        "bankAddress",
        "bankName",
        "contact",
        "typeList",
        "rmk",
        "taxCode",
        "email",
        "bankSwiftcode",
        "paymentTerm",
        "paymentType",
      ],
      initialValues || initVendorFormData,
      getValues(),
    );
  }, [isOpen, actionType, initialValues, watch()]);

  return (
    <Drawer
      title={actionType === "CREATE" ? "Thêm mới" : "Chỉnh sửa"}
      destroyOnClose
      width={550}
      onClose={onCancel}
      maskClosable={false}
      open={isOpen}
      footer={
        <Space className="py-3">
          {initialValues ? (
            <>
              {initialValues.status === Status.QQ ? (
                <Button
                  type="primary"
                  className="w-28"
                  onClick={() => initialValues?.recId && onApproval?.(initialValues.recId)}
                >
                  Duyệt
                </Button>
              ) : (
                <Button
                  type="primary"
                  onClick={handleSubmit((data) => onSubmit?.("EDIT", data))}
                  disabled={isDisableSubmitButton}
                >
                  Cập nhật
                </Button>
              )}
            </>
          ) : (
            <>
              <Button
                type="primary"
                onClick={handleSubmit((data) =>
                  onSubmit?.("CREATE", {
                    ...data,
                    status: Status.QQ,
                  }),
                )}
                disabled={isDisableSubmitButton}
              >
                Lưu và chờ duyệt
              </Button>
              <Button
                type="primary"
                onClick={handleSubmit((data) =>
                  onSubmit?.("CREATE", {
                    ...data,
                    status: Status.OK,
                  }),
                )}
                disabled={isDisableSubmitButton}
              >
                Lưu và duyệt
              </Button>
            </>
          )}
          <Button onClick={onCancel} className="w-28">
            Huỷ bỏ
          </Button>
        </Space>
      }
    >
      <Form layout="vertical" colon={false} labelWrap className="max-w-4xl">
        <Row gutter={[24, 24]}>
          <Col span={12}>
            <Controller
              control={control}
              name="fullName"
              render={({ field, fieldState: { error } }) => (
                <FormItem
                  label="Tên vendor"
                  required
                  validateStatus={error?.message ? "error" : ""}
                  help={error?.message}
                >
                  <Input placeholder="Tên vendor" {...field} disabled={getValues("status") === Status.QQ} />
                </FormItem>
              )}
            />
          </Col>
          <Col span={12}>
            <Controller
              control={control}
              name="shortName"
              render={({ field, fieldState: { error } }) => (
                <FormItem label="Tên rút gọn" required validateStatus={error ? "error" : ""} help={error?.message}>
                  <Input placeholder="Tên rút gọn" {...field} disabled={getValues("status") === Status.QQ} />
                </FormItem>
              )}
            />
          </Col>
        </Row>

        <Controller
          control={control}
          name="typeList"
          render={({ field, fieldState: { error } }) => (
            <FormItem
              label="Loại dịch vụ cung ứng"
              required
              validateStatus={error ? "error" : ""}
              help={error?.message}
            >
              <InventoryTypeSelector
                value={field.value}
                onChange={selectInventoryType}
                disabled={getValues("status") === Status.QQ}
              />
            </FormItem>
          )}
        />

        <Row gutter={[24, 24]}>
          <Col span={12}>
            <Controller
              control={control}
              name="contact"
              render={({ field, fieldState: { error } }) => (
                <FormItem
                  label="Họ và tên người liên hệ"
                  required
                  validateStatus={error ? "error" : ""}
                  help={error?.message}
                >
                  <Input placeholder="Họ và tên" {...field} disabled={getValues("status") === Status.QQ} />
                </FormItem>
              )}
            />
          </Col>
          <Col span={12}>
            <Controller
              control={control}
              name="email"
              render={({ field, fieldState: { error } }) => (
                <FormItem label="Email" required validateStatus={error ? "error" : ""} help={error?.message}>
                  <Input placeholder="Email" {...field} disabled={getValues("status") === Status.QQ} />
                </FormItem>
              )}
            />
          </Col>
        </Row>
        <Controller
          control={control}
          name="address"
          render={({ field, fieldState: { error } }) => (
            <FormItem label="Địa chỉ" validateStatus={error ? "error" : ""} help={error?.message || ""}>
              <Input placeholder="Địa chỉ" {...field} />
            </FormItem>
          )}
        />
        <Controller
          control={control}
          name="rmk"
          render={({ field, fieldState: { error } }) => (
            <FormItem label="Ghi chú" validateStatus={error ? "error" : ""} help={error?.message}>
              <Input.TextArea placeholder="Ghi chú" {...field} disabled={getValues("status") === Status.QQ} />
            </FormItem>
          )}
        />

        <Row gutter={24}>
          <Col span={12}>
            <Controller
              control={control}
              name="taxCode"
              render={({ field, fieldState: { error } }) => (
                <FormItem label="Mã số thuế" validateStatus={error ? "error" : ""} help={error?.message}>
                  <Input placeholder="Mã số thuế" {...field} disabled={getValues("status") === Status.QQ} />
                </FormItem>
              )}
            />
          </Col>
          <Col span={12}>
            <Controller
              control={control}
              name="paymentType"
              render={({ field, fieldState: { error } }) => (
                <FormItem label="Hình thức thanh toán" validateStatus={error ? "error" : ""} help={error?.message}>
                  <Select
                    placeholder="Hình thức thanh toán"
                    value={field.value}
                    options={VENDOR_PAYMENT_TYPES}
                    onChange={field.onChange}
                    disabled={getValues("status") === Status.QQ}
                  />
                </FormItem>
              )}
            />
          </Col>
          <Col span={12}>
            <Controller
              control={control}
              name="bankName"
              render={({ field, fieldState: { error } }) => (
                <FormItem label="Tên ngân hàng" validateStatus={error ? "error" : ""} help={error?.message}>
                  <Input placeholder="Tên ngân hàng" {...field} />
                </FormItem>
              )}
            />
          </Col>
          <Col span={12}>
            <Controller
              control={control}
              name="bankAddress"
              render={({ field, fieldState: { error } }) => (
                <FormItem label="Chi nhánh" validateStatus={error ? "error" : ""} help={error?.message}>
                  <Input placeholder="Chi nhánh" {...field} disabled={getValues("status") === Status.QQ} />
                </FormItem>
              )}
            />
          </Col>
          <Col span={12}>
            <Controller
              control={control}
              name="bankAccountNumber"
              render={({ field, fieldState: { error } }) => (
                <FormItem label="Số tài khoản ngân hàng" validateStatus={error ? "error" : ""} help={error?.message}>
                  <Input placeholder="Số tài khoản ngân hàng" {...field} disabled={getValues("status") === Status.QQ} />
                </FormItem>
              )}
            />
          </Col>
          <Col span={12}>
            <Controller
              control={control}
              name="bankSwiftcode"
              render={({ field, fieldState: { error } }) => (
                <FormItem label="Mã Swift/BIC code" validateStatus={error ? "error" : ""} help={error?.message}>
                  <Input placeholder="Mã Swift/BIC code" {...field} disabled={getValues("status") === Status.QQ} />
                </FormItem>
              )}
            />
          </Col>
          <Col span={24}>
            <Controller
              control={control}
              name="paymentTerm"
              render={({ field, fieldState: { error } }) => (
                <FormItem label="Chính sách thanh toán" validateStatus={error ? "error" : ""} help={error?.message}>
                  <Input.TextArea
                    placeholder="Chính sách thanh toán"
                    {...field}
                    disabled={getValues("status") === Status.QQ}
                  />
                </FormItem>
              )}
            />
          </Col>
        </Row>
        {actionType === "CREATE" ? (
          <Controller
            control={control}
            name="createDefaultSupplier"
            render={({ field, fieldState: { error } }) => (
              <FormItem
                label="Tạo Supplier"
                tooltip="Tạo supplier tương ứng với Vendor"
                validateStatus={error ? "error" : ""}
                help={error?.message}
              >
                <Checkbox checked={field.value} onChange={(ev) => toggleCreateSupplier(ev.target.checked)}>
                  Tạo Supplier tương ứng
                </Checkbox>
              </FormItem>
            )}
          />
        ) : null}
      </Form>
    </Drawer>
  );
};
export default DrawerVendorForm;
