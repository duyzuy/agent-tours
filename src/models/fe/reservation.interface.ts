import { BaseResponse, PaymentStatus, Status } from "../common.interface";
import { IPassengerInformation } from "../management/booking/passengerInformation.interface";
import { ISellable } from "../management/core/sellable.interface";
import { ITemplateSellable } from "../management/core/templateSellable.interface";
export interface FeReservation {
  recId: number;
  bookingOrder: {
    recId: number;
    sellableId: number;
    sellableTemplateId: number;
    custUserId: number;
    custName: string;
    custPhoneNumber: string;
    custEmail: string;
    custAddress: string;
    custInfoJson: string;
    invoiceName: string;
    invoiceCompanyName: string;
    invoiceAddress: string;
    invoiceTaxCode: string;
    invoiceEmail: string;
    paymentStatus: PaymentStatus;
    totalFop: number;
    totalPaid: number;
    totalRefunded: number;
    totalAmount: number;
    tourPrice: number;
    extraPrice: number;
    charge: number;
    referenceId: string;
    referenceName: string;
    rmk: string;
    rmk1: string;
    rmk2: string;
    rmk3: string;
    rmk4: string;
    status: Status;
    sysFstUser: string;
    sysFstUpdate: string;
    sysLstUser: string;
    sysLstUpdate: string;
    sysBelongTo: string;
    logStatus: string;
    template: ITemplateSellable;
    sellable: ISellable;
    fops: [];
    rulesAndPolicies: {
      bookingTimelimits: [];
      depositTimelimits: [];
      penalties: [];
    };
    comments: [];
  };
  bookingDetails: [];
  bookingSsr: [];
  passengers: IPassengerInformation[];
  rulesAndPolicies: {
    bookingTimelimits: [];
    depositTimelimits: [];
    penalties: [];
  };
}
export interface FeReservationResponse extends BaseResponse<FeReservation> {}
// {
//     "result": {
//         "recId": 100,
//         "bookingOrder": {
//             "recId": 100,
//             "sellableId": 208,
//             "sellableTemplateId": 25,
//             "custUserId": 3,
//             "custName": "vu truong duy",
//             "custPhoneNumber": "0982013088",
//             "custEmail": "duyyy@gmail.com",
//             "custAddress": "131312312",
//             "custInfoJson": "",
//             "invoiceName": "",
//             "invoiceCompanyName": "",
//             "invoiceAddress": "",
//             "invoiceTaxCode": "",
//             "invoiceEmail": "",
//             "paymentStatus": "NOTPAID",
//             "totalFop": 0,
//             "totalPaid": 0,
//             "totalRefunded": 0,
//             "totalAmount": 11000000,
//             "tourPrice": 11000000,
//             "extraPrice": 0,
//             "charge": 0,
//             "referenceId": "123",
//             "referenceName": "",
//             "rmk": "123",
//             "rmk1": "",
//             "rmk2": "",
//             "rmk3": "",
//             "rmk4": "",
//             "status": "OK",
//             "sysFstUser": "3",
//             "sysFstUpdate": "2024-07-03T00:16:00",
//             "sysLstUser": "",
//             "sysLstUpdate": "2024-07-03T00:16:00",
//             "sysBelongTo": "ANTHAI_DEMO",
//             "logStatus": "",
//             "template": {
//                 "recId": 25,
//                 "cmsIdentity": "THAILAND_4N5D_XU_SO_CHUA_VANG",
//                 "type": "TOUR",
//                 "code": "TH001",
//                 "name": "THÁI LAN - XỨ SỞ CHÙA VÀNG",
//                 "inventoryTypeList": "AIR||LANDPACKAGE",
//                 "destListJson": "[{\"cat\":\"DESTLIST\",\"id\":12781,\"codeKey\":\"TH\",\"codeName\":\"Thái Lan\",\"status\":\"OK\",\"listStateProvince\":[{\"id\":578,\"cat\":\"COUNTRYLIST\",\"regionKey\":\"ASIA\",\"subRegionKey\":\"SOUTHEASTERN_ASIA\",\"countryKey\":\"TH\",\"countryName\":\"Thailand\",\"stateProvinceKey\":\"\"}]}]",
//                 "tourItinerary": "",
//                 "airItinerary": "",
//                 "counter": "",
//                 "depart": "",
//                 "limitPerBooking": 0,
//                 "status": "OK",
//                 "sysFstUser": "99",
//                 "sysFstUpdate": "2024-01-29T20:29:00",
//                 "sysLstUser": "99",
//                 "sysLstUpdate": "2024-06-20T23:22:00",
//                 "sysBelongTo": "ANTHAI_DEMO",
//                 "logStatus": "||OK-Jan 29 2024  8:28PM-99",
//                 "cms": null
//             },
//             "sellable": {
//                 "recId": 208,
//                 "sellableTemplateId": 25,
//                 "type": "TOUR",
//                 "code": "TH001THCVT8_SERIAL15062024__3",
//                 "cap": 0,
//                 "open": 0,
//                 "used": 0,
//                 "avaiable": 0,
//                 "closeDate": "2024-07-31T23:59:00",
//                 "deadlineJson": "",
//                 "validFrom": "2024-07-03T00:00:00",
//                 "validTo": "2024-07-31T23:59:00",
//                 "startDate": "2024-08-04T00:00:00",
//                 "endDate": "2024-08-08T23:59:00",
//                 "limitPerBooking": 0,
//                 "status": "OK",
//                 "sysFstUser": "99",
//                 "sysFstUpdate": "2024-06-14T16:21:00",
//                 "sysLstUser": "99",
//                 "sysLstUpdate": "2024-06-14T16:21:00",
//                 "sysBelongTo": "ANTHAI_DEMO",
//                 "logStatus": "||OK-Jul  2 2024  9:23AM-99",
//                 "configs": null,
//                 "template": null,
//                 "sellableDetails": null,
//                 "promotions": null
//             },
//             "fops": [],
//             "rulesAndPolicies": {
//                 "bookingTimelimits": [],
//                 "depositTimelimits": [],
//                 "penalties": []
//             },
//             "comments": []
//         },
//         "bookingDetails": [
//             {
//                 "index": 0,
//                 "bookingId": 0,
//                 "sellableConfigId": 0,
//                 "qty": 1,
//                 "amount": 0,
//                 "type": "",
//                 "ssr": [],
//                 "booking": {
//                     "recId": 678,
//                     "orderId": 100,
//                     "sellableId": 208,
//                     "bookingRefId": 0,
//                     "sellableConfigId": 809,
//                     "configJson": "{\"RecId\":809,\"SellableId\":208,\"SellableDetailsId\":0,\"Channel\":\"CUSTOMER\",\"Class\":\"C1\",\"Details\":\"\",\"Settings\":\"\",\"MaxAvaiable\":20,\"Open\":20,\"Sold\":0,\"Avaiable\":20,\"Adult\":6000000,\"Child\":5000000,\"Infant\":3000000,\"LimitPerBooking\":20,\"OldSold\":0,\"Status\":\"OK\",\"SysFstUser\":\"99\",\"SysFstUpdate\":\"2024-07-02T09:25:00\",\"SysLstUser\":\"\",\"SysLstUpdate\":\"2024-07-02T09:25:00\",\"SysBelongTo\":\"ANTHAI_DEMO\",\"LogStatus\":\"\",\"Supplier\":null}",
//                     "channel": "CUSTOMER",
//                     "class": "C1",
//                     "type": "adult",
//                     "quantity": 1,
//                     "amount": 6000000,
//                     "status": "OK",
//                     "sysFstUser": "3",
//                     "sysFstUpdate": "2024-07-03T00:16:00",
//                     "sysLstUser": "",
//                     "sysLstUpdate": "2024-07-03T00:16:00",
//                     "sysBelongTo": "ANTHAI_DEMO",
//                     "logStatus": "",
//                     "pax": {
//                         "recId": 261,
//                         "bookingId": 678,
//                         "orderId": 100,
//                         "type": "adult",
//                         "paxTitle": "",
//                         "paxLastname": "vu",
//                         "paxMiddleFirstName": "duy",
//                         "paxGender": "male",
//                         "paxBirthDate": "2000-01-01T00:00:00",
//                         "paxBirthYear": 0,
//                         "paxPhoneNumber": "",
//                         "paxAddress": "",
//                         "paxIdNumber": "",
//                         "paxNationality": "",
//                         "paxPassportNumber": "",
//                         "paxPassortExpiredDate": "2000-01-01T00:00:00",
//                         "paxInfoJson": "",
//                         "status": "OK",
//                         "sysFstUser": "3",
//                         "sysFstUpdate": "2024-07-03T00:16:00",
//                         "sysLstUser": "",
//                         "sysLstUpdate": "2024-07-03T00:16:00",
//                         "sysBelongTo": "ANTHAI_DEMO",
//                         "logStatus": ""
//                     },
//                     "paxId": 261,
//                     "config": {
//                         "recId": 809,
//                         "sellableId": 208,
//                         "sellableDetailsId": 0,
//                         "channel": "CUSTOMER",
//                         "class": "C1",
//                         "details": "",
//                         "settings": "",
//                         "maxAvaiable": 20,
//                         "open": 20,
//                         "sold": 0,
//                         "avaiable": 20,
//                         "adult": 6000000,
//                         "child": 5000000,
//                         "infant": 3000000,
//                         "limitPerBooking": 20,
//                         "oldSold": 0,
//                         "status": "OK",
//                         "sysFstUser": "99",
//                         "sysFstUpdate": "2024-07-02T09:25:00",
//                         "sysLstUser": "",
//                         "sysLstUpdate": "2024-07-02T09:25:00",
//                         "sysBelongTo": "ANTHAI_DEMO",
//                         "logStatus": "",
//                         "supplier": null
//                     },
//                     "qty": 0,
//                     "ssr": []
//                 },
//                 "pax": {
//                     "recId": 261,
//                     "bookingId": 678,
//                     "orderId": 100,
//                     "type": "adult",
//                     "paxTitle": "",
//                     "paxLastname": "vu",
//                     "paxMiddleFirstName": "duy",
//                     "paxGender": "male",
//                     "paxBirthDate": "2000-01-01T00:00:00",
//                     "paxBirthYear": 0,
//                     "paxPhoneNumber": "",
//                     "paxAddress": "",
//                     "paxIdNumber": "",
//                     "paxNationality": "",
//                     "paxPassportNumber": "",
//                     "paxPassortExpiredDate": "2000-01-01T00:00:00",
//                     "paxInfoJson": "",
//                     "status": "OK",
//                     "sysFstUser": "3",
//                     "sysFstUpdate": "2024-07-03T00:16:00",
//                     "sysLstUser": "",
//                     "sysLstUpdate": "2024-07-03T00:16:00",
//                     "sysBelongTo": "ANTHAI_DEMO",
//                     "logStatus": ""
//                 }
//             },
//             {
//                 "index": 0,
//                 "bookingId": 0,
//                 "sellableConfigId": 0,
//                 "qty": 1,
//                 "amount": 0,
//                 "type": "",
//                 "ssr": [],
//                 "booking": {
//                     "recId": 679,
//                     "orderId": 100,
//                     "sellableId": 208,
//                     "bookingRefId": 0,
//                     "sellableConfigId": 809,
//                     "configJson": "{\"RecId\":809,\"SellableId\":208,\"SellableDetailsId\":0,\"Channel\":\"CUSTOMER\",\"Class\":\"C1\",\"Details\":\"\",\"Settings\":\"\",\"MaxAvaiable\":20,\"Open\":20,\"Sold\":0,\"Avaiable\":20,\"Adult\":6000000,\"Child\":5000000,\"Infant\":3000000,\"LimitPerBooking\":20,\"OldSold\":0,\"Status\":\"OK\",\"SysFstUser\":\"99\",\"SysFstUpdate\":\"2024-07-02T09:25:00\",\"SysLstUser\":\"\",\"SysLstUpdate\":\"2024-07-02T09:25:00\",\"SysBelongTo\":\"ANTHAI_DEMO\",\"LogStatus\":\"\",\"Supplier\":null}",
//                     "channel": "CUSTOMER",
//                     "class": "C1",
//                     "type": "child",
//                     "quantity": 1,
//                     "amount": 5000000,
//                     "status": "OK",
//                     "sysFstUser": "3",
//                     "sysFstUpdate": "2024-07-03T00:16:00",
//                     "sysLstUser": "",
//                     "sysLstUpdate": "2024-07-03T00:16:00",
//                     "sysBelongTo": "ANTHAI_DEMO",
//                     "logStatus": "",
//                     "pax": {
//                         "recId": 262,
//                         "bookingId": 679,
//                         "orderId": 100,
//                         "type": "child",
//                         "paxTitle": "",
//                         "paxLastname": "vu",
//                         "paxMiddleFirstName": "tan",
//                         "paxGender": "male",
//                         "paxBirthDate": "2015-08-11T00:00:00",
//                         "paxBirthYear": 0,
//                         "paxPhoneNumber": "",
//                         "paxAddress": "",
//                         "paxIdNumber": "",
//                         "paxNationality": "",
//                         "paxPassportNumber": "",
//                         "paxPassortExpiredDate": "2000-01-01T00:00:00",
//                         "paxInfoJson": "",
//                         "status": "OK",
//                         "sysFstUser": "3",
//                         "sysFstUpdate": "2024-07-03T00:16:00",
//                         "sysLstUser": "",
//                         "sysLstUpdate": "2024-07-03T00:16:00",
//                         "sysBelongTo": "ANTHAI_DEMO",
//                         "logStatus": ""
//                     },
//                     "paxId": 262,
//                     "config": {
//                         "recId": 809,
//                         "sellableId": 208,
//                         "sellableDetailsId": 0,
//                         "channel": "CUSTOMER",
//                         "class": "C1",
//                         "details": "",
//                         "settings": "",
//                         "maxAvaiable": 20,
//                         "open": 20,
//                         "sold": 0,
//                         "avaiable": 20,
//                         "adult": 6000000,
//                         "child": 5000000,
//                         "infant": 3000000,
//                         "limitPerBooking": 20,
//                         "oldSold": 0,
//                         "status": "OK",
//                         "sysFstUser": "99",
//                         "sysFstUpdate": "2024-07-02T09:25:00",
//                         "sysLstUser": "",
//                         "sysLstUpdate": "2024-07-02T09:25:00",
//                         "sysBelongTo": "ANTHAI_DEMO",
//                         "logStatus": "",
//                         "supplier": null
//                     },
//                     "qty": 0,
//                     "ssr": []
//                 },
//                 "pax": {
//                     "recId": 262,
//                     "bookingId": 679,
//                     "orderId": 100,
//                     "type": "child",
//                     "paxTitle": "",
//                     "paxLastname": "vu",
//                     "paxMiddleFirstName": "tan",
//                     "paxGender": "male",
//                     "paxBirthDate": "2015-08-11T00:00:00",
//                     "paxBirthYear": 0,
//                     "paxPhoneNumber": "",
//                     "paxAddress": "",
//                     "paxIdNumber": "",
//                     "paxNationality": "",
//                     "paxPassportNumber": "",
//                     "paxPassortExpiredDate": "2000-01-01T00:00:00",
//                     "paxInfoJson": "",
//                     "status": "OK",
//                     "sysFstUser": "3",
//                     "sysFstUpdate": "2024-07-03T00:16:00",
//                     "sysLstUser": "",
//                     "sysLstUpdate": "2024-07-03T00:16:00",
//                     "sysBelongTo": "ANTHAI_DEMO",
//                     "logStatus": ""
//                 }
//             }
//         ],
//         "bookingSsr": [],
//         "passengers": [
//             {
//                 "recId": 261,
//                 "bookingId": 678,
//                 "orderId": 100,
//                 "type": "adult",
//                 "paxTitle": "",
//                 "paxLastname": "vu",
//                 "paxMiddleFirstName": "duy",
//                 "paxGender": "male",
//                 "paxBirthDate": "2000-01-01T00:00:00",
//                 "paxBirthYear": 0,
//                 "paxPhoneNumber": "",
//                 "paxAddress": "",
//                 "paxIdNumber": "",
//                 "paxNationality": "",
//                 "paxPassportNumber": "",
//                 "paxPassortExpiredDate": "2000-01-01T00:00:00",
//                 "paxInfoJson": "",
//                 "status": "OK",
//                 "sysFstUser": "3",
//                 "sysFstUpdate": "2024-07-03T00:16:00",
//                 "sysLstUser": "",
//                 "sysLstUpdate": "2024-07-03T00:16:00",
//                 "sysBelongTo": "ANTHAI_DEMO",
//                 "logStatus": ""
//             },
//             {
//                 "recId": 262,
//                 "bookingId": 679,
//                 "orderId": 100,
//                 "type": "child",
//                 "paxTitle": "",
//                 "paxLastname": "vu",
//                 "paxMiddleFirstName": "tan",
//                 "paxGender": "male",
//                 "paxBirthDate": "2015-08-11T00:00:00",
//                 "paxBirthYear": 0,
//                 "paxPhoneNumber": "",
//                 "paxAddress": "",
//                 "paxIdNumber": "",
//                 "paxNationality": "",
//                 "paxPassportNumber": "",
//                 "paxPassortExpiredDate": "2000-01-01T00:00:00",
//                 "paxInfoJson": "",
//                 "status": "OK",
//                 "sysFstUser": "3",
//                 "sysFstUpdate": "2024-07-03T00:16:00",
//                 "sysLstUser": "",
//                 "sysLstUpdate": "2024-07-03T00:16:00",
//                 "sysBelongTo": "ANTHAI_DEMO",
//                 "logStatus": ""
//             }
//         ],
//         "ssr": [],
//         "fops": [],
//         "rulesAndPolicies": {
//             "bookingTimelimits": [],
//             "depositTimelimits": [],
//             "penalties": []
//         }
//     },
//     "body": "",
//     "status": "OK",
//     "message": "",
//     "errorCode": "",
//     "jwt": "",
//     "pageCurrent": 1,
//     "pageSize": 100,
//     "totalPages": 0,
//     "totalItems": 0
// }
