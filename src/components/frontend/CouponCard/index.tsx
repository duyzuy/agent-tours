import { useTranslations } from "next-intl";
import classNames from "classnames";
import { memo } from "react";
import { IconCheck } from "@/assets/icons";
interface CouponCardProps {
    className?: string;
    onClick?: () => void;
    code?: string;
    price?: string;
    validFrom?: string;
    validTo?: string;
    isSelecting?: boolean;
}
const CouponCard: React.FC<CouponCardProps> = ({
    className = "",
    code,
    price,
    validTo,
    validFrom,
    isSelecting,
    onClick,
}) => {
    const t = useTranslations("String");
    return (
        <div
            className={classNames(
                "promocode-item border rounded-md bg-white relative overflow-hidden",
                {
                    [className]: className,
                    "border-emerald-500": isSelecting,
                },
            )}
        >
            <div className="promocode-item__inner relative flex">
                <div className="promocode-item__left w-16 flex items-center border-r border-dashed mr-3 px-3 py-2 bg-slate-50">
                    <span className="text-base -rotate-90 text-center whitespace-nowrap leading-none">
                        <span className="block text-[10px] text-gray-500 uppercase">
                            {t("promocodeItem.code")}
                        </span>
                        <span>{code}</span>
                    </span>
                </div>
                <div
                    className="promocode-item__right py-2 flex flex-1 justify-between items-center pr-3 cursor-pointer"
                    onClick={onClick}
                >
                    <div className="promocode-item__head flex-1 pr-3">
                        <div className="promocode-item__price">
                            <span className="mr-2 w-24 text-gray-500 text-xs block">
                                {t("promocodeItem.discountValue.label")}
                            </span>
                            <span className="text-red-600 font-[500]">
                                {price}
                            </span>
                        </div>
                        <div className="promocode-item__valid-date">
                            <span className="mr-2 w-24 text-gray-500 text-xs block">
                                {t("promocodeItem.expiredDate.label")}
                            </span>
                            <span className="promocode-item__valid-date-value">
                                {`${validFrom} - ${validTo}`}
                            </span>
                        </div>
                    </div>
                    <div className="promocode-item__actions">
                        <span
                            className={classNames(
                                "text-xs text-white border-2 w-6 h-6 rounded-full text-center flex items-center justify-center",
                                {
                                    "bg-emerald-400 border-emerald-400":
                                        isSelecting,
                                },
                            )}
                        >
                            {isSelecting ? (
                                <IconCheck width={16} height={16} />
                            ) : null}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default memo(CouponCard);
