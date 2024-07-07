"use client";
import { Link } from "@/utils/navigation";
import { IconAccount, IconChevronRight, IconLogout, IconRecieptText, IconKeyRound, IconUser } from "@/assets/icons";
import classNames from "classnames";
import { useTranslations } from "next-intl";

interface CustomerSidebarProps {
  username?: string;
  className?: string;
}
const CustomerSidebar: React.FC<CustomerSidebarProps> = ({ username, className = "" }) => {
  const t = useTranslations("String");
  const NAV_ITEMS = [
    {
      title: "Thông tin tài khoản",
      key: "account",
      icon: IconAccount,
      path: "/",
    },
    {
      title: "Đơn hàng",
      key: "orders",
      icon: IconRecieptText,
      path: "/",
    },
    {
      title: "Đổi mật khẩu",
      key: "changePassword",
      icon: IconKeyRound,
      path: "/",
    },
    {
      title: "Đăng xuất",
      key: "logOut",
      icon: IconLogout,
      path: "/",
    },
  ];
  return (
    <div
      className={classNames("customer-sidebar", {
        [className]: className,
      })}
    >
      <div className="my-account__avatar w-full py-8 bg-gradient-to-br from-[#54ced8] via-[#55b0d7] to-[#56b3d6] relative">
        <div
          className="my-account__avatar-info"
          style={{
            backgroundImage: "url(/assets/images/profile/bg-confetti.png)",
          }}
        >
          <div className="mb-6">
            <div className="avatar w-fit mb-3 mx-auto">
              <span className="w-24 h-24 rounded-full bg-slate-300 border-2 shadow-lg flex items-center justify-center">
                <IconUser className="stroke-white" width={36} height={36} />
              </span>
            </div>
            <div className="text-center">
              <span className="text-white text-2xl block font-[500] mb-2">{username}</span>
              <span className="text-white inline-flex justify-center items-center mx-auto gap-x-1 bg-white/25 px-2 rounded-md">
                <span>Chỉnh sửa</span>
                <IconChevronRight width={16} height={16} />
              </span>
            </div>
          </div>
          <div className="box-account-info px-4 relative z-10">
            <div className="w-full bg-white shadow-lg rounded-lg px-4 py-4">
              <p className="mb-2">Thành viên</p>
              <div className="mb-3 bg-[#3bb1e3] w-fit rounded-md border border-[#3bb1e3] flex">
                <span className="bg-[#3bb1e3] text-white pr-1 px-3 mr-2">LV1</span>
                <span className="bg-white h-full flex-1 px-3 rounded-md">Bạc</span>
              </div>
              <p className="text-[#3bb1e3] cursor-pointer">Xem các ưu đãi thành viên</p>
            </div>
          </div>
        </div>
        <div className="bg-gradient-to-t from-white from-0% via-white/50 via-60% to-transparent to-100% h-24 absolute bottom-0 left-0 right-0"></div>
      </div>
      <div className="my-account__navs px-3 pt-6 pb-3 isolate">
        {NAV_ITEMS.map((item) => (
          <div className="py-3 px-3 hover:bg-gray-100 rounded-lg" key={item.key}>
            <Link href={item.path}>
              <span className="text-gray-800 flex items-center">
                {item.icon ? <item.icon className="mr-3 stroke-gray-800" /> : null}
                <span>{item.title}</span>
              </span>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};
export default CustomerSidebar;
