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

const { Option } = Select;
interface DrawlerCountryProps {
    isOpen?: boolean;
    onClose: () => void;
    actionType?: "create" | "edit";
    initalValue?: any;
    onSubmit?: () => void;
}
const DrawlerCountry: React.FC<DrawlerCountryProps> = ({
    isOpen,
    onClose,
    actionType = "create",
    onSubmit,
}) => {
    return (
        <Drawer
            title={actionType === "create" ? "Thông tin Quốc gia" : "Chỉnh sửa"}
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
            <Form layout="vertical" hideRequiredMark>
                <Form.Item
                    name="countryCode"
                    label="Mã quốc gia *"
                    rules={[
                        {
                            required: true,
                            message: "Please enter user name",
                        },
                    ]}
                >
                    <Input placeholder="Nhập mã quốc gia" />
                </Form.Item>
                <Form.Item
                    name="regionName"
                    label="Tên quốc gia - VI"
                    rules={[{ required: true, message: "Please enter url" }]}
                >
                    <Input
                        style={{ width: "100%" }}
                        placeholder="Nhập tên quốc gia"
                    />
                </Form.Item>
                <Form.Item
                    name="regionName"
                    label="Tên quốc gia - EN"
                    rules={[{ required: true, message: "Please enter url" }]}
                >
                    <Input
                        style={{ width: "100%" }}
                        placeholder="Nhập tên quốc gia"
                    />
                </Form.Item>
                <Form.Item
                    name="region"
                    label="Chọn khu vực *"
                    rules={[
                        {
                            required: true,
                            message: "Vui lòng chọn khu vực",
                        },
                    ]}
                >
                    <Select placeholder="Chọn khu vực">
                        <Option value="jack">Châu Á</Option>
                        <Option value="tom1">Châu Âu</Option>
                        <Option value="tom11">Châu Mỹ</Option>
                        <Option value="tom111">Châu Phi</Option>
                    </Select>
                </Form.Item>
            </Form>
        </Drawer>
    );
};
export default DrawlerCountry;
