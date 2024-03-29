import IconChevronRight from "@/assets/icons/IconChevronRight";
import IconChevronUp from "@/assets/icons/IconChevronUp";
import classNames from "classnames";
import Image from "next/image";
import Link from "next/link";

const DOMS = [
    [
        {
            id: 1,
            name: "Du lịch Hà Nội",
            slug: "",
        },
        {
            id: 2,
            name: "Du lịch Sapa",
            slug: "",
        },
        {
            id: 3,
            name: "Du lịch Ninh Bình",
            slug: "",
        },
        {
            id: 4,
            name: "Du lịch Đà Nẵng",
            slug: "",
        },
        {
            id: 5,
            name: "Du lịch Đà Lạt",
            slug: "",
        },
    ],
    [
        {
            id: 6,
            name: "Du lịch Hà Nội",
            slug: "",
        },
        {
            id: 7,
            name: "Du lịch Sapa",
            slug: "",
        },
        {
            id: 8,
            name: "Du lịch Ninh Bình",
            slug: "",
        },
        {
            id: 9,
            name: "Du lịch Đà Nẵng",
            slug: "",
        },
        {
            id: 10,
            name: "Du lịch Đà Lạt",
            slug: "",
        },
    ],
    [
        {
            id: 11,
            name: "Du lịch Hà Nội",
            slug: "",
        },
        {
            id: 12,
            name: "Du lịch Sapa",
            slug: "",
        },
        {
            id: 13,
            name: "Du lịch Ninh Bình",
            slug: "",
        },
        {
            id: 14,
            name: "Du lịch Đà Nẵng",
            slug: "",
        },
        {
            id: 15,
            name: "Du lịch Đà Lạt",
            slug: "",
        },
    ],
];

const THONGTIN = [
    [
        {
            id: 111,
            name: "Về chúng tôi",
            slug: "",
        },
        {
            id: 21,
            name: "Tuyển dụng",
            slug: "",
        },
    ],
    [
        {
            id: 611,
            name: "Điểm tim Visa",
            slug: "",
        },
        {
            id: 711,
            name: "Chính sách bảo mật",
            slug: "",
        },
    ],
    [
        {
            id: 111,
            name: "Trải nghiệm du lịch",
            slug: "",
        },
        {
            id: 1211,
            name: "Điều khoản sử dụng",
            slug: "",
        },
    ],
];

const PAYS = [
    {
        id: 123,
        name: "pay 1",
        thumbnail: "/assets/icons/ico-pay-master.png",
    },
    {
        id: 1231,
        name: "pay 2",
        thumbnail: "/assets/icons/ico-pay-visa.png",
    },
    {
        id: 1233,
        name: "pay 3",
        thumbnail: "/assets/icons/ico-pay-jcb.png",
    },
    {
        id: 12344,
        name: "pay 4",
        thumbnail: "/assets/icons/ico-pay-momo.png",
    },
    {
        id: 123123,
        name: "pay 5",
        thumbnail: "/assets/icons/ico-pay-american.png",
    },
    {
        id: 121233333,
        name: "pay 6",
        thumbnail: "/assets/icons/ico-pay-zalopay.png",
    },
    {
        id: 12432113,
        name: "pay 8",
        thumbnail: "/assets/icons/ico-pay-qr.png",
    },
    {
        id: 113223,
        name: "pay 9",
        thumbnail: "/assets/icons/ico-pay-napas.png",
    },
    {
        id: 121233,
        name: "pay 10",
        thumbnail: "/assets/icons/ico-pay-viettel.png",
    },
];

