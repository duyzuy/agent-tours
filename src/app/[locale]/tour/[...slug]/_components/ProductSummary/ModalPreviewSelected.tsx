const ModalPreviewSelected = () => {
    return (
        <div className="breakdown-table -mx-2 hidden">
            <div className="row flex items-center py-2 font-bold text-primary-default">
                <div className="cell flex-1 px-2">Hành khách</div>
                <div className="cell w-20 px-2">Số lượng</div>
                <div className="cell flex-1 text-right px-2">
                    Đơn giá <span className="text-xs">(VND)</span>
                </div>
            </div>
            {/* <div className="row flex py-2 items-center">
                <div className="cell flex-1 px-2">
                    <p>Người lớn</p>
                    <p className="text-xs text-red-600 font-semibold">
                        {adultPrice ? moneyFormatVND(adultPrice) : null}
                    </p>
                </div>
                <div className="cell w-20 px-2 text-center">x 1</div>
                <div className="cell flex-1 text-right px-2">
                    {adultPrice
                        ? moneyFormatVND(adultPrice * passenger.adult)
                        : 0}
                </div>
            </div>
            <div className="row flex py-2 items-center">
                <div className="cell flex-1 px-2">
                    <p>Trẻ em</p>
                    <p className="text-xs text-red-600 font-semibold">
                        {childPrice ? moneyFormatVND(childPrice) : null}
                    </p>
                </div>
                <div className="cell w-20 px-2 text-center">
                    x {passenger["children"]}
                </div>
                <div className="cell flex-1 text-right px-2">
                    {childPrice
                        ? moneyFormatVND(childPrice * passenger["children"])
                        : 0}
                </div>
            </div>
            <div className="row flex py-2 items-center">
                <div className="cell flex-1 px-2">
                    <p>Em bé</p>
                    <p className="text-xs text-red-600 font-semibold">
                        {infantPrice ? moneyFormatVND(infantPrice) : 0}
                    </p>
                </div>
                <div className="cell w-20 px-2 text-center">
                    x {passenger.infant}
                </div>
                <div className="cell flex-1 text-right px-2">
                    {infantPrice
                        ? moneyFormatVND(infantPrice * passenger.infant)
                        : 0}
                </div>
            </div> */}
        </div>
    );
};
export default ModalPreviewSelected;
