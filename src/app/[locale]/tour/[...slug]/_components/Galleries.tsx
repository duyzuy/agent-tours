"use client";
import Image from "next/image";

interface GalleriesProps {
    data: any;
    data2: any;
}
const Galleries: React.FC<GalleriesProps> = ({ data, data2 }) => {
    console.log(data);
    console.log(data2);
    return (
        <div className="galleries">
            <div className="feature mb-4">
                <Image
                    src="/assets/images/tour-detail/tour-detail-thumb.png"
                    alt="thumbnail"
                    width={1200}
                    height={550}
                    className="rounded-lg"
                />
            </div>
            <div className="thumbnails flex items-center gap-x-4">
                <Image
                    src="/assets/images/tour-detail/tour-detail-thumb-1.png"
                    alt="thumbnail"
                    width={220}
                    height={180}
                    className="rounded-lg"
                />
                <Image
                    src="/assets/images/tour-detail/tour-detail-thumb-2.png"
                    alt="thumbnail"
                    width={220}
                    height={180}
                    className="rounded-lg"
                />
                <Image
                    src="/assets/images/tour-detail/tour-detail-thumb-3.png"
                    alt="thumbnail"
                    width={220}
                    height={180}
                    className="rounded-lg"
                />
                <Image
                    src="/assets/images/tour-detail/tour-detail-thumb-4.png"
                    alt="thumbnail"
                    width={220}
                    height={180}
                    className="rounded-lg"
                />
            </div>
        </div>
    );
};
export default Galleries;
