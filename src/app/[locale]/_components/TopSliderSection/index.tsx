import Image from "next/image";
import NavbarSecond from "./NavbarSecond";
import BoxSearchTourFe from "../BoxSearchTourFe";
import { Suspense } from "react";

const TopSliderSection = async () => {
    return (
        <div className="page-middle relative pt-8 pb-6 lg:pb-16 w-full flex flex-col justify-end lg:justify-between min-h-[500px] lg:h-[650px]">
            <NavbarSecond className="hidden lg:block" />
            <div className="trv-slider absolute top-0 bottom-0 left-0 right-0">
                <Image
                    src="/assets/images/slide-banner.jpg"
                    fill
                    alt="slider"
                    style={{
                        objectFit: "cover",
                        objectPosition: "center",
                    }}
                />
            </div>
            <div className="box box-middle container mx-auto relative z-10">
                <div className="inner">
                    <div className="box-content text-white text-center py-6">
                        <h5 className="text-white drop-shadow-lg text-3xl lg:text-5xl font-bold mb-4">
                            Trải nghiệm kỳ nghỉ tuyệt vời
                        </h5>
                        <p className="font-bold text-lg lg:text-xl drop-shadow-md">
                            Combo khách sạn - vé máy bay - đưa đón sân bay giá
                            tốt nhất
                        </p>
                    </div>
                    <Suspense fallback="loadingnn">
                        <BoxSearchTourFe />
                    </Suspense>
                </div>
            </div>
        </div>
    );
};
export default TopSliderSection;
