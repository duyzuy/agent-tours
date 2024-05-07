import React, { memo, useEffect, useRef, useState } from "react";
import type { InputProps, InputRef } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { Input, Space, Tag } from "antd";
import { isUndefined } from "lodash";

interface InputTourCodeProps {
    value?: string[];
    onChange?: (value: string[]) => void;
}

const tagInputStyle: React.CSSProperties = {
    width: 90,
    height: 22,
    marginInlineEnd: 8,
    verticalAlign: "top",
};
const InputTourCode: React.FC<InputTourCodeProps> = ({ value, onChange }) => {
    const [codes, setCodes] = useState<string[]>([]);
    const [inputVisible, setInputVisible] = useState(false);
    const [inputValue, setInputValue] = useState("");
    const [editInputIndex, setEditInputIndex] = useState<number>(-1);
    const [editInputValue, setEditInputValue] = useState<string>("");
    const inputRef = useRef<InputRef>(null);

    const showInputTourCode = () => setInputVisible(true);

    const handleInputChange: InputProps["onChange"] = (ev) => {
        setInputValue(ev.target.value);
    };

    const handleInputConfirm = () => {
        if (inputValue && codes.indexOf(inputValue) === -1) {
            if (isUndefined(value)) {
                setCodes([...codes, inputValue]);
            }

            onChange?.([...codes, inputValue]);
        }

        setInputVisible(false);
        setInputValue("");
    };

    const handleRemoveCode = (removeCode: string) => {
        const newCodes = codes.filter((code) => code !== removeCode);
        onChange?.(newCodes);
        setCodes(newCodes);
    };
    const handleEditInputChange: InputProps["onChange"] = (ev) =>
        setEditInputValue(ev.target.value);

    const handleEditInputConfirm = () => {
        const newCodes = [...codes];
        newCodes[editInputIndex] = editInputValue;

        setCodes(newCodes);
        onChange?.([...newCodes]);

        setEditInputIndex(-1);
        setEditInputValue("");
    };
    useEffect(() => {
        if (inputVisible) {
            inputRef.current?.focus();
        }
    }, [inputVisible]);

    useEffect(() => {
        value && value.length && setCodes(value);
    }, [value]);
    return (
        <>
            <div className="code-list mb-3">
                <Space wrap>
                    {codes.map((code, _index) => {
                        if (_index === editInputIndex) {
                            return (
                                <Input
                                    key={code}
                                    value={editInputValue}
                                    size="small"
                                    style={tagInputStyle}
                                    onChange={handleEditInputChange}
                                    onBlur={handleEditInputConfirm}
                                    onPressEnter={handleEditInputConfirm}
                                />
                            );
                        } else {
                            const isLongCode = code.length > 20;
                            return (
                                <Tag
                                    key={code}
                                    closable={true}
                                    style={{ userSelect: "none" }}
                                    onClose={() => handleRemoveCode(code)}
                                >
                                    <span
                                        onDoubleClick={(e) => {
                                            setEditInputIndex(_index);
                                            setEditInputValue(code);
                                            e.preventDefault();
                                        }}
                                    >
                                        {isLongCode
                                            ? `${code.slice(0, 20)}...`
                                            : code}
                                    </span>
                                </Tag>
                            );
                        }
                    })}
                </Space>
            </div>
            {inputVisible ? (
                <Input
                    ref={inputRef}
                    type="text"
                    size="small"
                    style={{ width: 90 }}
                    value={inputValue}
                    onChange={handleInputChange}
                    onBlur={handleInputConfirm}
                    onPressEnter={handleInputConfirm}
                />
            ) : (
                <Tag
                    onClick={showInputTourCode}
                    style={{ borderStyle: "dashed", cursor: "pointer" }}
                >
                    <PlusOutlined /> Thêm mã tour
                </Tag>
            )}
        </>
    );
};
export default memo(InputTourCode);
