"use client";
import React, { useEffect, useMemo, useState } from "react";
import { Form, Input, Space, Button, Drawer, Tag, Row, Col, Switch, SwitchProps, Select, SelectProps } from "antd";
import FormItem from "@/components/base/FormItem";
import { Status } from "@/models/common.interface";
import { SupplierFormData } from "../modules/manageSupplier.interface";
import { supplierSchema } from "../schema/supplier.schema";
import { isEqualObject } from "@/utils/compare";
import { ISupplier } from "@/models/management/supplier.interface";
import SelectorVendor, { SelectorVendorProps } from "./SelectorVendor";
import { UseManageSupplier } from "../modules/useManageSupplier";
import { EVendorPaymentType, IVendor } from "@/models/management/vendor.interface";
import { isArray, isEmpty } from "lodash";
import { Controller, useForm } from "react-hook-form";
import { useGetSupplierDetailCoreQuery } from "@/queries/core/supplier";
import { yupResolver } from "@hookform/resolvers/yup";

import { VENDOR_PAYMENT_TYPES } from "@/constants/product.constant";

export enum EActionType {
  CREATE = "CREATE",
  EDIT = "EDIT",
}

export interface DrawerSupplierProps {
  recId?: number;
  isOpen?: boolean;
  onCancel?: () => void;
  actionType?: EActionType;
  initialValues?: ISupplier;
  onSubmit?: (actionType: EActionType, formData: SupplierFormData, cb?: () => void) => void;
  onApproval?: UseManageSupplier["onApproval"];
  onDeactive?: UseManageSupplier["onDeactive"];
  onActive?: UseManageSupplier["onActive"];
}

