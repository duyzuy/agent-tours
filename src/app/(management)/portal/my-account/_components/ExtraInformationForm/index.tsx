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
export interface ExtraInformationFormProps {
    data?: ILocalUserProfile;
}
type RequiredFormData = Required<LocalUserProfileFormData>;
const ExtraInformationForm: React.FC<ExtraInformationFormProps> = ({
    data,
}) => {
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
            isEqual(formData.infoAddress, data?.infoAddress) &&
            isEqual(formData.infoBanking, data?.infoBanking) &&
            isEqual(formData.infoCompanyName, data?.infoCompanyName) &&
            isEqual(
                formData.infoLegalRepresentative,
                data?.infoLegalRepresentative,
            ) &&
            isEqual(formData.infoPosition, data?.infoPosition) &&
            isEqual(formData.infoSpecialNote, data?.infoSpecialNote) &&
            isEqual(formData.infoTaxcode, data?.infoTaxcode)
        );
    }, [formData]);

    useEffect(() => {
        setFormData((oldData) => ({
            ...oldData,
            infoAddress: data?.infoAddress,
            infoBanking: data?.infoBanking,
            infoCompanyName: data?.infoCompanyName,
            infoLegalRepresentative: data?.infoLegalRepresentative,
            infoEmail: data?.infoEmail,
            infoPosition: data?.infoPosition,
            infoSpecialNote: data?.infoSpecialNote,
            infoPhoneNumber: data?.infoPhoneNumber,
            infoTaxcode: data?.infoTaxcode,
        }));
    }, [data]);
    return (
        <div className="infor">
            <div className=" flex justify-between py-2 mb-2">
                <h4 className="font-semibold text-lg">Thông tin thêm</h4>
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
                                <FormItem label="Công ty">
                                    <Input
                                        placeholder="Nhập tên công ty"
                                        name="infoCompanyName"
                                        value={formData.infoCompanyName}
                                        onChange={(evt) =>
                                            onChange(
                                                "infoCompanyName",
                                                evt.target.value,
                                            )
                                        }
                                    />
                                </FormItem>
                            </Col>
                            <Col span={12}>
                                <FormItem label="Mã số thuế">
                                    <Input
                                        placeholder="Nhập tên công ty"
                                        name="infoTaxcode"
                                        value={formData.infoTaxcode}
                                        onChange={(evt) =>
                                            onChange(
                                                "infoTaxcode",
                                                evt.target.value,
                                            )
                                        }
                                    />
                                </FormItem>
                            </Col>
                            <Col span={12}>
                                <FormItem label="Chức danh">
                                    <Input
                                        placeholder="Nhập tên công ty"
                                        name="infoPosition"
                                        value={formData.infoPosition}
                                        onChange={(evt) =>
                                            onChange(
                                                "infoPosition",
                                                evt.target.value,
                                            )
                                        }
                                    />
                                </FormItem>
                            </Col>
                            <Col span={12}>
                                <FormItem label="Người đại diện">
                                    <Input
                                        placeholder="Người đại diện"
                                        name="infoLegalRepresentative"
                                        value={formData.infoLegalRepresentative}
                                        onChange={(evt) =>
                                            onChange(
                                                "infoLegalRepresentative",
                                                evt.target.value,
                                            )
                                        }
                                    />
                                </FormItem>
                            </Col>
                            <Col span={12}>
                                <FormItem label="Địa chỉ">
                                    <Input
                                        placeholder="Địa chỉ"
                                        name="infoAddress"
                                        value={formData.infoAddress}
                                        onChange={(evt) =>
                                            onChange(
                                                "infoAddress",
                                                evt.target.value,
                                            )
                                        }
                                    />
                                </FormItem>
                            </Col>
                            <Col span={12}>
                                <FormItem label="Thông tin ngân hàng">
                                    <Input
                                        placeholder="Thông tin ngân hàng"
                                        name="infoBanking"
                                        value={formData.infoBanking}
                                        onChange={(evt) =>
                                            onChange(
                                                "infoBanking",
                                                evt.target.value,
                                            )
                                        }
                                    />
                                </FormItem>
                            </Col>
                            <Col span={24}>
                                <FormItem label="Ghi chú">
                                    <Input
                                        placeholder="Ghi chú"
                                        name="infoSpecialNote"
                                        value={formData.infoSpecialNote}
                                        onChange={(evt) =>
                                            onChange(
                                                "infoSpecialNote",
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
                    <Row gutter={24}>
                        <Col span={12} className="mb-4">
                            <div>
                                <p>Công ty</p>
                                <p>{data?.infoCompanyName || "--"}</p>
                            </div>
                        </Col>
                        <Col span={12} className="mb-4">
                            <div>
                                <p>Mã số thuế</p>
                                <p>{data?.infoTaxcode || "--"}</p>
                            </div>
                        </Col>
                        <Col span={12} className="mb-4">
                            <div>
                                <p>Chức danh</p>
                                <p>{data?.infoPosition || "--"}</p>
                            </div>
                        </Col>
                        <Col span={12} className="mb-4">
                            <div>
                                <p>Người đại diện</p>
                                <p>{data?.infoLegalRepresentative || "--"}</p>
                            </div>
                        </Col>
                        <Col span={12} className="mb-4">
                            <div>
                                <p>Địa chỉ</p>
                                <p> {data?.infoAddress}</p>
                            </div>
                        </Col>
                        <Col span={12} className="mb-4">
                            <div>
                                <p>Thông tin ngân hàng</p>
                                <p>{data?.infoBanking || "--"}</p>
                            </div>
                        </Col>
                        <Col span={12} className="mb-4">
                            <div>
                                <p>Ghi chú</p>
                                <p>{data?.infoSpecialNote || "--"}</p>
                            </div>
                        </Col>
                    </Row>
                )}
            </div>
        </div>
    );
};
export default memo(ExtraInformationForm);

// "infoPhoneNumber": "string",
// "infoEmail": "string",
// "infoAddress": "string",
