import { useClickOutSide } from "@/hooks/fe/useClickOutSide";
import { localeDefault } from "@/constants/locale.constant";
import { LangCode, Locale } from "@/models/management/cms/language.interface";
import classNames from "classnames";

import { useRef, useState } from "react";
import { Button } from "antd";

interface LanguageButtonProps {
  locales?: Locale[];
  langCode?: LangCode;
  className?: string;
  currentLocale?: Locale;
  onSelectLanguage?: (locale: Locale) => void;
}
const LanguageButton: React.FC<LanguageButtonProps> = ({
  className = "",
  currentLocale = localeDefault,
  onSelectLanguage,
  locales,
}) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useClickOutSide(dropdownRef, () => setShowDropdown(false));

  return (
    <div
      className={classNames("language-switcher relative", {
        [className]: className,
      })}
    >
      {currentLocale ? (
        <Button
          type="text"
          icon={<currentLocale.icon className="w-5 h-5" />}
          onClick={() => setShowDropdown((prev) => !prev)}
          className="!px-3 !inline-flex items-center"
        >
          <span>{currentLocale.name}</span>
        </Button>
      ) : null}
      {showDropdown && locales && locales.length ? (
        <div className="lang-dropdown absolute z-10 right-0" ref={dropdownRef}>
          <ul className="dropdown-inner bg-white rounded-md drop-shadow-lg w-36 p-3">
            {locales.map((lc) => (
              <li
                key={lc.key}
                className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 rounded-md cursor-pointer"
                onClick={() => onSelectLanguage?.(lc)}
              >
                <lc.icon className="w-5 h-5" />
                <span>{lc.name}</span>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
};
export default LanguageButton;
