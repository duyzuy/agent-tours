"use client";
import React from "react";
import { Row, Col } from "antd";
import MenuTypeContainer from "../_components/MenuTypeContainer";
import LocaleContainer, { LocaleContainerProps } from "@/components/admin/LocaleContainer";
import { LangCode } from "@/models/management/cms/language.interface";
import { locales } from "@/constants/locale.constant";

import { localeDefault } from "@/constants/locale.constant";

import useMenuManager from "../hooks/useMenuManager";
import { MenuPositionType } from "@/models/management/cms/menu.interface";

interface Props {
  children: React.ReactNode;
  params: { menuKey: MenuPositionType };
}

const LayoutMenuPage: React.FC<Props> = ({ children, params: { menuKey } }) => {
  const [menuManagerState, dispatch] = useMenuManager();

  const { locale } = menuManagerState;

  const onChangeLocale: LocaleContainerProps["onChange"] = (locale) => {
    locale && dispatch({ type: "SWITCH_LANGUAGE", payload: locale });
  };
  return (
    <div className="menu-page">
      <div className="page-head mb-2">
        <h1 className="text-xl font-semibold">Quản lý Menu</h1>
      </div>
      <LocaleContainer
        defaultValue={localeDefault}
        value={locale}
        hideAddmoreLang={true}
        langCodes={locales.reduce<LangCode[]>((acc, item) => {
          return [...acc, item.key];
        }, [])}
        onChange={onChangeLocale}
        className="border-b"
      />
      <Row className="page-body flex flex-wrap">
        <Col className="links-type w-80">
          <MenuTypeContainer locale={locale} menuPosition={menuKey} />
        </Col>
        <Col className="menus-container ml-8 flex-1">{children}</Col>
      </Row>
    </div>
  );
};
export default LayoutMenuPage;
