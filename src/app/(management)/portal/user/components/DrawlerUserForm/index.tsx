import React, { useEffect, useMemo, useState } from "react";
import { Drawer, Space, Button, Form, Row, Col, Input, Select, Switch, Divider } from "antd";
import { ELocalUserType, ILocalUser } from "@/models/management/localUser.interface";
import ModalChangePassword from "../ModalChangePassword";
import FormItem from "@/components/base/FormItem";
import TextArea from "antd/es/input/TextArea";
import { generateStrings } from "@/utils/helper";
import { isArray } from "lodash";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { localUserSchema } from "../../hooks/validate";
import { LocalUserFormData } from "../../hooks/localUser.interface";
import RoleSelector, { RoleSelectorProps } from "./RoleSelector";
import { getAdminUserInformationStorage } from "@/utils/common";
export type DrawerAction = "CREATE" | "EDIT";
export type TDrawlerCreateAction = {
  type: "CREATE";
};
export type TDrawlerEditAction = {
  type: "EDIT";
  record: ILocalUser;
};
export type TDrawlerAction = TDrawlerCreateAction | TDrawlerEditAction;

export const AGENT_STAFF_ROLE = {
  mainRole: "AGENTSTAFF964779",
  mainRoleName: "Agent Staff",
};
export interface DrawlerUserFormProps {
  isOpen?: boolean;
  onCancel: () => void;
  actionType?: DrawerAction;
  initialValues?: ILocalUser;
  onSubmit?: (action: DrawerAction, formData: LocalUserFormData) => void;
  onUpdateStatus: (recordId: number, status: LocalUserFormData["status"]) => void;
}