const DrawerSupplier: React.FC<DrawerSupplierProps> = ({
  isOpen,
  onCancel,
  actionType,
  onSubmit,
  initialValues,
  onApproval,
  onDeactive,
  onActive,
  recId,
}) => {
  const { data: supplierDetail } = useGetSupplierDetailCoreQuery({ recId, enabled: !!recId });

  const initFormData = new SupplierFormData(
    undefined,
    undefined,
    undefined,
    "",
    "",
    "",
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
    Status.OK,
  );

  const { control, clearErrors, watch, getValues, setValue, handleSubmit } = useForm<SupplierFormData>({
    resolver: yupResolver(supplierSchema),
    defaultValues: initFormData,
  });

  const [vendor, setVendor] = useState<IVendor>();
  const [isLoadingStatus, setLoadingStatus] = useState(false);

  const selectVendor: SelectorVendorProps["onChange"] = (vendorId, vendor) => {
    setVendor(() => (isArray(vendor) ? vendor[0] : vendor));
    setValue("vendorId", vendorId);
  };

  const handleChangeServiceTypes: SelectProps<string[], { label: string; value: string }>["onChange"] = (
    value,
    option,
  ) => {
    setValue("typeList", value.join("||"));
  };
  const handleUpdateStatus: SwitchProps["onChange"] = (checked) => {
    if (!recId) {
      throw new Error("Recid in-valid");
    }
    setLoadingStatus(true);
    if (checked === true) {
      onActive?.(recId, (data) => {
        setValue("status", data.status);
        setLoadingStatus(false);
      });
    } else {
      onDeactive?.(recId, (data) => {
        setValue("status", data.status);
        setLoadingStatus(false);
      });
    }
  };

  const serviceTypeOptions = useMemo(() => {
    return vendor?.typeList.split("||").reduce<{ label: string; value: string }[]>((acc, item) => {
      return [...acc, { label: item, value: item }];
    }, []);
  }, [vendor]);

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
      supplierDetail || initFormData,
      getValues(),
    );
  }, [isOpen, actionType, supplierDetail, watch()]);

  useEffect(() => {
    if (supplierDetail && actionType === EActionType.EDIT) {
      const updateFormData = new SupplierFormData(
        supplierDetail.recId,
        supplierDetail.vendorId,
        supplierDetail.typeList,
        supplierDetail.shortName,
        supplierDetail.fullName,
        supplierDetail.contact,
        supplierDetail.address,
        supplierDetail.email,
        supplierDetail.taxCode,
        supplierDetail.rmk,
        supplierDetail.bankName,
        supplierDetail.bankAccountNumber,
        supplierDetail.bankAddress,
        supplierDetail.bankSwiftcode,
        supplierDetail.paymentTerm,
        supplierDetail.paymentType,
        supplierDetail.status,
      );
      Object.entries(updateFormData).forEach(([key, value]) => {
        setValue(key as keyof SupplierFormData, value);
      });
      setVendor(supplierDetail.vendor);
    } else {
      Object.entries(initFormData).forEach(([key, value]) => {
        setValue(key as keyof SupplierFormData, value);
      });
      setVendor(undefined);
    }
    clearErrors();
  }, [supplierDetail, actionType]);

  return (
    <Drawer
      title={actionType === EActionType.CREATE ? "Thêm mới" : "Chỉnh sửa"}
      extra={
        actionType === EActionType.EDIT ? (
          <>
            {getValues("status") === Status.QQ ? (
              <Button type="primary" onClick={() => recId && onApproval?.(recId)}>
                Duyệt
              </Button>
            ) : (
              <Space>
                <span className="font-normal text-sm">Kích hoạt:</span>
                <Switch
                  value={getValues("status") === Status.OK ? true : false}
                  loading={isLoadingStatus}
                  onChange={handleUpdateStatus}
                />
              </Space>
            )}
          </>
        ) : null
      }
      destroyOnClose
      width={550}
      onClose={onCancel}
      open={isOpen}
      styles={{
        body: {
          paddingBottom: 80,
        },
      }}
    >
      <Form layout="vertical" colon={false} labelWrap className="max-w-4xl">
        <Controller
          control={control}
          name="vendorId"
          render={({ field, fieldState: { error } }) => (
            <FormItem label="Chọn Vendor" required validateStatus={error ? "error" : ""} help={error?.message}>
              <SelectorVendor
                onChange={selectVendor}
                value={field.value}
                disabled={actionType !== EActionType.CREATE}
              />
            </FormItem>
          )}
        />

        <Controller
          control={control}
          name="typeList"
          render={({ field, fieldState: { error } }) => (
            <FormItem label="Dịch vụ cung ứng" required validateStatus={error ? "error" : ""} help={error?.message}>
              <Select
                mode="multiple"
                value={field.value && !isEmpty(field.value) ? field.value?.split("||") : undefined}
                placeholder="Chọn dịch vụ cung ứng"
                options={serviceTypeOptions}
                onChange={handleChangeServiceTypes}
              />
            </FormItem>
          )}
        />

        <Row gutter={[24, 24]}>
          <Col span={12}>
            <Controller
              control={control}
              name="fullName"
              render={({ field, fieldState: { error } }) => (
                <FormItem label="Tên supplier" required validateStatus={error ? "error" : ""} help={error?.message}>
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
            <FormItem label="Địa chỉ" validateStatus={error ? "error" : ""} help={error?.message}>
              <Input placeholder="Địa chỉ" {...field} disabled={getValues("status") === Status.QQ} />
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
                  <Input placeholder="Tên ngân hàng" {...field} disabled={getValues("status") === Status.QQ} />
                </FormItem>
              )}
            />
          </Col>
          <Col span={12}>
            <Controller
              control={control}
              name="bankAddress"
              render={({ field, fieldState: { error } }) => (
                <FormItem label="Chi nhánh ngân hàng" validateStatus={error ? "error" : ""} help={error?.message}>
                  <Input placeholder="Chi nhánh ngân hàng" {...field} disabled={getValues("status") === Status.QQ} />
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
                <FormItem
                  label="Mã Swift/BIC code"
                  validateStatus={error?.message ? "error" : ""}
                  help={error?.message}
                >
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
      </Form>
      <div className="bottom py-4 absolute bottom-0 left-0 right-0 border-t px-6 bg-white">
        <Space>
          <Button onClick={onCancel}>Huỷ bỏ</Button>
          {getValues("status") === Status.QQ ? null : (
            <>
              {actionType === EActionType.EDIT && getValues("status") === Status.OK ? (
                <Button
                  type="primary"
                  onClick={handleSubmit((data) => onSubmit?.(actionType, data))}
                  disabled={isDisableSubmitButton}
                >
                  Cập nhật
                </Button>
              ) : null}
              {actionType === EActionType.CREATE ? (
                <>
                  <Button
                    type="primary"
                    onClick={handleSubmit((data) =>
                      onSubmit?.(actionType, {
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
                      onSubmit?.(actionType, {
                        ...data,
                        status: Status.OK,
                      }),
                    )}
                    disabled={isDisableSubmitButton}
                  >
                    Lưu và duyệt
                  </Button>
                </>
              ) : null}
            </>
          )}
        </Space>
      </div>
    </Drawer>
  );
};
export default DrawerSupplier;
