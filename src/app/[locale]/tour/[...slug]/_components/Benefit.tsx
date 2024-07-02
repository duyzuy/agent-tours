import { IconCalendar, IconPlane, IconHotel, IconMeal } from "@/assets/icons";

interface BenefitProps {
    items?: { key?: string; value?: string; icon?: string }[];
}
const Benefit: React.FC<BenefitProps> = ({ items }) => {
    return (
        <div className="features py-6">
            <ul className="feature-list grid lg:grid-cols-4 grid-cols-2 gap-4">
                {items?.map((item, _index) => (
                    <li className="feature-item" key={_index}>
                        <p className="label flex items-center">
                            <span className="mr-2 block">
                                <IconPlane width={16} />
                            </span>
                            <span className="text-xs flex-1">{item.key}</span>
                        </p>
                        <p className="value font-semibold">{item.value}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};
export default Benefit;
