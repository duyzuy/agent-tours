import React, { useMemo } from "react";
import { Breadcrumb } from "antd";
import TitleRow from "../TitleRow";
import classNames from "classnames";
import Link from "next/link";
import { LINKS } from "@/constants/links.constant";
interface Props {
  name: string;
  modelName?: string;
  render?: React.ReactNode;
  onClick?: () => void;
  onEdit?: () => void;
  onCanel?: () => void;
  onBack?: () => void;
  hideAddButton?: boolean;
  hideBreadcrumb?: boolean;
  breadCrumItems?: { title?: string; href?: string }[];
  children?: React.ReactNode;
  className?: string;
}
const PageContainer: React.FC<Props> = ({
  name,
  render,
  onClick,
  onEdit,
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
    return breadCrumItems.reduce<{ title?: React.JSX.Element | string }[]>(
      (acc, item) => {
        if (item.href) {
          acc = [...acc, { title: <Link href={item.href}>{item.title}</Link> }];
        } else {
          return [...acc, { title: item.title }];
        }
        return acc;
      },
      [{ title: <Link href={LINKS.DashBoard}>Dashboard</Link> }],
    );
  }, [breadCrumItems]);

  return (
    <div
      className={classNames("page-container h-full", {
        [className]: className,
      })}
    >
      <div className="page-head mb-6">
        {hideBreadcrumb ? null : <Breadcrumb items={items} className="!mb-6" />}
        <TitleRow
          title={name}
          onClickAdd={onClick}
          onCanel={onCanel}
          onBack={onBack}
          onEdit={onEdit}
          modelName={modelName}
          hideAddButton={hideAddButton}
        />
      </div>
      <div className="page-body" style={{ height: "calc(100% - 62px)" }}>
        {children ? children : null}
      </div>
    </div>
  );
};
export default PageContainer;
