"use client";
import { useTranslations } from "next-intl";
import classNames from "classnames";
import { formatDate } from "@/utils/date";
import { Tag } from "antd";

interface TourCardInformationProps {
  className?: string;
  tourCode: string;
  startDate: string | undefined;
  openAmount: number | undefined;
  otherDepartDate: string[];
}
const TourCardInformation: React.FC<TourCardInformationProps> = ({
  tourCode,
  startDate,
  openAmount,
  otherDepartDate,
}) => {
  const t = useTranslations("String");
  return (
    <div className="tour-card__info-list grid lg:grid-cols-3 gap-2">
      <InformationItem label={t("card.tourCode")} value={tourCode} />
      <InformationItem
        label={t("card.departDate")}
        value={<>{startDate ? formatDate(startDate, "MM/DD/YYYY") : null}</>}
      />
      <InformationItem
        label={t("card.amountRemaining")}
        value={<span className="text-red-600">{openAmount?.toString()}</span>}
      />
      <InformationItem
        label={t("card.otherDepart")}
        value={
          <>
            {otherDepartDate?.length ? (
              <div className="flex-1 w-full pt-2">
                {otherDepartDate.map((departStr, _index) => (
                  <Tag key={_index} className="text-xs !rounded-full !mr-1" color="blue" bordered={false}>
                    {departStr}
                  </Tag>
                ))}
              </div>
            ) : (
              <span className="text-xs">--</span>
            )}
          </>
        }
        className="col-span-3"
      />
    </div>
  );
};
export default TourCardInformation;

interface TourCardInfoItemProps {
  className?: string;
  label: string;
  value?: React.ReactNode;
}
function InformationItem({ label, value, className = "" }: TourCardInfoItemProps) {
  return (
    <div className={classNames(className)}>
      <div className="text-gray-500 block text-[10px] lg:text-xs">{label}</div>
      <div className="text-gray-800 text-[13px] lg:text-sm">{value}</div>
    </div>
  );
}
