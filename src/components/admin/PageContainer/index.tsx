import React, { useState } from "react";
import TitleRow from "../TitleRow";
import classNames from "classnames";
interface Props {
    name: string;
    modelName?: string;
    render?: React.ReactNode;
    onClick?: () => void;
    hideAddButton?: boolean;
    children?: React.ReactNode;
    className?: string;
}
const PageContainer: React.FC<Props> = ({
    name,
    render,
    onClick,
    children,
    modelName = "",
    hideAddButton = false,
    className = "",
}) => {
    return (
        <div
            className={classNames("page-container h-full", {
                [className]: className,
            })}
        >
            <TitleRow
                title={name}
                onClickAdd={onClick}
                className="mb-6"
                modelName={modelName}
                hideAddButton={hideAddButton}
            />
            <div className="page-body" style={{ height: "calc(100% - 52px)" }}>
                {children ? children : null}
            </div>
        </div>
    );
};
export default PageContainer;
