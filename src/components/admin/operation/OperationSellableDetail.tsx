import { formatDate } from "@/utils/date";
import { RetweetOutlined, SwapRightOutlined } from "@ant-design/icons";
import { Tag } from "antd";

interface OperationSellableDetailProps {
  templateCode?: string;
  templateName?: string;
  startDate?: string;
  endDate?: string;
  validFrom?: string;
  validTo?: string;
  used?: number;
  open?: number;
  available?: number;
  sellableCode?: string;
  closeDate?: string;
}
const OperationSellableDetail: React.FC<OperationSellableDetailProps> = ({
  templateCode,
  templateName,
  startDate,
  endDate,
  validFrom,
  validTo,
  used,
  open,
  available,
  sellableCode,
  closeDate,
}) => {
  return (
    <>
      <div className="mb-3">
        <h3 className="text-lg font-semibold flex items-center mb-1">{`${templateName} | ${templateCode}`}</h3>
        <Tag color="blue">{sellableCode}</Tag>
      </div>
      <div className="box-content py-3  mb-6">
        <div className="flex gap-x-8 mb-6">
          <div>
            <span className="mb-1 block text-xs text-gray-500">Ngày khởi hành</span>
            <div className="flex gap-x-3">
              <span>{startDate ? formatDate(startDate) : "--"}</span>
              <RetweetOutlined />
              <span>{endDate ? formatDate(endDate) : "--"}</span>
            </div>
          </div>
          <div>
            <span className="mb-1 block text-xs text-gray-500">Ngày mở bán</span>
            <div className="flex gap-x-3">
              <span>{validFrom ? formatDate(validFrom) : "--"}</span>
              <SwapRightOutlined />
              <span>{validTo ? formatDate(validTo) : "--"}</span>
            </div>
          </div>
          <div>
            <span className="mb-1 block text-xs text-gray-500">Ngày kết thúc mở bán</span>
            <span className="">{closeDate ? formatDate(closeDate) : "--"}</span>
          </div>
        </div>
        <div className="flex gap-x-8">
          <div>
            <span className="mb-1 block text-xs text-gray-500">Khả dụng</span>
            <span className="text-main-500">{available}</span>
          </div>
          <div>
            <span className="mb-1 block text-xs text-gray-500">Đã bán</span>
            <span className="text-rose-600">{used}</span>
          </div>
          <div>
            <span className="mb-1 block text-xs text-gray-500">Đang còn</span>
            <span className="text-green-600">{open}</span>
          </div>
        </div>
      </div>
    </>
  );
};
export default OperationSellableDetail;
