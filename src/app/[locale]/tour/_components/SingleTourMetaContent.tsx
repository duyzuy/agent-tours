import { ICON_LIST } from "@/constants/icons.constant";
import classNames from "classnames";
import { isUndefined } from "lodash";

interface SingleTourMetaContentProps {
  items?: { key?: string; value?: string; icon?: string }[];
  className?: string;
}
const SingleTourMetaContent: React.FC<SingleTourMetaContentProps> = ({ items, className = "" }) => {
  const getICon = (item?: string) => {
    return ICON_LIST.find((ic) => ic.key === item);
  };

  return (
    <div
      className={classNames("meta-content", {
        [className]: className,
      })}
    >
      <ul className="feature-list grid lg:grid-cols-3 grid-cols-2 gap-4">
        {items?.map((item, _index) => (
          <li key={_index} className="feature-item flex">
            {getICon(item.icon) ? (
              <span className="mr-2 w-8 h-8 bg-emerald-50 rounded-full inline-flex items-center justify-center !text-emerald-600 mt-1">
                {renderIcon(getICon(item.icon))}
              </span>
            ) : null}
            <div className="flex-1">
              <span className="flex-1 font-[500]">{item.key}</span>
              <p className="value text-xs">{item.value}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default SingleTourMetaContent;

const renderIcon = (props?: (typeof ICON_LIST)[number]) => {
  const Icon = props?.icon;
  return Icon ? <Icon width={18} height={18} /> : null;
};
