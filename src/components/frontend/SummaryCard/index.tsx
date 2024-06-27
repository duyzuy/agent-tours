"use client";
import { IconChevronDown } from "@/assets/icons";
import { useTranslations } from "next-intl";
import { IConTicketPercent } from "@/assets/icons";
import classNames from "classnames";
interface SummaryCardProps {
    label?: string;
    productPrice?: string;
    children?: React.ReactNode;
    open?: number;
    prefix?: () => React.ReactNode;
    onSelectPromotion?: () => void;
    promotions?: {
        name?: string;
        code?: string;
        price?: string;
        validFrom?: string;
        validTo?: string;
    }[];
}
const SummaryCard: React.FC<SummaryCardProps> = ({
    label,
    productPrice,
    open,
    children,
    prefix,
    promotions,
    onSelectPromotion,
}) => {
    const t = useTranslations("String");
    return (
        <div className="box-booking border lg:px-6 px-4 lg:py-3 py-2 mb-4 rounded-md bg-white drop-shadow-sm">
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
                    <div className="pricing mb-3">
                        <div className="price block">
                            <span className="text-xs block">
                                {t("justFrom")}
                            </span>
                            <span className="text-red-600 font-semibold text-2xl block">
                                {productPrice}
                            </span>
                        </div>
                        <div className="amount inline-block">
                            <span className="text-xs block">
                                {t("productSummary.amountRemain", {
                                    amount: open,
                                })}
                            </span>
                        </div>
                    </div>
                    {promotions?.length ? (
                        <div className="card-promocode">
                            <div className="card-promocode-label mb-2">
                                <span className="flex items-center text-emerald-600 bg-emerald-50 w-fit px-2 py-1 rounded-md">
                                    <IConTicketPercent className="w-4 h-4 mr-1" />
                                    <span>{t("promoCode")}</span>
                                </span>
                            </div>
                            <div className="card-promocode-items">
                                {promotions.map((promo, _index) => (
                                    <div
                                        className={classNames(
                                            "promocode-item border rounded-md bg-white relative overflow-hidden",
                                            {
                                                "mt-3": _index !== 0,
                                            },
                                        )}
                                        key={_index}
                                    >
                                        <div className="promocode-item__inner relative flex">
                                            <div className="promocode-item__left w-16 flex items-center border-r border-dashed mr-3 px-3 py-2 bg-slate-50">
                                                <span className="text-base -rotate-90 text-center whitespace-nowrap leading-none">
                                                    <span className="block text-[10px] text-gray-500 uppercase">
                                                        {t(
                                                            "promocodeItem.code",
                                                        )}
                                                    </span>
                                                    <span>{promo?.code}</span>
                                                </span>
                                            </div>
                                            <div className="promocode-item__right py-2 flex flex-1 justify-between items-center pr-3">
                                                <div className="promocode-item__head flex-1 pr-3">
                                                    <div className="promocode-item__price">
                                                        <span className="mr-2 w-24 text-gray-500 text-xs block">
                                                            {t(
                                                                "promocodeItem.discountValue.label",
                                                            )}
                                                        </span>
                                                        <span className="text-red-600 font-[500]">
                                                            {promo?.price}
                                                        </span>
                                                    </div>
                                                    <div className="promocode-item__valid-date">
                                                        <span className="mr-2 w-24 text-gray-500 text-xs block">
                                                            {t(
                                                                "promocodeItem.expiredDate.label",
                                                            )}
                                                        </span>
                                                        <span className="promocode-item__valid-date-value">
                                                            {`${promo?.validFrom} - ${promo?.validTo}`}
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="promocode-item__actions">
                                                    <span
                                                        className="px-2 py-1 text-xs rounded-sm bg-emerald-400 text-white cursor-pointer"
                                                        onClick={
                                                            onSelectPromotion
                                                        }
                                                    >
                                                        {t("button.select")}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : null}
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
