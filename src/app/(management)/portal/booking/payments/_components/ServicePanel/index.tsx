import { useMemo, useTransition } from "react";
import { Button, Empty, Space, Spin, Tabs } from "antd";
import { isUndefined } from "lodash";
import styled from "styled-components";

import useBooking from "../../../hooks/useBooking";
import { useGetBookingTourServicesCoreQuery } from "@/queries/core/bookingOrder";
import { IProductTourBookingItem } from "../../../modules/bookingInformation.interface";
import useAddOnService from "../../../modules/servies/useAddOnService";
import BoxServiceItemByPax, { BoxServiceItemByPaxProps } from "./BoxServiceItemByPax";
import BoxServiceItemNoPax, { BoxServiceItemNoPaxProps } from "./BoxServiceItemNoPax";
import { ArrowRightOutlined } from "@ant-design/icons";

interface ServicePanelProps {
  sellableId: number;
  bookingItems: IProductTourBookingItem[];
  onNext?: () => void;
}
const ServicePanel: React.FC<ServicePanelProps> = ({ sellableId, bookingItems, onNext }) => {
  const [bookingInformation, _] = useBooking();
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

  const onChangeQuantity: BoxServiceItemByPaxProps["onChangeQuantity"] = (data) => {
    onAddServiceByPax(data.action, data.qty, data.bookingIndex, data.configItem, data.serviceItem, data.type);
  };

  const onChangeQuantityWithoutPax: BoxServiceItemNoPaxProps["onChangeQuantity"] = (data) => {
    onAddServiceNoPax(data.action, data.qty, data.configItem, data.serviceItem);
  };
  const handleGoNext = () => {
    onNext && startTransition(onNext);
  };
  if (isLoading) {
    return <Spin />;
  }
  if ((!serviceList && !isLoading) || (serviceList && !serviceList.length && !isLoading)) {
    return <Empty description="Không có dịch vụ nào khả dụng." />;
  }

  return (
    <>
      <div className="mb-3">
        <h3 className="font-[500] text-lg">Mua thêm dịch vụ</h3>
        <p>Các dịch vụ có thể mua theo cả hai lựa chọn bên dưới</p>
      </div>
      <TabStyled
        items={[
          {
            label: "Thêm dịch vụ theo khách",
            key: "serviceWithPax",
            children: serviceList?.map((serviceItem) => (
              <BoxServiceItemByPax
                key={`${serviceItem.inventory.recId}${serviceItem.stock?.recId ? serviceItem.stock?.recId : ""}`}
                serviceName={`${serviceItem.inventory.name}${serviceItem.stock ? ` - ${serviceItem.stock.code}` : ""}`}
                serviceItem={serviceItem}
                bookingItems={bookingItems}
                consfigItems={serviceItem.configs}
                selectedItems={bookingSsrWithPax}
                onChangeQuantity={onChangeQuantity}
              />
            )),
          },
          {
            label: "Thêm dịch vụ",
            key: "serviceNoPax",
            children: serviceList?.map((serviceItem) => (
              <BoxServiceItemNoPax
                key={`${serviceItem.inventory.recId}${serviceItem.stock?.recId ? serviceItem.stock?.recId : ""}`}
                serviceName={`${serviceItem.inventory.name}${serviceItem.stock ? ` - ${serviceItem.stock.code}` : ""}`}
                serviceItem={serviceItem}
                consfigItems={serviceItem.configs}
                selectedItems={bookingSsr}
                onChangeQuantity={onChangeQuantityWithoutPax}
              />
            )),
          },
        ]}
      />

      <div className="text-right">
        <Button type="primary" ghost size="large" onClick={handleGoNext} loading={isTransition} className="w-48">
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
