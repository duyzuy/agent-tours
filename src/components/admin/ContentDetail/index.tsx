import React from "react";
export interface ContentDetailProps {
    contents?: { label?: string; value?: string }[];
}

const ContentDetail: React.FC<ContentDetailProps> = ({ contents }) => {
    return (
        <ul>
            {contents?.map(({ label, value }, _index) => (
                <li className="flex py-2" key={_index}>
                    <span className="w-36 text-left">{label}</span>
                    <span
                        className="pl-3 flex-1 text-left"
                        style={{ width: "calc(100% - 144px)" }}
                    >{`: ${typeof value === "string" ? value : value}`}</span>
                </li>
            ))}
        </ul>
    );
};
export default ContentDetail;
