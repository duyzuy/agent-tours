import { PassengerType } from "@/models/management/common.interface";
import { moneyFormatVND } from "@/utils/helper";
import { Divider } from "antd";
import { useMemo } from "react";
import { useBookingSelector } from "../../hooks/useBooking";
interface BookingBreakDownSummaryProps {
    label?: string;
}
const BookingBreakDownSummary: React.FC<BookingBreakDownSummaryProps> = ({
    label,
}) => {
    const bookingInfo = useBookingSelector();
    const passengerList = useMemo(() => {
        return bookingInfo.bookingInfo?.passengerSelections;
    }, [bookingInfo]);
    const productItem = useMemo(() => {
        return bookingInfo.bookingInfo?.product;
    }, [bookingInfo]);
    const passengerAdultList = useMemo(() => {
        return (
            passengerList?.filter(
                (pItem) => pItem.type === PassengerType.ADULT,
            ) || []
        );
    }, [passengerList]);

    const passengerChildList = useMemo(() => {
        return (
            passengerList?.filter(
                (pItem) => pItem.type === PassengerType.CHILD,
            ) || []
        );
    }, [passengerList]);

    const passengerInfantList = useMemo(() => {
        return (
            passengerList?.filter(
                (pItem) => pItem.type === PassengerType.INFANT,
            ) || []
        );
    }, [passengerList]);

    const totalPrice = useMemo(() => {
        const total =
            passengerList?.reduce((acc, curItem) => {
                acc = acc + curItem.quantity * curItem.item[curItem.type];
                return acc;
            }, 0) || 0;

        return moneyFormatVND(total);
    }, [passengerList]);
    return (
        <div className="booking__summary bg-white rounded-md px-6 py-4">
            <div className="booking__summary-head">
                <h3 className="text-lg font-bold">Thông tin sản phẩm</h3>
            </div>
            <Divider />
            <div className="booking__summary-body">
                <div className="product__item mb-3">
                    <div className="product__item-label">
                        <span className="font-bold">Sản phẩm</span>
                    </div>
                    <div className="product__item-body">
                        <ul>
                            <li className="flex justify-between">
                                <span>Mã sản phẩm</span>
                                <span>{productItem?.code}</span>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="passenger__item">
                    <div className="passenger__item-label">
                        <span className="font-bold">Hành khách</span>
                    </div>
                    <ul>
                        <li className="flex justify-between mb-2">
                            <span className="flex-1">Loại hành khách</span>
                            <span className="w-20 text-center">Số lượng</span>
                            <span className="w-32 text-right">Tạm tính</span>
                        </li>
                        {passengerAdultList.map((paxAdult, _index) => (
                            <li
                                className="flex justify-between items-center mb-2"
                                key={`adult-${_index}`}
                            >
                                <span className="passenger__item-passenger-type flex-1">
                                    <span className="block">
                                        Người lớn - {paxAdult.item.class}
                                    </span>
                                    <span className="block text-xs text-red-600">
                                        {moneyFormatVND(paxAdult.item.adult)}
                                    </span>
                                </span>
                                <span className="passenger__item-quantity w-20 text-center">
                                    {`x ${paxAdult.quantity}`}
                                </span>
                                <span className="passenger__item-price w-32 text-right inline-block text-red-600">
                                    {moneyFormatVND(
                                        paxAdult.item.adult * paxAdult.quantity,
                                    )}
                                </span>
                            </li>
                        ))}
                        {passengerChildList.map((paxChild, _index) => (
                            <li
                                className="flex justify-between items-center mb-2"
                                key={`child-${_index}`}
                            >
                                <span className="passenger__item-passenger-type flex-1">
                                    <span className="block">
                                        Trẻ em - {paxChild.item.class}
                                    </span>
                                    <span className="block text-xs text-red-600">
                                        {moneyFormatVND(paxChild.item.child)}
                                    </span>
                                </span>
                                <span className="passenger__item-quantity w-20 text-center">
                                    {`x ${paxChild.quantity}`}
                                </span>
                                <span className="passenger__item-price w-32 text-right text-red-600">
                                    {moneyFormatVND(
                                        paxChild.quantity * paxChild.item.child,
                                    )}
                                </span>
                            </li>
                        ))}
                        {passengerInfantList.map((paxInfant, _index) => (
                            <li
                                className="flex justify-between items-center mb-2"
                                key={`infant-${_index}`}
                            >
                                <span className="passenger__item-passenger-type flex-1">
                                    <span className="block">
                                        Em bé - {paxInfant.item.class}
                                    </span>
                                    <span className="block text-xs text-red-600">
                                        {moneyFormatVND(paxInfant.item.infant)}
                                    </span>
                                </span>
                                <span className="passenger__item-quantity w-20 text-center">
                                    {`x ${paxInfant.quantity}`}
                                </span>
                                <span className="passenger__item-price w-32 text-right text-red-600">
                                    {moneyFormatVND(
                                        paxInfant.quantity *
                                            paxInfant.item.infant,
                                    )}
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>
                <Divider />
                <div className="booking__summary-total">
                    <div className="flex justify-between">
                        <span>Tổng tiền</span>
                        <span className="font-bold text-red-600 text-lg">
                            {totalPrice}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default BookingBreakDownSummary;
