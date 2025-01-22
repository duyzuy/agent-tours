import React, { useEffect, useState, memo, useMemo } from "react";
import { Form, Input, Row, Col, Button, Space } from "antd";
import FormItem from "antd/es/form/FormItem";
import { ILocalUserProfile } from "@/models/management/localAuth.interface";
import { EditOutlined } from "@ant-design/icons";
import { LocalUserProfileFormData } from "../adminProfile.types";
import { HandleSubmit, useFormSubmit } from "@/hooks/useFormSubmit";
import { adminUpdateProfileSchema } from "../adminProfile.schema";
import { useUpdateAdminProfile } from "../useAdminProfile";
import { isEqual } from "lodash";
export interface ProfileAddressContactFormProps {
  data?: ILocalUserProfile;
}
type RequiredFormData = Required<LocalUserProfileFormData>;
const ProfileAddressContactForm: React.FC<ProfileAddressContactFormProps> = ({ data }) => {
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
  const { mutate: onUpdate, isPending } = useUpdateAdminProfile();
  const { handlerSubmit, errors } = useFormSubmit({
    schema: adminUpdateProfileSchema,
  });

  const onChange = (key: keyof RequiredFormData, value: RequiredFormData[keyof RequiredFormData]) => {
    setFormData((old) => ({
      ...old,
      [key]: value,
    }));
  };
  const onSubmitForm: HandleSubmit<LocalUserProfileFormData> = (data) => {
    onUpdate(data, {
      onSuccess(data, variables, context) {
        setEditing(false);
      },
    });
  };

  const onCancelEdit = () => {
    setEditing(false);
    setFormData(initFormData);
  };

  const isDisableButton = useMemo(() => {
    return isEqual(formData.infoEmail, data?.infoEmail) && isEqual(formData.infoPhoneNumber, data?.infoPhoneNumber);
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
        {!isEditing && (
          <Button size="small" type="primary" ghost icon={<EditOutlined />} onClick={() => setEditing((edit) => !edit)}>
            Sửa
          </Button>
        )}
      </div>

      {isEditing ? (
        <Form layout="vertical" disabled={isPending}>
          <Row gutter={[24, 0]}>
            <Col span={12}>
              <FormItem
                label="Email"
                required
                validateStatus={errors?.infoEmail ? "error" : ""}
                help={errors?.infoEmail || ""}
              >
                <Input
                  placeholder="Email"
                  name="infoEmail"
                  value={formData.infoEmail}
                  onChange={(evt) => onChange("infoEmail", evt.target.value)}
                />
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem
                label="Số điện thoại"
                validateStatus={errors?.infoPhoneNumber ? "error" : ""}
                help={errors?.infoPhoneNumber || ""}
              >
                <Input
                  placeholder="Số điện thoại"
                  name="infoPhoneNumber"
                  value={formData.infoPhoneNumber}
                  onChange={(evt) => onChange("infoPhoneNumber", evt.target.value)}
                />
              </FormItem>
            </Col>
            <Col span={24}>
              <FormItem>
                <Space>
                  <Button
                    type="primary"
                    disabled={isDisableButton}
                    className="w-20"
                    onClick={() => handlerSubmit(formData, onSubmitForm)}
                    loading={isPending}
                  >
                    Lưu
                  </Button>
                  <Button type="primary" className="w-20" ghost danger onClick={onCancelEdit} loading={isPending}>
                    Huỷ bỏ
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
              <p> {data?.fullname || "--"}</p>
            </div>
          </Col>
          <Col span={12} className="mb-4">
            <div>
              <p>Email:</p>
              <p> {data?.infoEmail || "--"}</p>
            </div>
          </Col>
          <Col span={12} className="mb-4">
            <div>
              <p>Số điện thoại:</p>
              <p> {data?.infoPhoneNumber || "--"}</p>
            </div>
          </Col>
        </Row>
      )}
    </div>
  );
};
export default memo(ProfileAddressContactForm);
