import { useCallback, useEffect, useMemo, useState } from "react";
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
import { isEqual } from "lodash";
import FormItem from "@/components/base/FormItem";
import type { CheckboxChangeEvent } from "antd/es/checkbox";
import type { CheckboxValueType } from "antd/es/checkbox/Group";
import { IRolesPermissionsRs } from "@/model/Management/role.interface";
import { TRolePermissionPayload } from "@/model/Management/role.interface";
import { TRolePersErrorsFields } from "../../modules/useCreateRolePermission";
import styled from "styled-components";

export enum EActionType {
    CREATE = "create",
    EDIT = "edit",
}
export type TDrawlerCreateAction = {
    action: EActionType.CREATE;
};
export type TDrawlerEditAction = {
    action: EActionType.EDIT;
    record: IRolesPermissionsRs["result"]["rolePermissionList"][0];
};
export type TDrawlerRolePermission = TDrawlerCreateAction | TDrawlerEditAction;

interface DrawlerRolePermissionProps {
    isOpen?: boolean;
    onClose: () => void;
    actionType?: EActionType;
    initialValues?: IRolesPermissionsRs["result"]["rolePermissionList"][0];
    onSubmit?: (actionType: EActionType, data: TRolePermissionPayload) => void;
    permissionList?: IRolesPermissionsRs["result"]["permissionList"];
    title?: string;
    errors?: TRolePersErrorsFields;
}
const DrawlerRolePermission: React.FC<DrawlerRolePermissionProps> = ({
    isOpen,
    onClose,
    actionType = EActionType.CREATE,
    onSubmit,
    permissionList,
    title,
    initialValues,
    errors,
}) => {
    const initFormData: TRolePermissionPayload = {
        localUser_PermissionList: [],
        localUser_RolePermissionValue: "",
        status: "OX",
    };

    const [formData, setFormData] =
        useState<TRolePermissionPayload>(initFormData);

    const [checkedList, setCheckedList] = useState<{
        [key: string]: CheckboxValueType[];
    }>({});

    /**
     * Grouped permissions list
     */
    const groupedPermissionsList = useMemo(() => {
        if (!permissionList) return;

        let permissionGroup: {
            [key: string]: IRolesPermissionsRs["result"]["permissionList"];
        } = {};

        permissionList.forEach((per) => {
            if (permissionGroup[per.groupKey]) {
                permissionGroup[per.groupKey] = [
                    ...permissionGroup[per.groupKey],
                    per,
                ];
            } else {
                permissionGroup[per.groupKey] = [per];
            }
        });

        return permissionGroup;
    }, [permissionList]);

    const onChangeFormData = (
        key: keyof TRolePermissionPayload,
        value: string,
    ) => {
        setFormData((prev) => ({
            ...prev,
            [key]: value,
        }));
    };
    const onChangeStatus = (checked: boolean) => {
        setFormData((prev) => ({
            ...prev,
            status: checked ? "OK" : "OX",
        }));
    };

    const indeterminate = (key: string) => {
        if (!checkedList[key] || !groupedPermissionsList) return false;

        return (
            checkedList[key].length > 0 &&
            checkedList[key].length < groupedPermissionsList[key].length
        );
    };
    const checkedAllByGroup = (key: string) => {
        if (!checkedList[key] || !groupedPermissionsList) return false;
        return groupedPermissionsList[key].length === checkedList[key].length;
    };

    const onCheckGroupPermissions = (e: CheckboxChangeEvent, key: string) => {
        // setCheckedList(e.target.checked ? plainOptions : []);

        if (!groupedPermissionsList) return;
        setCheckedList((prev) => {
            if (e.target.checked) {
                return {
                    ...prev,
                    [key]: groupedPermissionsList[key].map(
                        (rolePer) => rolePer.localUser_PermissionKey,
                    ),
                };
            } else {
                return {
                    ...prev,
                    [key]: [],
                };
            }
        });
    };

    const getOptions = (key: string) => {
        if (!groupedPermissionsList) return [];
        return groupedPermissionsList[key].map((item) => ({
            label: item.localUser_PermissionValue,
            value: item.localUser_PermissionKey,
        }));
    };
    const onChangePermission = (group: string, values: CheckboxValueType[]) => {
        setCheckedList((prev) => {
            return {
                ...prev,
                [group]: [...values],
            };
        });
    };

    const isDisabledSubmitButton = useMemo(() => {
        if (!initialValues || actionType === EActionType.CREATE) return false;

        const formatPermissionsList =
            initialValues.localUser_PermissionList.map((item) => ({
                localUser_PermissionKey: item.localUser_PermissionKey,
            }));

        const initialValuesFormat: TRolePermissionPayload = {
            localUser_PermissionList: formatPermissionsList,
            localUser_RolePermissionValue:
                initialValues.localUser_RolePermissionValue,
            status: initialValues.status,
        };
        if (isEqual(initialValuesFormat, formData)) {
            return true;
        }
        return false;
    }, [actionType, formData, initialValues]);

    useEffect(() => {
        if (!checkedList) return;

        let permissionList: { localUser_PermissionKey: string }[] = [];

        Object.keys(checkedList).forEach((key) => {
            checkedList[key].forEach((per) => {
                permissionList = [
                    ...permissionList,
                    { localUser_PermissionKey: per as string },
                ];
            });
        });

        setFormData((prevData) => ({
            ...prevData,
            localUser_PermissionList: [...permissionList],
        }));
    }, [checkedList]);

    /**
     * INITIAL FORM DATA IF EDITING
     */

    useEffect(() => {
        if (initialValues) {
            const permissisListFormData =
                initialValues.localUser_PermissionList.map((item) => ({
                    localUser_PermissionKey: item.localUser_PermissionKey,
                }));

            const initialFormdata = {
                localUser_RolePermissionValue:
                    initialValues.localUser_RolePermissionValue,
                localUser_PermissionList: permissisListFormData,
                status: initialValues.status,
            };
            setFormData(() => initialFormdata);
        } else {
            setFormData(() => initFormData);
        }
    }, [initialValues]);

    useEffect(() => {
        if (!groupedPermissionsList) return;

        let itemsList: { [key: string]: string[] } = {};

        if (initialValues) {
            const pers = initialValues.localUser_PermissionList.map(
                (item) => item.localUser_PermissionKey,
            );

            Object.keys(groupedPermissionsList).forEach((key) => {
                groupedPermissionsList[key].forEach((per) => {
                    if (pers.includes(per.localUser_PermissionKey)) {
                        if (itemsList[key]) {
                            itemsList[key] = [
                                ...itemsList[key],
                                per.localUser_PermissionKey,
                            ];
                        } else {
                            itemsList[key] = [per.localUser_PermissionKey];
                        }
                        const indexPer = pers.indexOf(
                            per.localUser_PermissionKey,
                        );
                        pers.splice(indexPer, 1);
                    } else {
                        itemsList[key] = [...(itemsList[key] || [])];
                    }
                });
            });
        }
        setCheckedList(() => itemsList);
    }, [groupedPermissionsList, initialValues]);

    return (
        <Drawer
            title={
                actionType === EActionType.CREATE
                    ? "Thêm nhóm chức năng"
                    : `Sửa nhóm chức năng ${formData.localUser_RolePermissionValue}`
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
                            label="Tên nhóm chức năng"
                            required
                            validateStatus={
                                errors?.localUser_RolePermissionValue
                                    ? "error"
                                    : ""
                            }
                            help={errors?.localUser_RolePermissionValue || ""}
                        >
                            <Input
                                placeholder="Nhập tên nhóm chức năng"
                                onChange={(e) =>
                                    onChangeFormData(
                                        "localUser_RolePermissionValue",
                                        e.target.value,
                                    )
                                }
                                value={formData.localUser_RolePermissionValue}
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
                <Row>
                    <div className="mb-4">
                        <p>Quyền chức năng</p>
                    </div>
                    <div className="flex flex-wrap -mx-3">
                        {groupedPermissionsList &&
                            Object.keys(groupedPermissionsList).map(
                                (perControlKey) => (
                                    <div
                                        className="w-1/2 lg:w-1/3 px-3 mb-6"
                                        key={perControlKey}
                                    >
                                        <div className="border p-4 h-full rounded-md drop-shadow-sm bg-white">
                                            <div className="head">
                                                <p className="font-bold mb-3 border-b pb-3">
                                                    <Checkbox
                                                        indeterminate={indeterminate(
                                                            perControlKey,
                                                        )}
                                                        onChange={(e) =>
                                                            onCheckGroupPermissions(
                                                                e,
                                                                perControlKey,
                                                            )
                                                        }
                                                        checked={checkedAllByGroup(
                                                            perControlKey,
                                                        )}
                                                    >
                                                        {perControlKey}
                                                    </Checkbox>
                                                </p>
                                            </div>

                                            <div className="permissions">
                                                <CheckboxGroup
                                                    options={getOptions(
                                                        perControlKey,
                                                    )}
                                                    value={
                                                        checkedList[
                                                            perControlKey
                                                        ] || []
                                                    }
                                                    onChange={(value) =>
                                                        onChangePermission(
                                                            perControlKey,
                                                            value,
                                                        )
                                                    }
                                                    className="block"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                ),
                            )}
                    </div>
                </Row>
            </Form>
            <div className="drawler-action absolute px-4 py-4 border-t left-0 right-0 bg-white bottom-0">
                <Space>
                    <Button onClick={onClose}>Huỷ</Button>
                    <Button
                        onClick={() => onSubmit?.(actionType, formData)}
                        type="primary"
                        disabled={isDisabledSubmitButton}
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
export default DrawlerRolePermission;

const CheckboxGroup = styled(Checkbox.Group)`
    &&& {
        display: block;
    }
    .ant-checkbox-wrapper {
        display: flex;
        align-items: start;
    }
`;