const DrawlerUserForm: React.FC<DrawlerUserFormProps> = ({
  isOpen,
  onCancel,
  actionType = "CREATE",
  onSubmit,
  initialValues,
  onUpdateStatus,
}) => {
  const initFormData = new LocalUserFormData(
    "",
    undefined,
    "",
    "",
    "",
    "",
    "",
    "OX",
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
  );

  const { setValue, control, handleSubmit, formState } = useForm<
    LocalUserFormData & { isRequirePassword?: boolean; isCreate?: boolean }
  >({
    defaultValues: { ...initFormData, isRequirePassword: actionType === "CREATE", isCreate: actionType === "CREATE" },
    resolver: yupResolver(localUserSchema),
  });
  const userInfo = getAdminUserInformationStorage();

  const [isEditPassword, setEditPassword] = useState(false);

  const onChangeStatus = (checked: boolean) => {
    setValue("status", checked ? "OK" : "OX");
    if (actionType === "EDIT") {
      initialValues && onUpdateStatus(initialValues.recId, checked ? "OK" : "OX");
    }
  };

  const OPTIONS_USER_TYPE_LIST = [
    { value: ELocalUserType.ADMIN, label: "Admin" },
    { value: ELocalUserType.STAFF, label: "Staff" },
    { value: ELocalUserType.AGENT, label: "Agent" },
    { value: ELocalUserType.AGENT_STAFF, label: "Agent staff" },
  ];

  const filterUserTypeByAdminAccount = (items: typeof OPTIONS_USER_TYPE_LIST) => {
    return items.filter((item) => {
      if (userInfo?.localUserType === "AGENT") {
        return item.value === ELocalUserType.AGENT_STAFF;
      }
    });
  };
  const generatePassword = () => {
    const password = generateStrings(10);
    setValue("password", password);
  };
  const onChangeRole: RoleSelectorProps["onChange"] = (value, option) => {
    const role = isArray(option) ? option[0] : option;
    setValue("mainRole", role.localUser_RoleKey);
    setValue("mainRoleName", role.localUser_RoleValue);
  };
  const onChangeUserType = (userType: ELocalUserType) => {
    setValue("userType", userType);
  };

  useEffect(() => {
    const formData = initialValues
      ? new LocalUserFormData(
          initialValues.username,
          initialValues.userType,
          initialValues.fullname,
          initialValues.infoEmail,
          initialValues.password,
          initialValues.phoneNumber,
          initialValues.email,
          initialValues.status,
          initialValues.mainRole,
          initialValues.mainRoleName,
          initialValues.descriptions,
          initialValues.infoCompanyName,
          initialValues.infoLegalRepresentative,
          initialValues.infoPosition,
          initialValues.infoPhoneNumber,
          initialValues.infoAddress,
          initialValues.infoTaxcode,
          initialValues.infoBanking,
          initialValues.infoSpecialNote,
        )
      : initFormData;

    Object.entries(formData).forEach(([key, value]) => {
      setValue(key as keyof LocalUserFormData, value as LocalUserFormData[keyof LocalUserFormData]);
    });
    setValue("isRequirePassword", actionType === "CREATE");
    setValue("isCreate", actionType === "CREATE");
  }, [initialValues, isOpen, actionType]);

  useEffect(() => {
    if (userInfo?.localUserType === "AGENT") {
      setValue("mainRole", AGENT_STAFF_ROLE.mainRole);
      setValue("mainRoleName", AGENT_STAFF_ROLE.mainRoleName);
    }
  }, [userInfo, isOpen]);
  return (
    <>
      <Drawer
        title={actionType === "CREATE" ? "Thêm mới" : "Chỉnh sửa"}
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
        <Form layout="vertical">
          <h3 className="font-semibold text-lg mb-6">Thông tin tài khoản</h3>
          <Row gutter={16}>
            <Col span={12}>
              <Controller
                control={control}
                name="fullname"
                render={({ field, fieldState: { error } }) => (
                  <FormItem
                    label="Họ và tên"
                    required
                    validateStatus={error?.message ? "error" : ""}
                    help={error?.message}
                  >
                    <Input placeholder="Họ và tên" {...field} />
                  </FormItem>
                )}
              />
            </Col>
            <Col span={12}>
              <Controller
                control={control}
                name="email"
                render={({ field, fieldState: { error } }) => (
                  <FormItem label="Email" required validateStatus={error?.message ? "error" : ""} help={error?.message}>
                    <Input placeholder="Email" autoComplete="email" disabled={actionType === "EDIT"} {...field} />
                  </FormItem>
                )}
              />
            </Col>
            <Col span={12}>
              <Controller
                control={control}
                name="phoneNumber"
                render={({ field, fieldState: { error } }) => (
                  <FormItem
                    label="Số điện thoại"
                    required
                    validateStatus={error?.message ? "error" : ""}
                    help={error?.message}
                  >
                    <Input placeholder="Số điện thoại" disabled={actionType === "EDIT"} {...field} />
                  </FormItem>
                )}
              />
            </Col>

            <Col span={12}>
              <Controller
                control={control}
                name="username"
                render={({ field, fieldState: { error } }) => (
                  <FormItem
                    label="Tên tài khoản"
                    required
                    validateStatus={error?.message ? "error" : ""}
                    help={error?.message}
                  >
                    <Input placeholder="Tên tài khoản" disabled={actionType === "EDIT"} {...field} />
                  </FormItem>
                )}
              />
            </Col>
            <Col span={12}>
              <Controller
                control={control}
                name="userType"
                render={({ field, fieldState: { error } }) => (
                  <FormItem
                    label="Loại tài khoản"
                    required
                    validateStatus={error?.message ? "error" : ""}
                    help={error?.message}
                  >
                    <Select
                      value={field.value}
                      placeholder="Loại tài khoản"
                      options={filterUserTypeByAdminAccount(OPTIONS_USER_TYPE_LIST)}
                      onChange={(value) => onChangeUserType(value)}
                    />
                  </FormItem>
                )}
              />
            </Col>
            <Col span={12}>
              {(actionType === "CREATE" && (
                <React.Fragment>
                  <Controller
                    control={control}
                    name="password"
                    render={({ field, fieldState: { error } }) => (
                      <FormItem
                        label="Mật khẩu"
                        required
                        validateStatus={error?.message ? "error" : ""}
                        help={error?.message}
                      >
                        <React.Fragment>
                          <Input.Password
                            placeholder="Mật khẩu"
                            autoComplete="password"
                            // disabled={actionType === "edit" ?? false}
                            {...field}
                          />
                        </React.Fragment>
                        <p className="text-right pt-2 cursor-pointer">
                          <span
                            className="text-xs text-gray-500 hover:text-primary-default cursor-pointer block"
                            onClick={generatePassword}
                          >
                            Tạo ngẫu nhiên
                          </span>
                        </p>
                      </FormItem>
                    )}
                  />
                </React.Fragment>
              )) || (
                <React.Fragment>
                  <div className="change-password mb-4">
                    <div className="label pb-2">Mật khẩu</div>
                    <div className="password-form pt-2">
                      <div className="password no-edit flex items-center">
                        <span className="flex items-center text-xs">********</span>
                        <span
                          className="text-xs ml-3 text-blue-600 cursor-pointer"
                          onClick={() => setEditPassword((prev) => !prev)}
                        >
                          Đổi mật khẩu
                        </span>
                      </div>
                    </div>
                  </div>
                </React.Fragment>
              )}
            </Col>
            <Col span={24}>
              <Controller
                control={control}
                name="mainRole"
                render={({ field, fieldState: { error } }) => (
                  <FormItem label="Quyền" required validateStatus={error?.message ? "error" : ""} help={error?.message}>
                    <RoleSelector
                      value={field.value}
                      onChange={onChangeRole}
                      disabled={userInfo?.localUserType === "AGENT_STAFF" || userInfo?.localUserType === "AGENT"}
                    />
                  </FormItem>
                )}
              />
            </Col>
            <Col span={24}>
              <Controller
                control={control}
                name="descriptions"
                render={({ field, fieldState: { error } }) => (
                  <FormItem label="Mô tả">
                    <TextArea placeholder="Mô tả" autoSize={{ minRows: 3, maxRows: 5 }} {...field} />
                  </FormItem>
                )}
              />
            </Col>
          </Row>

          <Controller
            control={control}
            name="status"
            render={({ field, fieldState: { error } }) => (
              <FormItem label="Trạng thái">
                <div className="flex items-center">
                  <Switch checked={field.value === "OK"} onChange={onChangeStatus} />
                  <span className="ml-2">Kích hoạt</span>
                </div>
              </FormItem>
            )}
          />

          <Divider />
          <h3 className="font-semibold text-lg mb-6">Thông tin thêm</h3>
          <Row gutter={16}>
            <Col span={12}>
              <Controller
                control={control}
                name="infoCompanyName"
                render={({ field, fieldState: { error } }) => (
                  <FormItem label="Tên công ty" validateStatus={error?.message ? "error" : ""} help={error?.message}>
                    <Input placeholder="Tên công ty" {...field} />
                  </FormItem>
                )}
              />
            </Col>
            <Col span={12}>
              <Controller
                control={control}
                name="infoLegalRepresentative"
                render={({ field, fieldState: { error } }) => (
                  <FormItem
                    label="Tên người đại diện"
                    validateStatus={error?.message ? "error" : ""}
                    help={error?.message}
                  >
                    <Input placeholder="Tên người đại diện" {...field} />
                  </FormItem>
                )}
              />
            </Col>
            <Col span={12}>
              <Controller
                control={control}
                name="infoPhoneNumber"
                render={({ field, fieldState: { error } }) => (
                  <FormItem label="Số điện thoại" validateStatus={error?.message ? "error" : ""} help={error?.message}>
                    <Input placeholder="Số điện thoại" value={field.value ?? undefined} onChange={field.onChange} />
                  </FormItem>
                )}
              />
            </Col>
            <Col span={12}>
              <Controller
                control={control}
                name="infoEmail"
                render={({ field, fieldState: { error } }) => (
                  <FormItem label="Email" validateStatus={error?.message ? "error" : ""} help={error?.message}>
                    <Input placeholder="Email" {...field} />
                  </FormItem>
                )}
              />
            </Col>
            <Col span={12}>
              <Controller
                control={control}
                name="infoPosition"
                render={({ field, fieldState: { error } }) => (
                  <FormItem label="Chức danh">
                    <Input placeholder="Chức danh" {...field} />
                  </FormItem>
                )}
              />
            </Col>
            <Col span={12}>
              <Controller
                control={control}
                name="infoAddress"
                render={({ field, fieldState: { error } }) => (
                  <FormItem label="Địa chỉ">
                    <Input placeholder="Địa chỉ" {...field} />
                  </FormItem>
                )}
              />
            </Col>
            <Col span={12}>
              <Controller
                control={control}
                name="infoTaxcode"
                render={({ field, fieldState: { error } }) => (
                  <FormItem label="Mã số thuế">
                    <Input placeholder="Mã số thuế" {...field} />
                  </FormItem>
                )}
              />
            </Col>
            <Col span={12}>
              <Controller
                control={control}
                name="infoBanking"
                render={({ field, fieldState: { error } }) => (
                  <FormItem label="Thông tin ngân hàng">
                    <Input placeholder="Thông tin ngân hàng" {...field} />
                  </FormItem>
                )}
              />
            </Col>
            <Col span={24}>
              <Controller
                control={control}
                name="infoSpecialNote"
                render={({ field, fieldState: { error } }) => (
                  <FormItem label="Ghi chú">
                    <TextArea placeholder="Ghi chú" autoSize={{ minRows: 3, maxRows: 5 }} {...field} />
                  </FormItem>
                )}
              />
            </Col>
          </Row>
        </Form>
        <div className="bottom py-4 absolute bottom-0 left-0 right-0 border-t px-6 bg-white">
          <Space>
            <Button onClick={onCancel} className="w-28">
              Huỷ
            </Button>
            <Button
              onClick={handleSubmit((data) => onSubmit && onSubmit(actionType, data))}
              type="primary"
              className="w-28"
            >
              Lưu
            </Button>
          </Space>
        </div>
      </Drawer>
      {initialValues ? (
        <ModalChangePassword
          isOpen={isEditPassword}
          onCancel={() => setEditPassword(false)}
          userName={initialValues.username}
        />
      ) : null}
    </>
  );
};
export default DrawlerUserForm;
