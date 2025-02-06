// import {
//   useUpdateCustomerInformationMutation,
//   useUpdatePassengersInformationMutation,
// } from "@/mutations/managements/booking";
// import { IBookingOrderCustomerPayload, IOrderPassengerEditPayload } from "./bookingOrder.interface";
// import useMessage from "@/hooks/useMessage";
// import { isUndefined } from "lodash";
// import { useQueryClient } from "@tanstack/react-query";
// import { queryCore } from "@/queries/var";

// const useUpdateCustomerAndPassenger = () => {
//   const queryClient = useQueryClient();

//   const { mutate: makeUpdatePassengersInformation } = useUpdatePassengersInformationMutation();

//   const { mutate: makeUpdateCustomerInformation } = useUpdateCustomerInformationMutation();

//   const mesage = useMessage();

//   const onUpdateCustomerInfo = (payload: IBookingOrderCustomerPayload, cb?: () => void) => {
//     makeUpdateCustomerInformation(payload, {
//       onSuccess(data, variables, context) {
//         mesage.success("Cập nhật thành công.");

//         queryClient.invalidateQueries({
//           queryKey: [queryCore.GET_BOOKING_ORDER_DETAIL, { recId: Number(variables.bookingOrder?.recId) }],
//         });
//         queryClient.invalidateQueries({
//           queryKey: [queryCore.GET_BOOKING_ORDER_LIST],
//         });

//         cb?.();
//       },
//       onError(error, variables, context) {
//         console.log(error);
//         mesage.error(error.message);
//       },
//     });
//   };

//   const onUpdatePassengerInfo = (payload: IOrderPassengerEditPayload, cb?: () => void) => {
//     makeUpdatePassengersInformation(payload, {
//       onSuccess(data, variables, context) {
//         mesage.success("Cập nhật thông tin hành khách thành công");
//         queryClient.invalidateQueries({
//           queryKey: [queryCore.GET_BOOKING_ORDER_DETAIL, { recId: Number(variables.bookingOrderId) }],
//         });
//         queryClient.invalidateQueries({
//           queryKey: [queryCore.GET_BOOKING_ORDER_LIST],
//         });
//         cb?.();
//       },
//       onError(error, variables, context) {
//         console.log(error);
//         mesage.error(error.message);
//       },
//     });
//   };

//   return {
//     onUpdateCustomerInfo,
//     onUpdatePassengerInfo,
//   };
// };
// export default useUpdateCustomerAndPassenger;
