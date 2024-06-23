import { IconCalendar, IconPlane, IconHotel, IconMeal } from "@/assets/icons";

interface BenefitProps {
    items: { key?: string; value?: string; icon?: string }[];
}
const Benefit: React.FC<BenefitProps> = ({ items }) => {
    return (
        <div className="features py-6">
            <ul className="feature-list grid lg:grid-cols-4 grid-cols-2 gap-4">
                {items.map((item, _index) => (
                    <li className="feature-item" key={_index}>
                        <p className="label flex items-center">
                            <IconPlane width={16} className="mr-2" />
                            <span className="text-xs">{item.key}</span>
                        </p>
                        <p className="value font-semibold">{item.value}</p>
                    </li>
                ))}
                {/* <li className="feature-item w-1/4">
                    <p className="label flex items-center">
                        <IconCalendar width={16} className="mr-2" />
                        <span className="text-xs">Thời gian</span>
                    </p>
                    <p className="value font-semibold">3 ngày 2 đêm</p>
                </li>
                <li className="feature-item w-1/4">
                    <p className="label flex items-center">
                        <IconPlane width={16} className="mr-2" />
                        <span className="text-xs">Phương tiện</span>
                    </p>
                    <p className="value font-semibold">Máy bay, xe du lịch</p>
                </li>
                <li className="feature-item w-1/4">
                    <p className="label flex items-center">
                        <IconHotel width={16} className="mr-2" />
                        <span className="text-xs">Khách sạn</span>
                    </p>
                    <p className="value font-semibold">Khách sạn từ 4*</p>
                </li>
                <li className="feature-item w-1/4">
                    <p className="label flex items-center">
                        <IconMeal width={16} className="mr-2" />
                        <span className="text-xs">Ẩm thực</span>
                    </p>
                    <p className="value font-semibold">
                        Buffet sáng, theo thực đơn
                    </p>
                </li> */}
            </ul>
        </div>
    );
};
export default Benefit;
