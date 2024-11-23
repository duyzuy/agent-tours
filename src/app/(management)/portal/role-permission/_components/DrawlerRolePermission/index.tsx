import { useEffect, useMemo } from "react";
import { Drawer, Space, Button, Form, Input, Checkbox, Switch, Spin, Divider } from "antd";
import { isEmpty, isEqual } from "lodash";
import FormItem from "@/components/base/FormItem";

import type { CheckboxValueType } from "antd/es/checkbox/Group";

import { useGetPermissionsQuery } from "@/queries/role";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { rolePermissionSchema } from "../../modules/validation";
import { RolesPermissionListResponse } from "@/models/management/rolePermission.interface";
import { RolePermissionFormData } from "../../modules/rolePer.interface";
import { IPermission } from "@/models/management/permission.interface";

export type DrawerAction = "CREATE" | "EDIT";
export type TDrawlerCreateAction = {
  action: "CREATE";
};
export type TDrawlerEditAction = {
  action: "EDIT";
  record: RolesPermissionListResponse["result"]["rolePermissionList"][0];
};
export type TDrawlerRolePermission = TDrawlerCreateAction | TDrawlerEditAction;

export interface DrawlerRolePermissionProps {
  isOpen?: boolean;
  onClose: () => void;
  actionType?: DrawerAction;
  initialValues?: RolesPermissionListResponse["result"]["rolePermissionList"][0];
  onSubmit?: (action: DrawerAction, data: RolePermissionFormData) => void;
}
const DrawlerRolePermission: React.FC<DrawlerRolePermissionProps> = ({
  isOpen,
  onClose,
  actionType = "CREATE",
  onSubmit,
  initialValues,
}) => {
  const { data: permissions, isLoading } = useGetPermissionsQuery({ enabled: isOpen });

  const initFormData = new RolePermissionFormData("", undefined, [], "OX");

  const { setValue, getValues, watch, control, handleSubmit, formState } = useForm<RolePermissionFormData>({
    defaultValues: { ...initFormData },
    resolver: yupResolver(rolePermissionSchema),
  });

  /**
   * Grouped permissions list
   */
  const groupedPermissionsList = useMemo(() => {
    return permissions?.permissionList.reduce<{
      [key: string]: RolesPermissionListResponse["result"]["permissionList"];
    }>((acc, per) => {
      acc[per.groupKey] = acc[per.groupKey] ? [...acc[per.groupKey], per] : [per];
      return acc;
    }, {});
  }, [permissions]);

  const onChangeStatus = (checked: boolean) => {
    setValue("status", checked ? "OK" : "OX");
  };

  const indeterminate = (
    groupKey: string,
    values: Exclude<RolePermissionFormData["localUser_PermissionList"], undefined>,
  ) => {
    const currentPermissions = getValues("localUser_PermissionList");

    const persByGroup = currentPermissions?.filter((item) => item.groupKey === groupKey);

    if (!persByGroup || !persByGroup.length) return false;

    return persByGroup.length > 0 && persByGroup.length < values.length;
  };

  const isCheckedAllByGroup = (
    groupKey: string,
    values: Exclude<RolePermissionFormData["localUser_PermissionList"], undefined>,
  ) => {
    const currentPermissions = getValues("localUser_PermissionList");

    const persByGroup = currentPermissions?.filter((item) => item.groupKey === groupKey);

    if (!persByGroup) return false;

    return persByGroup.length === values.length;
  };

  const getCheckedValues = (
    gropKey: string,
    values: Exclude<RolePermissionFormData["localUser_PermissionList"], undefined>,
  ): Array<CheckboxValueType> => {
    const persByGroup = values.filter((per) => per.groupKey === gropKey);

    return persByGroup.reduce<Array<CheckboxValueType>>((acc, item) => {
      if (item.localUser_PermissionKey) {
        acc = [...acc, item.localUser_PermissionKey];
      }
      return acc;
    }, []);
  };
  const onCheckGroupPermissions = (
    checked: boolean,
    groupKey: string,
    values: Exclude<RolePermissionFormData["localUser_PermissionList"], undefined>,
  ) => {
    const currentPermissions = getValues("localUser_PermissionList");

    let newPers: Exclude<RolePermissionFormData["localUser_PermissionList"], undefined> =
      currentPermissions?.filter((per) => per.groupKey !== groupKey) || [];

    if (checked) {
      newPers = [...newPers, ...values];
    }

    setValue("localUser_PermissionList", newPers);
  };

  const onChangePermission = (group: string, per: IPermission) => {
    const currentPermissions = getValues("localUser_PermissionList");
    let newPers = [...(currentPermissions || [])];
    const indexPer = newPers.findIndex((item) => item.localUser_PermissionKey === per.localUser_PermissionKey);
    if (indexPer !== -1) {
      newPers.splice(indexPer, 1);
    } else {
      newPers = [...newPers, per];
    }
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
      styles={{
        body: {
          paddingBottom: 80,
        },
      }}
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

        {isLoading && <Spin />}
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
              <div className="grid grid-cols-3 gap-4">
                {!isLoading &&
                  groupedPermissionsList &&
                  Object.entries(groupedPermissionsList).map(([groupKey, values]) => (
                    <div className="border p-4 h-full rounded-md drop-shadow-sm bg-white" key={groupKey}>
                      <Checkbox
                        indeterminate={indeterminate(groupKey, values)}
                        onChange={(evt) => onCheckGroupPermissions(evt.target.checked, groupKey, values)}
                        checked={isCheckedAllByGroup(groupKey, values)}
                      >
                        {groupKey}
                      </Checkbox>
                      <Divider />
                      {values.map((per) => (
                        <div key={per.localUser_PermissionKey}>
                          <Checkbox
                            // value={checkedList[groupKey] || []}
                            value={getCheckedValues(groupKey, field.value || [])}
                            onChange={(value) => onChangePermission(groupKey, per)}
                            checked={field.value?.some(
                              (item) => item.localUser_PermissionKey === per.localUser_PermissionKey,
                            )}
                            className="!align-top"
                          >
                            {per.localUser_PermissionValue}
                          </Checkbox>
                        </div>
                      ))}
                    </div>
                  ))}
              </div>
            </FormItem>
          )}
        />
      </Form>
      <div className="drawler-action absolute px-4 py-4 border-t left-0 right-0 bg-white bottom-0">
        <Space>
          <Button onClick={onClose}>Huỷ</Button>
          <Button
            onClick={handleSubmit((data) => onSubmit && onSubmit(actionType, data))}
            type="primary"
            disabled={isDisabledSubmitButton}
          >
            {actionType === "CREATE" ? "Thêm mới" : "Cập nhật"}
          </Button>
        </Space>
      </div>
    </Drawer>
  );
};
export default DrawlerRolePermission;
