import { Flex } from "antd";
interface HotlineBoxProps {
    label?: string;
    phoneNumber?: string;
}
const HotlineBox: React.FC<HotlineBoxProps> = ({ phoneNumber, label }) => {
    return (
        <div className="box-booking border lg:px-6 px-4 lg:py-3 py-2 mb-4 rounded-lg bg-white drop-shadow-sm">
            <Flex gap="middle">
                <div className="px-2 w-full rounded-lg py-2">
                    <p className="text-xs">{label}</p>
                    <span className="text-lg text-primary-default">
                        {phoneNumber}
                    </span>
                </div>
            </Flex>
        </div>
    );
};
export default HotlineBox;
