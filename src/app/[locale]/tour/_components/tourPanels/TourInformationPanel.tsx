import Image from "next/image";
import CustomCollapse from "@/components/frontend/CustomCollapse";
const TourInformationPanel = () => {
    const content1 = `
    <ul style="list-style-type: initial;">
        <li>Vé thăm quan vào cổng 01 lần tại các điểm theo hành trình.</li>
        <li>Vé tàu Monorail không người lái.</li>
        <li>2 chai nước suối/ 01 ngày/01 người.</li>
        <li>Phí Visa và thủ tục làm nhập cảnh Dubai.</li>
        <li>Bảo hiểm du lich quốc tế hạn mức 650 triệu.</li>
        </ul>
    `;

    const content_note = `
    <ul style="list-style-type: initial;">
    <li> Hủy tour ngay sau khi đăng ký đến 10 ngày trước ngày khởi hành, phạt 30% trên giá tour.</li>
    <li>Hủy tour trong vòng từ 5 – 10 ngày trước ngày khởi hành, phạt 50% trên giá tour.</li>
    <li>Hủy tour trong vòng từ 3 – 5 ngày trước ngày khởi hành, phạt 75% trên giá tour.</li>
    <li>Hủy tour trong vòng từ 0 – 3 ngày trước ngày khởi hành, phạt 100% giá trị tour.</li>
    <li>Riêng vé máy bay không hoàn. Không hủy theo quy định của hãng hàng không.</li>
    <li>Ngày lễ tết không hoàn, không hủy, không đổi, không áp dụng chính sách hủy trên.</li>
    <li>Dưới 04 tuổi: Miễn phí (chi phí phát sinh trên tour gia đình tự chi trả). Hai người lớn chỉ được kèm theo 01 trẻ, từ trẻ thứ hai tính 50% giá tour.
    Từ 05 – dưới 9 tuổi: 50% giá tour người lớn, ngủ ghép với gia đình. Hai người lớn chỉ được kèm theo 01 trẻ, từ trẻ thứ hai tính giá như người lớn.
    Từ 10 tuổi trở lên: giá tour như người lớn.</li>
    <li>Yêu cầu cung cấp chiều cao trẻ em nếu tham gia chương trình công viên, một số điểm thăm quan có đo chiều cao khi vào cổng ( vé phải đặt và thanh toán trước 01 ngày)
    Trường hợp bất khả kháng do thiên tai, dịch bệnh hoặc các yếu tố thời tiết khác nguy hiểm thì Tour lập tức sẽ dừng không khởi hành mà không được báo trước.
    Tour được Topten tổ chức chứ không liên minh, liên kết hoặc gửi lại các Công ty khác, trường hợp số lượng khách quá ít không đảm bảo thì Topten sẽ không khởi hành để lùi thời gian khởi hành vào các Tour sau đông vui hơn, mục đích để không mang lại cảm giác nhàm chán cho du khách.
    </li>
    <li>Lưu ý: khách từ 14 tuổi trở lên phải mang CMND/Passport bản chính, trẻ em dưới 14 tuổi mang theo giấy Khai Sinh / Passport bản chính.
    Các lưu ý khi đi máy bay:</li>
    </ul>
    `;

    const schedulePanels = [
        {
            label: "Bao gồm",
            key: "day1",
            children: (
                <div
                    className="panel-content"
                    dangerouslySetInnerHTML={{ __html: content1 }}
                ></div>
            ),
        },
        {
            label: "Không bao gồm",
            key: "day2",
            children: (
                <div
                    className="panel-content"
                    dangerouslySetInnerHTML={{ __html: content1 }}
                ></div>
            ),
        },
        {
            label: "Lưu ý",
            key: "day3",
            children: (
                <div
                    className="panel-content"
                    dangerouslySetInnerHTML={{ __html: content_note }}
                ></div>
            ),
        },
    ];

    return (
        <div className="panel-wrappers">
            <div className="section-1 descriptions">
                <p>
                    Được mệnh danh là thành phố đáng sống nhất của Việt Nam, Đà
                    Nẵng có vị trí thuận lợi nằm ngay trung độ của đất nước và
                    là trung điểm của ba di sản thế giới: Cố đô Huế, Thánh địa
                    Mỹ Sơn và phố cổ Hội An. Nơi đây có không khí trong lành,
                    cảnh quan thiên nhiên đa dạng và nhiều điểm tham quan nổi
                    tiếng như cầu sông Hàn, Bà Nà Hills, Ngũ Hành Sơn, bán đảo
                    Sơn Trà,...
                </p>
                <p>
                    Đà Nẵng nằm giữa ba di sản thế giới: cố đô Huế, phố cổ Hội
                    An và thánh địa Mỹ Sơn. Đà Nẵng còn có nhiều danh thắng
                    tuyệt đẹp say lòng du khách như Ngũ Hành Sơn, Bà Nà, bán đảo
                    Sơn Trà, đèo Hải Vân, sông Hàn thơ mộng và cầu quay Sông Hàn
                    – niềm tự hào của thành phố, và biển Mỹ Khê đẹp nhất hành
                    tinh.
                </p>
                <Image
                    src="/assets/images/tour-detail/tour-detail-thumb.png"
                    alt="image"
                    width={1200}
                    height={300}
                />
                <p>
                    Hủy tour ngay sau khi đăng ký đến 10 ngày trước ngày khởi
                    hành, phạt 30% trên giá tour. Hủy tour trong vòng từ 5 – 10
                    ngày trước ngày khởi hành, phạt 50% trên giá tour. Hủy tour
                    trong vòng từ 3 – 5 ngày trước ngày khởi hành, phạt 75% trên
                    giá tour. Hủy tour trong vòng từ 0 – 3 ngày trước ngày khởi
                    hành, phạt 100% giá trị tour. Riêng vé máy bay không hoàn.
                    Không hủy theo quy định của hãng hàng không. Ngày lễ tết
                    không hoàn, không hủy, không đổi, không áp dụng chính sách
                    hủy trên Dưới 04 tuổi: Miễn phí (chi phí phát sinh trên tour
                    gia đình tự chi trả). Hai người lớn chỉ được kèm theo 01
                    trẻ, từ trẻ thứ hai tính 50% giá tour. Từ 05 – dưới 9 tuổi:
                    50% giá tour người lớn, ngủ ghép với gia đình. Hai người lớn
                    chỉ được kèm theo 01 trẻ, từ trẻ thứ hai tính giá như người
                    lớn. Từ 10 tuổi trở lên: giá tour như người lớn. Tuổi tính
                    theo năm sinh. Yêu cầu cung cấp chiều cao trẻ em nếu tham
                    gia chương trình công viên, một số điểm thăm quan có đo
                    chiều cao khi vào cổng ( vé phải đặt và thanh toán trước 01
                    ngày) Trường hợp bất khả kháng do thiên tai, dịch bệnh hoặc
                    các yếu tố thời tiết khác nguy hiểm thì Tour lập tức sẽ dừng
                    không khởi hành mà không được báo trước. Tour được Topten tổ
                    chức chứ không liên minh, liên kết hoặc gửi lại các Công ty
                    khác, trường hợp số lượng khách quá ít không đảm bảo thì
                    Topten sẽ không khởi hành để lùi thời gian khởi hành vào các
                    Tour sau đông vui hơn, mục đích để không mang lại cảm giác
                    nhàm chán cho du khách.
                </p>
            </div>
            <div className="section-2">
                <CustomCollapse
                    defaultActiveKey={["day1", "day2", "day3"]}
                    onChange={() => {}}
                    ghost
                    bordered={false}
                    items={schedulePanels}
                />
            </div>
        </div>
    );
};
export default TourInformationPanel;
