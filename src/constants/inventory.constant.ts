import { EStockType, EInventoryType } from "@/models/management/core/inventoryType.interface";

export type InventoryStockTypes = {
  [EInventoryType.AIR]: EStockType.AIRTICKET | EStockType.INSURANCE | EStockType.OTHER;
  [EInventoryType.GUIDE]: EStockType.OTHER;
  [EInventoryType.HOTEL]: EStockType.ROOM | EStockType.OTHER;
  [EInventoryType.INSURANCE]: EStockType.OTHER;
  [EInventoryType.LANDPACKAGE]: EStockType.PACKAGE | EStockType.TOURPACKAGE | EStockType.GUIDE | EStockType.OTHER;
  [EInventoryType.RESTAURANT]: EStockType.TABLE | EStockType.OTHER;
  [EInventoryType.TRANSPORT]: EStockType.CRUISE | EStockType.VEHICLE | EStockType.OTHER;
  [EInventoryType.VISA]: EStockType.VISASERVICES | EStockType.OTHER;
};
