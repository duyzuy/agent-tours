import { SellableDetail } from "@/models/management/core/sellable.interface";
import { formatDate } from "@/utils/date";
import { Tabs, Table, TabsProps, Divider, TableProps } from "antd";
import PriceConfigContainer, { PriceConfigContainerProps } from "./PriceConfigContainer";
import { useGetSellablePriceConfigsCoreQuery } from "@/queries/core/Sellable";
import useConfigPriceSellable from "../../modules/useConfigPriceSellable";
import { extraConfigColumn, tourConfigColumn } from "./PriceConfigContainer/priceConfigColumns";
import { useMemo } from "react";
import { SellablePriceConfigRs } from "@/models/management/core/priceConfig.interface";
interface SellableContainerDetailProps {
  data: SellableDetail;
  disabled: boolean;
}
const SellableContainerDetail: React.FC<SellableContainerDetailProps> = ({ data, disabled }) => {
  const { sellable, extraStocks, stocks, inventories, extraInventories } = data;

  const { data: priceConfigs } = useGetSellablePriceConfigsCoreQuery(sellable.recId, {
    enabled: !disabled,
  });
  const { onUpdate } = useConfigPriceSellable();
  const extraConfigListByService = useMemo(() => {
    let extraListHasStock: SellablePriceConfigRs["result"]["extraConfigs"] = [];
    let extraListNoStock: SellablePriceConfigRs["result"]["extraConfigs"] = [];

    priceConfigs?.extraConfigs.forEach((item) => {
      if (item.stock) {
        extraListHasStock.push(item);
      }

      if (!item.stock) {
        extraListNoStock.push(item);
      }
    });

    const extraListNoStockGrouping = extraListNoStock?.reduce<{
      [key: string]: {
        items: SellablePriceConfigRs["result"]["extraConfigs"];
        serviceName: string;
      };
    }>((acc, item) => {
      if (acc[item.inventory.recId]) {
        acc = {
          ...acc,
          [item.inventory.recId]: {
            ...acc[item.inventory.recId],
            items: [...acc[item.inventory.recId].items, item],
          },
        };
      } else {
        acc = {
          ...acc,
          [item.inventory.recId]: {
            serviceName: item.inventory.name,
            items: [item],
          },
        };
      }
      return acc;
    }, {});

    const extraListWithStockGrouping = extraListHasStock?.reduce<{
      [key: string]: {
        items: SellablePriceConfigRs["result"]["extraConfigs"];
        serviceName: string;
      };
    }>((acc, item) => {
      if (item.stock) {
        if (acc[item.stock.recId]) {
          acc = {
            ...acc,
            [item.stock.recId]: {
              ...acc[item.stock.recId],
              items: [...acc[item.stock.recId].items, item],
            },
          };
        } else {
          return {
            ...acc,
            [item.stock.recId]: {
              serviceName: `${item.inventory.name} - ${item.stock.code}`,
              items: [item],
            },
          };
        }
      }
      return acc;
    }, {});

    return {
      extraListNoStockGrouping,
      extraListWithStockGrouping,
    };
  }, [priceConfigs]);

  const handleSaveTourPriceConfig: PriceConfigContainerProps["onSubmit"] = (data) => {
    onUpdate({ sellableRecId: sellable.recId, tourConfigs: data });
  };

  const handleSaveExtraPriceConfig: PriceConfigContainerProps["onSubmit"] = (updateConfigs) => {
    const mergeConfigs = priceConfigs?.extraConfigs.reduce<SellablePriceConfigRs["result"]["extraConfigs"]>(
      (acc, config) => {
        const existsItem = updateConfigs.find((item) => item.recId === config.recId);

        if (existsItem) {
          acc = [...acc, existsItem as SellablePriceConfigRs["result"]["extraConfigs"][number]];
        } else {
          acc = [...acc, config];
        }
        return acc;
      },
      [],
    );
    onUpdate({
      sellableRecId: sellable.recId,
      extraConfigs: mergeConfigs,
    });
  };

  let tabItems: TabsProps["items"] = [
    {
      label: "Dịch vụ bán kèm",
      key: "inventoryExtra",
      children: (
        <div className="stock pt-3">
          <h3 className="font-semibold text-lg mb-3">Dịch vụ mua thêm không có quản lý kho</h3>
          <Table
            dataSource={extraInventories}
            rowKey="recId"
            pagination={{ hideOnSinglePage: true, pageSize: 30 }}
            columns={[
              { title: "#ID", dataIndex: "recId", width: 100 },
              {
                title: "Mã",
                dataIndex: "name",
                width: 250,
                render: (_, { item }) => item.name,
              },
              {
                title: "Mô tả",
                dataIndex: "code",
                width: 250,
                render: (_, { item }) => item.code,
              },
              {
                title: "Loại nhóm kho",
                dataIndex: "type",
                width: 250,
                render: (_, { item }) => item.type,
              },
              { dataIndex: "qty", title: "Số lượng", width: 150 },
              {
                dataIndex: "sysFstUpdate",
                title: "Ngày tạo",
                render: (value, { item }, index) => formatDate(item.sysFstUpdate),
              },
              {
                dataIndex: "sysFstUser",
                title: "Người tạo",
                render: (value, { item }, index) => item.sysFstUser,
              },
            ]}
          />
          <div className="h-8"></div>
          <h3 className="font-semibold text-lg mb-3">Dịch vụ mua thêm có quản lý kho</h3>
          <Table
            dataSource={extraStocks}
            pagination={{ hideOnSinglePage: true, pageSize: 30 }}
            rowKey="recId"
            columns={[
              { title: "#ID", dataIndex: "recId", width: 100 },
              {
                title: "Mã",
                dataIndex: "name",
                width: 250,
                render: (_, { item }) => item.code,
              },
              {
                title: "Mô tả",
                dataIndex: "code",
                width: 250,
                render: (_, { item }) => item.description,
              },
              {
                title: "Loại kho",
                dataIndex: "type",
                width: 250,
                render: (_, { item }) => item.type,
              },
              { dataIndex: "qty", title: "Số lượng", width: 150 },
              {
                dataIndex: "sysFstUpdate",
                title: "Ngày tạo",

                render: (value, { item }, index) => formatDate(item.sysFstUpdate),
              },
              {
                dataIndex: "sysFstUser",
                title: "Người tạo",

                render: (value, { item }, index) => item.sysFstUser,
              },
            ]}
          />
        </div>
      ),
    },
    {
      label: "Thiết lập giá dịch vụ",
      key: "extraPricingConfig",
      children: (
        <div className="price-config pt-3">
          <h3 className="text-lg font-semibold mb-6">Thiết lập giá dịch vụ</h3>
          {extraConfigListByService.extraListNoStockGrouping
            ? Object.entries(extraConfigListByService.extraListNoStockGrouping).map(([key, config], _index) => (
                <div className="mb-6" key={key}>
                  <h3 className="mb-3 font-semibold text-[16px]">{config.serviceName}</h3>
                  <PriceConfigContainer
                    tableColumn={extraConfigColumn}
                    sellableId={sellable.recId}
                    cap={sellable.cap}
                    priceConfigs={config.items}
                    onSubmit={handleSaveExtraPriceConfig}
                  />
                </div>
              ))
            : null}

          {extraConfigListByService.extraListWithStockGrouping
            ? Object.entries(extraConfigListByService.extraListWithStockGrouping).map(([key, config], _index) => (
                <div className="mb-6" key={key}>
                  <h3 className="mb-3 font-semibold text-[16px]">{config.serviceName}</h3>
                  <PriceConfigContainer
                    tableColumn={extraConfigColumn}
                    sellableId={sellable.recId}
                    cap={sellable.cap}
                    priceConfigs={config.items}
                    onSubmit={handleSaveExtraPriceConfig}
                  />
                </div>
              ))
            : null}
        </div>
      ),
    },
  ];

  if (sellable.type === "TOUR") {
    tabItems = [
      {
        label: "Dịch vụ trong tour",
        key: "inventory",
        children: (
          <div className="inventory pt-3">
            <h3 className="text-lg font-semibold mb-3">Dịch vụ không có quản lý kho</h3>
            <Table
              dataSource={inventories}
              rowKey={"recId"}
              pagination={{ hideOnSinglePage: true, pageSize: 30 }}
              columns={[
                { title: "#ID", dataIndex: "recId", width: 100 },
                {
                  title: "Tên",
                  dataIndex: "name",
                  width: 250,
                  render: (_, { item }) => <p>{item.name}</p>,
                },
                {
                  title: "Mã",
                  dataIndex: "code",
                  width: 250,
                  render: (_, { item }) => <p>{item.code}</p>,
                },
                {
                  title: "Loại nhóm kho",
                  dataIndex: "type",
                  width: 250,
                  render: (_, { item }) => <p>{item.type}</p>,
                },
                { dataIndex: "qty", title: "Số lượng", width: 150 },
                {
                  dataIndex: "sysFstUpdate",
                  title: "Ngày tạo",
                  render: (value, { item }, index) => formatDate(item.sysFstUpdate),
                },
                {
                  dataIndex: "sysFstUser",
                  title: "Người tạo",
                  render: (value, { item }, index) => item.sysFstUser,
                },
              ]}
            />
            <div className="h-8"></div>
            <h3 className="font-semibold text-lg mb-3">Dịch vụ có quản lý kho</h3>
            <Table
              dataSource={stocks}
              rowKey={"recId"}
              pagination={{ hideOnSinglePage: true, pageSize: 30 }}
              columns={[
                { title: "#ID", dataIndex: "recId", width: 100 },
                {
                  title: "Mã",
                  dataIndex: "code",
                  width: 250,
                  render: (_, { item }) => <p>{item.code}</p>,
                },
                {
                  title: "Loại nhóm kho",
                  dataIndex: "inventoryType",
                  width: 250,
                  render: (_, { item }) => <p>{item.inventoryType}</p>,
                },
                {
                  title: "Loại kho",
                  dataIndex: "type",
                  width: 250,
                  render: (_, { item }) => <p>{item.type}</p>,
                },

                { dataIndex: "qty", title: "Số lượng", width: 150 },
                {
                  title: "Mô tả",
                  dataIndex: "description",

                  render: (_, { item }) => <p>{item.description}</p>,
                },
                {
                  title: "Ngày tạo",
                  dataIndex: "sysFstUpdate",

                  render: (_, { item }) => formatDate(item.sysFstUpdate),
                },
                {
                  title: "Người tạo",
                  dataIndex: "type",

                  render: (_, { item }) => item.sysFstUser,
                },
              ]}
            />
          </div>
        ),
      },
      {
        label: "Thiết lập giá dịch vụ tour",
        key: "tourCricingConfig",
        children: (
          <div className="price-config pt-3">
            <h3 className="text-lg font-semibold mb-3">Thiết lập giá tour</h3>
            <PriceConfigContainer
              tableColumn={tourConfigColumn}
              sellableId={sellable.recId}
              cap={sellable.cap}
              priceConfigs={priceConfigs?.tourConfigs || []}
              onSubmit={handleSaveTourPriceConfig}
            />
          </div>
        ),
      },
      ...tabItems,
    ];
  }
  return <Tabs defaultActiveKey="inventory" type="card" items={tabItems} />;
};
export default SellableContainerDetail;
