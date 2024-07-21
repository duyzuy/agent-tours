"use client";
import { IconImages } from "@/assets/icons";
import { mediaConfig } from "@/configs";
import { IThumbnail } from "@/models/thumbnail.interface";
import classNames from "classnames";
import Image from "next/image";
import React, { useMemo, useState } from "react";
import PopupGalleries from "./PopupGalleries";

interface DestionationGalleryProps {
  images: IThumbnail[] | null;
}
const DestionationGallery: React.FC<DestionationGalleryProps> = ({ images }) => {
  const [open, setOpen] = useState(false);

  const thirdImageFirst = useMemo(() => {
    return images?.slice(0, 3);
  }, [images]);

  const handleClickOpen = () => {
    document.getElementsByTagName("body")[0].style.overflowY = "hidden";
    //document.getElementsByTagName("body")[0].style.width = "calc(100% - 15px)";

    setOpen(true);
  };
  const handleClose = () => {
    document.getElementsByTagName("body")[0].removeAttribute("style");
    setOpen(false);
  };

  if (!images || !images.length) {
    return null;
  }
  return (
    <>
      <div className="gallery grid grid-rows-3 grid-cols-3 grid-flow-dense gap-2 rounded-lg overflow-hidden mb-6">
        {thirdImageFirst?.map((item, _index) => (
          <div
            className={classNames("relative w-full h-full", {
              "col-span-2 row-span-3": _index === 0,
              "col-span-1 row-span-2": _index === 1,
              "col-span-1": _index !== 0 && _index !== 1,
            })}
            key={_index}
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
      {open ? <PopupGalleries images={images} onClose={handleClose} /> : null}
    </>
  );
};
export default DestionationGallery;
