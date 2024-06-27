"use client";
import { useTranslations } from "next-intl";

interface ProductHeaderProps {
    name?: string;
    tourCode?: string;
    children?: React.ReactNode;
}

const ProductHeader: React.FC<ProductHeaderProps> = ({
    name,
    tourCode,
    children,
}) => {
    const t = useTranslations("String");
    return (
        <div className="tour-content-head mb-6">
            {children}

            <p className="text-red-600 text-lg font-bold">
                {`${t("productSingle.tourCode")} #${tourCode}`}
            </p>
        </div>
    );
};
export default ProductHeader;
