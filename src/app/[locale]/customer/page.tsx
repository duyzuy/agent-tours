import { useSession } from "next-auth/react";
import { getCustomerProfile } from "./_actions/customer";
import { authOptions } from "@/auth";

import { Link, redirect } from "@/utils/navigation";

import Image from "next/image";
import { IconAccount, IconChevronRight, IconLogout, IconPen, IconRecieptText, IconUser } from "@/assets/icons";
import IconKeyRound from "@/assets/icons/IconKeyRound";
import CustomerSidebar from "./_components/CustomerSidebar";
const CustomerPage = async () => {
  const userProfile = await getCustomerProfile();

  if (!userProfile) {
    redirect("/");
  }

  return (
    <div className="my-account py-12 bg-gray-100">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="my-account-inner flex gap-x-6">
          <CustomerSidebar className="w-4/12 lg:w-3/12 bg-white rounded-lg overflow-hidden" />
          <div className="w-8/12 lg:w-9/12 bg-white rounded-lg px-6 py-8">
            <div className="box-info mb-6">
              <div className="mb-6">
                <h1 className="text-xl flex items-center font-[500]">
                  <span className="w-[6px] h-6 block bg-[#56b3d6] left-0 rounded-md mr-3"></span>
                  Thông tin tài khoản
                </h1>
              </div>
              <div className="account-info__content grid grid-cols-2 gap-6 flex-wrap">
                <div className="">
                  <span className="text-gray-500 block">Email</span>
                  <span>{userProfile?.user.email}</span>
                </div>
                <div className="">
                  <span className="text-gray-500 block">Tên tài khoản</span>
                  <span>{userProfile?.user.username}</span>
                </div>
                <div className="">
                  <span className="text-gray-500 block">Số điện thoại</span>
                  <span>{userProfile?.user.phoneNumber ? userProfile?.user.phoneNumber : "--"}</span>
                </div>
              </div>
            </div>
            <div className="box-info border-t pt-6 mt-6">
              <div className="box-info__header mb-6 flex gap-x-6">
                <h3 className="text-xl flex items-center font-[500]">
                  <span className="w-[6px] h-6 block bg-[#56b3d6] left-0 rounded-md mr-3"></span>
                  <span>Thông tin cá nhân</span>
                </h3>
                <span className="btn inline-flex items-center gap-x-2 text-xs cursor-pointer rounded-md text-blue-600">
                  <IconPen width={14} height={14} />
                  <span>Sửa</span>
                </span>
              </div>
              <div className="account-info__content grid grid-cols-3 gap-6 flex-wrap">
                <div className="">
                  <span className="text-gray-500 block">Họ và tên</span>
                  <span>{userProfile?.fullname || "--"}</span>
                </div>
                <div className="">
                  <span className="text-gray-500 block">Ngày sinh</span>
                  <span>{userProfile?.dob || "--"}</span>
                </div>
                <div className="">
                  <span className="text-gray-500 block">Số hộ Chiếu</span>
                  <span>{userProfile?.passportNumber || "--"}</span>
                </div>
                <div className="">
                  <span className="text-gray-500 block">Quốc gia</span>
                  <span>{userProfile?.country || "--"}</span>
                </div>
                <div className="">
                  <span className="text-gray-500 block">Thành phố</span>
                  <span>{userProfile?.city || "--"}</span>
                </div>
                <div className="">
                  <span className="text-gray-500 block">Quận huyện / khu vực</span>
                  <span>{userProfile?.district || "--"}</span>
                </div>
                <div className="">
                  <span className="text-gray-500 block">Địa chỉ</span>
                  <span>{userProfile?.address || "--"}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CustomerPage;
