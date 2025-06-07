import { memo, useEffect, useMemo, useState } from "react";
import { Button, Drawer } from "antd";
import styled from "styled-components";
import { useTranslations } from "next-intl";
import { usePathname } from "@/utils/navigation";
import { moneyFormatVND } from "@/utils/helper";
import { ProductSummaryCardCompound, useProductSummaryCard } from ".";

const ProductSummaryDrawer: ProductSummaryCardCompound["Drawer"] = ({ children }) => {
  const { productItem, onNext, isLoading } = useProductSummaryCard();

  const pathName = usePathname();
  const t = useTranslations("String");

  const lowestConfig = useMemo(() => {
    if (!productItem || !productItem.configs || !productItem.configs.length) return;

    const { configs } = productItem;

    let output = configs[0];

    configs.forEach((item) => {
      if (output.open <= 0 && item.open > 0) {
        output = item;
      }
      if (item.open > 0 && item.adult < output.adult) {
        output = item;
      }
    });
    return output;
  }, [productItem]);
  const [isOpenDrawer, setOpenDrawer] = useState(false);

  const closeDrawer = () => {
    setOpenDrawer(false);
  };
  const openDrawer = () => {
    setOpenDrawer(true);
  };
  useEffect(() => {
    setOpenDrawer(false);
  }, [pathName]);
  return (
    <>
      <div
        className="mb-box-summary-booking__head fixed z-30 left-0 right-0 bottom-0 bg-white border-t"
        style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      >
        {lowestConfig ? (
          <div className="flex items-center px-4 py-3">
            <div className="price block w-1/2">
              <span className="text-xs block">{t("justFrom")}</span>
              <span className="text-red-600 font-semibold text-lg block">{moneyFormatVND(lowestConfig.adult)}</span>
            </div>
            <div className="buttons w-1/2">
              <Button type="primary" block className="bg-primary-default w-full" onClick={openDrawer} size="large">
                {t("button.bookNow")}
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex items-center px-3 gap-3 py-2">
            <div className="text-xs">
              <p>Hiện chưa có mức giá bán cho tour khởi hành ngày này.</p>
            </div>
            <Button type="primary" onClick={openDrawer} size="large">
              Chọn ngày khác
            </Button>
          </div>
        )}
      </div>
      <DrawerBookingSummary
        open={isOpenDrawer}
        placement="bottom"
        height={"calc(80vh - env(safe-area-inset-bottom))"}
        push={false}
        destroyOnClose={true}
        closeIcon={null}
        onClose={closeDrawer}
        footer={
          <div className="flex gap-x-3 py-3">
            <Button type="text" size="large" className="!bg-gray-100 !text-gray-600 flex-1" onClick={closeDrawer}>
              Huỷ bỏ
            </Button>
            <Button
              type="primary"
              block
              className="bg-primary-default flex-1"
              onClick={onNext}
              size="large"
              loading={isLoading}
            >
              {t("button.bookNow")}
            </Button>
          </div>
        }
      >
        {children}
      </DrawerBookingSummary>
    </>
  );
};
const DrawerBookingSummary = styled(Drawer)`
  &.travel-drawer-content {
    border-radius: 10px 10px 0 0;
    .travel-drawer-body {
      padding: 16px;
    }
  }
`;

export default memo(ProductSummaryDrawer);
