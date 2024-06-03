import React, { useMemo } from "react";
import { useSelectorManageBooking } from "../../../hooks/useManageBooking";
import { moneyFormatVND } from "@/utils/helper";
import { BookingDetailItemType } from "../../page";
import { IOrderDetail } from "@/models/management/booking/order.interface";
import { PriceConfig } from "@/models/management/core/priceConfig.interface";
export interface ManageBookingOrderSummaryProps {
    bookingDetails?: BookingDetailItemType[];
    bookingOrder?: IOrderDetail["bookingOrder"];
    ssrList?: IOrderDetail["ssr"][0]["booking"][];
}
const ManageBookingOrderSummary: React.FC<ManageBookingOrderSummaryProps> = ({
    bookingDetails,
    bookingOrder,
    ssrList,
}) => {
    const orderSSREdit = useSelectorManageBooking(
        (state) => state.editSSROrder,
    );

    const groupingServices = useMemo(() => {
        return ssrList?.reduce<{
            [key: string]: {
                serviceId: number;
                serviceName: string;
                items: IOrderDetail["ssr"][0]["booking"][];
            };
        }>((acc, item) => {
            const detailsId = item.config.sellableDetailsId;

            if (acc[detailsId]) {
                acc = {
                    ...acc,
                    [detailsId]: {
                        ...acc[detailsId],
                        items: [...acc[detailsId]["items"], item],
                    },
                };
            } else {
                acc = {
                    ...acc,
                    [detailsId]: {
                        serviceId: detailsId,
                        serviceName: item.config.details,
                        items: [item],
                    },
                };
            }
            return acc;
        }, {});
    }, [ssrList]);

    return (
        <>
            <div className="manage__booking-order-summary-head mb-6">
                <p className="font-[500] text-[16px]">Chi Tiết Đặt chỗ</p>
            </div>
            <div className="manage__booking-order-summary-body mb-6">
                <div className="box__passenger mb-6 border rounded-lg">
                    <div className="box__passenger-head pt-6 px-6 pb-3">
                        <p className="font-[500] text-[16px]">Giá tour</p>
                    </div>
                    <div className="box__passenger-body px-6 pb-6">
                        {bookingDetails?.map(({ pax, recId, amount }) => (
                            <div className="box-item" key={recId}>
                                <div className="flex">
                                    <span className="w-32">
                                        {`${pax?.paxLastname}, ${pax.paxMiddleFirstName}`}
                                    </span>
                                    <span className="w-8">1 x</span>
                                    <span className="text-primary-default flex-1 text-right">
                                        {moneyFormatVND(amount)}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="box__service border rounded-lg mb-6">
                    <div className="box__service-head px-6 pt-6 pb-3">
                        <p className="font-[500] text-[16px]">Dịch vụ</p>
                    </div>
                    <div className="box__service-body px-6 pb-6">
                        {groupingServices
                            ? Object.entries(groupingServices)?.map(
                                  ([
                                      key,
                                      { serviceId, serviceName, items },
                                  ]) => (
                                      <div key={serviceId} className="mb-3">
                                          <div className="mb-3 bg-slate-100 rounded-md px-3 py-2">
                                              <p>{serviceName}</p>
                                          </div>
                                          <div>
                                              {items.map((item) => (
                                                  <div
                                                      className="flex justify-between"
                                                      key={item.recId}
                                                  >
                                                      <span className="flex-1">
                                                          {item.class}
                                                      </span>
                                                      <span className="w-8">
                                                          1 x
                                                      </span>
                                                      <span className="text-primary-default text-right w-28">
                                                          {moneyFormatVND(
                                                              item.amount,
                                                          )}
                                                      </span>
                                                  </div>
                                              ))}
                                          </div>
                                      </div>
                                  ),
                              )
                            : null}
                    </div>
                </div>
                <div className="sub-total border px-6 py-6 rounded-lg">
                    <div className="flex justify-between items-center">
                        <span>Tổng tiền</span>
                        <span className="text-primary-default text-lg">
                            {moneyFormatVND(bookingOrder?.totalAmount)}
                        </span>
                    </div>
                </div>
            </div>
        </>
    );
};
export default ManageBookingOrderSummary;
