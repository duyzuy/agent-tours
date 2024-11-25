import { useEffect, useMemo } from "react";
import { Drawer, Space, Button, Form, Input, Checkbox, Switch, Spin, Divider, Select, SelectProps } from "antd";
import { isArray, isEmpty, isEqual } from "lodash";
import FormItem from "@/components/base/FormItem";

import type { CheckboxValueType } from "antd/es/checkbox/Group";

import { useGetPermissionsQuery } from "@/queries/role";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { rolePermissionSchema } from "../../modules/validation";
import { RolesPermissionListResponse } from "@/models/management/rolePermission.interface";
import { PermissionFormData } from "../../modules/permission.interface";
import { IPermission } from "@/models/management/permission.interface";
import { PermissionItemType } from "../../page";
export type DrawerAction = "CREATE" | "EDIT";
export type TDrawlerCreateAction = {
  action: "CREATE";
};
export type TDrawlerEditAction = {
  action: "EDIT";
  record: PermissionItemType;
};
export type TDrawerPermissions = TDrawlerCreateAction | TDrawlerEditAction;

export interface DrawerPermissionsProps {
  isOpen?: boolean;
  onClose: () => void;
  actionType?: DrawerAction;
  initialValues?: PermissionItemType;
  onSubmit?: (action: DrawerAction, data: PermissionFormData) => void;
  isLoading?: boolean;
}

const GROUP_PERMISSION_LIST = [
  { label: "Agent", value: "AGENT" },
  { label: "Agent Staff", value: "AGENT_STAFF" },
  { label: "Sản phẩm", value: "PRODUCT" },
  { label: "Vendor", value: "VENDOR" },
  { label: "Supplier", value: "SUPPLIER" },
  { label: "Inventory", value: "INVENTORY" },
  { label: "Stock", value: "STOCK" },
  { label: "Mẫu sản phẩm", value: "TEMPLATE_SELLABLE" },
  { label: "Sản phẩm", value: "SELLABLE" },
  { label: "Booking", value: "BOOKING" },
  { label: "Manage Booking", value: "MANAGE_BOOKING" },
  { label: "Menu", value: "MENU" },
  { label: "Post", value: "POST" },
  { label: "Page", value: "PAGE" },
  { label: "Tag", value: "TAG" },
  { label: "Media", value: "MEDIA" },
  { label: "User", value: "USER" },
  { label: "Form of payment", value: "FOP" },
  { label: "Role", value: "ROLE" },
  { label: "Permission", value: "PERMISSION" },
  { label: "Role permission", value: "ROLE_PERMISSION" },
  { label: "Cấu hình hệ thống", value: "SYSTEM_CONFIG" },
  { label: "Ngôn ngữ", value: "LANGUAGE" },
  { label: "Dashboard", value: "DASHBOARD" },
  { label: "Mẫu nội dung", value: "CONTENT_TEMPLATE" },
  { label: "Destination", value: "DESTINATION" },
  { label: "Coupon", value: "COUPON" },
  { label: "Leading", value: "LEADING" },
  { label: "Payment", value: "PAYMENT" },
];
import { vietnameseTonesToUnderscoreKeyname } from "@/utils/helper";
const DrawerPermissions: React.FC<DrawerPermissionsProps> = ({
  isOpen,
  onClose,
  actionType = "CREATE",
  onSubmit,
  initialValues,
  isLoading,
}) => {
  const initFormData = new PermissionFormData(undefined, undefined, "", "", "OK");
  const { setValue, getValues, watch, control, handleSubmit } = useForm<PermissionFormData>({
    defaultValues: { ...initFormData },
    resolver: yupResolver(rolePermissionSchema),
  });

  const onChangeStatus = (checked: boolean) => {
    setValue("status", checked ? "OK" : "OX");
  };
  const onSelectPerGroup: SelectProps<string, (typeof GROUP_PERMISSION_LIST)[number]>["onChange"] = (
    value,
    options,
  ) => {
    const data = isArray(options) ? options[0] : options;
    setValue("groupName", data.label);
    setValue("groupKey", data.value);
  };

  const onChangeKey = (value: string) => {
    setValue("localUser_PermissionKey", vietnameseTonesToUnderscoreKeyname(value).toUpperCase());
  };
  /**
   * INITIAL FORM DATA IF EDITING
   */

  useEffect(() => {
    const initialFormdata = initialValues
      ? new PermissionFormData(
          initialValues.groupKey,
          initialValues.groupName,
          initialValues.localUser_PermissionKey,
          initialValues.localUser_PermissionValue,
          initialValues.status,
        )
      : initFormData;
    Object.entries(initialFormdata).forEach(([key, value]) => {
      setValue(key as keyof PermissionFormData, value);
    });
  }, [initialValues, isOpen]);

  return (
    <Drawer
      title={actionType === "CREATE" ? "Thêm chức năng" : `Sửa ${initialValues?.localUser_PermissionValue}`}
      width={850}
      onClose={onClose}
      open={isOpen}
      styles={{
        body: {
          paddingBottom: 80,
        },
      }}
    >
      <Form layout="vertical">
        <Controller
          control={control}
          name="groupKey"
          render={({ field, fieldState: { error } }) => (
            <FormItem
              label="Nhóm chức năng"
              required
              validateStatus={error?.message ? "error" : ""}
              help={error?.message}
            >
              <Select
                placeholder="Chọn nhóm chức năng"
                value={field.value}
                options={GROUP_PERMISSION_LIST}
                onChange={onSelectPerGroup}
              />
            </FormItem>
          )}
        />
        <Controller
          control={control}
          name="localUser_PermissionValue"
          render={({ field, fieldState: { error } }) => (
            <FormItem
              label="Tên chức năng"
              required
              validateStatus={error?.message ? "error" : ""}
              help={error?.message}
            >
              <Input placeholder="Tên chức năng" {...field} />
            </FormItem>
          )}
        />
        <Controller
          control={control}
          name="localUser_PermissionKey"
          render={({ field, fieldState: { error } }) => (
            <FormItem
              label="Key chức năng"
              required
              validateStatus={error?.message ? "error" : ""}
              help={error?.message}
            >
              <Input
                placeholder="Key chức năng"
                value={field.value}
                onChange={(evt) => onChangeKey(evt.target.value)}
              />
            </FormItem>
          )}
        />
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
      </Form>
      <div className="drawler-action absolute px-4 py-4 border-t left-0 right-0 bg-white bottom-0">
        <Space>
          <Button onClick={onClose} className="w-28">
            Huỷ
          </Button>
          <Button
            onClick={handleSubmit((data) => onSubmit && onSubmit(actionType, data))}
            type="primary"
            className="w-28"
            loading={isLoading}
          >
            Lưu
          </Button>
        </Space>
      </div>
    </Drawer>
  );
};
export default DrawerPermissions;
