import ProductSummaryWraper from "@/components/frontend/ProductSummaryWraper";
import { useTranslations } from "next-intl";
import PromotionSelector from "../PromotionSelector";
import { moneyFormatVND } from "@/utils/helper";
import { stringToDate } from "@/utils/date";
import { IconCalendarDays } from "@/assets/icons";
import QuantityInput from "@/components/frontend/QuantityInput";
import { PassengerType } from "@/models/common.interface";
import CalendarSelector from "../CalendarSelector";
import dayjs, { Dayjs } from "dayjs";
import { FeProductItem } from "@/models/fe/productItem.interface";
import useSetProductItemAndPaxQuantity from "@/app/[locale]/(booking)/modules/useSetProductItemAndPaxQuantity";
import { useBookingSelector } from "@/app/[locale]/hooks/useBookingInformation";

interface DesktopBoxSummaryProps {
  lowestPrice?: number;
  subtotal: number;
  lowestPriceConfigItem?: FeProductItem["configs"][0];
  couponPolicy?: FeProductItem["promotions"][0];
  promotions?: FeProductItem["promotions"];
  sellableDetails?: FeProductItem["sellableDetails"];
  durationDay?: number;
  startDate?: string;
  isLoading?: boolean;
  breakDownItems: {
    type: PassengerType;
    pricing: number;
    id: number;
    configClass: string;
  }[];
  onChangeProduct?: (value: dayjs.Dayjs | null, dateString: string) => void;
  onNext?: () => void;
  isInBookingDate: (d: Dayjs) => boolean;
}
const DesktopBoxSummary = ({
  onNext,
  onChangeProduct,
  lowestPrice,
  lowestPriceConfigItem,
  breakDownItems,
  couponPolicy,
  sellableDetails,
  durationDay,
  subtotal,
  isInBookingDate,
  startDate,
  isLoading,
  promotions,
}: DesktopBoxSummaryProps) => {
  const t = useTranslations("String");
  const { inventories } = sellableDetails || {};
  return (
    <ProductSummaryWraper
      label={t("productSummary.title")}
      productPrice={lowestPrice ? moneyFormatVND(lowestPrice) : undefined}
      openAmount={lowestPriceConfigItem?.open}
      onBookNow={onNext}
      isLoading={isLoading}
      breakDown={{
        pricingConfigs: breakDownItems,
        couponPolicy: couponPolicy && {
          code: couponPolicy.code,
          discountAmount: couponPolicy.discountAmount,
        },
        subtotal: moneyFormatVND(subtotal),
      }}
    >
      {promotions && promotions.length ? <PromotionSelector items={promotions} className="mb-6" /> : null}
      <CalendarSelector
        label={t("productSummary.departDate.title")}
        value={startDate ? stringToDate(startDate) : undefined}
        disabledDate={(date) => {
          if (isInBookingDate(date) && date.isAfter(dayjs())) {
            return false;
          }
          return true;
        }}
        onChange={onChangeProduct}
        className="mb-6"
      />
      {durationDay && (
        <div className="duration-day mb-6">
          <div className="flex items-center">
            <span className="mr-2">
              <IconCalendarDays width={20} height={20} />
            </span>
            <span>{`${durationDay} ngày ${durationDay - 1} đêm`}</span>
          </div>
        </div>
      )}
      {inventories && (
        <div className="includes mb-6">
          {inventories.map((inv) => (
            <div className="inv" key={inv.recId}>
              <div className="inv-inner">{inv.type}</div>
            </div>
          ))}
        </div>
      )}
      <DesktopBoxSummary.PassengerQuantity label={t("productSummary.passengerQuantity.title")} />
    </ProductSummaryWraper>
  );
};
export default DesktopBoxSummary;

interface DesktopBoxSummaryPassengerQuantityProps {
  label?: string;
}

DesktopBoxSummary.PassengerQuantity = function DesktopBoxSummaryPassengerQuantity({
  label,
}: DesktopBoxSummaryPassengerQuantityProps) {
  const t = useTranslations("String");
  const passenger = useBookingSelector((state) => state.bookingPassenger);
  const { setQuantityPassenger } = useSetProductItemAndPaxQuantity();

  return (
    <div className="passengers mb-6">
      <div className="label mb-3">
        <p>{label}</p>
      </div>
      <div className="select flex">
        <QuantityInput
          size="sm"
          label={t("adult")}
          value={passenger["adult"]}
          className="w-1/3"
          maximum={9}
          minimum={1}
          onChange={(action, value) =>
            setQuantityPassenger({ type: PassengerType.ADULT, quantity: value, action: action })
          }
        />
        <QuantityInput
          size="sm"
          label={t("children")}
          value={passenger["child"]}
          maximum={9}
          minimum={0}
          className="w-1/3"
          onChange={(action, value) =>
            setQuantityPassenger({ type: PassengerType.CHILD, quantity: value, action: action })
          }
        />
        <QuantityInput
          size="sm"
          label={t("infant")}
          value={passenger["infant"]}
          maximum={9}
          minimum={0}
          className="w-1/3"
          onChange={(action, value) =>
            setQuantityPassenger({ type: PassengerType.INFANT, quantity: value, action: action })
          }
        />
      </div>
    </div>
  );
};
