"use client";
import React from "react";
import { Row, Col } from "antd";
import { useLocale } from "@/hooks/useLocale";
import MenuLinkType from "./_components/MenuLinkType";
import LocaleContainer from "@/components/admin/LocaleContainer";

interface Props {
    children: React.ReactNode;
}
const LayoutMenuPage: React.FC<Props> = ({ children }) => {
    const { locale, setLocale } = useLocale();

    return (
        <div className="menu-page">
            <div className="page-head mb-2">
                <h1 className="text-xl font-semibold">Quản lý Menu</h1>
            </div>
            <LocaleContainer
                selectedLocale={locale}
                onChangeLocale={(lc) => setLocale(lc)}
                className="border-b"
            />
            <Row className="page-body flex flex-wrap">
                <Col className="links-type w-80">
                    <MenuLinkType />
                </Col>
                <Col className="menus-container ml-8 flex-1">{children}</Col>
            </Row>
        </div>
    );
};
export default LayoutMenuPage;
