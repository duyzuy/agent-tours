import React, { useEffect, useState, memo, useCallback } from "react";
import { Flex, Typography, Button } from "antd";
import classNames from "classnames";
import { CloseOutlined, PlusCircleOutlined } from "@ant-design/icons";

import { Locale, LangCode } from "@/models/management/cms/language.interface";
import { locales } from "@/constants/locale.constant";
import ModalLanguageSwitchConfirm from "./ModalLanguageSwitchConfirm";
import ModalLanguageList, { ModalLanguageListProps } from "./ModalLanguageList";
export interface LocaleContainerProps {
  onChange?: (locale?: Locale) => void;
  defaultValue?: Locale;
  value?: Locale;
  langCodes?: LangCode[];
  className?: string;
  label?: string;
  mode?: "list" | "tabs";
  showConfirmBeforeChange?: boolean;
  hideAddmoreLang?: boolean;
}
const LocaleContainer: React.FC<LocaleContainerProps> = ({
  onChange,
  value,
  defaultValue,
  langCodes = [],
  className = "",
  label = "Ngôn ngữ",
  mode = "tabs",
  showConfirmBeforeChange = false,
  hideAddmoreLang = false,
}) => {
  const [showModal, setShowModal] = useState<{
    isShow: boolean;
    temp?: Locale;
    action?: "change" | "add";
  }>({ isShow: false, temp: undefined });
  const [showLangList, setShowLangList] = useState(false);
  const [selectedList, setSelectedList] = useState<Locale[]>([]);
  const [currentLocale, setCurrentLocale] = useState<Locale>();

  const onCancel = () => setShowModal({ isShow: false, temp: undefined });

  const onChangeLocale = (lc: Locale) => {
    /**
     * Compare two data
     */
    if (showConfirmBeforeChange) {
      setShowModal({ isShow: true, temp: lc, action: "change" });
    } else {
      onChange?.(lc);
      setCurrentLocale(lc);
    }
  };

  const onConfirmChangeLocale = () => {
    const locale = showModal.temp;
    const action = showModal.action;
    if (locale) {
      onChange?.(locale);
      setCurrentLocale(locale);
      action === "add" && setSelectedList((oldData) => [...oldData, locale]);
    }
    setShowModal({ isShow: false, temp: undefined, action: undefined });
  };
  const onCloseLangList = useCallback(() => setShowLangList(false), []);

  const onAddLang: ModalLanguageListProps["onAdd"] = (lang) => {
    if (showConfirmBeforeChange) {
      setShowModal({ isShow: true, temp: lang, action: "add" });
    } else {
      setSelectedList((oldData) => [...oldData, lang]);
      onChange?.(lang);
      setCurrentLocale(lang);
    }
    onCloseLangList();
  };
  const onRemoveLangItem = (langCode: LangCode) => {
    setSelectedList((oldList) => {
      let newList = [...oldList];
      const indexItem = oldList.findIndex((item) => item.key === langCode);
      if (indexItem !== -1) {
        newList.splice(indexItem, 1);
      }
      return newList;
    });
    if (value?.key === langCode) {
      onChange?.(undefined);
    }
  };
  const hasExistsInLangCodes = (langCode: LangCode) => {
    return (langCodes || []).includes(langCode);
  };

  useEffect(() => {
    setSelectedList((prev) => {
      let langItems = langCodes.reduce<Locale[]>((acc, code) => {
        const indexLc = locales.findIndex((item) => item.key === code);
        if (indexLc !== -1) {
          acc = [...acc, locales[indexLc]];
        }
        return acc;
      }, []);
      if (defaultValue && langItems.every((item) => item.key !== defaultValue.key)) {
        langItems = [...langItems, defaultValue];
      }

      return [...langItems];
    });
  }, [langCodes.length, defaultValue]);
  useEffect(() => {
    defaultValue && setCurrentLocale(defaultValue);
  }, [defaultValue]);

  return (
    <React.Fragment>
      <Flex
        gap="small"
        align="flex-center"
        className={classNames("py-3 mb-3 items-center", {
          [className]: className,
        })}
      >
        <Typography.Text className="mb-0">{label}</Typography.Text>
        {mode === "list" ? (
          locales.map((lc) => (
            <div
              className={classNames("border rounded-sm px-3 py-1 cursor-pointer", {
                "border-primary-default text-primary-default": lc.key === currentLocale?.key,
                "opacity-60": lc.key !== currentLocale?.key,
              })}
              key={lc.key}
              onClick={() => lc.key !== currentLocale?.key && onChangeLocale(lc)}
            >
              <div className="flex items-center">
                <lc.icon className="w-5 h-5 mr-2" />
                {lc.shortName}
              </div>
            </div>
          ))
        ) : (
          <>
            {selectedList.map((lc) => (
              <div
                className={classNames("border rounded-sm", {
                  "border-primary-default text-primary-default": lc.key === currentLocale?.key,
                  "opacity-60": lc.key !== currentLocale?.key,
                })}
                key={lc.key}
              >
                <div className="flex items-center">
                  <span
                    className="flex items-center px-3 py-1 cursor-pointer"
                    onClick={() => lc.key !== currentLocale?.key && onChangeLocale(lc)}
                  >
                    <lc.icon className="w-5 h-5 mr-2" />
                    {lc.shortName}
                  </span>
                  {!hasExistsInLangCodes(lc.key) ? (
                    <span
                      className="text-[10px] mr-3 cursor-pointer hover:bg-slate-100"
                      onClick={() => onRemoveLangItem(lc.key)}
                    >
                      <CloseOutlined />
                    </span>
                  ) : null}
                </div>
              </div>
            ))}
            {hideAddmoreLang ? null : (
              <Button
                className="rounded-sm"
                type="text"
                icon={<PlusCircleOutlined />}
                onClick={() => setShowLangList(true)}
                disabled={selectedList.length === locales.length}
              >
                Thêm ngôn ngữ
              </Button>
            )}
          </>
        )}
      </Flex>
      <ModalLanguageList
        open={showLangList}
        items={locales.filter((lc) => !selectedList.some((item) => item.key === lc.key))}
        onCancel={onCloseLangList}
        onAdd={onAddLang}
      />
      <ModalLanguageSwitchConfirm
        open={showModal.isShow}
        onCancel={onCancel}
        onOk={onConfirmChangeLocale}
        width={380}
      />
    </React.Fragment>
  );
};
export default memo(LocaleContainer);
