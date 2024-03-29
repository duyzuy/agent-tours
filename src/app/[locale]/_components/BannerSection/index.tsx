import Image from "next/image";
const BannerSection = () => {
    return (
        <section className="banners">
            <div className="container mx-auto lg:px-0 px-4">
                <div className="items-center flex flex-wrap -mx-3">
                    <div className="banner overflow-hidden mb-3 px-3 w-1/2 md:w-1/3">
                        <Image
                            src="/assets/images/banner-1.jpg"
                            alt="banner"
                            width={900}
                            height={600}
                            className="rounded-md"
                        />
                    </div>
                    <div className="banner  overflow-hidden mb-3 px-3 w-1/2 md:w-1/3">
                        <Image
                            src="/assets/images/banner-2.jpg"
                            alt="banner"
                            width={900}
                            height={600}
                            className="rounded-md"
                        />
                    </div>
                    <div className="banner overflow-hidden mb-3 px-3 w-1/2 md:w-1/3">
                        <Image
                            src="/assets/images/banner-3.jpg"
                            alt="banner"
                            width={900}
                            height={600}
                            className="rounded-md"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};
export default BannerSection;
