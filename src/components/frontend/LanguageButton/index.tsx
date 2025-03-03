"use client";
import { useClickOutSide } from "@/hooks/fe/useClickOutSide";
import { localeDefault } from "@/constants/locale.constant";
import { LangCode, Locale } from "@/models/management/cms/language.interface";
import classNames from "classnames";

import { useRef, useState } from "react";
import { Button, Drawer } from "antd";

export interface LanguageButtonProps {
  locales?: Locale[];
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
  locales,
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
          hideLabel={hideLabel}
          locales={locales}
          currentLocale={currentLocale}
          onClick={onSelectLanguage}
        />
      ) : (
        <LanguageButton.Drawer
          hideLabel={hideLabel}
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
  locales?: Locale[];
  onClick?: (locale: Locale) => void;
  currentLocale?: Locale;
  hideLabel?: boolean;
}
LanguageButton.Dropdown = function LanguageButtonDropdown({
  locales,
  onClick,
  currentLocale,
  hideLabel,
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
          className="!inline-flex items-center justify-center"
        >
          {hideLabel ? null : <span>{currentLocale.name}</span>}
        </Button>
      ) : (
        "--"
      )}
      {showDropdown && locales && locales.length ? (
        <div className="lang-dropdown absolute z-10 right-0" ref={dropdownRef}>
          <ul className="dropdown-inner bg-white rounded-md drop-shadow-lg w-36 p-3">
            {locales.map((lc) => (
              <li
                key={lc.key}
                className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 rounded-md cursor-pointer"
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
  locales?: Locale[];
  onClick?: (locale: Locale) => void;
  currentLocale?: Locale;
  hideLabel?: boolean;
}
LanguageButton.Drawer = function LanguageButtonDrawer({
  locales,
  onClick,
  currentLocale,
  hideLabel,
}: LanguageButtonDrawerProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      {currentLocale ? (
        <Button
          type="text"
          icon={<currentLocale.icon className="w-5 h-5" />}
          onClick={() => setOpen((prev) => !prev)}
          className="!inline-flex items-center justify-center"
        >
          {hideLabel ? null : <span>{currentLocale.name}</span>}
        </Button>
      ) : (
        "--"
      )}
      <Drawer title="Chọn ngôn ngữ" open={open} onClose={() => setOpen(false)}>
        <ul className="language-list flex flex-col gap-y-1">
          {locales?.map((lc) => (
            <li
              key={lc.key}
              className={classNames("flex items-center gap-2 px-3 py-2 hover:bg-gray-100 rounded-md cursor-pointer", {
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
