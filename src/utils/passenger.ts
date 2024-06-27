import {
    EPassengerGender,
    EPassengerTitle,
    PASSENGER_GENDER,
    PASSENGER_TITLES,
} from "@/constants/common";
import { PassengerType } from "@/models/common.interface";

export const getPassengerTitleList = (type = PassengerType.ADULT) => {
    if (type === PassengerType.ADULT) {
        return PASSENGER_TITLES;
    }
    if (type === PassengerType.CHILD) {
        return PASSENGER_TITLES.filter(
            (title) =>
                title.value === EPassengerTitle.MR ||
                title.value === EPassengerTitle.MISS,
        );
    }
};

export const getPassengerGenderList = (type = PassengerType.ADULT) => {
    if (type === PassengerType.ADULT) {
        return PASSENGER_GENDER;
    }
    if (type === PassengerType.CHILD || type === PassengerType.INFANT) {
        return PASSENGER_GENDER.filter(
            (title) => title.value !== EPassengerGender.OTHER,
        );
    }
};
