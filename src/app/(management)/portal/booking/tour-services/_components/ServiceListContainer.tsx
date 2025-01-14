import { useRouter } from "next/navigation";
import { Button, Space, Spin, Tabs } from "antd";
import { useGetBookingTourServicesCoreQuery } from "@/queries/core/bookingOrder";
import useTourServiceAddOn from "../../modules/servies/useAddOnService";
import {
  IProductTourBookingItem,
  IProductServiceBookingItem,
  IProductServiceBookingItemWithoutPax,
} from "../../modules/bookingInformation.interface";
import BoxServiceItemByPax, { BoxServiceItemByPaxProps } from "./BoxServiceItemByPax";
import BoxServiceItemNoPax, { BoxServiceItemNoPaxProps } from "./BoxServiceItemNoPax";
import { useTransition } from "react";

export interface ServiceListContainerProps {
  sellableId: number;
  bookingItems: IProductTourBookingItem[];
  bookingSsrWithPax?: IProductServiceBookingItem[];
  bookingSsr?: IProductServiceBookingItemWithoutPax[];
}
const ServiceListContainer: React.FC<ServiceListContainerProps> = ({
  sellableId,
  bookingItems,
  bookingSsrWithPax,
  bookingSsr,
}) => {
  const [isInitGotoNext, startGotoNext] = useTransition();
  const { onAddServiceByPax, onAddServiceNoPax } = useTourServiceAddOn();

  const { data: serviceList, isLoading } = useGetBookingTourServicesCoreQuery({
    enabled: !!sellableId,
    sellableId: sellableId,
  });

  const router = useRouter();

  const onChangeQuantity: BoxServiceItemByPaxProps["onChangeQuantity"] = (data) => {
    onAddServiceByPax(data.action, data.qty, data.bookingIndex, data.configItem, data.serviceItem, data.type);
  };

  const onChangeQuantityWithoutPax: BoxServiceItemNoPaxProps["onChangeQuantity"] = (data) => {
    onAddServiceNoPax(data.action, data.qty, data.configItem, data.serviceItem);
  };

  const handleGotoNext = () => {
    startGotoNext(() => router.push("/portal/booking/payment"));
  };
  if (isLoading) {
    return <Spin />;
  }

  return (
    <div className="bg-white rounded-mb p-4">
      <Tabs
        size="large"
        items={[
          {
            label: "Dịch vụ theo khách",
            key: "serviceWithPax",
            children: (
              <>
                {serviceList?.map((serviceItem) => (
                  <BoxServiceItemByPax
                    key={`${serviceItem.inventory.recId}${serviceItem.stock?.recId ? serviceItem.stock?.recId : ""}`}
                    serviceName={`${serviceItem.inventory.name}${
                      serviceItem.stock ? ` - ${serviceItem.stock.code}` : ""
                    }`}
                    serviceItem={serviceItem}
                    bookingItems={bookingItems}
                    consfigItems={serviceItem.configs}
                    selectedItems={bookingSsrWithPax}
                    onChangeQuantity={onChangeQuantity}
                  />
                ))}
              </>
            ),
          },
          {
            label: "Dịch vụ không theo khách",
            key: "serviceNoPax",
            children: (
              <>
                {serviceList?.map((serviceItem) => (
                  <BoxServiceItemNoPax
                    key={`${serviceItem.inventory.recId}${serviceItem.stock?.recId ? serviceItem.stock?.recId : ""}`}
                    serviceName={`${serviceItem.inventory.name}${
                      serviceItem.stock ? ` - ${serviceItem.stock.code}` : ""
                    }`}
                    serviceItem={serviceItem}
                    consfigItems={serviceItem.configs}
                    selectedItems={bookingSsr}
                    onChangeQuantity={onChangeQuantityWithoutPax}
                  />
                ))}
              </>
            ),
          },
        ]}
      />
      {/* <div className="text-right">
        <Space align="end">
          <Button type="primary" ghost onClick={() => router.back()}>
            Nhập thông tin khách
          </Button>
          <Button type="primary" loading={isInitGotoNext} onClick={handleGotoNext}>
            Tiến hành đặt chỗ
          </Button>
        </Space>
      </div> */}
    </div>
  );
};
export default ServiceListContainer;

const getPassengerFullname = ({ middleAndFirstName, lastName }: { middleAndFirstName?: string; lastName?: string }) => {
  return `${lastName}, ${middleAndFirstName}`;
};
