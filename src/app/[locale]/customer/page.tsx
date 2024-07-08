import { getCustomerProfile } from "./_actions/customer";
import ProfileInformationBox from "./_components/ProfileInformationBox";
import { getTranslations } from "next-intl/server";
const CustomerPage = async () => {
  const userProfile = await getCustomerProfile();

  const t = await getTranslations("String");
  const c = await getTranslations("Customer");

  return (
    <>
      <div className="box-info mb-6">
        <div className="mb-6">
          <h1 className="text-xl flex items-center font-[500]">
            <span className="w-[6px] h-6 block bg-[#56b3d6] left-0 rounded-md mr-3"></span>
            {c("subPage.accountInformation.title")}
          </h1>
        </div>
        <div className="account-info__content grid grid-cols-2 gap-6 flex-wrap">
          <div className="">
            <span className="text-gray-500 block">{t("label.email")}</span>
            <span className="block break-words">{userProfile?.user.email}</span>
          </div>
          <div className="">
            <span className="text-gray-500 block">{t("label.username")}</span>
            <span>{userProfile?.user.username}</span>
          </div>
          <div className="">
            <span className="text-gray-500 block">{t("label.phoneNumber")}</span>
            <span>{userProfile?.user.phoneNumber ? userProfile?.user.phoneNumber : "--"}</span>
          </div>
        </div>
      </div>

      <ProfileInformationBox
        fullname={userProfile?.fullname}
        dob={userProfile?.dob}
        passportNumber={userProfile?.passportNumber}
        country={userProfile?.country}
        city={userProfile?.city}
        district={userProfile?.district}
        address={userProfile?.address}
      />
    </>
  );
};
export default CustomerPage;
