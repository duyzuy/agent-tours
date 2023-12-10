import React, { useEffect, useMemo, useState } from "react";
import {
    Drawer,
    Space,
    Button,
    Form,
    Row,
    Col,
    Input,
    Select,
    Switch,
} from "antd";

import {
    ELocalUserType,
    ILocalUserList,
    LocalUserPayLoad,
} from "@/model/management/localUser.interface";
import ModalChangePassword from "./ModalChangePassword";
import FormItem from "@/components/base/FormItem";
import TextArea from "antd/es/input/TextArea";
import { IRolesPermissionsRs } from "@/model/management/role.interface";
import { generateStrings } from "@/utils/helper";
import { TCreateUserErrorFields } from "../modules/useCreateLocalUser";

import useChangePasswordLocalUser from "../modules/useChangePasswordLocalUser";
import { isEmpty } from "lodash";

export enum EActionType {
    CREATE = "create",
    EDIT = "edit",
}
export type TDrawlerCreateAction = {
    type: EActionType.CREATE;
};
export type TDrawlerEditAction = {
    type: EActionType.EDIT;
    record: ILocalUserList["result"][0];
};
export type TDrawlerAction = TDrawlerCreateAction | TDrawlerEditAction;

interface DrawlerUserFormProps {
    isOpen?: boolean;
    onCancel: () => void;
    actionType: EActionType;
    initialValues?: ILocalUserList["result"][0];
    roles?: IRolesPermissionsRs["result"]["roleList"];
    onSubmit?: (action: EActionType, payload: LocalUserPayLoad) => void;
    errors?: TCreateUserErrorFields;
    onChangeLocalUserStatus: (
        recordId: number,
        status: ILocalUserList["result"][0]["status"],
    ) => void;
}

