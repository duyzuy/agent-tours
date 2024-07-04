import Link from "next/link";
import Auth from "../portal/_components/authWrapper/Auth";
interface Props {
    children: React.ReactNode;
}
const LayoutAgAuth = ({ children }: Props) => {
    return (
        <Auth>
            <div className="login-page h-screen">
                <div className="flex h-full flex-wrap">
                    <div className="w-full lg:w-1/5 bg-gray-50 bg-gradient-to-t from-primary-dark to-primary-light flex items-end justify-center">
                        <div className="content text-white px-2 py-8">
                            <div className="mb-4 py-2">
                                <p className="text-2xl font-bold mb-1 uppercase">
                                    Nền tảng quản lý tour trực tuyến
                                </p>
                                <p className="text-sm ">
                                    Giải pháp quản lý tour trực tuyến B2B.
                                </p>
                            </div>
                            <ul className="flex items-center text-xs">
                                <li>
                                    <Link href="/" className="">
                                        <span className="text-white">
                                            Chính sách
                                        </span>
                                    </Link>
                                </li>
                                <li>
                                    <span className="w-1 h-1 rounded bg-white block mx-2"></span>
                                </li>
                                <li>
                                    <Link href="/">
                                        <span className="text-white">
                                            Điều kiện, điều khoản
                                        </span>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="w-full lg:w-4/5 px-6 pt-12 py-8 flex justify-center items-center min-h-full">
                        {children}
                    </div>
                </div>
            </div>
        </Auth>
    );
};
export default LayoutAgAuth;
