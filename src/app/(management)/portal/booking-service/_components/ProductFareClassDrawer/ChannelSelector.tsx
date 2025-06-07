import { Segmented } from "antd";
import { useAdminProfile } from "@/modules/admin/auth/store/AdminProfileContext";
import { ESellChannel, SELL_CHANNEL } from "@/constants/channel.constant";
export interface ChannelSelectorProps {
  value?: ESellChannel;
  onChange?: (value: ESellChannel) => void;
}
const ChannelSelector: React.FC<ChannelSelectorProps> = ({ value, onChange }) => {
  const adminProfile = useAdminProfile();

  const mapRuleUserTypeSellChannel = (items: typeof SELL_CHANNEL) => {
    if (adminProfile?.userType === "ADMIN" || adminProfile?.userType === "STAFF") {
      return SELL_CHANNEL;
    }

    return SELL_CHANNEL.filter((item) => item.value === ESellChannel.B2B);
  };

  return (
    <div className="section-sell-channel">
      <h3 className="text-lg font-[500] mb-3">Kênh bán</h3>
      <Segmented
        value={value}
        options={mapRuleUserTypeSellChannel(SELL_CHANNEL)}
        onChange={(value) => onChange?.(value as ESellChannel)}
      />
    </div>
  );
};
export default ChannelSelector;
