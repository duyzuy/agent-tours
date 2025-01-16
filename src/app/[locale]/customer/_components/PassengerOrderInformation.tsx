import { IconChevronDown, IconUser } from "@/assets/icons";
import { FeOrderDetailResponse, IFeOrderDetail } from "@/models/fe/order.interface";
import { RoomingType } from "@/models/management/booking/rooming.interface";
import { formatDate } from "@/utils/date";
import { Button, Tag } from "antd";
import classNames from "classnames";

export interface PassengerOrderInformationProps {
  items: IFeOrderDetail["passengers"];
  title?: string;
  children?: React.ReactNode;
  className?: string;
}
const PassengerOrderInformation = ({ items, title, children, className = "" }: PassengerOrderInformationProps) => {
  return (
    <div
      className={classNames("passengers", {
        [className]: className,
      })}
    >
      {title && <h3 className="font-[500] text-[16px] mb-3 lg:mb-6">{title}</h3>}
      <div className="grid grid-cols-2 gap-3">
        {items.map((pax) => (
          <div className="border rounded-md" key={pax.recId}>
            <div className="flex items-center justify-between px-4 py-3">
              <div className="flex items-center gap-x-2">
                <IconUser className="w-8 h-8 bg-slate-100 rounded-full p-2" />
                <div className="font-[500] text-[16px]">{`${pax.paxLastname}, ${pax.paxMiddleFirstName}`}</div>
                <span className="text-xs">{pax.type}</span>
              </div>
              <Button
                icon={<IconChevronDown />}
                type="text"
                shape="circle"
                className="!bg-gray-100 hover:!bg-gray-200"
              />
            </div>
            <div className="px-4 py-3">
              <PassengerOrderInformation.Detail
                type={pax.type}
                paxTitle={pax.paxTitle}
                paxAddress={pax.paxAddress}
                paxGender={pax.paxGender}
                paxMiddleFirstName={pax.paxMiddleFirstName}
                paxBirthDate={pax.paxBirthDate}
                paxIdNumber={pax.paxIdNumber}
                paxLastname={pax.paxLastname}
                paxNationality={pax.paxNationality}
                paxPassortExpiredDate={pax.paxPassortExpiredDate}
                paxPhoneNumber={pax.paxPhoneNumber}
                paxPassportNumber={pax.paxPassportNumber}
              />
              <PassengerOrderInformation.RoomInformation
                label="Thông tin phòng"
                roomingType={pax.roomingListType}
                roomNumber={pax.roomingListNumber}
              />
              <PassengerOrderInformation.Document label="Loại giấy tờ" documents={pax.documents} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default PassengerOrderInformation;

type PassengerInformationProps = Omit<
  FeOrderDetailResponse["result"]["passengers"][number],
  "documents" | "roomingListType" | "roomingListNumber" | "paxInfoJson" | "recId"
>;
function PassengerInformation(pax: PassengerInformationProps) {
  return (
    <div className="grid grid-cols-3 gap-3 mb-3 border-b pb-3">
      <div>
        <div className="text-xs">Danh xưng</div>
        <div className="font-[500]">{pax.paxTitle}</div>
      </div>
      <div>
        <div className="text-xs">Họ</div>
        <div className="font-[500]">{pax.paxLastname}</div>
      </div>
      <div>
        <div className="text-xs">Tên đệm và tên</div>
        <div className="font-[500]">{pax.paxMiddleFirstName}</div>
      </div>

      <div>
        <div className="text-xs">Ngày sinh</div>
        <div className="font-[500]">{formatDate(pax.paxBirthDate, "DD/MM/YYYY")}</div>
      </div>
      <div>
        <div className="text-xs">Giới tính</div>
        <div className="font-[500]">{pax.paxGender}</div>
      </div>
      <div>
        <div className="text-xs">Số điện thoại</div>
        <div className="font-[500]">{pax.paxPhoneNumber || "--"}</div>
      </div>
      <div>
        <div className="text-xs">Số CCCD</div>
        <div className="font-[500]">{pax.paxIdNumber || "--"}</div>
      </div>
      <div>
        <div className="text-xs">Số hộ chiếu</div>
        <div className="font-[500]">{pax.paxPassportNumber || "--"}</div>
      </div>
      <div>
        <div className="text-xs">Ngày hết hạn</div>
        <div className="font-[500]">{formatDate(pax.paxPassortExpiredDate, "DD/MM/YYYY")}</div>
      </div>
      <div>
        <div className="text-xs">Quốc tịch</div>
        <div className="font-[500]">{pax.paxNationality || "--"}</div>
      </div>
      <div className="col-span-3">
        <div className="text-xs">Địa chỉ liên hệ</div>
        <div className="font-[500]">{pax.paxAddress || "--"}</div>
      </div>
    </div>
  );
}
interface PassengerOrderInformationRoomingProps {
  roomingType: RoomingType;
  roomNumber: number;
  label?: string;
}
function PassengerOrderInformationRooming({ roomingType, roomNumber, label }: PassengerOrderInformationRoomingProps) {
  return (
    <div className="passenger-room-information mb-3 border-b pb-3">
      {label ? <div className="mb-3 font-[500]">Thông tin phòng</div> : null}
      <div className="grid grid-cols-2 gap-3">
        <div className="">
          <div className="text-xs">Số phòng</div>
          <div className="font-[500]">{roomNumber || "--"}</div>
        </div>
        <div className="">
          <div className="text-xs">Loại phòng</div>
          <div className="font-[500]">{roomingType || "--"}</div>
        </div>
      </div>
    </div>
  );
}
interface PassengerOrderInformationDocumentProps {
  label?: string;
  documents: FeOrderDetailResponse["result"]["passengers"][number]["documents"];
}
function PassengerOrderInformationDocument({ documents, label }: PassengerOrderInformationDocumentProps) {
  return (
    <div className="passenger-document">
      {label ? <div className="mb-3 font-[500]">Loại giấy tờ</div> : null}
      <div className="font-[500]">
        <ul className="list-decimal pl-4">
          {documents.map((doc) => (
            <li key={doc.documentCheckListId}>
              <div className="flex">
                {doc.documentName}
                <Tag
                  bordered={false}
                  color={
                    doc.status === "NEW"
                      ? "blue"
                      : doc.status === "FINISHED"
                      ? "green"
                      : doc.status === "HANDOVERED"
                      ? "gold"
                      : doc.status === "NOT_FINISHED"
                      ? "red"
                      : "default"
                  }
                >
                  {doc.status === "NEW"
                    ? "Mới"
                    : doc.status === "FINISHED"
                    ? "Đã nộp"
                    : doc.status === "HANDOVERED"
                    ? "Đã bàn giao"
                    : doc.status === "NOT_FINISHED"
                    ? "Chưa nộp"
                    : "Unknown"}
                </Tag>
              </div>
              <p className="font-normal">{doc.documentDescription}</p>
              <Tag
                className="!hidden"
                bordered={false}
                color={
                  doc.status === "NEW"
                    ? "blue"
                    : doc.status === "FINISHED"
                    ? "green"
                    : doc.status === "HANDOVERED"
                    ? "gold"
                    : doc.status === "NOT_FINISHED"
                    ? "red"
                    : "default"
                }
              >
                {doc.status === "NEW"
                  ? "Mới"
                  : doc.status === "FINISHED"
                  ? "Đã nộp"
                  : doc.status === "HANDOVERED"
                  ? "Đã bàn giao"
                  : doc.status === "NOT_FINISHED"
                  ? "Chưa nộp"
                  : "Unknown"}
              </Tag>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
PassengerOrderInformation.Document = PassengerOrderInformationDocument;
PassengerOrderInformation.RoomInformation = PassengerOrderInformationRooming;
PassengerOrderInformation.Detail = PassengerInformation;
