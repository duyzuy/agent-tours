import { useSession } from "next-auth/react";
import { getCustomerProfile } from "./_actions/customer";
import { authOptions } from "@/auth";

import { Link, redirect } from "@/utils/navigation";

import Image from "next/image";
import {
    IconAccount,
    IconChevronRight,
    IconLogout,
    IconPen,
    IconRecieptText,
    IconUser,
} from "@/assets/icons";
import IconKeyRound from "@/assets/icons/IconKeyRound";
const CustomerPage = async () => {
    const profileResponse = await getCustomerProfile();

    const { result } = profileResponse || {};

    if (!profileResponse) {
        redirect("/");
    }

    return (
        <div className="my-account py-12 bg-gray-100">
            <div className="container mx-auto px-4 md:px-6 lg:px-8">
                <div className="my-account-inner flex gap-x-6">
                    <div className="w-4/12 lg:w-3/12 bg-white rounded-lg overflow-hidden">
                        <div className="my-account__avatar w-full py-8 bg-gradient-to-br from-[#54ced8] via-[#55b0d7] to-[#56b3d6] relative">
                            <div
                                className="my-account__avatar-info"
                                style={{
                                    backgroundImage:
                                        "url(/assets/images/profile/bg-confetti.png)",
                                }}
                            >
                                <div className="mb-6">
                                    <div className="avatar w-fit mb-3 mx-auto">
                                        <span className="w-24 h-24 rounded-full bg-slate-300 border-2 shadow-lg flex items-center justify-center">
                                            <IconUser
                                                className="stroke-white"
                                                width={36}
                                                height={36}
                                            />
                                        </span>
                                    </div>
                                    <div className="text-center">
                                        <span className="text-white text-2xl block font-[500] mb-2">
                                            {result?.user.username}
                                        </span>
                                        <span className="text-white inline-flex justify-center items-center mx-auto gap-x-1 bg-white/25 px-2 rounded-md">
                                            <span>Chỉnh sửa</span>
                                            <IconChevronRight
                                                width={16}
                                                height={16}
                                            />
                                        </span>
                                    </div>
                                </div>
                                <div className="box-account-info px-4 relative z-10">
                                    <div className="w-full bg-white shadow-lg rounded-lg px-4 py-4">
                                        <p className="mb-2">Thành viên</p>
                                        <div className="mb-3 bg-[#3bb1e3] w-fit rounded-md border border-[#3bb1e3] flex">
                                            <span className="bg-[#3bb1e3] text-white pr-1 px-3 mr-2">
                                                LV1
                                            </span>
                                            <span className="bg-white h-full flex-1 px-3 rounded-md">
                                                Bạc
                                            </span>
                                        </div>
                                        <p className="text-[#3bb1e3] cursor-pointer">
                                            Xem các ưu đãi thành viên
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-gradient-to-t from-white from-0% via-white/50 via-60% to-transparent to-100% h-24 absolute bottom-0 left-0 right-0"></div>
                        </div>
                        <div className="my-account__navs px-3 pt-6 pb-3 isolate">
                            <ul>
                                <li className="py-3 px-3 hover:bg-gray-100 rounded-lg">
                                    <Link href="/">
                                        <span className="text-gray-800 flex items-center">
                                            <IconAccount className="mr-3 stroke-gray-800" />
                                            <span>Thông tin tài khoản</span>
                                        </span>
                                    </Link>
                                </li>
                                <li className="py-3 px-3 hover:bg-gray-100 rounded-lg">
                                    <Link href="/">
                                        <span className="text-gray-800 flex items-center">
                                            <IconRecieptText className="mr-3 stroke-gray-800" />
                                            <span>Đơn hàng</span>
                                        </span>
                                    </Link>
                                </li>
                                <li className="py-3 px-3 hover:bg-gray-100 rounded-lg">
                                    <Link href="/">
                                        <span className="text-gray-800 flex items-center">
                                            <IconKeyRound className="mr-3 stroke-gray-800" />
                                            <span>Đổi mật khẩu</span>
                                        </span>
                                    </Link>
                                </li>
                                <li className="py-3 px-3 hover:bg-gray-100 rounded-lg">
                                    <Link href="/">
                                        <span className="text-gray-800 flex items-center">
                                            <IconLogout className="mr-3 stroke-gray-800" />
                                            <span>Đăng xuất</span>
                                        </span>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
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
                                    <span className="text-gray-500 block">
                                        Email
                                    </span>
                                    <span>{result?.user.email}</span>
                                </div>
                                <div className="">
                                    <span className="text-gray-500 block">
                                        Tên tài khoản
                                    </span>
                                    <span>{result?.user.username}</span>
                                </div>
                                <div className="">
                                    <span className="text-gray-500 block">
                                        Số điện thoại
                                    </span>
                                    <span>
                                        {result?.user.phoneNumber
                                            ? result?.user.phoneNumber
                                            : "--"}
                                    </span>
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
                                    <span className="text-gray-500 block">
                                        Họ và tên
                                    </span>
                                    <span>{result?.fullname || "--"}</span>
                                </div>
                                <div className="">
                                    <span className="text-gray-500 block">
                                        Ngày sinh
                                    </span>
                                    <span>{result?.dob || "--"}</span>
                                </div>
                                <div className="">
                                    <span className="text-gray-500 block">
                                        Số hộ Chiếu
                                    </span>
                                    <span>
                                        {result?.passportNumber || "--"}
                                    </span>
                                </div>
                                <div className="">
                                    <span className="text-gray-500 block">
                                        Quốc gia
                                    </span>
                                    <span>{result?.country || "--"}</span>
                                </div>
                                <div className="">
                                    <span className="text-gray-500 block">
                                        Thành phố
                                    </span>
                                    <span>{result?.city || "--"}</span>
                                </div>
                                <div className="">
                                    <span className="text-gray-500 block">
                                        Quận huyện / khu vực
                                    </span>
                                    <span>{result?.district || "--"}</span>
                                </div>
                                <div className="">
                                    <span className="text-gray-500 block">
                                        Địa chỉ
                                    </span>
                                    <span>{result?.address || "--"}</span>
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
