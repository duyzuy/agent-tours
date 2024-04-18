export default function NotFound() {
    return (
        <div className="not-found">
            <div className="container mx-auto">
                <div className="box-content flex items-center justify-center h-[40vh]">
                    <div className="notfound-content py-8 text-center">
                        <span className="text-8xl">404</span>
                        <p>Trang bạn tìm kiếm hiện không tồn tại</p>
                        {/* <Link href="/">về trang chủ</Link> */}
                    </div>
                </div>
            </div>
        </div>
    );
}
