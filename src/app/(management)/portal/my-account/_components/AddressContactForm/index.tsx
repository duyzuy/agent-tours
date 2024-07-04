import React, { useEffect, useState, memo, useMemo } from "react";
import { Form, Input, Row, Col, Button, Space } from "antd";
import FormItem from "antd/es/form/FormItem";
import { ILocalUserProfile } from "@/models/management/localAuth.interface";
import { EditOutlined } from "@ant-design/icons";
import { LocalUserProfileFormData } from "../../modules/userProfileInfo.interface";
import { HandleSubmit, useFormSubmit } from "@/hooks/useFormSubmit";
import { localUserProfileSchema } from "../../schema/localUserProfile.schema";
import useUpdateUserProfile from "../../modules/useUpdateUserProfile";
import { isEqual } from "lodash";
export interface AddressContactFormProps {
    data?: ILocalUserProfile;
}
type RequiredFormData = Required<LocalUserProfileFormData>;
const AddressContactForm: React.FC<AddressContactFormProps> = ({ data }) => {
    const [isEditing, setEditing] = useState(false);
    const initFormData = new LocalUserProfileFormData(
        data?.infoCompanyName,
        data?.infoLegalRepresentative,
        data?.infoPosition,
        data?.infoPhoneNumber,
        data?.infoEmail,
        data?.infoAddress,
        data?.infoTaxcode,
        data?.infoBanking,
        data?.infoSpecialNote,
    );
    const [formData, setFormData] = useState(initFormData);
    const { onUpdate } = useUpdateUserProfile();
    const { handlerSubmit, errors } = useFormSubmit({
        schema: localUserProfileSchema,
    });

    const onChange = (
        key: keyof RequiredFormData,
        value: RequiredFormData[keyof RequiredFormData],
    ) => {
        setFormData((old) => ({
            ...old,
            [key]: value,
        }));
    };
    const onSubmitForm: HandleSubmit<LocalUserProfileFormData> = (data) => {
        onUpdate(data, () => {
            setEditing(false);
        });
    };

    const onCancelEdit = () => {
        setEditing(false);
        setFormData(initFormData);
    };

    const isDisableButton = useMemo(() => {
        return (
            isEqual(formData.infoEmail, data?.infoEmail) &&
            isEqual(formData.infoPhoneNumber, data?.infoPhoneNumber)
        );
    }, [formData]);
    useEffect(() => {
        setFormData((oldData) => ({
            ...oldData,
            infoEmail: data?.infoEmail,
            infoPhoneNumber: data?.infoPhoneNumber,
        }));
    }, [data]);
    return (
        <div className="address__contact">
            <div className="flex justify-between py-2 mb-2">
                <h4 className="font-semibold text-lg">Thông tin cá nhân</h4>
                <span>
                    <Button
                        size="small"
                        type="primary"
                        ghost
                        icon={<EditOutlined />}
                        onClick={() => setEditing((edit) => !edit)}
                    >
                        Chỉnh sửa
                    </Button>
                </span>
            </div>
            <div>
                {isEditing ? (
                    <Form layout="vertical">
                        <Row gutter={[24, 0]}>
                            <Col span={12}>
                                <FormItem
                                    label="Email"
                                    required
                                    validateStatus={
                                        errors?.infoEmail ? "error" : ""
                                    }
                                    help={errors?.infoEmail || ""}
                                >
                                    <Input
                                        placeholder="Email"
                                        name="infoEmail"
                                        value={formData.infoEmail}
                                        onChange={(evt) =>
                                            onChange(
                                                "infoEmail",
                                                evt.target.value,
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
                                    help={errors?.infoPhoneNumber || ""}
                                >
                                    <Input
                                        placeholder="Số điện thoại"
                                        name="infoPhoneNumber"
                                        value={formData.infoPhoneNumber}
                                        onChange={(evt) =>
                                            onChange(
                                                "infoPhoneNumber",
                                                evt.target.value,
                                            )
                                        }
                                    />
                                </FormItem>
                            </Col>
                            <Col span={24}>
                                <FormItem>
                                    <Space>
                                        <Button
                                            type="primary"
                                            ghost
                                            danger
                                            onClick={onCancelEdit}
                                        >
                                            Huỷ bỏ
                                        </Button>
                                        <Button
                                            type="primary"
                                            disabled={isDisableButton}
                                            onClick={() =>
                                                handlerSubmit(
                                                    formData,
                                                    onSubmitForm,
                                                )
                                            }
                                        >
                                            Cập nhật
                                        </Button>
                                    </Space>
                                </FormItem>
                            </Col>
                        </Row>
                    </Form>
                ) : (
                    <Row gutter={36}>
                        <Col span={12} className="mb-4">
                            <div>
                                <p>Họ và tên:</p>
                                <p> {data?.fullname}</p>
                            </div>
                        </Col>
                        <Col span={12} className="mb-4">
                            <div>
                                <p>Email:</p>
                                <p> {data?.infoEmail}</p>
                            </div>
                        </Col>
                        <Col span={12} className="mb-4">
                            <div>
                                <p>Số điện thoại:</p>
                                <p> {data?.infoPhoneNumber}</p>
                            </div>
                        </Col>
                    </Row>
                )}
            </div>
        </div>
    );
};
export default memo(AddressContactForm);

// "infoPhoneNumber": "string",
// "infoEmail": "string",
// "infoAddress": "string",
