"use client";
import { useClickOutSide } from "@/hooks/fe/useClickOutSide";
import { localeDefault, locales } from "@/constants/locale.constant";
import { LangCode, Locale } from "@/models/management/cms/language.interface";
import classNames from "classnames";
import { useRef, useState } from "react";
import { Button, Drawer } from "antd";
import { IconChevronDown } from "@/assets/icons";

export interface LanguageButtonProps {
  langCode?: LangCode;
  className?: string;
  currentLocale?: Locale;
  onSelectLanguage?: (locale: Locale) => void;
  mode?: "dropdown" | "drawer";
  hideLabel?: boolean;
}
const LanguageButton = ({
  className = "",
  currentLocale = localeDefault,
  onSelectLanguage,
  mode = "dropdown",
  hideLabel = false,
}: LanguageButtonProps) => {
  return (
    <div
      className={classNames("language-switcher relative", {
        [className]: className,
      })}
    >
      {mode === "dropdown" ? (
        <LanguageButton.Dropdown
          label={currentLocale.shortName}
          hideLabel={hideLabel}
          locales={locales}
          currentLocale={currentLocale}
          onClick={onSelectLanguage}
        />
      ) : (
        <LanguageButton.Drawer
          hideLabel={hideLabel}
          label={currentLocale.shortName}
          locales={locales}
          currentLocale={currentLocale}
          onClick={onSelectLanguage}
        />
      )}
    </div>
  );
};
export default LanguageButton;

interface LanguageButtonDropdownProps {
  locales: Locale[];
  onClick?: (locale: Locale) => void;
  currentLocale?: Locale;
  hideLabel?: boolean;
  label: React.ReactNode | undefined;
}
LanguageButton.Dropdown = function LanguageButtonDropdown({
  locales,
  onClick,
  currentLocale,
  hideLabel,
  label,
}: LanguageButtonDropdownProps) {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  useClickOutSide(dropdownRef, () => setShowDropdown(false));
  return (
    <>
      {currentLocale ? (
        <Button
          type="text"
          icon={<currentLocale.icon className="w-5 h-5" />}
          onClick={() => setShowDropdown((prev) => !prev)}
          className="!inline-flex items-center justify-center hover:!bg-slate-100 !px-3 !rounded-full !py-2 !h-auto"
        >
          {hideLabel ? null : (
            <div className="flex items-center leading-none">
              <span>{label}</span> <IconChevronDown className="w-4 h-4 ml-1" />
            </div>
          )}
        </Button>
      ) : (
        "--"
      )}
      {showDropdown && locales.length ? (
        <div className="lang-dropdown absolute z-10 right-0" ref={dropdownRef}>
          <ul className="dropdown-inner bg-white border rounded-xl w-36 p-3">
            {locales.map((lc) => (
              <li
                key={lc.key}
                className="flex items-center gap-2 px-3 py-2 hover:bg-slate-100 rounded-xl cursor-pointer"
                onClick={() => onClick?.(lc)}
              >
                <lc.icon className="w-5 h-5" />
                <span>{lc.name}</span>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </>
  );
};

interface LanguageButtonDrawerProps {
  locales: Locale[];
  onClick?: (locale: Locale) => void;
  currentLocale?: Locale;
  hideLabel?: boolean;
  label: React.ReactNode | undefined;
}
LanguageButton.Drawer = function LanguageButtonDrawer({
  locales,
  onClick,
  currentLocale,
  hideLabel,
  label,
}: LanguageButtonDrawerProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      {currentLocale ? (
        <Button
          type="text"
          icon={<currentLocale.icon className="w-5 h-5" />}
          onClick={() => setOpen((prev) => !prev)}
          className="!inline-flex items-center justify-center hover:!bg-slate-100 !px-3"
        >
          {hideLabel ? null : (
            <div className="flex items-center leading-none">
              <span>{label}</span> <IconChevronDown className="w-4 h-4 ml-1" />
            </div>
          )}
        </Button>
      ) : (
        "--"
      )}
      <Drawer title="Chọn ngôn ngữ" open={open} onClose={() => setOpen(false)}>
        <ul className="language-list flex flex-col gap-y-1">
          {locales?.map((lc) => (
            <li
              key={lc.key}
              className={classNames("flex items-center gap-2 px-3 py-2 hover:bg-slate-100 rounded-md cursor-pointer", {
                "bg-gray-100": currentLocale?.key === lc.key,
              })}
              onClick={() => onClick?.(lc)}
            >
              <lc.icon className="w-5 h-5" />
              <span>{lc.name}</span>
            </li>
          ))}
        </ul>
      </Drawer>
    </>
  );
};