const DrawlerUserForm: React.FC<DrawlerUserFormProps> = ({
    isOpen,
    onCancel,
    actionType = EActionType.CREATE,
    onSubmit,
    initialValues,
    roles,
    errors,
    onChangeLocalUserStatus,
}) => {
    const initialPayload = new LocalUserPayLoad(
        "",
        "",
        "",
        "",
        "",
        "",
        "OX",
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
    );
    const [formData, setFormData] = useState<LocalUserPayLoad>(initialPayload);
    const [isEditPassword, setEditPassword] = useState(false);
    const { onLocalUserChangePassword, errors: changePasswordErrors } =
        useChangePasswordLocalUser();
    const onChangeStatus = (checked: boolean) => {
        actionType === EActionType.CREATE
            ? setFormData((prev) => ({
                  ...prev,
                  status: checked ? "OK" : "OX",
              }))
            : initialValues &&
              onChangeLocalUserStatus(
                  initialValues.recId,
                  checked ? "OK" : "OX",
              );
    };

    const optionsRole = useMemo(() => {
        return roles?.map((role) => ({
            value: role.localUser_RoleKey,
            label: role.localUser_RoleValue,
        }));
    }, [roles]);

    const optionsUserType = [
        { value: ELocalUserType.ADMIN, label: "Admin" },
        { value: ELocalUserType.AGENT, label: "Agent" },
        { value: ELocalUserType.AGENT_STAFF, label: "Agent staff" },
    ];

    const onChangeFormData = (key: keyof LocalUserPayLoad, value: string) => {
        setFormData((prev) => {
            return {
                ...prev,
                [key]: value,
            };
        });
    };

    const generatePassword = () => {
        const password = generateStrings(10);
        setFormData((prev) => ({
            ...prev,
            password: password,
        }));
    };
    const onChangeRole = (option: { value: string; label: string }) => {
        setFormData((prev) => ({
            ...prev,
            mainRole: option.value,
            mainRoleName: option.label,
        }));
    };
    const onChangeUserType = (userType: ELocalUserType) => {
        setFormData((prev) => ({
            ...prev,
            userType: userType,
        }));
    };
    const onSubmitFormData = () => {
        onSubmit?.(actionType, formData);
    };
    /**
     * INITIAL FORM DATA IF EDIT
     */
    useEffect(() => {
        setFormData(() => {
            return initialValues ? initialValues : initialPayload;
        });
    }, [initialValues, isOpen]);

    return (
        <>
            <Drawer
                title={
                    actionType === EActionType.CREATE ? "Thêm mới" : "Chỉnh sửa"
                }
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
                    <div className="account-information">
                        <div className="header py-2 mb-4">
                            <p className="font-bold text-lg">
                                Thông tin tài khoản
                            </p>
                        </div>
                        <Row gutter={16}>
                            <Col span={12}>
                                <FormItem
                                    label="Họ và tên"
                                    required
                                    validateStatus={
                                        errors?.fullname ? "error" : ""
                                    }
                                    help={errors?.fullname || ""}
                                >
                                    <Input
                                        placeholder="Họ và tên"
                                        value={formData.fullname}
                                        onChange={(e) =>
                                            onChangeFormData(
                                                "fullname",
                                                e.target.value,
                                            )
                                        }
                                    />
                                </FormItem>
                            </Col>
                            <Col span={12}>
                                <FormItem
                                    label="Email"
                                    required
                                    validateStatus={
                                        errors?.email ? "error" : ""
                                    }
                                    help={errors?.email || ""}
                                >
                                    <Input
                                        placeholder="Email"
                                        autoComplete="email"
                                        disabled={
                                            actionType === "edit" ?? false
                                        }
                                        value={formData.email}
                                        onChange={(e) =>
                                            onChangeFormData(
                                                "email",
                                                e.target.value,
                                            )
                                        }
                                    />
                                </FormItem>
                            </Col>
                            <Col span={12}>
                                <FormItem
                                    label="Số điện thoại"
                                    required
                                    validateStatus={
                                        errors?.phoneNumber ? "error" : ""
                                    }
                                    help={errors?.phoneNumber || ""}
                                >
                                    <Input
                                        placeholder="Số điện thoại"
                                        disabled={
                                            actionType === "edit" ?? false
                                        }
                                        value={formData.phoneNumber}
                                        onChange={(e) =>
                                            onChangeFormData(
                                                "phoneNumber",
                                                e.target.value,
                                            )
                                        }
                                    />
                                </FormItem>
                            </Col>

                            <Col span={12}>
                                <FormItem
                                    label="Tên tài khoản"
                                    required
                                    validateStatus={
                                        errors?.username ? "error" : ""
                                    }
                                    help={errors?.username || ""}
                                >
                                    <Input
                                        placeholder="Tên tài khoản"
                                        disabled={
                                            actionType === "edit" ?? false
                                        }
                                        value={formData.username}
                                        onChange={(e) =>
                                            onChangeFormData(
                                                "username",
                                                e.target.value,
                                            )
                                        }
                                    />
                                </FormItem>
                            </Col>
                            <Col span={12}>
                                <FormItem
                                    label="Loại tài khoản"
                                    required
                                    validateStatus={
                                        errors?.userType ? "error" : ""
                                    }
                                    help={errors?.userType || ""}
                                >
                                    <Select
                                        // defaultValue={formData.mainRole}
                                        value={
                                            isEmpty(formData.userType)
                                                ? ELocalUserType.ADMIN
                                                : formData.userType
                                        }
                                        placeholder="Chọn loại tài khoản"
                                        options={optionsUserType}
                                        onChange={(value) =>
                                            onChangeUserType(value)
                                        }
                                    />
                                </FormItem>
                            </Col>

                            <Col span={12}>
                                {(actionType === "create" && (
                                    <React.Fragment>
                                        <FormItem
                                            label="Mật khẩu"
                                            required
                                            validateStatus={
                                                errors?.password ? "error" : ""
                                            }
                                            help={errors?.password || ""}
                                        >
                                            <React.Fragment>
                                                <Input.Password
                                                    placeholder="Mật khẩu"
                                                    autoComplete="new-password"
                                                    // disabled={actionType === "edit" ?? false}
                                                    value={formData.password}
                                                    onChange={(e) =>
                                                        onChangeFormData(
                                                            "password",
                                                            e.target.value,
                                                        )
                                                    }
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
                                    </React.Fragment>
                                )) || (
                                    <React.Fragment>
                                        <div className="change-password mb-4">
                                            <div className="label pb-2">
                                                Mật khẩu
                                            </div>
                                            <div className="password-form pt-2">
                                                <div className="password no-edit flex items-center">
                                                    <span className="flex items-center text-xs">
                                                        ********
                                                    </span>
                                                    <span
                                                        className="text-xs ml-3 text-blue-600 cursor-pointer"
                                                        onClick={() =>
                                                            setEditPassword(
                                                                (prev) => !prev,
                                                            )
                                                        }
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
                                <FormItem
                                    label="Quyền"
                                    required
                                    validateStatus={
                                        errors?.mainRole ? "error" : ""
                                    }
                                    help={errors?.mainRole || ""}
                                    initialValue={formData.mainRole}
                                >
                                    <Select
                                        // defaultValue={formData.mainRole}
                                        value={
                                            isEmpty(formData.mainRole)
                                                ? undefined
                                                : formData.mainRole
                                        }
                                        placeholder="Chọn quyền"
                                        options={optionsRole}
                                        onChange={(value, option) =>
                                            onChangeRole(
                                                option as {
                                                    value: string;
                                                    label: string;
                                                },
                                            )
                                        }
                                    />
                                </FormItem>
                            </Col>
                            <Col span={24}>
                                <FormItem label="Mô tả">
                                    <TextArea
                                        placeholder="Mô tả"
                                        autoSize={{ minRows: 3, maxRows: 5 }}
                                        value={formData.descriptions}
                                        onChange={(e) =>
                                            onChangeFormData(
                                                "descriptions",
                                                e.target.value,
                                            )
                                        }
                                    />
                                </FormItem>
                            </Col>
                        </Row>
                        <FormItem label="Trạng thái" required>
                            <div className="flex items-center">
                                <Switch
                                    checked={formData.status === "OK"}
                                    onChange={onChangeStatus}
                                />
                                <span className="ml-2">Kích hoạt</span>
                            </div>
                        </FormItem>
                    </div>
                    <div className="user-information">
                        <div className="header py-2 mb-4">
                            <p className="font-bold text-lg">Thông tin thêm</p>
                        </div>
                        <Row gutter={16}>
                            <Col span={12}>
                                <FormItem label="Tên công ty">
                                    <Input
                                        placeholder="Tên công ty"
                                        value={formData.infoCompanyName}
                                        onChange={(e) =>
                                            onChangeFormData(
                                                "infoCompanyName",
                                                e.target.value,
                                            )
                                        }
                                    />
                                </FormItem>
                            </Col>
                            <Col span={12}>
                                <FormItem label="Tên người đại diện">
                                    <Input
                                        placeholder="Tên người đại diện"
                                        value={formData.infoLegalRepresentative}
                                        onChange={(e) =>
                                            onChangeFormData(
                                                "infoLegalRepresentative",
                                                e.target.value,
                                            )
                                        }
                                    />
                                </FormItem>
                            </Col>
                            <Col span={12}>
                                <FormItem
                                    label="Số điện thoại"
                                    validateStatus={
                                        errors?.infoPhoneNumber ? "error" : ""
                                    }
                                    help={errors?.infoPhoneNumber ?? ""}
                                >
                                    <Input
                                        placeholder="Số điện thoại"
                                        value={formData.infoPhoneNumber}
                                        onChange={(e) =>
                                            onChangeFormData(
                                                "infoPhoneNumber",
                                                e.target.value,
                                            )
                                        }
                                    />
                                </FormItem>
                            </Col>
                            <Col span={12}>
                                <FormItem
                                    label="Email"
                                    validateStatus={
                                        errors?.infoEmail ? "error" : ""
                                    }
                                    help={errors?.infoEmail ?? ""}
                                >
                                    <Input
                                        placeholder="Email"
                                        value={formData.infoEmail}
                                        onChange={(e) =>
                                            onChangeFormData(
                                                "infoEmail",
                                                e.target.value,
                                            )
                                        }
                                    />
                                </FormItem>
                            </Col>
                            <Col span={12}>
                                <FormItem label="Chức danh">
                                    <Input
                                        placeholder="Chức danh"
                                        value={formData.infoPosition}
                                        onChange={(e) =>
                                            onChangeFormData(
                                                "infoPosition",
                                                e.target.value,
                                            )
                                        }
                                    />
                                </FormItem>
                            </Col>
                            <Col span={12}>
                                <FormItem label="Địa chỉ">
                                    <Input
                                        placeholder="Địa chỉ"
                                        value={formData.infoAddress}
                                        onChange={(e) =>
                                            onChangeFormData(
                                                "infoAddress",
                                                e.target.value,
                                            )
                                        }
                                    />
                                </FormItem>
                            </Col>
                            <Col span={12}>
                                <FormItem label="Mã số thuế">
                                    <Input
                                        placeholder="Mã số thuế"
                                        value={formData.infoTaxcode}
                                        onChange={(e) =>
                                            onChangeFormData(
                                                "infoTaxcode",
                                                e.target.value,
                                            )
                                        }
                                    />
                                </FormItem>
                            </Col>
                            <Col span={12}>
                                <FormItem label="Thông tin ngân hàng">
                                    <Input
                                        placeholder="Thông tin ngân hàng"
                                        value={formData.infoBanking}
                                        onChange={(e) =>
                                            onChangeFormData(
                                                "infoBanking",
                                                e.target.value,
                                            )
                                        }
                                    />
                                </FormItem>
                            </Col>
                            <Col span={24}>
                                <FormItem label="Ghi chú">
                                    <TextArea
                                        placeholder="Ghi chú"
                                        autoSize={{ minRows: 3, maxRows: 5 }}
                                        value={formData.infoSpecialNote}
                                        onChange={(e) =>
                                            onChangeFormData(
                                                "infoSpecialNote",
                                                e.target.value,
                                            )
                                        }
                                    />
                                </FormItem>
                            </Col>
                        </Row>
                    </div>
                </Form>
                <div className="bottom py-4 absolute bottom-0 left-0 right-0 border-t px-6 bg-white">
                    <Space>
                        <Button onClick={onCancel}>Huỷ</Button>
                        <Button onClick={onSubmitFormData} type="primary">
                            {actionType === EActionType.CREATE
                                ? "Thêm mới"
                                : "Cập nhật"}
                        </Button>
                    </Space>
                </div>
            </Drawer>
            {initialValues ? (
                <ModalChangePassword
                    isOpen={isEditPassword}
                    onCancel={() => setEditPassword(false)}
                    localUser={initialValues}
                    errors={changePasswordErrors}
                    onConfirm={(formData) =>
                        onLocalUserChangePassword(formData, () =>
                            setEditPassword(false),
                        )
                    }
                />
            ) : null}
        </>
    );
};
export default DrawlerUserForm;
