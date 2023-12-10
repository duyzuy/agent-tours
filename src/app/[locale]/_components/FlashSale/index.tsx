import TourCard from "@/components/frontend/TourCard";
const FlashSale = () => {
    return (
        <section className="flash-sale">
            <div className="container mx-auto bg-main-400 rounded-md py-6 px-6">
                <div className="inner flex items-center">
                    <div className="content w-[280px]">
                        <div className="text-white">
                            <div className="promo-name text-center text-lg mb-3">
                                <p>Chương trình</p>
                                <p>Promotion Travel Event</p>
                            </div>
                            <p className="text-center">Kết thúc sau 3 ngày</p>
                            <div className="count-down flex gap-x-2 items-center justify-center py-6">
                                <span className="w-10 h-10 font-semibold bg-white text-gray-700 rounded-full flex items-center justify-center">
                                    32
                                </span>
                                <span className="w-10 h-10 font-semibold bg-white text-gray-700 rounded-full flex items-center justify-center">
                                    12
                                </span>
                                <span className="w-10 h-10 font-semibold bg-white text-gray-700 rounded-full flex items-center justify-center">
                                    22
                                </span>
                            </div>
                            <p className="text-center">
                                Siêu giảm giá đến
                                <span className="block text-2xl font-bold">
                                    30%
                                </span>
                            </p>
                        </div>
                    </div>
                    <div className="items flex items-center gap-x-4 flex-1">
                        <TourCard
                            thumbnail="/assets/images/article-1.jpg"
                            title=" Liên Tuyến Trung Bắc: Đà Nẵng - Huế - Động Phong Nha & Thiên Đường"
                        />
                        <TourCard
                            thumbnail="/assets/images/article-2.jpg"
                            title=" Liên Tuyến Trung Bắc: Cầu Vàng - Hội An - Hà Nội - Sapa - Fansipan - Vịnh Hạ"
                        />
                        <TourCard
                            thumbnail="/assets/images/article-3.jpg"
                            title="Động Phong Nha & Thiên Đường - Bà Nà - Cầu Vàng - Hội An - Hà Nội - Sapa - Fansipan - Vịnh Hạ
                    Long"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};
export default FlashSale;
