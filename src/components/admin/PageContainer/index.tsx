import React, { useState } from "react";
import { Breadcrumb, BreadcrumbProps } from "antd";
import TitleRow from "../TitleRow";
import classNames from "classnames";
interface Props {
    name: string;
    modelName?: string;
    render?: React.ReactNode;
    onClick?: () => void;
    onCanel?: () => void;
    hideAddButton?: boolean;
    hideBreadcrumb?: boolean;
    breadCrumItems?: BreadcrumbProps["items"];
    children?: React.ReactNode;
    className?: string;
}
const PageContainer: React.FC<Props> = ({
    name,
    render,
    onClick,
    onCanel,
    children,
    modelName = "",
    hideAddButton = false,
    hideBreadcrumb = false,
    className = "",
    breadCrumItems = [],
}) => {
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
                    className="mb-3"
                    modelName={modelName}
                    hideAddButton={hideAddButton}
                />
                {hideBreadcrumb ? null : (
                    <Breadcrumb
                        items={[{ title: "Dashboard" }, ...breadCrumItems]}
                    />
                )}
            </div>
            <div className="page-body" style={{ height: "calc(100% - 52px)" }}>
                {children ? children : null}
            </div>
        </div>
    );
};
export default PageContainer;
