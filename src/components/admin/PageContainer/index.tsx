import React, { memo, PropsWithChildren, useMemo } from "react";
import { Breadcrumb, Button } from "antd";
import TitleRow from "../TitleRow";
import classNames from "classnames";
import Link from "next/link";
import { LINKS } from "@/constants/links.constant";
import { EditOutlined, PlusOutlined } from "@ant-design/icons";
interface PageContainerProps extends PropsWithChildren {
  name: string;
  modelName?: string;
  hideAddButton?: boolean;
  hideBreadcrumb?: boolean;
  breadCrumItems?: { title?: string; href?: string }[];
  children?: React.ReactNode;
  className?: string;
  onClick?: () => void;
  onEdit?: () => void;
  onBack?: () => void;
}
const PageContainer: React.FC<PageContainerProps> = ({
  name,
  children,
  modelName = "",
  hideAddButton = false,
  hideBreadcrumb = false,
  className = "",
  breadCrumItems = [],
  onClick,
  onEdit,
  onBack,
}) => {
  const items = useMemo(() => {
    return breadCrumItems.reduce<{ title?: React.JSX.Element | string }[]>(
      (acc, item) => {
        acc = item.href
          ? [...acc, { title: <Link href={item.href}>{item.title}</Link> }]
          : [...acc, { title: item.title }];
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
          between
          onBack={onBack}
          actions={
            <div className="mr-auto">
              {!hideAddButton && (
                <Button type="primary" icon={<PlusOutlined />} onClick={onClick} className="!shadow-none !border-none">
                  {`Thêm ${modelName}`}
                </Button>
              )}
              {onEdit && (
                <Button type="primary" size="small" ghost icon={<EditOutlined />} onClick={onEdit}>
                  {`Sửa ${modelName}`}
                </Button>
              )}
            </div>
          }
        />
      </div>
      <div className="page-body" style={{ height: "calc(100% - 62px)" }}>
        {children ? children : null}
      </div>
    </div>
  );
};
export default memo(PageContainer);
