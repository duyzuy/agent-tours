import { useClickOutSide } from "@/app/[locale]/hooks/useClickOutSide";

import { DownOutlined } from "@ant-design/icons";
import classNames from "classnames";
import { FC, SVGProps, useState, useRef } from "react";
import { FLAG_ICON_LIST } from "@/constants/flags.constant";

type IconType = (typeof FLAG_ICON_LIST)[0];
interface FlagSelectorProps {
  value?: string;
  placeholder?: string;
  label?: string;
  onChange?: (value: string, data: IconType) => void;
}

const FlagSelector: React.FC<FlagSelectorProps> = ({ value, placeholder = "Chọn icon", label, onChange }) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const toggleDropdown = () => {
    setOpen((prev) => !prev);
  };
  useClickOutSide(dropdownRef, () => {
    setOpen(false);
  });
  const selectedItem = FLAG_ICON_LIST.find((item) => item.key === value);
  const isSelected = (iconKey: string) => {
    return iconKey === value;
  };
  const handleSelectItem = (value: string, data: IconType) => {
    onChange?.(value, data);
    setOpen(false);
  };
  return (
    <div className="icon-selector relative" ref={dropdownRef}>
      <div className="icon-selector__value h-[32px] border rounded-[4px] flex items-center justify-between border-[#d9d9d9]">
        <span className="px-[11px] flex justify-between w-full leading-[30px]" onClick={toggleDropdown}>
          {selectedItem ? (
            <span className="flex items-center flex-1">
              <selectedItem.icon width={16} height={16} className="mr-2" />
              <span>{selectedItem.name}</span>
            </span>
          ) : (
            <span className="text-gray-300 flex-1">{placeholder}</span>
          )}
          <span className="text-gray-300">
            <DownOutlined width={14} height={14} />
          </span>
        </span>
      </div>
      {open ? (
        <div className="icon-selector__dropdown w-full absolute z-40">
          <div className="icon-selector__dropdown--inner shadow-md rounded-md bg-white px-2 py-4 w-full max-h-[280px] overflow-y-auto">
            <div className="icon-selector__dropdown--list">
              {FLAG_ICON_LIST.map((item, _index) => (
                <div
                  className={classNames("icon-selector__item py-2 px-3 rounded-sm hover:bg-slate-100 cursor-pointer", {
                    "bg-slate-100": isSelected(item.key),
                  })}
                  key={_index}
                  onClick={() => (value !== item.key ? handleSelectItem(item.key, item) : null)}
                >
                  <span className="flex items-center">
                    <span className="mr-2">
                      <item.icon width={16} height={16} />
                    </span>
                    <span>{item.name}</span>
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};
export default FlagSelector;
