import { useClickOutSide } from "@/app/[locale]/hooks/useClickOutSide";
import { IconChevronDown } from "@/assets/icons";
import { localeDefault } from "@/constants/locale.constant";
import { LangCode, Locale } from "@/models/management/cms/language.interface";
import classNames from "classnames";

import { useRef, useState } from "react";

interface LanguageSwitcherProps {
    locales?: Locale[];
    langCode?: LangCode;
    className?: string;
    currentLocale?: Locale;
    onSelectLanguage?: (locale: Locale) => void;
}
const LanguageSelector: React.FC<LanguageSwitcherProps> = ({
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
            <div
                className="lang-item px-2 py-1 rounded-sm hover:bg-slate-100 cursor-pointer"
                onClick={() => setShowDropdown((prev) => !prev)}
            >
                {currentLocale ? (
                    <span className="flex items-center justify-center">
                        <span className="inline-block mr-2">
                            <currentLocale.icon width={20} height={20} />
                        </span>
                        <span className="inline-flex items-center">
                            <span className="mr-1"> {currentLocale.name}</span>
                            <span className="inline-block leading-none">
                                <IconChevronDown width={14} height={14} />
                            </span>
                        </span>
                    </span>
                ) : null}
            </div>
            {showDropdown && locales && locales.length ? (
                <div
                    className="lang-dropdown absolute z-10 right-0"
                    ref={dropdownRef}
                >
                    <div className="dropdown-inner bg-white rounded-md drop-shadow-lg w-36 py-2">
                        {locales.map((lc) => (
                            <div
                                key={lc.key}
                                className="px-4 py-2 hover:bg-slate-100 cursor-pointer"
                                onClick={() => onSelectLanguage?.(lc)}
                            >
                                <span className="flex items-center">
                                    <span className="inline-block mr-2">
                                        <lc.icon width={20} height={20} />
                                    </span>
                                    <span>{lc.name}</span>
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            ) : null}
        </div>
    );
};
export default LanguageSelector;
