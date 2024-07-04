import { SplitBookingContext } from "./splitBookingContext";
import { SplitBookingFormData } from "./modules/splitBooking.interface";
import { useState } from "react";
interface SplitBookingProviderProps {
    children: React.ReactNode;
}
const SplitBookingProvider: React.FC<SplitBookingProviderProps> = ({
    children,
}) => {
    const [bookingSplit, setBookingSplitItem] = useState(
        () =>
            new SplitBookingFormData(
                { recId: undefined, rmk3: "", fop: [] },
                {},
                {},
            ),
    );

    return (
        <SplitBookingContext.Provider
            value={[bookingSplit, setBookingSplitItem]}
        >
            {children}
        </SplitBookingContext.Provider>
    );
};
export default SplitBookingProvider;
