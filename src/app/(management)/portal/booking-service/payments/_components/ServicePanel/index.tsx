import { useCallback, useMemo, useTransition } from "react";
import { Button, Empty, Spin, Tabs } from "antd";
import { isUndefined } from "lodash";
import styled from "styled-components";

import { usePortalBookingManager } from "../../../modules/store/bookingServiceContext";
import { useGetBookingTourServicesCoreQuery } from "@/queries/core/bookingOrder";
import useAddOnService from "../../../modules/servies/useAddOnService";
import BoxServiceItemByPax, { BoxServiceItemByPaxProps } from "./BoxServiceItemByPax";
import BoxServiceItemNoPax, { BoxServiceItemNoPaxProps } from "./BoxServiceItemNoPax";
import { ArrowRightOutlined } from "@ant-design/icons";
import { ESellChannel } from "@/constants/channel.constant";
import { IProductService } from "@/models/management/booking/service.interface";

import { PortalBookingManagerFormData } from "../../../modules/bookingInformation.interface";
interface ServicePanelProps {
  sellableId?: number;
  bookingItems: PortalBookingManagerFormData["bookingInfo"]["bookingItems"];
  onNext?: () => void;
}
const ServicePanel: React.FC<ServicePanelProps> = ({ sellableId, bookingItems, onNext }) => {
  const [bookingInformation, _] = usePortalBookingManager();
  const { channel } = bookingInformation;
  const [isTransition, startTransition] = useTransition();
  const { onAddServiceByPax, onAddServiceNoPax } = useAddOnService();
  const { data: serviceList, isLoading } = useGetBookingTourServicesCoreQuery({
    enabled: !isUndefined(sellableId),
    sellableId: sellableId,
  });
  const bookingSsrWithPax = useMemo(() => {
    return bookingInformation.bookingInfo?.bookingSsrWithPax;
  }, [bookingInformation]);

  const bookingSsr = useMemo(() => {
    return bookingInformation.bookingInfo?.bookingSsr;
  }, [bookingInformation]);

  const filterPriceConfigListByChannel = useCallback(
    (configs: IProductService["configs"]) => {
      return configs?.filter(
        (item) =>
          (channel === ESellChannel.B2B && item.channel === "AGENT") ||
          (channel === ESellChannel.B2C && item.channel === "CUSTOMER"),
      );
    },
    [channel, serviceList],
  );

  const onChangeQuantity: BoxServiceItemByPaxProps["onChangeQuantity"] = (data) => {
    onAddServiceByPax(data.action, data.qty, data.bookingIndex, data.configItem, data.serviceItem, data.type);
  };

  const onChangeQuantityWithoutPax: BoxServiceItemNoPaxProps["onChangeQuantity"] = (data) => {
    onAddServiceNoPax(data.action, data.qty, data.configItem, data.serviceItem);
  };
  const handleGoNext = () => {
    onNext && startTransition(onNext);
  };

  return (
    <>
      <div className="mb-3">
        <h3 className="font-[500] text-lg">Mua thêm dịch vụ</h3>
        <p>Các dịch vụ có thể mua theo cả hai lựa chọn bên dưới.</p>
      </div>
      {isLoading ? (
        <Spin />
      ) : !serviceList || !serviceList.length ? (
        <Empty description="Không có dịch vụ nào khả dụng." />
      ) : (
        <TabStyled
          items={[
            {
              label: "Thêm dịch vụ theo khách",
              key: "serviceWithPax",
              children: serviceList?.map((serviceItem, _index) => (
                <BoxServiceItemByPax
                  key={`${serviceItem.inventory.recId}${serviceItem.stock?.recId ? serviceItem.stock?.recId : _index}`}
                  serviceName={`${serviceItem.inventory.name}${
                    serviceItem.stock ? ` - ${serviceItem.stock.code}` : ""
                  }`}
                  serviceItem={serviceItem}
                  bookingItems={bookingItems}
                  consfigItems={filterPriceConfigListByChannel(serviceItem.configs)}
                  selectedItems={bookingSsrWithPax}
                  onChangeQuantity={onChangeQuantity}
                />
              )),
            },
            {
              label: "Thêm dịch vụ",
              key: "serviceNoPax",
              children: serviceList?.map((serviceItem, _index) => (
                <BoxServiceItemNoPax
                  key={`${serviceItem.inventory.recId}${serviceItem.stock?.recId ? serviceItem.stock?.recId : _index}`}
                  serviceName={`${serviceItem.inventory.name}${
                    serviceItem.stock ? ` - ${serviceItem.stock.code}` : ""
                  }`}
                  serviceItem={serviceItem}
                  consfigItems={filterPriceConfigListByChannel(serviceItem.configs)}
                  selectedItems={bookingSsr}
                  onChangeQuantity={onChangeQuantityWithoutPax}
                />
              )),
            },
          ]}
        />
      )}
      <div className="text-right">
        <Button type="primary" ghost size="large" onClick={handleGoNext} loading={isTransition} className="w-36">
          <span>
            Đi tiếp <ArrowRightOutlined classID="ml-2" />
          </span>
        </Button>
      </div>
    </>
  );
};
export default ServicePanel;

const TabStyled = styled(Tabs)`
  .travel-tabs-content-holder {
    padding: 0 !important;
  }
`;
