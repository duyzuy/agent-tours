"use client";
import { IconChevronDown } from "@/assets/icons";
import { useTranslations } from "next-intl";
interface SummaryCardProps {
    label?: string;
    productPrice?: string;
    children?: React.ReactNode;
    open?: number;
    prefix?: () => React.ReactNode;
}
const SummaryCard: React.FC<SummaryCardProps> = ({
    label,
    productPrice,
    open,
    children,
    prefix,
}) => {
    const t = useTranslations("String");
    return (
        <div className="box-booking border lg:px-6 px-4 lg:py-3 py-2 mb-4 rounded-lg bg-white drop-shadow-sm">
            <div className="header py-3 flex items-center justify-between">
                <h3 className="font-semibold text-red-600 uppercase">
                    {label}
                </h3>
                <span>
                    <IconChevronDown />
                </span>
            </div>
            {productPrice ? (
                <div className="mb-3 py-2">
                    <span className="price block">
                        <span className="text-xs block">{t("justFrom")}</span>
                        <span className="text-red-600 font-semibold text-2xl block">
                            {productPrice}
                        </span>
                    </span>
                    <span className="amount inline-block">
                        <span className="text-xs block">
                            {t("productSummary.amountRemain", {
                                amount: open,
                            })}
                        </span>
                    </span>
                </div>
            ) : (
                <p className="text-red-600 font-semibold text-2xl mb-6">
                    {t("card.contact")}
                </p>
            )}
            {children}
            {!productPrice ? <p>{t("productSummary.emptyPrices")}</p> : null}
        </div>
    );
};
export default SummaryCard;
