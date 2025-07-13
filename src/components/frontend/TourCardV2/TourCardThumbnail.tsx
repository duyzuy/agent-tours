import Image from "next/image";
import { IconImage } from "@/assets/icons";
export type TourCardThumbnailProps = {
  className?: string;
  thumbnailUrl: string | undefined;
  alt?: string;
};
const TourCardThumbnail: React.FC<TourCardThumbnailProps> = ({ className, thumbnailUrl, alt = "" }) => {
  return (
    <div className="thumbnail w-full pt-[66.67%] relative italic bg-slate-50 rounded-2xl overflow-hidden">
      {thumbnailUrl ? (
        <Image src={thumbnailUrl} alt={alt} fill className="rounded-tl-lg rounded-tr-lg object-cover" />
      ) : (
        <div className="w-full h-full absolute left-0 top-0 flex items-center justify-center">
          <span className="text-center text-gray-500 block opacity-60">
            <IconImage className="mx-auto mb-1" />
            <span className="block text-xs">no image</span>
          </span>
        </div>
      )}
    </div>
  );
};
export default TourCardThumbnail;
