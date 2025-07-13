import { Button } from "antd";
import { useTranslations } from "next-intl";
import { ProductSummaryCardCompound, useProductSummaryCard } from ".";
import { memo } from "react";

const ButtonBookNow: ProductSummaryCardCompound["SubmitButton"] = ({ className = "" }) => {
  const t = useTranslations("String");
  const { onNext, isLoading } = useProductSummaryCard();
  return (
    <Button
      type="primary"
      block
      className="bg-primary-default !h-[50px] !rounded-xl !font-[500] !text-[1.15rem] uppercase"
      onClick={onNext}
      size="large"
      loading={isLoading}
    >
      {t("button.bookNow")}
    </Button>
  );
};
export default memo(ButtonBookNow);
