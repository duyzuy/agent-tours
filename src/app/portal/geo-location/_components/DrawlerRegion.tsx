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
interface DrawlerRegionProps {
    isOpen?: boolean;
    onClose: () => void;
    actionType?: "create" | "edit";
    initalValue?: any;
    onSubmit?: () => void;
}
const DrawlerRegion: React.FC<DrawlerRegionProps> = ({
    isOpen,
    onClose,
    actionType = "create",
    onSubmit,
}) => {
    return (
        <Drawer
            title={actionType === "create" ? "Thông tin khu vực" : "Chỉnh sửa"}
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
                    name="regionKey"
                    label="Mã khu vực *"
                    rules={[
                        {
                            required: true,
                            message: "Please enter user name",
                        },
                    ]}
                >
                    <Input placeholder="Nhập mã khu vực" />
                </Form.Item>
                <Form.Item
                    name="regionName"
                    label="Tên khu vực - VI"
                    rules={[{ required: true, message: "Please enter url" }]}
                >
                    <Input
                        style={{ width: "100%" }}
                        placeholder="Nhập tên khu vực"
                    />
                </Form.Item>
                <Form.Item
                    name="regionName"
                    label="Tên khu vực - EN"
                    rules={[{ required: true, message: "Please enter url" }]}
                >
                    <Input
                        style={{ width: "100%" }}
                        placeholder="Nhập tên khu vực"
                    />
                </Form.Item>
                <Row gutter={16}>
                    <Col span={12}></Col>
                    <Col span={12}></Col>
                </Row>
            </Form>
        </Drawer>
    );
};
export default DrawlerRegion;