const SOCIALS = [
    { id: 123, name: "facebook", icon: "/assets/images/icon-fb.svg" },
    { id: 1234, name: "facebook", icon: "/assets/images/icon-insta.svg" },
    { id: 12355, name: "facebook", icon: "/assets/images/icon-line.svg" },
    { id: 12366, name: "facebook", icon: "/assets/images/icon-tw.svg" },
    { id: 12377, name: "facebook", icon: "/assets/images/icon-youtube.svg" },
    { id: 12388, name: "facebook", icon: "/assets/images/icon-zlo.svg" },
];
const Footer = () => {
    return (
        <footer className="footer">
            <div
                className="footer-top  bg-main-400 py-12"
                style={{
                    backgroundImage: "url(/assets/images/bg-ft-parten.png)",
                }}
            >
                <div className="container mx-auto px-4 lg:px-0">
                    <div className="flex flex-wrap -mx-4 lg:-mx-8">
                        <div className="w-full lg:w-1/2 px-4 lg:px-8 mb-6">
                            <div className="ft-title py-2 mb-3">
                                <h5 className="text-white font-semibold">
                                    TOUR TRONG NƯỚC
                                </h5>
                            </div>
                            <div className="w-full h-[1px] bg-gray-400 mb-3 opacity-50"></div>
                            <div className="ft-contents flex -mx-2 lg:-mx-3">
                                {DOMS.map((item, _index) => (
                                    <ul
                                        className="list w-1/3 px-2 lg:px-3"
                                        key={`doms-${_index}`}
                                    >
                                        {item.map((_item) => (
                                            <li
                                                className="py-[6px]"
                                                key={_item.id}
                                            >
                                                <Link
                                                    href={_item.slug}
                                                    className="flex items-center"
                                                >
                                                    <IconChevronRight
                                                        width={14}
                                                        className="stroke-white mr-2"
                                                    />
                                                    <span className="text-white text-sm">
                                                        {_item.name}
                                                    </span>
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                ))}
                            </div>
                        </div>
                        <div className="w-full lg:w-1/2 px-4 lg:px-8 mb-6">
                            <div className="ft-title py-2 mb-3">
                                <h5 className="text-white font-semibold">
                                    TOUR NƯỚC NGOÀI
                                </h5>
                            </div>
                            <div className="w-full h-[1px] bg-gray-400 mb-3 opacity-50"></div>
                            <div className="ft-contents flex -mx-2 lg:-mx-3">
                                {DOMS.map((item, _index) => (
                                    <ul
                                        className="list w-1/3 px-2 lg:px-3"
                                        key={`con-${_index}`}
                                    >
                                        {item.map((_item) => (
                                            <li
                                                className="py-[6px]"
                                                key={_item.id}
                                            >
                                                <Link
                                                    href={_item.slug}
                                                    className="flex items-center"
                                                >
                                                    <IconChevronRight
                                                        width={14}
                                                        className="stroke-white mr-2"
                                                    />
                                                    <span className="text-white text-sm">
                                                        {_item.name}
                                                    </span>
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                ))}
                            </div>
                        </div>
                        <div className="w-full lg:w-1/2 px-4 lg:px-8 mb-6">
                            <div className="ft-title py-2 mb-3">
                                <h5 className="text-white font-semibold">
                                    THÔNG TIN CHUNG
                                </h5>
                            </div>
                            <div className="w-full h-[1px] bg-gray-400 mb-3 opacity-50"></div>
                            <div className="ft-contents flex -mx-2 lg:-mx-3">
                                {THONGTIN.map((item, _index) => (
                                    <ul
                                        className="list w-1/3 px-2 lg:px-3"
                                        key={`tt-${_index}`}
                                    >
                                        {item.map((_item) => (
                                            <li
                                                className="py-[6px]"
                                                key={_item.id}
                                            >
                                                <Link
                                                    href={_item.slug}
                                                    className="flex items-center"
                                                >
                                                    <IconChevronRight
                                                        width={14}
                                                        className="stroke-white mr-2"
                                                    />
                                                    <span className="text-white text-sm">
                                                        {_item.name}
                                                    </span>
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                ))}
                            </div>
                        </div>
                        <div className="w-full lg:w-1/2 px-4 lg:px-8 mb-6">
                            <div className="ft-title py-2 mb-3">
                                <h5 className="text-white font-semibold">
                                    CHẤP NHẬN THANH TOÁN
                                </h5>
                            </div>
                            <div className="w-full h-[1px] bg-gray-400 mb-3 opacity-50"></div>
                            <div className="ft-contents bg-white rounded-lg py-3 px-3">
                                <ul className="list flex items-center">
                                    {PAYS.map((_item, _index) => (
                                        <li
                                            className={classNames("w-18", {
                                                "ml-1": _index !== 0,
                                            })}
                                            key={_index}
                                        >
                                            <Image
                                                src={_item.thumbnail}
                                                alt={_item.name}
                                                width={60}
                                                height={30}
                                            />
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="footer-bottom">
                <div className="container mx-auto lg:px-0 px-4 py-6">
                    <div className="inner flex flex-wrap items-center -mx-4 lg:-mx-8">
                        <div className="w-full lg:w-1/2 px-4 lg:px-8 mb-6 lg:mb-0">
                            <div className="cotnent text-xs">
                                <h6 className="text-xl font-semibold text-main-400 mb-4">
                                    CÔNG TY CỔ PHẦN AN THÁI TRAVEL
                                </h6>
                                <div className="flex items-center mb-1">
                                    <span className="w-12 mr-2">Địa chỉ:</span>
                                    <span>
                                        302/3 Phố Kim Mã, Phường Ngọc Khánh,
                                        Quận Ba Đình, TP. Hà Nội, Việt Nam.
                                    </span>
                                </div>
                                <div className="flex items-center mb-1">
                                    <span className="w-12 mr-2">Hotline:</span>
                                    <ul className="flex items-center">
                                        <li>PKD: +084 988 308 520</li>
                                        <li className="w-[1px] h-[6px] bg-slate-300 mx-2"></li>
                                        <li>Sale: +084 988 308 520</li>
                                        <li className="w-[1px] h-[6px] bg-slate-300 mx-2"></li>
                                        <li>CSKH: +084 988 308 520</li>
                                    </ul>
                                </div>
                                <div className="flex items-center mb-1">
                                    <span className="w-12 mr-2">Email:</span>
                                    <span>support@domain.com.vn</span>
                                </div>
                            </div>
                        </div>
                        <div className="w-full lg:w-1/2 px-4 lg:px-8">
                            <div className="cotnent flex items-center -mx-3">
                                <div className="socials px-3 flex-1">
                                    <div className="mb-3">
                                        <p className="font-semibold text-[15px]">
                                            Kết nối với chúng tôi
                                        </p>
                                    </div>
                                    <div className="w-full h-[1px] bg-gray-200 mb-3 opacity-50"></div>
                                    <ul className="flex items-center mb-3">
                                        {SOCIALS.map((sc, _index) => (
                                            <li
                                                className={classNames("", {
                                                    "ml-2": _index !== 0,
                                                })}
                                                key={_index}
                                            >
                                                <Image
                                                    src={sc.icon}
                                                    alt={sc.name}
                                                    width={24}
                                                    height={24}
                                                />
                                            </li>
                                        ))}
                                    </ul>
                                    <div className="policy">
                                        <div className="flex items-center py-2">
                                            <Image
                                                src="/assets/images/icon-bct.png"
                                                alt="bct"
                                                width={80}
                                                height={30}
                                            />
                                            <Image
                                                src="/assets/images/icon-dmca.png"
                                                alt="bct"
                                                width={60}
                                                height={20}
                                                className="ml-2"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="qr lg:px-6 lg:mx-6 px-2 mx-2 border-l border-r">
                                    <div className="text-center">
                                        <Image
                                            src="/assets/images/icon-qr.svg"
                                            alt="qr"
                                            width={80}
                                            height={80}
                                            className="block mx-auto"
                                        />
                                        <p className="text-sm py-2 max-w-[160px] text-center mx-auto">
                                            <span className="block">
                                                Tải ứng dụng
                                            </span>
                                            <span>di động AnThai Travel</span>
                                        </p>
                                    </div>
                                </div>
                                <div className="sc-top px-3">
                                    <div className="btn text-center w-fit">
                                        <span className="w-9 h-9 bg-red-600 rounded-full flex items-center justify-center mb-2">
                                            <IconChevronUp className="stroke-white" />
                                        </span>
                                        <p className="text-sm">TOP</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};
export default Footer;
