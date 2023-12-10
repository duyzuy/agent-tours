import Image from "next/image";
import { Button, Collapse, CollapseProps } from "antd";
import { CaretRightOutlined, DownCircleOutlined } from "@ant-design/icons";
import styled from "styled-components";
import CustomCollapse from "@/components/frontend/CustomCollapse";
const TourShedulePanel = () => {
    const Panel = Collapse.Panel;
    const text = `
    <p>Sáng: Xe và HDV AN THAI TRAVEL đón Quý Khách tại Đà Nẵng theo điểm hẹn từ 7h-13h00 (sau thời gian này, Quý khách vui lòng tự túc nhập đoàn).</p>
 <p>Trưa: Đoàn về trung tâm thành phố dùng bữa trưa đặc sản Đà Nẵng “Bánh tráng cuốn thịt heo hai đầu da & mỳ quảng”. Nhận phòng khách sạn nghỉ ngơi.</p>
<p>Khởi hành đi Bán Đảo Sơn Trà tham quan phố biển Đà Nẵng trên cao, viếng Linh Ứng Tự - nơi có tượng Phật Bà 67m cao nhất Việt Nam và tắm biển Mỹ Khê Đà Nẵng.</p>
`;

    const panelStyle: React.CSSProperties = {};
    const schedulePanels = [
        {
            label: "NGÀY 1: TP. HỒ CHÍ MINH - ĐÀ NẴNG",
            key: "day1",
            children: (
                <div
                    className="panel-content"
                    dangerouslySetInnerHTML={{ __html: text }}
                ></div>
            ),
            style: panelStyle,
        },
        {
            label: "NGÀY 2: CÙ LAO CHÀM – PHỐ CỔ HỘI AN",
            key: "day2",
            children: (
                <div
                    className="panel-content"
                    dangerouslySetInnerHTML={{ __html: text }}
                ></div>
            ),
            style: panelStyle,
        },
        {
            label: "NGÀY 3: BÀ NÀ – TẮM BIỂN MỸ KHÊ",
            key: "day3",
            children: (
                <div
                    className="panel-content"
                    dangerouslySetInnerHTML={{ __html: text }}
                ></div>
            ),
            style: panelStyle,
        },
    ];
    const onChangePanel = () => {};
    return (
        <div className="panel-wrappers">
            <CustomCollapse
                defaultActiveKey={["day1", "day2", "day3"]}
                onChange={onChangePanel}
                ghost
                bordered={false}
                expandIconPosition="end"
                items={schedulePanels}
            />
        </div>
    );
};
export default TourShedulePanel;
