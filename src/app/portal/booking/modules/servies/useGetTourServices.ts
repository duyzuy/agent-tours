import { useGetBookingTourServicesMutation } from "@/mutations/managements/booking";

const useGetTourServices = () => {
    const { mutate: getTourServices } = useGetBookingTourServicesMutation();
};
export default useGetTourServices;
