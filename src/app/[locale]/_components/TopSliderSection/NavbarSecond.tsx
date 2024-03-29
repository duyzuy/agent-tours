import Image from "next/image";
import Link from "next/link";
import classNames from "classnames";
interface NavbarSecondProps {
    className?: string;
}
const NavbarSecond: React.FC<NavbarSecondProps> = ({ className = "" }) => {
    return (
        <div
            className={classNames(
                "container mx-auto menu-horizon relative z-10 px-4 lg:px-0",
                {
                    [className]: className,
                },
            )}
        >
            <div className="menu-container bg-main-400 text-white rounded-lg py-3">
                <ul className="menu-list flex flex-wrap items-center font-[500]">
                    <li className="px-4 py-2 lg:w-1/6 w-1/3">
                        <Link href="/" className="flex items-center">
                            <Image
                                src="/assets/icons/icon-international.svg"
                                alt="global"
                                width={24}
                                height={24}
                                className="mr-2"
                            />
                            <span className="nav-link-text text-white">
                                Tour nước ngoài
                            </span>
                        </Link>
                    </li>
                    <li className="px-4 py-2 lg:w-1/6 w-1/3">
                        <Link href="/" className="flex items-center">
                            <Image
                                src="/assets/icons/icon-dom.svg"
                                alt="global"
                                width={24}
                                height={24}
                                className="mr-2"
                            />
                            <span className="nav-link-text text-white">
                                Tour trong nước
                            </span>
                        </Link>
                    </li>
                    <li className="px-4 py-2 lg:w-1/6 w-1/3">
                        <Link href="/" className="flex items-center">
                            <Image
                                src="/assets/icons/icon-group.svg"
                                alt="global"
                                width={24}
                                height={24}
                                className="mr-2"
                            />
                            <span className="nav-link-text text-white">
                                Tour team building
                            </span>
                        </Link>
                    </li>
                    <li className="px-4 py-2 lg:w-1/6 w-1/3">
                        <Link href="/" className="flex items-center">
                            <Image
                                src="/assets/icons/icon-hot.svg"
                                alt="global"
                                width={24}
                                height={24}
                                className="mr-2"
                            />
                            <span className="nav-link-text text-white">
                                Tour combo hot
                            </span>
                        </Link>
                    </li>
                    <li className="px-4 py-2 lg:w-1/6 w-1/3">
                        <Link href="/" className="flex items-center">
                            <Image
                                src="/assets/icons/icon-visa.svg"
                                alt="global"
                                width={24}
                                height={24}
                                className="mr-2"
                            />
                            <span className="nav-link-text text-white">
                                Visa / passport
                            </span>
                        </Link>
                    </li>
                    <li className="px-4 py-2 lg:w-1/6 w-1/3">
                        <Link href="/" className="flex items-center">
                            <Image
                                src="/assets/icons/icon-fly.svg"
                                alt="global"
                                width={24}
                                height={24}
                                className="mr-2"
                            />
                            <span className="nav-link-text text-white">
                                Vé máy bay
                            </span>
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    );
};
export default NavbarSecond;
