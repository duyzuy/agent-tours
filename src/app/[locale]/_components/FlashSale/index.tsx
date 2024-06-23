import TourCard from "@/components/frontend/TourCard";
const FlashSale = () => {
    return (
        <section className="flash-sale">
            <div className="container mx-auto bg-main-400 rounded-md lg:py-6 lg:px-6 px-4 py-4">
                <div className="inner flex flex-wrap items-center">
                    <div className="content w-[260px] hidden lg:block">
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
                    <div className="items flex flex-wrap -mx-3 flex-1">
                        <TourCard
                            thumbnail="/assets/images/article-1.jpg"
                            name=" Liên Tuyến Trung Bắc: Đà Nẵng - Huế - Động Phong Nha & Thiên Đường"
                            className="w-1/2 lg:w-1/3 px-3 lg:mb-0 mb-6"
                        />
                        <TourCard
                            thumbnail="/assets/images/article-2.jpg"
                            name=" Liên Tuyến Trung Bắc: Cầu Vàng - Hội An - Hà Nội - Sapa - Fansipan - Vịnh Hạ"
                            className="w-1/2 lg:w-1/3 px-3 lg:mb-0 mb-6"
                        />
                        <TourCard
                            thumbnail="/assets/images/article-3.jpg"
                            name="Động Phong Nha & Thiên Đường - Bà Nà - Cầu Vàng - Hội An - Hà Nội - Sapa - Fansipan - Vịnh Hạ
                    Long"
                            className="w-1/2 lg:w-1/3 px-3 lg:mb-0 mb-6"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};
export default FlashSale;
