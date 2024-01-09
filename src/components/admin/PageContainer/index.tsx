import React, { useMemo, useState } from "react";
import { Breadcrumb, BreadcrumbProps } from "antd";
import TitleRow from "../TitleRow";
import classNames from "classnames";
import Link from "next/link";
import { LINKS } from "@/constants/links.constant";
interface Props {
    name: string;
    modelName?: string;
    render?: React.ReactNode;
    onClick?: () => void;
    onCanel?: () => void;
    onBack?: () => void;
    hideAddButton?: boolean;
    hideBreadcrumb?: boolean;
    breadCrumItems?: { title: string; href?: string }[];
    children?: React.ReactNode;
    className?: string;
}
const PageContainer: React.FC<Props> = ({
    name,
    render,
    onClick,
    onCanel,
    onBack,
    children,
    modelName = "",
    hideAddButton = false,
    hideBreadcrumb = false,
    className = "",
    breadCrumItems = [],
}) => {
    const items = useMemo(() => {
        return breadCrumItems.reduce<{ title: React.JSX.Element | string }[]>(
            (acc, item) => {
                if (item.href) {
                    acc = [
                        ...acc,
                        { title: <Link href={item.href}>{item.title}</Link> },
                    ];
                } else {
                    return [...acc, { title: item.title }];
                }
                return acc;
            },
            [{ title: <Link href={LINKS.DashBoard}>Dashboard</Link> }],
        );
    }, []);

    return (
        <div
            className={classNames("page-container h-full", {
                [className]: className,
            })}
        >
            <div className="page-head mb-6">
                <TitleRow
                    title={name}
                    onClickAdd={onClick}
                    onCanel={onCanel}
                    onBack={onBack}
                    className="mb-3"
                    modelName={modelName}
                    hideAddButton={hideAddButton}
                />
                {hideBreadcrumb ? null : <Breadcrumb items={items} />}
            </div>
            <div className="page-body" style={{ height: "calc(100% - 52px)" }}>
                {children ? children : null}
            </div>
        </div>
    );
};
export default PageContainer;
