import React from "react";
import Quantity from "@/components/admin/Quantity";
import { PassengerType } from "@/models/management/common.interface";
import { SearchBookingFormData } from "../../modules/searchBooking.interface";

export interface PassengerQuantityProps {
    onSetQuantityPassenger: (
        passengers: SearchBookingFormData["passengers"],
    ) => void;
    adultAmount: number;
    childAmount: number;
    infantAmount: number;
}
const PassengerQuantity: React.FC<PassengerQuantityProps> = ({
    adultAmount,
    childAmount,
    infantAmount,
    onSetQuantityPassenger,
}) => {
    const onChangeQuantityPassenger = (
        paxType: PassengerType,
        value: number,
        action: "minus" | "plus",
    ) => {
        switch (paxType) {
            case PassengerType.ADULT: {
                onSetQuantityPassenger({
                    adult: value,
                    child: childAmount,
                    infant:
                        action === "minus" && adultAmount === infantAmount
                            ? value
                            : infantAmount,
                });
                break;
            }
            case PassengerType.CHILD: {
                onSetQuantityPassenger({
                    adult: adultAmount,
                    child: value,
                    infant: infantAmount,
                });
                break;
            }
            case PassengerType.INFANT: {
                onSetQuantityPassenger({
                    adult: adultAmount,
                    child: childAmount,
                    infant: value,
                });
                break;
            }
        }
    };
    return (
        <div className="passenger-quantity">
            <div className="item__classes flex flex-wrap items-center">
                <div className="pax-item flex items-center mr-8 pr-8 border-r">
                    <span className="inline-block mr-8">
                        <span className="text-[16px] font-[500] inline-block">
                            Người lớn
                        </span>
                        <span className="text-xs block text-gray-600">
                            Từ 12 tuổi trở lên
                        </span>
                    </span>
                    <Quantity
                        value={adultAmount}
                        defaultValue={10}
                        minimum={1}
                        onChange={(action, value) =>
                            onChangeQuantityPassenger(
                                PassengerType.ADULT,
                                value,
                                action,
                            )
                        }
                    />
                </div>
                <div className="pax-item flex items-center mr-8 pr-8 border-r">
                    <span className="inline-block mr-8">
                        <span className="text-[16px] font-[500] inline-block">
                            Trẻ em
                        </span>
                        <span className="text-xs block text-gray-600">
                            Từ 2 đến dưới 12 tuổi
                        </span>
                    </span>
                    <Quantity
                        value={childAmount}
                        minimum={0}
                        onChange={(action, value) =>
                            onChangeQuantityPassenger(
                                PassengerType.CHILD,
                                value,
                                action,
                            )
                        }
                    />
                </div>
                <div className="pax-item flex items-center">
                    <span className="inline-block mr-8">
                        <span className="text-[16px] font-[500] inline-block">
                            Em bé
                        </span>
                        <span className="text-xs block text-gray-600">
                            Dưới 2 tuổi
                        </span>
                    </span>
                    <Quantity
                        value={infantAmount}
                        maximum={adultAmount}
                        minimum={0}
                        onChange={(action, value) =>
                            onChangeQuantityPassenger(
                                PassengerType.INFANT,
                                value,
                                action,
                            )
                        }
                    />
                </div>
            </div>
        </div>
    );
};
export default PassengerQuantity;
