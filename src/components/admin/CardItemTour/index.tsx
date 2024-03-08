import { SwapOutlined } from "@ant-design/icons";
interface CardItemTourProps {
    name: string;
    code: string;
    departureDate: string;
    returnDate: string;
    price?: string;
}
const CardItemTour: React.FC<CardItemTourProps> = ({
    name,
    code,
    departureDate,
    returnDate,
    price,
}) => {
    return (
        <div className="tour-item px-3 mb-3 w-full lg:w-1/3">
            <div className="p-3 bg-white rounded-lg shadow-lg">
                <div>
                    <p>{name}</p>
                    <p className="text-red-500 font-bold">{code}</p>
                    <div className="schedule-date flex justify-between border-b mb-3 pb-3">
                        <div>
                            <span>Ngày đi</span>
                            <p className="font-bold">{departureDate}</p>
                        </div>
                        <SwapOutlined />
                        <div>
                            <span>Ngày về</span>
                            <p className="font-bold">{returnDate}</p>
                        </div>
                    </div>

                    <div>
                        <p>{price}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default CardItemTour;
