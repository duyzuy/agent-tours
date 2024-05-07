"use client";
import { useClickOutSide } from "@/app/[locale]/hooks/useClickOutSide";
import { IconChevronDown } from "@/assets/icons";
import { localeDefault, locales } from "@/constants/locale.constant";
import { LangCode, Locale } from "@/models/management/cms/language.interface";
import classNames from "classnames";
import { usePathname, useRouter } from "next/navigation";
import { useMemo, useRef, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
interface LanguageSwitcherProps {
    langCode?: LangCode;
    className?: string;
}
const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({
    className = "",
}) => {
    const queryClient = useQueryClient();
    // queryClient.getQueriesData("")
    const pathname = usePathname();
    const router = useRouter();
    const langCode = pathname.split("/")[1] as LangCode;
    const [showDropdown, setShowDropdown] = useState(false);

    const dropdownRef = useRef<HTMLDivElement>(null);

    const currentLocale = useMemo(() => {
        return locales.find((lc) => lc.key === langCode) || localeDefault;
    }, [locales]);

    const onSwitchLang = (locale: Locale) => {
        router.push(locale.key);
        setShowDropdown(false);
    };
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
            </div>
            {showDropdown ? (
                <div
                    className="lang-dropdown absolute z-10 right-0"
                    ref={dropdownRef}
                >
                    <div className="dropdown-inner bg-white rounded-md drop-shadow-lg w-36 py-2">
                        {locales.map((lc) => (
                            <div
                                key={lc.key}
                                className="px-4 py-2 hover:bg-slate-100 cursor-pointer"
                                onClick={() => onSwitchLang(lc)}
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
export default LanguageSwitcher;
