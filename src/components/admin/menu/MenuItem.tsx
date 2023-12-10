import { useState } from "react";
import { Form, Input, Button } from "antd";
import TextArea from "antd/es/input/TextArea";
import { CaretDownOutlined, CaretUpOutlined } from "@ant-design/icons";

interface Props {
    name: string;
}
const MenuItem = ({ name }: Props) => {
    const [isEditting, setEditting] = useState(false);
    return (
        <div className="menu-item border w-[420px] mb-2 bg-gray-50 shadow-sm hover:border-gray-400" draggable>
            <div className="inner flex items-center justify-between pl-4 pr-2 py-2">
                <div className="item-name flex-1 mr-4">
                    <p className="font-bold">{name}</p>
                </div>
                <div className="item-type w-fit text-left flex items-center">
                    <span className="label mr-2 text-xs text-gray-500">Link tuy chon</span>
                    <span className="cursor-pointer w-6 h-6 flex items-center justify-center" onClick={() => setEditting((editting) => !editting)}>
                        {isEditting ? <CaretUpOutlined width={16} /> : <CaretDownOutlined width={16} />}
                    </span>
                </div>
            </div>
            {isEditting ? (
                <div className="dropdown-item">
                    <div className="form-container px-4 py-4 bg-white text-xs">
                        <Form layout="vertical" autoComplete="off">
                            <Form.Item name="label" label="Tên menu" className="mb-2">
                                <Input />
                            </Form.Item>
                            <Form.Item name="url" label="Link điều hướng" className="mb-2">
                                <Input />
                            </Form.Item>
                            <Form.Item name="description" label="Mô tả menu">
                                <TextArea />
                            </Form.Item>
                        </Form>
                        <div className="flex items-center text-xs">
                            <Button type="text" danger size="small">
                                Xoá bỏ
                            </Button>
                            <span>|</span>
                            <Button type="text" ghost size="small" className=" text-primary-default">
                                Huỷ bỏ
                            </Button>
                        </div>
                    </div>
                </div>
            ) : null}
        </div>
    );
};
export default MenuItem;
