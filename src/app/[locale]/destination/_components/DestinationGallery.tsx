"use client";
import { IconImages } from "@/assets/icons";
import { mediaConfig } from "@/configs";
import { IThumbnail } from "@/models/thumbnail.interface";
import classNames from "classnames";
import Image from "next/image";
import React, { useMemo, useRef, useState } from "react";
import PopupGalleries from "./CarouselGallery";
import CustomModal from "@/components/base/CustomModal";
import CarouselGallery from "./CarouselGallery";

interface DestionationGalleryProps {
  images: IThumbnail[] | null;
}
const DestionationGallery: React.FC<DestionationGalleryProps> = ({ images }) => {
  const [open, setOpen] = useState(false);
  const windowRef = useRef(0);

  const thirdImageFirst = useMemo(() => {
    return images?.slice(0, 5);
  }, [images]);

  const handleClickOpen = () => {
    const body = document.getElementsByTagName("body")[0];

    const scrollY = window.scrollY;
    windowRef.current = scrollY;

    body.style.overflowY = "hidden";
    body.style.position = "fixed";
    body.style.top = `-${scrollY}px`;
    body.style.left = "0px";
    body.style.right = "0px";
    setOpen(true);
  };
  const handleClose = () => {
    document.getElementsByTagName("body")[0].removeAttribute("style");
    window.scrollTo({ top: windowRef.current });
    setOpen(false);
  };

  if (!images || !images.length) {
    return null;
  }
  return (
    <>
      <div className="gallery grid grid-rows-3 grid-cols-8 grid-flow-dense gap-1 rounded-xl overflow-hidden mb-6">
        {thirdImageFirst?.map((item, _index) => (
          <div
            key={_index}
            className={classNames("relative w-full h-full", {
              "col-span-5 row-span-3": _index === 0,
              "col-span-3 row-span-2": _index === 1,
              "col-span-3 row-span-1": _index === 2,
              "col-span-4": _index !== 0 && _index !== 1 && _index !== 2,
            })}
          >
            <div className="thumb h-16 lg:h-32">
              <Image src={`${mediaConfig.rootApiPath}/${item.original}`} fill className=" object-cover" alt="" />
              {_index === 2 ? (
                <div
                  className="bg-gray-900/80 hover:bg-gray-900/60 flex items-center justify-center absolute left-0 top-0 w-full h-full cursor-pointer"
                  onClick={handleClickOpen}
                >
                  <span className="flex items-center text-white">
                    <span className="mr-2 flex items-center">
                      <IconImages className="mr-1" />
                      {`(${images.length})`}
                    </span>
                    <span>Xem them</span>
                  </span>
                </div>
              ) : null}
            </div>
          </div>
        ))}
      </div>
      <CustomModal open={open} onClose={handleClose}>
        <CarouselGallery images={images} />
      </CustomModal>
    </>
  );
};
export default DestionationGallery;
