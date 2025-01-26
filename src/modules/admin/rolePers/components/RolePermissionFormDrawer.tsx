import { useEffect, useMemo } from "react";
import { Drawer, Space, Button, Form, Input, Checkbox, Switch, Spin, Divider } from "antd";
import { isEmpty, isEqual } from "lodash";
import FormItem from "@/components/base/FormItem";

import { useGetPermissions } from "@/modules/admin/permission/hooks";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { rolePermissionSchema } from "../validation";
import { RolesPermissionListResponse } from "@/models/management/rolePermission.interface";
import { RolePermissionFormData } from "../rolePer.interface";

import PermissionSelector, { PermissionSelectorProps } from "./PermissionsSelector";

export type DrawerAction = "CREATE" | "EDIT";
export type TDrawlerCreateAction = {
  action: "CREATE";
};
export type TDrawlerEditAction = {
  action: "EDIT";
  record: RolesPermissionListResponse["result"]["rolePermissionList"][0];
};
export type TRolePermissionFormDrawer = TDrawlerCreateAction | TDrawlerEditAction;

export interface RolePermissionFormDrawerProps {
  isOpen?: boolean;
  onClose: () => void;
  actionType?: DrawerAction;
  initialValues?: RolesPermissionListResponse["result"]["rolePermissionList"][0];
  onSubmit?: (action: DrawerAction, data: RolePermissionFormData) => void;
  loading?: boolean;
}
const RolePermissionFormDrawer: React.FC<RolePermissionFormDrawerProps> = ({
  isOpen,
  onClose,
  actionType = "CREATE",
  onSubmit,
  initialValues,
  loading,
}) => {
  const initFormData = new RolePermissionFormData("", undefined, [], "OX");
  const { setValue, getValues, watch, control, handleSubmit, formState } = useForm<RolePermissionFormData>({
    defaultValues: { ...initFormData },
    resolver: yupResolver(rolePermissionSchema),
  });

  const onChangeStatus = (checked: boolean) => {
    setValue("status", checked ? "OK" : "OX");
  };

  const onChangePermissions: PermissionSelectorProps["onChange"] = (newPers) => {
    setValue("localUser_PermissionList", newPers);
  };
  const isDisabledSubmitButton = useMemo(() => {
    if (!initialValues && actionType === "CREATE") {
      return isEmpty(getValues("localUser_RolePermissionValue")) && !getValues("localUser_PermissionList")?.length;
    }

    if (initialValues && actionType === "EDIT") {
      return (
        isEqual({ list: initialValues.localUser_PermissionList }, { list: getValues("localUser_PermissionList") }) &&
        isEqual(initialValues.status, getValues("status")) &&
        isEqual(initialValues.localUser_RolePermissionValue, getValues("localUser_RolePermissionValue"))
      );
    }

    return false;
  }, [actionType, initialValues, watch()]);

  /**
   * INITIAL FORM DATA IF EDITING
   */

  useEffect(() => {
    const initialFormdata = initialValues
      ? new RolePermissionFormData(
          initialValues.localUser_RolePermissionValue,
          initialValues.localUser_RolePermissionKey,
          initialValues.localUser_PermissionList,
          initialValues.status,
        )
      : initFormData;
    Object.entries(initialFormdata).forEach(([key, value]) => {
      setValue(key as keyof RolePermissionFormData, value);
    });
  }, [initialValues, isOpen]);

  return (
    <Drawer
      title={actionType === "CREATE" ? "Thêm nhóm chức năng" : `Sửa ${initialValues?.localUser_RolePermissionValue}`}
      width={850}
      onClose={onClose}
      open={isOpen}
      footer={
        <Space className="py-3">
          <Button
            onClick={handleSubmit((data) => onSubmit && onSubmit(actionType, data))}
            type="primary"
            disabled={isDisabledSubmitButton}
            className="w-28"
            loading={loading}
          >
            Lưu
          </Button>
          <Button onClick={onClose} className="w-28">
            Huỷ
          </Button>
        </Space>
      }
    >
      <Form layout="vertical">
        <Controller
          control={control}
          name="localUser_RolePermissionValue"
          render={({ field, fieldState: { error } }) => (
            <FormItem
              label="Tên nhóm chức năng"
              required
              validateStatus={error?.message ? "error" : ""}
              help={error?.message}
            >
              <Input placeholder="Nhập tên nhóm chức năng" {...field} />
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
        <Controller
          control={control}
          name="localUser_PermissionList"
          render={({ field, fieldState: { error } }) => (
            <FormItem
              label="Quyền chức năng"
              required
              // validateStatus={error?.message ? "error" : ""}
              // help={error?.message}
            >
              {error?.message ? <p className="text-red-500 mb-2">{error?.message}</p> : null}
              <PermissionSelector values={field.value} enabled={isOpen} onChange={onChangePermissions} />
            </FormItem>
          )}
        />
      </Form>
    </Drawer>
  );
};
export default RolePermissionFormDrawer;
