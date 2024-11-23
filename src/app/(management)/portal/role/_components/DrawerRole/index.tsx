import { useEffect, useMemo } from "react";
import { Drawer, Space, Button, Form, Input, Checkbox, Switch } from "antd";
import FormItem from "@/components/base/FormItem";
import { RolesPermissionListResponse } from "@/models/management/rolePermission.interface";
import { isEmpty, isEqual } from "lodash";

import { useGetRolePermission } from "@/queries/role";
import { RoleFormData } from "../../modules/role.interface";
import { Controller, useForm } from "react-hook-form";
import { roleSchema } from "../../modules/validation";
import { yupResolver } from "@hookform/resolvers/yup";
type TRole = RolesPermissionListResponse["result"]["roleList"][0];

export type DrawerAction = "CREATE" | "EDIT";
export type TDrawerCreateAction = {
  action: "CREATE";
};
export type TDrawlerEditAction = {
  action: "EDIT";
  record: TRole;
};
export type TDrawerRole = TDrawlerEditAction | TDrawerCreateAction;

export interface DrawerRoleProps {
  isOpen?: boolean;
  onClose: () => void;
  actionType?: DrawerAction;
  initialValues?: RolesPermissionListResponse["result"]["roleList"][0];
  onSubmit?: (actionType: DrawerAction, data: RoleFormData) => void;
}
const DrawerRole: React.FC<DrawerRoleProps> = ({ isOpen, onClose, actionType = "CREATE", onSubmit, initialValues }) => {
  const { data: rolePermissionList, isLoading } = useGetRolePermission({ enabled: isOpen });

  const initFormData = new RoleFormData(undefined, "", undefined, "OX");
  const { setValue, control, getValues, handleSubmit, watch } = useForm<RoleFormData>({
    defaultValues: { ...initFormData },
    resolver: yupResolver(roleSchema),
  });

  const onChangeStatus = (checked: boolean) => {
    setValue("status", checked ? "OK" : "OX");
  };

  const onChangeRoleFnc = (
    checked: boolean,
    roleFnc: RolesPermissionListResponse["result"]["rolePermissionList"][number],
  ) => {
    const currentRoleFncs = getValues("localUser_RolePermissionList");

    let newRoleFncs = currentRoleFncs?.filter(
      (item) => item.localUser_RolePermissionKey !== roleFnc.localUser_RolePermissionKey,
    );

    if (checked) {
      newRoleFncs = [...(newRoleFncs || []), roleFnc];
    }
    setValue("localUser_RolePermissionList", newRoleFncs);
  };

  const isButtonDisabled = useMemo(() => {
    if (actionType === "CREATE") {
      return isEmpty(getValues("localUser_RoleValue")) && !getValues("localUser_RolePermissionList")?.length;
    }

    if (actionType === "EDIT" && initialValues) {
      return (
        (isEqual(
          { list: initialValues.localUser_RolePermissionList },
          { list: getValues("localUser_RolePermissionList") },
        ) &&
          isEmpty(getValues("localUser_RoleValue")) &&
          !getValues("localUser_RolePermissionList")?.length) ||
        (isEqual(
          { list: initialValues.localUser_RolePermissionList },
          { list: getValues("localUser_RolePermissionList") },
        ) &&
          isEqual(getValues("localUser_RoleValue"), initialValues.localUser_RoleValue) &&
          isEqual(getValues("status"), initialValues.status))
      );
    }

    return false;
  }, [actionType, initialValues, watch()]);

  const isCheckedRoleFnc = (
    roleFncLisst: RoleFormData["localUser_RolePermissionList"],
    roleFnc: RolesPermissionListResponse["result"]["rolePermissionList"][number],
  ) => {
    return Boolean(
      roleFncLisst?.find((item) => item.localUser_RolePermissionKey === roleFnc.localUser_RolePermissionKey),
    );
  };

  /*
   * INITIAL FORM Data
   */
  useEffect(() => {
    const initData = initialValues
      ? new RoleFormData(
          initialValues.localUser_RoleKey,
          initialValues.localUser_RoleValue,
          initialValues.localUser_RolePermissionList,
          initialValues.status,
        )
      : initFormData;
    Object.entries(initData).forEach(([key, value]) => {
      setValue(key as keyof RoleFormData, value);
    });
  }, [initialValues, isOpen]);

  return (
    <Drawer
      title={actionType === "CREATE" ? "Thêm quyền" : `Sửa quyền`}
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
          name="localUser_RoleValue"
          render={({ field, fieldState: { error } }) => (
            <FormItem label="Tên quyền" required validateStatus={error?.message ? "error" : ""} help={error?.message}>
              <Input placeholder="Nhập tên quyền" {...field} />
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
          name="localUser_RolePermissionList"
          render={({ field, fieldState: { error } }) => (
            <FormItem label="Nhóm chức năng">
              <div className="grid grid-cols-3 gap-3 border rounded-md px-6 py-6">
                {rolePermissionList?.rolePermissionList.map((roleFnc) => (
                  <div className="role-fnc" key={roleFnc.localUser_RolePermissionKey}>
                    <Checkbox
                      checked={isCheckedRoleFnc(field.value, roleFnc)}
                      onChange={(evt) => onChangeRoleFnc(evt.target.checked, roleFnc)}
                    >
                      {roleFnc.localUser_RolePermissionValue}
                    </Checkbox>
                  </div>
                ))}
              </div>
            </FormItem>
          )}
        />
      </Form>
      <div className="drawler-action absolute px-4 py-4 border-t left-0 right-0 bg-white bottom-0">
        <Space>
          <Button onClick={onClose} className="w-24">
            Huỷ
          </Button>
          <Button
            onClick={handleSubmit((data) => onSubmit?.(actionType, data))}
            type="primary"
            className="w-24"
            disabled={isButtonDisabled}
          >
            Lưu
          </Button>
        </Space>
      </div>
    </Drawer>
  );
};
export default DrawerRole;
