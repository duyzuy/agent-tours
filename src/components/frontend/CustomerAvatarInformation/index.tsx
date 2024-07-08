import React from "react";
import { IconUser, IconChevronRight } from "@/assets/icons";
import classNames from "classnames";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
interface CustomerAvatarInformationProps {
  className?: string;
  bgImage?: string;
  username?: string;
  levelLabel?: string;
  ranking?: "silver" | "gold" | "premium";
  rankingLabel?: string;
}
const CustomerAvatarInformation: React.FC<CustomerAvatarInformationProps> = async ({
  className = "",
  username,
  levelLabel,
  ranking = "silver",
  rankingLabel,
  bgImage = "/assets/images/profile/bg-confetti.png",
}) => {
  const t = await getTranslations("String");
  return (
    <>
      <div className="my-account__avatar w-full py-8 bg-gradient-to-br from-[#54ced8] via-[#55b0d7] to-[#56b3d6] relative">
        <div
          className={classNames("my-account__avatar-info", {
            [className]: className,
          })}
          style={{
            backgroundImage: `url(${bgImage})`,
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
                <span>{t("edit")}</span>
                <IconChevronRight width={16} height={16} />
              </span>
            </div>
          </div>
          <div className="box-account-info px-4 relative z-10">
            <div className="w-full bg-white shadow-lg rounded-lg px-4 py-4">
              <p className="mb-2">{t("profile.sidebar.memberLabel")}</p>
              <div className="mb-3 bg-[#3bb1e3] w-fit rounded-md border border-[#3bb1e3] flex">
                <span className="bg-[#3bb1e3] text-white pr-1 px-3 mr-2">{levelLabel}</span>
                <span className="bg-white h-full flex-1 px-3 rounded-md">{rankingLabel}</span>
              </div>
              <p className="text-[#3bb1e3] cursor-pointer">{t("profile.sidebar.viewmore")}</p>
            </div>
          </div>
        </div>
        <div className="bg-gradient-to-t from-white from-0% via-white/50 via-60% to-transparent to-100% h-24 absolute bottom-0 left-0 right-0"></div>
      </div>
    </>
  );
};
export default CustomerAvatarInformation;
