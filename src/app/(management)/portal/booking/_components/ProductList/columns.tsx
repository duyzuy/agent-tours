import { IProductTour } from "@/models/management/booking/product.interface";
import { formatDate } from "@/utils/date";
import { moneyFormatVND } from "@/utils/helper";
import { ColumnsType } from "antd/es/table";

export const columns: ColumnsType<IProductTour> = [
  {
    title: "Mã tour",
    width: 150,
    render(value, record, index) {
      return (
        <>
          <div className="text-primary-default font-[500]">{record.template.code}</div>
          <div className="text-xs text-gray-600 break-words whitespace-pre-wrap">{record.code}</div>
        </>
      );
    },
  },
  {
    title: "Tên tour",
    width: 350,
    render(value, record, index) {
      return (
        <div>
          <div>{record.template.name}</div>
          <div>Chi tiết</div>
        </div>
      );
    },
  },
  {
    title: "Ngày khởi hành",
    width: 200,
    render(value, record, index) {
      return (
        <div className="whitespace-nowrap">
          <div>
            <span className="text-blue-600 mr-1 w-4 inline-block">Đi</span>
            {formatDate(record.startDate)}
          </div>
          <div>
            <span className="text-cyan-600 mr-1 w-4 inline-block">Về</span>
            {formatDate(record.endDate)}
          </div>
        </div>
      );
    },
  },
  {
    title: "Giá bán",
    width: 200,
    render(value, { configs }, index) {
      const lowestPriceItem = getConfigLowestPrice(configs);

      return (
        <div>
          {!configs.length ? (
            <span>Chưa có giá bán</span>
          ) : lowestPriceItem ? (
            <span className="text-red-600 text-lg">
              <span className="block text-xs text-gray-500">Giá chỉ từ</span>
              {moneyFormatVND(lowestPriceItem.adult)}
            </span>
          ) : (
            <span>Đã hết</span>
          )}
        </div>
      );
    },
  },
  {
    title: "Tổng chỗ",
    width: 100,
    render(value, record, index) {
      return <div>{record.available}</div>;
    },
  },
  {
    title: "Đang còn",
    width: 100,
    render(value, record, index) {
      return <div className="text-emerald-600">{record.open}</div>;
    },
  },
  {
    title: "Đã bán",
    width: 100,
    render(value, record, index) {
      return <div className="text-red-600">{record.used}</div>;
    },
  },
];

const getConfigLowestPrice = (prices: IProductTour["configs"]) => {
  if (prices.length === 0) return;

  if (prices.length === 1 && prices[0].open === 0) return;

  if (prices.length === 1 && prices[0].open !== 0) return prices[0];

  const pricesWithaVailable = prices.filter((item) => item.open > 0);

  if (!pricesWithaVailable.length) return;

  let lowestPrice = pricesWithaVailable[0];

  for (let i = 1; i < pricesWithaVailable.length; i++) {
    if (lowestPrice.adult > pricesWithaVailable[i].adult) {
      lowestPrice = pricesWithaVailable[i];
    }
  }
  return lowestPrice;
};
