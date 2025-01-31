import { useCallback } from "react";
import classNames from "classnames";
import { Empty, Spin } from "antd";
import IconEmptyBox from "@/assets/icons/IconEmptyBox";
import BoxService from "./BoxService";
import { useBookingSelector } from "@/store";
import { FeBookingInformation } from "@/store/booking/booking.type";
import useInitServiceList from "@/modules/fe/booking/passenger/useInitServiceList";
interface ServiceContainerProps {
  className?: string;
  passengerList?: FeBookingInformation["bookingInfo"]["passengers"];
  showService?: boolean;
  isCompletedPassengerInfo?: boolean;
  productId: number;
}

const ServiceContainer: React.FC<ServiceContainerProps> = ({ className = "", passengerList, productId }) => {
  const { isPending, services } = useInitServiceList(productId);

  const {
    bookingInfo: { bookingSsrWithPax },
  } = useBookingSelector();
  const getSelectedSSRItem = useCallback(
    (serviceItem: Exclude<typeof services, undefined>[number]) => {
      return bookingSsrWithPax?.filter((item) => {
        return (
          (item.stock && serviceItem.stock && item.stock.recId === serviceItem.stock.recId) ||
          (!item.stock && !serviceItem.stock && item.inventory.recId === serviceItem.inventory.recId)
        );
      });
    },
    [bookingSsrWithPax],
  );

  return (
    <div
      className={classNames("service-container-wraper", {
        [className]: className,
      })}
    >
      <div className="service-container-wraper__head mb-6 relative">
        <span className="w-1 h-4 block rounded-full bg-primary-default absolute -left-3 lg:-left-6 top-2"></span>
        <h3 className="text-xl font-[500]">Dịch vụ</h3>
      </div>
      <div className="service-container-wraper__body">
        {isPending ? (
          <Spin tip="Đang tải" size="small">
            <div className="bg-slate-100 rounded-full w-24 h-24 mx-auto"></div>
          </Spin>
        ) : !services || !services.length ? (
          <Empty image={<IconEmptyBox stroke="0" />} description="Hiện không có dịch vụ nào khả dụng." />
        ) : (
          <>
            {services.map((item, _index) => (
              <BoxService
                key={_index}
                item={item}
                serviceId={item.stock ? item.stock.recId : item.inventory.recId}
                passengerList={passengerList || []}
                selectedSSR={getSelectedSSRItem(item)}
                className="mb-3"
                // onAddService={addService}
              />
            ))}
          </>
        )}
      </div>
    </div>
  );
};
export default ServiceContainer;
