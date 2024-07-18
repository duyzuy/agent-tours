import Image from "next/image";
import { mediaConfig } from "@/configs";
import { IThumbnail } from "@/models/thumbnail.interface";
interface ProductGalleryProps {
  images: IThumbnail[];
}
const ProductGallery: React.FC<ProductGalleryProps> = ({ images }) => {
  return (
    <div>
      {images.map(({ id, original, small }, _index) => (
        <div key={id}>
          <Image src={`${mediaConfig.rootApiPath}/${original}`} alt={_index.toString()} width={600} height={300} />
        </div>
      ))}
    </div>
  );
};
export default ProductGallery;
