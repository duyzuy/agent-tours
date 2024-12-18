"use client";
import PageContainer from "@/components/admin/PageContainer";
import useLocalUserProfile from "@/hooks/useLocalProfile";
import { EditOutlined, UserOutlined } from "@ant-design/icons";
import { Row, Col, Button } from "antd";
import { useLogoutPortal } from "../../(adminAuth)/ag/hooks/useAgAuth";
import ExtraInformationForm from "./_components/ExtraInformationForm";
import useUpdateUserProfile from "./modules/useUpdateUserProfile";
import AddressContactForm from "./_components/AddressContactForm";
import React, { useState } from "react";
import ModalChangePassword, { ModalChangePasswordProps } from "./_components/ModalChangePassword";

const MyAccountPage = () => {
  const localProfile = useLocalUserProfile();
  const onLogoutPortal = useLogoutPortal();
  const { onChangePassword } = useUpdateUserProfile();
  const [showModalChangePassword, setShowModalChangePassword] = useState(false);

  const handleSubmitForm: ModalChangePasswordProps["onSubmit"] = (data) => {
    onChangePassword(data, () => {
      setShowModalChangePassword(false);
    });
  };
  if (!localProfile) {
    return null;
  }

  return (
    <PageContainer
      name="Thông tin tài khoản"
      hideAddButton
      className=""
      breadCrumItems={[{ title: "Thông tin tài khoản" }]}
    >
      <div className="container border p-8 rounded-md max-w-3xl">
        <div className="flex items-center justify-between border-b pb-6">
          <div className="flex items-center">
            <div className="icon w-16 h-16 text-gray-400 bg-gray-100 rounded-full flex items-center justify-center">
              <UserOutlined className="text-3xl" />
            </div>
            <div className="text pl-6">
              <p className="font-[500] text-lg">{localProfile?.username}</p>
              <p className="text-gray-500">{localProfile?.email}</p>
            </div>
          </div>
          <div className="actions">
            <Button danger onClick={onLogoutPortal} size="small">
              Đăng xuất
            </Button>
          </div>
        </div>
        <div className="account py-6">
          <div className="py-2 mb-2">
            <h4 className="font-semibold text-lg">Tài khoản</h4>
          </div>
          <Row gutter={36}>
            <Col span={12} className="mb-4">
              <div>
                <p>Tên tài khoản:</p>
                <p>{localProfile?.username}</p>
              </div>
            </Col>
            <Col span={12} className="mb-4">
              <div>
                <p>
                  <span className="inline-block mr-1">Mật khẩu</span>
                  <span className="text-blue-600 cursor-pointer" onClick={() => setShowModalChangePassword(true)}>
                    <EditOutlined />
                  </span>
                </p>
                <p>
                  <span>*******</span>
                </p>
              </div>
            </Col>
            <Col span={12} className="mb-4">
              <div>
                <p>Loại tài khoản</p>
                <p>{localProfile?.userType || "--"}</p>
              </div>
            </Col>
            <Col span={12} className="mb-4">
              <div>
                <p>Mô tả:</p>
                <p>{localProfile?.descriptions || "--"}</p>
              </div>
            </Col>
          </Row>
        </div>
        <AddressContactForm data={localProfile} />
        <ExtraInformationForm data={localProfile} />
      </div>
      <ModalChangePassword
        userName={localProfile.username}
        isOpen={showModalChangePassword}
        onClose={() => setShowModalChangePassword(false)}
        onSubmit={handleSubmitForm}
      />
    </PageContainer>
  );
};
export default MyAccountPage;
