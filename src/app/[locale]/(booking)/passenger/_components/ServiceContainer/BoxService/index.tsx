import { useMemo, useState } from "react";
import { FeProductService } from "@/models/fe/serviceItem.interface";
import { moneyFormatVND } from "@/utils/helper";
import { IconChevronRight } from "@/assets/icons";
import { getLowestPriceService } from "@/utils/productService";
import DrawerServiceItem, { DrawerServiceItemProps } from "./DrawerServiceItem";
// import { FeBookingInformation } from "@/app/[locale]/(booking)/modules/booking.interface";
// import { IBookingSsrItemWithPax } from "@/app/[locale]/(booking)/modules/booking.interface";
// import useBookingServices, { UseBookingServicesProps } from "@/app/[locale]/(booking)/modules/useBookingServices";
// import useBookingSummary from "@/app/[locale]/(booking)/modules/useBookingSummary";
import { FeBookingInformation } from "@/store/booking/booking.type";
import useBookingSummary from "@/modules/fe/booking/useBookingSummary";
import useBookingServices from "@/modules/fe/booking/service/useBookingServices";
import classNames from "classnames";

interface BoxServiceProps {
  item: FeProductService;
  passengerList: FeBookingInformation["bookingInfo"]["passengers"];
  selectedSSR?: FeBookingInformation["bookingInfo"]["bookingSsrWithPax"];
  className?: string;
  serviceId: number;
}

const BoxService: React.FC<BoxServiceProps> = ({
  item,
  passengerList,
  serviceId,
  selectedSSR,

  className = "",
}) => {
  const [isOpenDrawer, setShowDrawer] = useState(false);

  const closeDrawer = () => {
    setShowDrawer(false);
  };
  const showDrawer = () => {
    setShowDrawer(true);
  };

  const { servicesBreakdown } = useBookingSummary();
  const { addService } = useBookingServices();

  const servicesBreakdownByServiceId = useMemo(() => {
    return servicesBreakdown && serviceId ? servicesBreakdown[serviceId] : undefined;
  }, [servicesBreakdown]);

  const defaultConfigItem = useMemo(() => {
    let lowestItem: FeProductService["configs"][number] | undefined;

    item.configs.forEach((config) => {
      if (!lowestItem && config.open > 0) {
        lowestItem = config;
      }
      if (lowestItem && config.adult < lowestItem.adult && config.open > 0) {
        lowestItem = config;
      }
    });
    return lowestItem;
  }, [item]);

  const serviceName = useMemo(() => {
    let nameStr = item.inventory.name;
    return item.stock ? nameStr.concat(" - ", item.stock.code) : nameStr;
  }, [item]);

  const handleAddBookingServiceItems: DrawerServiceItemProps["onConfirm"] = (configItems) => {
    configItems && addService(configItems, item.inventory, item.stock);
  };

  return (
    <>
      <div
        className={classNames("service-item", {
          [className]: className,
        })}
      >
        <div className="service-item__head py-3 px-4 border rounded-md">
          <div
            className="service-item__head-inner flex items-center justify-between cursor-pointer"
            onClick={showDrawer}
          >
            <div>
              <span className="block text-primary-default text-base">{serviceName}</span>
              {selectedSSR && selectedSSR.length ? (
                <div className="flex items-center mt-2">
                  <span className="block mr-2">Đã chọn</span>
                  <span className="text-white bg-emerald-600 text-xs w-5 h-5 text-center flex items-center justify-center rounded-full">
                    {selectedSSR.length}
                  </span>
                </div>
              ) : null}
            </div>
            <div className="service-item__head-left flex items-center">
              <span className="text-lg text-red-600 font-[500]">
                {moneyFormatVND(servicesBreakdownByServiceId ? servicesBreakdownByServiceId.subTotal : 0)}
              </span>
              <IconChevronRight className="ml-2" />
            </div>
          </div>
        </div>
      </div>
      <DrawerServiceItem
        serviceName={serviceName}
        priceConfigs={item.configs}
        open={isOpenDrawer}
        onClose={closeDrawer}
        passengers={passengerList}
        defaultPriceConfig={defaultConfigItem}
        selectedItems={selectedSSR}
        onConfirm={handleAddBookingServiceItems}
      />
    </>
  );
};
export default BoxService;
