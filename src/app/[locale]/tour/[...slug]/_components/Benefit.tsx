import { ICON_LIST } from "@/constants/icons.constant";
import { isUndefined } from "lodash";

interface BenefitProps {
  items?: { key?: string; value?: string; icon?: string }[];
}
const Benefit: React.FC<BenefitProps> = ({ items }) => {
  const getICon = (item?: string) => {
    return ICON_LIST.find((ic) => ic.key === item);
  };

  return (
    <div className="features py-6">
      <ul className="feature-list grid lg:grid-cols-3 grid-cols-2 gap-4">
        {items?.map((item, _index) => (
          <li className="feature-item" key={_index}>
            <p className="label flex mb-2">
              {!isUndefined(getICon(item.icon)) ? (
                <span className="mr-2 block">{renderIcon(getICon(item.icon))}</span>
              ) : null}
              <span className="text-xs flex-1 mt-[2px]">{item.key}</span>
            </p>
            <p className="value font-[500]">{item.value}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default Benefit;

const renderIcon = (props?: (typeof ICON_LIST)[0]) => {
  const Icon = props?.icon;
  return Icon ? <Icon width={18} height={18} /> : null;
};
