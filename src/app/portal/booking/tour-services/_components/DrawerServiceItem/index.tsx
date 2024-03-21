import {
    Drawer,
    Space,
    Button,
    Form,
    Row,
    Col,
    Input,
    DatePicker,
    Select,
} from "antd";
import FormItem from "@/components/base/FormItem";
import { IBookingItem } from "../../../modules/bookingInformation.interface";
import Quantity from "@/components/admin/Quantity";
import { getPassengerType } from "@/utils/common";
import { TServiceItemType } from "../../page";

const { Option } = Select;
interface DrawerServiceItemProps {
    isOpen?: boolean;
    onClose: () => void;
    actionType?: "create" | "edit";
    initalValue?: any;
    onSubmit?: () => void;
    serviceName: string;
    bookingItems: IBookingItem[];
    pricingItems: TServiceItemType["items"];
}
const DrawerServiceItem: React.FC<DrawerServiceItemProps> = ({
    isOpen,
    onClose,
    actionType = "create",
    onSubmit,
    serviceName = "",
    bookingItems,
    pricingItems = [],
}) => {
    return (
        <Drawer
            title={serviceName}
            width={550}
            onClose={onClose}
            open={isOpen}
            styles={{
                body: {
                    paddingBottom: 80,
                },
            }}
            extra={
                <Space>
                    <Button onClick={onClose}>Huỷ</Button>
                    <Button onClick={onClose} type="primary">
                        Lưu
                    </Button>
                </Space>
            }
        >
            <Form layout="vertical" component="div">
                <div className="passenger-list mt-3 pt-3 border-t">
                    {bookingItems.map((item, _index) => (
                        <div
                            className="pax-item flex justify-between py-3 border-b"
                            key={_index}
                        >
                            <div>
                                <span className="mr-2">
                                    {`Hành khách ${_index + 1}`}
                                </span>
                                <span className="text-xs text-gray-600">
                                    {`(${getPassengerType(item.type)})`}
                                </span>
                            </div>
                            <div className="flex items-center">
                                <div className="quantiy mr-6">
                                    <Quantity
                                        size="sm"
                                        value={1}
                                        onChange={(action, value) => {}}
                                    />
                                </div>
                                <div className="price">
                                    <span className="block text-xs">
                                        Chỉ từ
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="serviie-items">
                    <div>
                        {pricingItems.map((item, _index) => (
                            <div key={_index}>
                                <div>{item.class}</div>
                                <div>{item["adult"]}</div>
                                <Quantity
                                    size="sm"
                                    value={1}
                                    onChange={(action, value) => {}}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </Form>
        </Drawer>
    );
};
export default DrawerServiceItem;
