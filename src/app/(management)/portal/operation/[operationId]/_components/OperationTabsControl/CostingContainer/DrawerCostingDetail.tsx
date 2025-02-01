import { useCallback, useEffect, useMemo, useState } from "react";
import {
  Drawer,
  DrawerProps,
  Form,
  Input,
  Space,
  Button,
  InputNumber,
  Tabs,
  TableColumnsType,
  Table,
  TabsProps,
  Popconfirm,
  Tag,
} from "antd";

import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  AirCostingDetailFormData,
  HotelCostingDetailFormData,
  InsuranceCostingDetailFormData,
  LandPackageCostingDetailFormData,
  OperationCostingDetailFormData,
  RestauranceCostingDetailFormData,
  TransportCostingDetailFormData,
  VisaCostingDetailFormData,
} from "../../../../modules/operation.interface";
import { operationCostingDetailSchema } from "../../../../schema/operation.schema";

import { EInventoryType, EStockType } from "@/models/management/core/inventoryType.interface";
import { IOperationCosting } from "@/models/management/core/operation/operationCosting.interface";

import { useGetStockInventoryTypeCoreQuery } from "@/queries/core/stockInventory";
import { useGetOperationCostingDetailsQuery } from "@/queries/core/operation";
import AirDetailForm from "./detailForms/AirDetailForm";
import HotelDetailForm from "./detailForms/HotelDetailForm";
import GuideDetailForm from "./detailForms/GuideDetailForm";
import VisaDetailForm from "./detailForms/VisaDetailForm";
import InsuranceDetailForm from "./detailForms/InsuranceDetailForm";
import LandPackageDetailForm from "./detailForms/LandPackageDetailForm";
import TransportDetailForm from "./detailForms/TransportDetailForm";
import RestauranceDetailForm from "./detailForms/RestauranceDetailForm";
import FormItem from "@/components/base/FormItem";
import {
  AirDetailType,
  GuideDetailType,
  HotelDetailType,
  ICostingDetailItem,
  InsuranceDetailType,
  IOperationCostingDetail,
  LandPackageDetailType,
  RestaurantDetailType,
  TransportDetailType,
  VisaDetailType,
} from "@/models/management/core/operation/operationCostingDetail.interface";
import { formatDate } from "@/utils/date";
import { moneyFormatVND } from "@/utils/helper";
import {
  CheckCircleOutlined,
  DeleteOutlined,
  DownOutlined,
  EditOutlined,
  LockFilled,
  LockOutlined,
  QuestionCircleOutlined,
  RetweetOutlined,
  UnlockOutlined,
} from "@ant-design/icons";
import useOperationCostingDetail from "../../../../modules/useOperationCostingDetail";
import { DATE_TIME_FORMAT } from "@/constants/common";

interface AirDetailItemProps {
  data?: ICostingDetailItem<AirDetailType>["details"];
}
interface VisaDetailItemProps {
  data?: ICostingDetailItem<VisaDetailType>["details"];
}
interface LandPackageDetailItemProps {
  data?: ICostingDetailItem<LandPackageDetailType>["details"];
}
interface GuideDetailItemProps {
  data?: ICostingDetailItem<GuideDetailType>["details"];
}
interface HotelDetailItemProps {
  data?: ICostingDetailItem<HotelDetailType>["details"];
}
interface RestaurantDetailItemProps {
  data?: ICostingDetailItem<RestaurantDetailType>["details"];
}
interface TransportDetailItemProps {
  data?: ICostingDetailItem<TransportDetailType>["details"];
}
interface InsuranceDetailItemProps {
  data?: ICostingDetailItem<InsuranceDetailType>["details"];
}

