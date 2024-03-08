import { BaseResponse } from "@/models/management/common.interface";
import { coreApi } from "../coreApi";
import {
    BookingInformationPayload,
    BookingRs,
    ProductListRs,
    SearchDestinationFormData,
} from "@/models/management/booking/bookingPayload.interface";

export const bookingAPIs = {
    search: async (payload: SearchDestinationFormData) => {
        return await coreApi.post<ProductListRs, BaseResponse<null>>(
            "core/BookingOrder_Search",
            {
                requestObject: {
                    ...payload,
                },
                localUsername: "99",
            },
        );
    },
    create: async (payload?: BookingInformationPayload) => {
        return await coreApi.post<BookingRs, BaseResponse<null>>(
            "core/BookingOrder_Addnew",
            {
                requestObject: {
                    ...payload,
                },
                localUsername: "99",
            },
        );
    },
};
