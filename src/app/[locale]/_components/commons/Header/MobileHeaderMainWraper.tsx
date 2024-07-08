import AccountItem from "./AccountItem";
import MenuMobileNavs from "./MenuMobileNavs";

export interface MobileHeaderMainWraperProps {
  isMobile?: boolean;
}
const MobileHeaderMainWraper: React.FC<MobileHeaderMainWraperProps> = ({ isMobile }) => {
  if (!isMobile) {
    return null;
  }
  return (
    <>
      <AccountItem isMobile={true} />
      <div className="space mx-2 text-xs text-gray-400">|</div>
      <MenuMobileNavs />
    </>
  );
};
export default MobileHeaderMainWraper;