const AirDetailBox: React.FC<AirDetailItemProps> = ({ data }) => {
  return (
    <div className="costing-item-detail ">
      <div className="grid grid-cols-5 gap-4">
        <div>
          <span className="text-xs text-gray-500">Chuyến bay</span>
          <div>{data?.tripType}</div>
        </div>
        <div>
          <span className="text-xs text-gray-500">Hành trình</span>
          <div>{data?.fullItinerary ? data?.fullItinerary : "--"}</div>
        </div>
        <div>
          <span className="text-xs text-gray-500">Ngày khởi hành</span>
          <div className="flex items-center gap-2">
            <span>{data?.departureDate ? formatDate(data?.departureDate) : " --"}</span>
            {data?.tripType === "ROUNDTRIP" && (
              <>
                <span>
                  <RetweetOutlined />
                </span>
                <span>{data?.arrivalDate ? formatDate(data?.arrivalDate) : "--"}</span>
              </>
            )}
          </div>
        </div>
        <div>
          <span className="block text-xs text-gray-500">Hành khách</span>
          <Space>
            <span>{`Người lớn: ${data?.adult}`}</span>
            <span>{`Trẻ em: ${data?.child}`}</span>
            <span>{`Em bé: ${data?.infant}`}</span>
          </Space>
        </div>
        <div>
          <span className="text-xs text-gray-500">Hạng vé</span>
          <div>{data?.classOfService}</div>
        </div>
        <div>
          <span className="text-xs text-gray-500">Yêu cầu đặc biệt</span>
          <div>{data?.specialRequest}</div>
        </div>
        <div>
          <span className="text-xs text-gray-500">Ghi chú</span>
          <div>{data?.remark}</div>
        </div>
      </div>
    </div>
  );
};

const VisaDetailBox: React.FC<VisaDetailItemProps> = ({ data }) => {
  return (
    <div className="costing-item-detail ">
      <div className="grid grid-cols-5 gap-4">
        <div>
          <span className="text-xs text-gray-500">Yêu cầu đặc biệt</span>
          <div>{data?.specialRequest}</div>
        </div>
        <div>
          <span className="text-xs text-gray-500">Ghi chú</span>
          <div>{data?.remark}</div>
        </div>
      </div>
    </div>
  );
};

const LandPackageDetailBox: React.FC<LandPackageDetailItemProps> = ({ data }) => {
  return (
    <div className="costing-item-detail ">
      <div className="grid grid-cols-5 gap-4">
        <div>
          <span className="text-xs text-gray-500">Yêu cầu đặc biệt</span>
          <div>{data?.specialRequest}</div>
        </div>
        <div>
          <span className="text-xs text-gray-500">Ghi chú</span>
          <div>{data?.remark}</div>
        </div>
      </div>
    </div>
  );
};

const GuideDetailBox: React.FC<GuideDetailItemProps> = ({ data }) => {
  return (
    <div className="costing-item-detail ">
      <div className="grid grid-cols-5 gap-4">
        <div>
          <span className="text-xs text-gray-500">Yêu cầu đặc biệt</span>
          <div>{data?.specialRequest}</div>
        </div>
        <div>
          <span className="text-xs text-gray-500">Ghi chú</span>
          <div>{data?.remark}</div>
        </div>
      </div>
    </div>
  );
};

const HotelDetailBox: React.FC<HotelDetailItemProps> = ({ data }) => {
  return (
    <div className="costing-item-detail ">
      <div className="grid grid-cols-5 gap-4">
        <div>
          <span className="text-xs text-gray-500">Yêu cầu đặc biệt</span>
          <div>{data?.specialRequest}</div>
        </div>
        <div>
          <span className="text-xs text-gray-500">Ghi chú</span>
          <div>{data?.remark}</div>
        </div>
      </div>
    </div>
  );
};

const RestaurantDetailBox: React.FC<RestaurantDetailItemProps> = ({ data }) => {
  return (
    <div className="costing-item-detail ">
      <div className="grid grid-cols-5 gap-4">
        <div>
          <span className="text-xs text-gray-500">Yêu cầu đặc biệt</span>
          <div>{data?.specialRequest}</div>
        </div>
        <div>
          <span className="text-xs text-gray-500">Ghi chú</span>
          <div>{data?.remark}</div>
        </div>
      </div>
    </div>
  );
};

