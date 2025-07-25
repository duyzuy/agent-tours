"use client";
import classNames from "classnames";
import { useTranslations } from "next-intl";

interface ProductHeaderProps {
  name?: string;
  tourCode?: string;
  children?: React.ReactNode;
  className?: string;
}

const ProductHeader: React.FC<ProductHeaderProps> = ({ name, tourCode, children, className = "" }) => {
  const t = useTranslations("String");
  return (
    <div className={classNames("tour-content-head", className)}>
      {children}
      <p className="text-red-600 text-lg font-bold">{`${t("productSingle.tourCode")} #${tourCode}`}</p>
    </div>
  );
};
export default ProductHeader;
