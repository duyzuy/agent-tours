import { useEffect, useMemo, useState } from "react";
import {
    Drawer,
    Space,
    Button,
    Form,
    Row,
    Col,
    Input,
    Checkbox,
    Switch,
} from "antd";
import FormItem from "@/components/base/FormItem";
import type { CheckboxChangeEvent } from "antd/es/checkbox";

import {
    IRolesPermissionsRs,
    TRolePayload,
} from "@/model/Management/role.interface";
import { isEqual } from "lodash";

import { ICreateRoleFieldsErrors } from "../../modules/useCreateRole";

type TRole = IRolesPermissionsRs["result"]["roleList"][0];

export enum EActionType {
    CREATE = "create",
    EDIT = "edit",
}
export type TDrawlerCreateAction = {
    action: EActionType.CREATE;
};
export type TDrawlerEditAction = {
    action: EActionType.EDIT;
    record: TRole;
};
export type TDrawlerRole = TDrawlerEditAction | TDrawlerCreateAction;

interface DrawlerRoleProps {
    isOpen?: boolean;
    onClose: () => void;
    actionType?: EActionType;
    initialValues?: IRolesPermissionsRs["result"]["roleList"][0];
    onSubmit?: (actionType: EActionType, data: TRolePayload) => void;
    rolePermissionList: IRolesPermissionsRs["result"]["rolePermissionList"];
    errors?: ICreateRoleFieldsErrors;
}
const DrawlerRole: React.FC<DrawlerRoleProps> = ({
    isOpen,
    onClose,
    actionType = EActionType.CREATE,
    onSubmit,
    rolePermissionList,
    initialValues,
    errors,
}) => {
    const [formData, setFormData] = useState<TRolePayload>(() => {
        return initialValues
            ? {
                  localUser_RoleValue: initialValues.localUser_RoleValue,
                  localUser_RolePermissionList:
                      initialValues.localUser_RolePermissionList,
                  status: initialValues.status,
              }
            : {
                  localUser_RoleValue: "",
                  localUser_RolePermissionList: [],
                  status: "OX",
              };
    });

    const onChangeRoleName = (value: string) => {
        setFormData((prev) => ({
            ...prev,
            localUser_RoleValue: value,
        }));
    };

    const onChangeStatus = (checked: boolean) =>
        setFormData((prev) => ({
            ...prev,
            status: checked ? "OK" : "OX",
        }));

    const onChangeRoleFnc = (
        e: CheckboxChangeEvent,
        role: IRolesPermissionsRs["result"]["rolePermissionList"][0],
    ) => {
        let roleKeysUpdate = [...formData.localUser_RolePermissionList];

        const existsRolePers = isExistRolePers(
            formData.localUser_RolePermissionList,
            role,
        );
        if (existsRolePers) {
            const indexIdx = roleKeysUpdate.findIndex(
                (item) =>
                    item.localUser_RolePermissionKey ===
                    role.localUser_RolePermissionKey,
            );
            roleKeysUpdate.splice(indexIdx, 1);
        } else {
            roleKeysUpdate = [...roleKeysUpdate, role];
        }

        setFormData((prev) => ({
            ...prev,
            localUser_RolePermissionList: roleKeysUpdate,
        }));
    };

    const isButtonDisabled = useMemo(() => {
        if (initialValues) {
            const initComp = {
                localUser_RoleValue: initialValues.localUser_RoleValue,
                localUser_RolePermissionList:
                    initialValues.localUser_RolePermissionList,
                status: initialValues.status,
            };

            return isEqual(initComp, formData);
        } else {
            return false;
        }
    }, [actionType, initialValues, formData]);

    const hasCheckedRoleFnc = (
        rolePers: IRolesPermissionsRs["result"]["rolePermissionList"][0],
    ) => {
        return Boolean(
            formData.localUser_RolePermissionList?.find(
                (item) =>
                    item.localUser_RolePermissionKey ===
                    rolePers.localUser_RolePermissionKey,
            ),
        );
    };

    /*
     * INITIAL FORM Data
     */
    useEffect(() => {
        if (isOpen) {
            if (actionType === EActionType.EDIT && initialValues) {
                setFormData((prev) => ({
                    ...prev,
                    localUser_RoleValue: initialValues.localUser_RoleValue,
                    localUser_RolePermissionList:
                        initialValues.localUser_RolePermissionList,
                    status: initialValues.status,
                }));
            } else {
                setFormData((prev) => ({
                    ...prev,
                    localUser_RoleValue: "",
                    localUser_RolePermissionList: [],
                    status: "OX",
                }));
            }
        }
    }, [initialValues, isOpen, actionType]);

    return (
        <Drawer
            title={
                actionType === EActionType.CREATE ? "Thêm quyền" : `Sửa quyền`
            }
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
                <Row gutter={16}>
                    <Col span={24}>
                        <FormItem
                            label="Tên quyền"
                            validateStatus={
                                errors?.localUser_RoleValue ? "error" : ""
                            }
                            required
                            help={errors?.localUser_RoleValue || ""}
                        >
                            <Input
                                placeholder="Nhập tên quyền"
                                value={formData.localUser_RoleValue}
                                onChange={(e) =>
                                    onChangeRoleName(e.target.value)
                                }
                            />
                        </FormItem>
                    </Col>
                    <Col span={24}>
                        <FormItem label="Trạng thái">
                            <div className="flex items-center">
                                <Switch
                                    checked={formData.status === "OK"}
                                    onChange={onChangeStatus}
                                />
                                <span className="ml-2">Kích hoạt</span>
                            </div>
                        </FormItem>
                    </Col>
                </Row>
                <div className="mb-4">
                    <p>Nhóm chức năng</p>
                </div>
                <div className="box border rounded-md px-6 py-6">
                    <div className="flex flex-wrap -mx-3">
                        {rolePermissionList?.map((roleFnc) => (
                            <div
                                className="role-fnc w-1/3 px-3 mb-3"
                                key={roleFnc.localUser_RolePermissionKey}
                            >
                                <Checkbox
                                    checked={hasCheckedRoleFnc(roleFnc)}
                                    onChange={(e) =>
                                        onChangeRoleFnc(e, roleFnc)
                                    }
                                >
                                    {roleFnc.localUser_RolePermissionValue}
                                </Checkbox>
                            </div>
                        ))}
                    </div>
                </div>
            </Form>
            <div className="drawler-action absolute px-4 py-4 border-t left-0 right-0 bg-white bottom-0">
                <Space>
                    <Button onClick={onClose}>Huỷ</Button>
                    <Button
                        onClick={() => onSubmit?.(actionType, formData)}
                        type="primary"
                        disabled={isButtonDisabled}
                    >
                        {actionType === EActionType.CREATE
                            ? "Thêm mới"
                            : "Cập nhật"}
                    </Button>
                </Space>
            </div>
        </Drawer>
    );
};
export default DrawlerRole;

const isExistRolePers = (
    sources: TRolePayload["localUser_RolePermissionList"],
    target: IRolesPermissionsRs["result"]["rolePermissionList"][0],
) => {
    return Boolean(
        sources.find(
            (item) =>
                item.localUser_RolePermissionKey ===
                target.localUser_RolePermissionKey,
        ),
    );
};