const TransportDetailBox: React.FC<TransportDetailItemProps> = ({ data }) => {
  return (
    <div className="costing-item-detail ">
      <div className="grid grid-cols-5 gap-4">
        <div>
          <span className="text-xs text-gray-500">Yêu cầu đặc biệt</span>
          <div>{data?.specialRequest}</div>
        </div>
        <div>
          <span className="text-xs text-gray-500">Ghi chú</span>
          <div>{data?.remark}</div>
        </div>
      </div>
    </div>
  );
};

const InsuranceDetailBox: React.FC<InsuranceDetailItemProps> = ({ data }) => {
  return (
    <div className="costing-item-detail ">
      <div className="grid grid-cols-5 gap-4">
        <div>
          <span className="text-xs text-gray-500">Yêu cầu đặc biệt</span>
          <div>{data?.specialRequest}</div>
        </div>
        <div>
          <span className="text-xs text-gray-500">Ghi chú</span>
          <div>{data?.remark}</div>
        </div>
      </div>
    </div>
  );
};

export type DrawerCostingDetailProps = DrawerProps & {
  name?: string;
  type?: EInventoryType;
  costingId?: number;
  onClose?: () => void;
  initialValue?: IOperationCosting;
};
const DrawerCostingDetail: React.FC<DrawerCostingDetailProps> = ({
  name,
  type,
  costingId,
  onClose,
  open,
  initialValue,
}) => {
  const { data: stockTypes, isLoading } = useGetStockInventoryTypeCoreQuery(type);

  const initFormData = new OperationCostingDetailFormData(costingId, undefined, undefined, 1, 0);

  const { data: costingListDetail, isLoading: isLoadingDetail } = useGetOperationCostingDetailsQuery({
    enabled: !!costingId,
    costingId: costingId,
  });
  const { onCreate, onUpdate, onComplete, onToggleLock, onDelete } = useOperationCostingDetail();

  const {
    setValue,
    getValues,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm<OperationCostingDetailFormData>({
    resolver: yupResolver(operationCostingDetailSchema),
    defaultValues: { ...initFormData },
  });

  type TabKey = "CREATE" | "VIEWLIST";
  const [tabKey, setTabKey] = useState<TabKey>("VIEWLIST");
  const [editRecord, setEditRecord] = useState<IOperationCostingDetail["details"][0]>();

  const setEditCostingDetail = (record: IOperationCostingDetail["details"][0]) => {
    setEditRecord(record);
    setTabKey("CREATE");
  };
  const handleChangeTab: TabsProps["onChange"] = (activeKey) => {
    setTabKey(activeKey as TabKey);
    setEditRecord(undefined);
  };

  const handleToggleLock = (record: IOperationCostingDetail["details"][0]) => {
    onToggleLock({ costingDetailsId: record.id, isLocked: record.isLocked ? false : true });
  };

  const handleComplete = (record: IOperationCostingDetail["details"][0]) => {
    onComplete(record.id);
  };
  const handleDelete = (record: IOperationCostingDetail["details"][0]) => {
    onDelete(record.id);
  };
  const handleChangeForm = useCallback(
    (
      type: EInventoryType,
      data:
        | AirCostingDetailFormData
        | HotelCostingDetailFormData
        | InsuranceCostingDetailFormData
        | VisaCostingDetailFormData
        | LandPackageCostingDetailFormData
        | TransportCostingDetailFormData
        | RestauranceCostingDetailFormData,
    ) => {
      setValue("costingDataType.details", data.details);
      setValue("costingDataType.type", data.type);
    },
    [],
  );
  editRecord?.type === EStockType.AIRTICKET;
  const isDisabledButton = useMemo(() => {
    const newData = getValues();
    // return isEqualObject(["costingDataType", "paymentQuantity", "amount"], initFormData, newData);
    return false;
  }, [watch()]);

  const renderForm = () => {
    return (
      <Form name="basic" autoComplete="off" labelCol={{ span: 8 }} wrapperCol={{ span: 16 }} className="max-w-[750px]">
        {type === EInventoryType.AIR ? (
          <AirDetailForm
            initialValues={editRecord?.type === EStockType.AIRTICKET ? editRecord : undefined}
            stockTypes={stockTypes}
            onChangeForm={handleChangeForm}
          />
        ) : type === EInventoryType.HOTEL ? (
          <HotelDetailForm stockTypes={stockTypes} onChangeForm={handleChangeForm} />
        ) : type === EInventoryType.GUIDE ? (
          <GuideDetailForm stockTypes={stockTypes} onChangeForm={handleChangeForm} />
        ) : type === EInventoryType.VISA ? (
          <VisaDetailForm stockTypes={stockTypes} onChangeForm={handleChangeForm} />
        ) : type === EInventoryType.INSURANCE ? (
          <InsuranceDetailForm stockTypes={stockTypes} onChangeForm={handleChangeForm} />
        ) : type === EInventoryType.LANDPACKAGE ? (
          <LandPackageDetailForm stockTypes={stockTypes} onChangeForm={handleChangeForm} />
        ) : type === EInventoryType.RESTAURANT ? (
          <RestauranceDetailForm stockTypes={stockTypes} onChangeForm={handleChangeForm} />
        ) : type === EInventoryType.TRANSPORT ? (
          <TransportDetailForm stockTypes={stockTypes} onChangeForm={handleChangeForm} />
        ) : null}
        <div className="line bg-gray-200 h-[1px] mb-3 mt-3"></div>
        <Controller
          control={control}
          name="paymentQuantity"
          render={({ field: { value, onChange, onBlur }, fieldState: { error } }) => (
            <FormItem label="Số lượng" required>
              <InputNumber value={value} onChange={onChange} placeholder="Số lượng" className="w-full" />
            </FormItem>
          )}
        />
        <Controller
          control={control}
          name="amount"
          render={({ field: { value, onChange }, fieldState: { error } }) => (
            <FormItem label="Giá tiền" required>
              <Input placeholder="Giá tiền" value={value} onChange={onChange} />
            </FormItem>
          )}
        />

        <FormItem wrapperCol={{ span: 16, offset: 8 }}>
          <Space>
            <Button
              type="primary"
              onClick={
                onCreate &&
                handleSubmit((data) =>
                  editRecord ? onUpdate({ ...data, costingDetailsId: editRecord.id }) : onCreate(data),
                )
              }
              disabled={isDisabledButton}
            >
              Lưu
            </Button>
            <Button onClick={onClose}>Huỷ</Button>
          </Space>
        </FormItem>
      </Form>
    );
  };

  const columns: TableColumnsType<IOperationCostingDetail["details"][0]> = [
    { title: "Dịch vụ", dataIndex: "type", key: "type" },
    {
      title: "Giá tiền",
      dataIndex: "amount",
      key: "amount",
      render(value, { amount }, index) {
        return moneyFormatVND(amount);
      },
    },
    { title: "Số lượng", dataIndex: "paymentQuantity", key: "paymentQuantity" },
    {
      title: "Tạm tính",
      dataIndex: "totalAmount",
      key: "totalAmount",
      render(value, { totalAmount }, index) {
        return <span>{moneyFormatVND(totalAmount)}</span>;
      },
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render(value, { status }, index) {
        return (
          <Tag bordered={false} color={status === "NEW" ? "blue" : "green"}>
            {status === "NEW" ? "Mới" : "Hoàn thành"}
          </Tag>
        );
      },
    },
    {
      title: "Ngày khoá",
      dataIndex: "lockedUpdate",
      key: "lockedUpdate",
      render(value, { lockedUpdate }, index) {
        return <span>{lockedUpdate ? formatDate(lockedUpdate) : "--"}</span>;
      },
    },
    {
      title: "Ngày hoàn thành",
      dataIndex: "finalizedUpdate",
      key: "finalizedUpdate",
      render(value, { finalizedUpdate }, index) {
        return <span>{finalizedUpdate ? formatDate(finalizedUpdate) : "--"}</span>;
      },
    },
    {
      title: "",
      key: "action",
      render: (_, record) => {
        const { status, isFinalized, isLocked } = record;

        if (isFinalized) return null;
        return (
          <Space>
            <Button
              size="small"
              type="text"
              onClick={() => setEditCostingDetail(record)}
              className="!text-primary-default"
              icon={<EditOutlined />}
            >
              Sửa
            </Button>
            <Button
              type="text"
              size="small"
              onClick={() => handleToggleLock(record)}
              icon={record.isLocked ? <UnlockOutlined /> : <LockOutlined />}
            >
              {record.isLocked ? "Mở khoá" : "Khoá"}
            </Button>
            {isLocked ? (
              <Button
                type="text"
                size="small"
                onClick={() => handleComplete(record)}
                icon={<CheckCircleOutlined />}
                className="!text-emerald-600"
              >
                Hoàn thành
              </Button>
            ) : (
              <Popconfirm
                title="Xoá"
                description="Bạn muốn xoá dịch vụ này?"
                icon={<QuestionCircleOutlined style={{ color: "red" }} />}
                onConfirm={() => handleDelete(record)}
              >
                <Button type="text" size="small" icon={<DeleteOutlined />} className="!text-red-600">
                  Xoá
                </Button>
              </Popconfirm>
            )}
          </Space>
        );
      },
    },
  ];

  useEffect(() => {
    if (open) {
      setValue("costingId", costingId);
    }
  }, [open]);

  return (
    <Drawer
      title={name}
      placement="bottom"
      destroyOnClose
      width={650}
      height={"90vh"}
      onClose={onClose}
      open={open}
      styles={{
        body: {
          paddingBottom: 80,
        },
      }}
    >
      <div>
        <Tabs
          defaultActiveKey="VIEWLIST"
          activeKey={tabKey}
          items={[
            {
              label: "Tất cả dịch vụ",
              key: "VIEWLIST",
              children: (
                <Table<IOperationCostingDetail["details"][0]>
                  rowKey={"id"}
                  columns={columns}
                  expandable={{
                    expandedRowRender: ({ type, details }) => {
                      return (
                        <div className="info">
                          {type === EStockType.AIRTICKET || type === EStockType.INSURANCE ? (
                            <AirDetailBox data={details} />
                          ) : type === EStockType.VISASERVICES || type === EStockType.OTHER ? (
                            <VisaDetailBox data={details} />
                          ) : type === EStockType.PACKAGE ||
                            type === EStockType.TOURPACKAGE ||
                            type === EStockType.GUIDE ? (
                            <LandPackageDetailBox data={details} />
                          ) : // ) : type === EStockType.OTHER ? (
                          //   <GuideDetailBox data={details} />
                          type === EStockType.ROOM ? (
                            <HotelDetailBox data={details} />
                          ) : type === EStockType.TABLE ? (
                            <RestaurantDetailBox data={details} />
                          ) : type === EStockType.CRUISE || type === EStockType.VEHICLE ? (
                            <TransportDetailBox data={details} />
                          ) : type === EStockType.VISASERVICES || type === EStockType.OTHER ? (
                            <InsuranceDetailBox data={details} />
                          ) : null}
                        </div>
                      );
                    },
                    rowExpandable: (record) => record.sellableCode !== "Not Expandable",
                  }}
                  dataSource={costingListDetail?.details}
                />
              ),
            },
            {
              label: "Thêm dịch vụ",
              key: "CREATE",
              children: renderForm(),
            },
          ]}
          onChange={handleChangeTab}
        />
      </div>
    </Drawer>
  );
};
export default DrawerCostingDetail;
