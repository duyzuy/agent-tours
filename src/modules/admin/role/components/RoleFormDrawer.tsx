import { useEffect, useMemo } from "react";
import { Drawer, Space, Button, Form, Input, Checkbox, Switch } from "antd";
import FormItem from "@/components/base/FormItem";
import { RolesPermissionListResponse } from "@/models/management/rolePermission.interface";
import { isEmpty, isEqual } from "lodash";
import { RoleFormData } from "../role.interface";
import { Controller, useForm } from "react-hook-form";
import { roleSchema } from "../role.schema";
import { useGetRolePermission } from "../../rolePers";
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
export type TRoleFormDrawer = TDrawlerEditAction | TDrawerCreateAction;

export interface RoleFormDrawerProps {
  isOpen?: boolean;
  onClose: () => void;
  actionType?: DrawerAction;
  initialValues?: RolesPermissionListResponse["result"]["roleList"][0];
  onSubmit?: (actionType: DrawerAction, data: RoleFormData) => void;
  loading?: boolean;
}
const RoleFormDrawer: React.FC<RoleFormDrawerProps> = ({
  isOpen,
  onClose,
  actionType = "CREATE",
  onSubmit,
  initialValues,
  loading,
}) => {
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

  const checkRoleFncExists = (
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
      footer={
        <Space className="py-3">
          <Button onClick={onClose} className="w-24">
            Huỷ
          </Button>
          <Button
            onClick={handleSubmit((data) => onSubmit?.(actionType, data))}
            type="primary"
            className="w-24"
            disabled={isButtonDisabled}
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
                      checked={checkRoleFncExists(field.value, roleFnc)}
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
    </Drawer>
  );
};
export default RoleFormDrawer;
