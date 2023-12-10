import Image from "next/image";
const BannerSection = () => {
    return (
        <section className="banners">
            <div className="container mx-auto flex items-center gap-x-4">
                <div className="banner rounded-md overflow-hidden">
                    <Image
                        src="/assets/images/banner-1.jpg"
                        alt="banner"
                        width={900}
                        height={600}
                    />
                </div>
                <div className="banner rounded-md overflow-hidden">
                    <Image
                        src="/assets/images/banner-2.jpg"
                        alt="banner"
                        width={900}
                        height={600}
                    />
                </div>
                <div className="banner rounded-md overflow-hidden">
                    <Image
                        src="/assets/images/banner-3.jpg"
                        alt="banner"
                        width={900}
                        height={600}
                    />
                </div>
            </div>
        </section>
    );
};
export default BannerSection;
