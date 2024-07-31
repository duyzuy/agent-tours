"use client";
import { IconFacebook, IconTwitter, IconLink, IconShare } from "@/assets/icons";
import { SITE_NAME, SITE_URL } from "@/configs/site";
import { Modal, Popover } from "antd";
import classNames from "classnames";
import { useLocale } from "next-intl";
import { useState } from "react";
export interface SocialsShareProps {
  title?: string;
  url?: string;
  hideLabel?: boolean;
  className?: string;
  isMobile?: boolean;
}
const SocialsShare: React.FC<SocialsShareProps> = ({
  title,
  url = "/",
  hideLabel = false,
  isMobile = true,
  className = "",
}) => {
  const locale = useLocale();
  const fullUrl = url.startsWith("/") ? `${SITE_URL}/${locale}${url}` : `${SITE_URL}/${locale}/${url}`;
  const [openPopover, setOpenPopover] = useState(false);
  const [openModalShare, setOpenModalShare] = useState(false);

  const handleOpenChange = (newOpen: boolean) => {
    navigator.clipboard.writeText(fullUrl);
    setOpenPopover(newOpen);
  };

  const handleSharing = async () => {
    const shareData: ShareData = { title: SITE_NAME, text: title, url: fullUrl };
    if (!navigator.canShare) {
      console.log("no support share.");
      setOpenModalShare(true);
    } else if (navigator.canShare(shareData)) {
      navigator.share(shareData);
    } else {
      console.log("Specified data cannot be shared.");
    }
  };
  return isMobile ? (
    <>
      <span className="w-8 h-8 flex items-center justify-center bg-slate-100 rounded-full hover:bg-slate-200 cursor-pointer">
        <span className="text-gray-600" onClick={handleSharing}>
          <IconShare />
        </span>
      </span>
      <Modal open={openModalShare} width={240} footer={null} closeIcon={null} onCancel={() => setOpenModalShare(false)}>
        <div className="share-container">
          <span className="block mb-6 text-center">Chia sẻ</span>
          <ul className="flex items-center justify-center gap-x-2">
            <li className="w-8 h-8 flex items-center justify-center bg-slate-100 rounded-full hover:bg-slate-200 cursor-pointer">
              <Popover content="Đã sao chép." trigger="click" open={openPopover} onOpenChange={handleOpenChange}>
                <span className="text-gray-600">
                  <IconLink width={16} height={16} />
                </span>
              </Popover>
            </li>
            <li className="w-8 h-8 flex items-center justify-center bg-slate-100 rounded-full hover:bg-slate-200 cursor-pointer">
              <a
                href={`https://www.facebook.com/sharer/sharer.php?kid_directed_site=0&sdk=joey&u=${fullUrl}/&src=share_button&display=popup`}
                title={title}
                rel="nofollow"
                target="_blank"
              >
                <span className="text-gray-600">
                  <IconFacebook width={16} height={16} />
                </span>
              </a>
            </li>
            <li className="w-8 h-8 flex items-center justify-center bg-slate-100 rounded-full hover:bg-slate-200 cursor-pointer">
              <a
                href={`https://x.com/intent/post?text=${title}&url=${fullUrl}`}
                title={title}
                rel="nofollow"
                target="_blank"
              >
                <span className="text-gray-600">
                  <IconTwitter width={16} height={16} />
                </span>
              </a>
            </li>
          </ul>
        </div>
      </Modal>
    </>
  ) : (
    <div
      className={classNames("social-share flex items-center", {
        [className]: className,
      })}
    >
      {hideLabel ? null : <span className="social-share__label mr-6 font-[500]">Chia sẻ</span>}
      <ul className="flex items-center justify-center gap-x-2">
        <li className="w-8 h-8 flex items-center justify-center bg-slate-100 rounded-full hover:bg-slate-200 cursor-pointer">
          <Popover content="Đã sao chép." trigger="click" open={openPopover} onOpenChange={handleOpenChange}>
            <span className="text-gray-600">
              <IconLink width={16} height={16} />
            </span>
          </Popover>
        </li>
        <li className="w-8 h-8 flex items-center justify-center bg-slate-100 rounded-full hover:bg-slate-200 cursor-pointer">
          <a
            href={`https://www.facebook.com/sharer/sharer.php?kid_directed_site=0&sdk=joey&u=${fullUrl}/&src=share_button&display=popup`}
            title={title}
            rel="nofollow"
            target="_blank"
          >
            <span className="text-gray-600">
              <IconFacebook width={16} height={16} />
            </span>
          </a>
        </li>
        <li className="w-8 h-8 flex items-center justify-center bg-slate-100 rounded-full hover:bg-slate-200 cursor-pointer">
          <a
            href={`https://x.com/intent/post?text=${title}&url=${fullUrl}`}
            title={title}
            rel="nofollow"
            target="_blank"
          >
            <span className="text-gray-600">
              <IconTwitter width={16} height={16} />
            </span>
          </a>
        </li>
      </ul>
    </div>
  );
};
export default SocialsShare;
