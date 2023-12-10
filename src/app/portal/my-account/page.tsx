"use client";
import PageContainer from "@/components/admin/PageContainer";
import useLocalUserProfile from "@/hooks/useLocalProfile";
import { UserOutlined } from "@ant-design/icons";
import { Row, Col, Button } from "antd";
import { useLogoutPortal } from "@/app/(adminAuth)/ag/hooks/useAgAuth";
const MyAccountPage = () => {
    const localProfile = useLocalUserProfile();
    const onLogoutPortal = useLogoutPortal();
    return (
        <PageContainer name="Thông tin tài khoản" hideAddButton>
            <div className="container border p-8 rounded-md">
                <div className="flex items-center justify-between border-b pb-6">
                    <div className="flex items-center">
                        <div className="icon w-20 h-20 text-gray-400 bg-gray-100 rounded-full flex items-center justify-center">
                            <UserOutlined className="text-4xl" />
                        </div>
                        <div className="text pl-6">
                            <p className="font-bold">
                                {localProfile?.username}
                            </p>
                            <p>{localProfile?.infoEmail}</p>
                        </div>
                    </div>
                    <div className="actions">
                        <Button danger onClick={onLogoutPortal}>
                            Đăng xuất
                        </Button>
                    </div>
                </div>
                <div className="account py-6">
                    <div className=" py-2 mb-2">
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
                                <p>Mật khẩu</p>
                                <div className=" flex items-center">
                                    <span>*******</span>
                                    <span className="text-xs text-blue-500 ml-3">
                                        Đổi mật khẩu
                                    </span>
                                </div>
                            </div>
                        </Col>
                        <Col span={12} className="mb-4">
                            <div>
                                <p>Quyền:</p>
                                <p>{localProfile?.mainRoleName || "--"}</p>
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
                <div className="Thông tin cá nhân">
                    <div className=" py-2 mb-2">
                        <h4 className="font-semibold text-lg">
                            Thông tin cá nhân
                        </h4>
                    </div>
                    <Row gutter={36}>
                        <Col span={12} className="mb-4">
                            <div>
                                <p>Họ và tên:</p>
                                <p> {localProfile?.fullname}</p>
                            </div>
                        </Col>
                        <Col span={12} className="mb-4">
                            <div>
                                <p>Email:</p>
                                <p> {localProfile?.infoEmail}</p>
                            </div>
                        </Col>
                        <Col span={12} className="mb-4">
                            <div>
                                <p>Số điện thoại:</p>
                                <p> {localProfile?.infoPhoneNumber}</p>
                            </div>
                        </Col>
                    </Row>
                </div>
                <div className="infor">
                    <div className=" py-2 mb-2">
                        <h4 className="font-semibold text-lg">
                            Thông tin thêm
                        </h4>
                    </div>
                    <Row gutter={36}>
                        <Col span={12} className="mb-4">
                            <div>
                                <p>Công ty:</p>
                                <p>{localProfile?.infoCompanyName || "--"}</p>
                            </div>
                        </Col>
                        <Col span={12} className="mb-4">
                            <div>
                                <p>Mã số thuế:</p>
                                <p>{localProfile?.infoTaxcode || "--"}</p>
                            </div>
                        </Col>
                        <Col span={12} className="mb-4">
                            <div>
                                <p>Chức danh:</p>
                                <p>{localProfile?.infoPosition || "--"}</p>
                            </div>
                        </Col>
                        <Col span={12} className="mb-4">
                            <div>
                                <p>Người đại diện:</p>
                                <p>
                                    {localProfile?.infoLegalRepresentative ||
                                        "--"}
                                </p>
                            </div>
                        </Col>
                        <Col span={12} className="mb-4">
                            <div>
                                <p>Địa chỉ:</p>
                                <p> {localProfile?.infoAddress}</p>
                            </div>
                        </Col>
                        <Col span={12} className="mb-4">
                            <div>
                                <p>Thông tin ngân hàng:</p>
                                <p>{localProfile?.infoBanking || "--"}</p>
                            </div>
                        </Col>
                        <Col span={12} className="mb-4">
                            <div>
                                <p>Ghi chú:</p>
                                <p>{localProfile?.infoSpecialNote || "--"}</p>
                            </div>
                        </Col>
                    </Row>
                </div>
            </div>
        </PageContainer>
    );
};
export default MyAccountPage;
