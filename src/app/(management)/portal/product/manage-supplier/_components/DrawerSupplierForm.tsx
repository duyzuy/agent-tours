"use client";
import React, { useEffect, useMemo, useState } from "react";
import { Form, Input, Space, Button, Drawer, Row, Col, Switch, SwitchProps, Select, Checkbox } from "antd";
import FormItem from "@/components/base/FormItem";
import { Status } from "@/models/common.interface";
import { SupplierFormData } from "../modules/manageSupplier.interface";
import { supplierSchema } from "../schema/supplier.schema";
import { isEqualObject } from "@/utils/compare";
import { ISupplierDetail } from "@/models/management/supplier.interface";
import SelectorVendor, { SelectorVendorProps } from "./SelectorVendor";
import { UseManageSupplier } from "../modules/useManageSupplier";
import { EVendorPaymentType } from "@/models/management/vendor.interface";
import { isArray } from "lodash";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { VENDOR_PAYMENT_TYPES } from "@/constants/product.constant";
import { EInventoryType } from "@/models/management/core/inventoryType.interface";

type DrawerActions = "CREATE" | "EDIT";

export interface DrawerSupplierFormProps {
  isOpen?: boolean;
  onCancel?: () => void;
  actionType?: DrawerActions;
  initialValues?: ISupplierDetail;
  vendorInventoriesType?: EInventoryType[];
  disabledVendorField?: boolean;
  vendorId?: number;
  onSubmit?: (actionType: DrawerActions, formData: SupplierFormData) => void;
  onApproval?: UseManageSupplier["onApproval"];
  onDeactive?: UseManageSupplier["onDeactive"];
  onActive?: UseManageSupplier["onActive"];
}

const DrawerSupplierForm: React.FC<DrawerSupplierFormProps> = ({
  isOpen,
  onCancel,
  actionType,
  onSubmit,
  initialValues,
  vendorInventoriesType,
  disabledVendorField = false,
  onApproval,
  onDeactive,
  onActive,
  vendorId,
}) => {
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

  const [inventoriesTypeList, setInventoriesType] = useState<EInventoryType[]>();

  // const [isLoadingStatus, setLoadingStatus] = useState(false);
  const recordId = getValues("recId");

  const selectVendor: SelectorVendorProps["onChange"] = (vendorId, vendor) => {
    setInventoriesType(() => (isArray(vendor) ? vendor[0].typeList : vendor.typeList));
    setValue("vendorId", vendorId);
  };

  const onChangeInventoryType = (type: EInventoryType) => {
    const inventoyType = getValues("typeList");
    let newType = inventoyType ? [...inventoyType] : [];

    const indexType = newType.indexOf(type);

    indexType !== -1 ? newType.splice(indexType, 1) : newType.push(type);

    setValue("typeList", newType);
  };
  // const handleUpdateStatus: SwitchProps["onChange"] = (checked) => {
  //   if (!recordId) {
  //     throw new Error("Recid in-valid");
  //   }
  //   setLoadingStatus(true);
  //   if (checked === true) {
  //     onActive?.(recordId, (data) => {
  //       setValue("status", data.status);
  //       setLoadingStatus(false);
  //     });
  //   } else {
  //     onDeactive?.(recordId, (data) => {
  //       setValue("status", data.status);
  //       setLoadingStatus(false);
  //     });
  //   }
  // };

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
      initialValues || initFormData,
      getValues(),
    );
  }, [isOpen, actionType, initialValues, watch()]);

  useEffect(() => {
    if (initialValues && actionType === "EDIT") {
      const updateFormData = new SupplierFormData(
        initialValues.recId,
        initialValues.vendorId,
        initialValues.typeList,
        initialValues.shortName,
        initialValues.fullName,
        initialValues.contact,
        initialValues.address,
        initialValues.email,
        initialValues.taxCode,
        initialValues.rmk,
        initialValues.bankName,
        initialValues.bankAccountNumber,
        initialValues.bankAddress,
        initialValues.bankSwiftcode,
        initialValues.paymentTerm,
        initialValues.paymentType,
        initialValues.status,
      );
      Object.entries(updateFormData).forEach(([key, value]) => {
        setValue(key as keyof SupplierFormData, value);
      });
    } else {
      Object.entries(initFormData).forEach(([key, value]) => {
        setValue(key as keyof SupplierFormData, value);
      });
    }
    clearErrors();
  }, [initialValues, actionType, isOpen]);

  useEffect(() => {
    vendorId && setValue("vendorId", vendorId);
  }, [vendorId, isOpen]);

  useEffect(() => {
    vendorInventoriesType && setInventoriesType(vendorInventoriesType);
  }, [vendorInventoriesType, isOpen]);

  return (
    <Drawer
      title={actionType === "CREATE" ? "Thêm mới" : "Chỉnh sửa"}
      // extra={
      //   actionType === "EDIT" ? (
      //     <>
      //       {getValues("status") === Status.QQ ? (
      //         <Button type="primary" onClick={() => recordId && onApproval?.(recordId)}>
      //           Duyệt
      //         </Button>
      //       ) : (
      //         <Space>
      //           <span className="font-normal text-sm">Kích hoạt:</span>
      //           <Switch
      //             value={getValues("status") === Status.OK ? true : false}
      //             loading={isLoadingStatus}
      //             onChange={handleUpdateStatus}
      //           />
      //         </Space>
      //       )}
      //     </>
      //   ) : null
      // }
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
        {disabledVendorField ? null : (
          <Controller
            control={control}
            name="vendorId"
            render={({ field, fieldState: { error } }) => (
              <FormItem label="Chọn Vendor" required validateStatus={error ? "error" : ""} help={error?.message}>
                <SelectorVendor
                  onChange={selectVendor}
                  value={field.value}
                  disabled={actionType !== "CREATE"}
                  enabled={isOpen}
                />
              </FormItem>
            )}
          />
        )}
        <Controller
          control={control}
          name="typeList"
          render={({ field, fieldState: { error } }) => (
            <FormItem label="Dịch vụ cung ứng" required validateStatus={error ? "error" : ""} help={error?.message}>
              <Space wrap>
                {inventoriesTypeList ? (
                  inventoriesTypeList?.map((item) => (
                    <Checkbox
                      value={item}
                      key={item}
                      checked={field.value?.includes(item)}
                      onChange={() => onChangeInventoryType(item)}
                    >
                      {item}
                    </Checkbox>
                  ))
                ) : (
                  <p className="text-xs pl-2">Chưa có loại dịch vụ nào.</p>
                )}
              </Space>
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
                  <Input placeholder="Tên supplier" {...field} disabled={getValues("status") === Status.QQ} />
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
          {getValues("status") === Status.QQ ? (
            <Button type="primary" onClick={() => recordId && onApproval?.(recordId)}>
              Duyệt
            </Button>
          ) : (
            <>
              {actionType === "EDIT" && getValues("status") === Status.OK ? (
                <Button
                  type="primary"
                  onClick={handleSubmit((data) => onSubmit?.(actionType, data))}
                  disabled={isDisableSubmitButton}
                >
                  Cập nhật
                </Button>
              ) : null}
              {actionType === "CREATE" ? (
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
export default DrawerSupplierForm;
