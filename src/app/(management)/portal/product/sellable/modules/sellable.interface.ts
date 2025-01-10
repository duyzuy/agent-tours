import { IInventory } from "@/models/management/core/inventory.interface";
import { SellableApprovalPayload } from "@/models/management/core/sellable.interface";
import { IStock } from "@/models/management/core/stock.interface";

class SellableApprovalBaseForm {
  recId: number;
  cap: number;
  valid?: string;
  validTo?: string;
  closeDate?: string;
  start?: string;
  end?: string;
  constructor(
    recId: number,
    cap: number,
    closeDate: string | undefined,
    valid: string | undefined,
    validTo: string | undefined,
    start: string | undefined,
    end: string | undefined,
  ) {
    this.recId = recId;
    this.cap = cap;
    this.closeDate = closeDate;
    this.valid = valid;
    this.validTo = validTo;
    this.start = start;
    this.end = end;
  }
}

export class SellableApprovalFormData extends SellableApprovalBaseForm {
  inventories?: { recId: number; qty: number; inventory?: IInventory }[];
  stocks?: { recId: number; qty: number; stock?: IStock }[];
  extraInventories?: { recId: number; qty: number; inventory?: IInventory }[];
  extraStocks?: { recId: number; qty: number; stock?: IStock }[];
  productType: "TOUR" | "EXTRA";
  constructor(
    recId: number,
    cap: number,
    closeDate: string | undefined,
    valid: string | undefined,
    validTo: string | undefined,
    start: string | undefined,
    end: string | undefined,
    productType: "TOUR" | "EXTRA",
    inventories: { recId: number; qty: number; inventory: IInventory }[],
    stocks: { recId: number; qty: number; stock: IStock }[],
    extraInventories: { recId: number; qty: number; inventory: IInventory }[],
    extraStocks: { recId: number; qty: number; stock: IStock }[],
  ) {
    super(recId, cap, closeDate, valid, validTo, start, end);
    this.inventories = inventories;
    this.stocks = stocks;
    this.extraInventories = extraInventories;
    this.extraStocks = extraStocks;
    this.productType = productType;
  }
}
