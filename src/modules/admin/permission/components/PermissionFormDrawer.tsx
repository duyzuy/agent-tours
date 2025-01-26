import { useEffect, useMemo } from "react";
import { Drawer, Space, Button, Form, Input, Switch } from "antd";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { rolePermissionSchema } from "../validation";
import { PermissionFormData } from "../permission.interface";
import { vietnameseTonesToUnderscoreKeyname } from "@/utils/helper";
import PermissionGroupSelector, { PermissionGroupSelectorProps } from "./PermissionGroupSelector";
import { RolesPermissionListResponse } from "@/models/management/rolePermission.interface";
import FormItem from "@/components/base/FormItem";
export type DrawerAction = "CREATE" | "EDIT";

export type TDrawlerCreateAction = {
  action: "CREATE";
};
export type TDrawlerEditAction = {
  action: "EDIT";
  record: RolesPermissionListResponse["result"]["permissionList"][number];
};
export type TPermissionFormDrawer = TDrawlerCreateAction | TDrawlerEditAction;

export interface PermissionFormDrawerProps {
  isOpen?: boolean;
  onClose?: () => void;
  action?: DrawerAction;
  initialValues?: RolesPermissionListResponse["result"]["permissionList"][number];
  loading?: boolean;
  onSubmit?: (action: DrawerAction, data: PermissionFormData) => void;
}

const PermissionFormDrawer: React.FC<PermissionFormDrawerProps> = ({
  isOpen,
  onClose,
  action = "CREATE",
  initialValues,
  loading,
  onSubmit,
}) => {
  const initFormData = new PermissionFormData(undefined, undefined, "", "", "OK");
  const { setValue, control, handleSubmit } = useForm<PermissionFormData>({
    defaultValues: { ...initFormData },
    resolver: yupResolver(rolePermissionSchema),
  });

  const onChangeStatus = (checked: boolean) => {
    setValue("status", checked ? "OK" : "OX");
  };

  const onSelectPerGroup: PermissionGroupSelectorProps["onSelect"] = (option) => {
    setValue("groupName", option.label);
    setValue("groupKey", option.value);
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
      title={action === "CREATE" ? "Thêm chức năng" : `Sửa ${initialValues?.localUser_PermissionValue}`}
      width={850}
      onClose={onClose}
      open={isOpen}
      footer={
        <Space className="py-3">
          <Button onClick={onClose} className="w-28">
            Huỷ
          </Button>
          <Button
            onClick={handleSubmit((data) => onSubmit?.(action, data))}
            type="primary"
            className="w-28"
            loading={loading}
          >
            Lưu
          </Button>
        </Space>
      }
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
              <PermissionGroupSelector value={field.value} onSelect={onSelectPerGroup} />
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
    </Drawer>
  );
};
export default PermissionFormDrawer;
