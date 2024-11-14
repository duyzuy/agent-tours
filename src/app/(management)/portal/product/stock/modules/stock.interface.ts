import { EStockType } from "@/models/management/core/inventoryType.interface";
import { IStockPayload, IStockConfirmPayload, IStockAdjustPayload } from "@/models/management/core/stock.interface";

export class StockFormData implements IStockPayload {
  inventoryId?: number;
  type?: EStockType;
  code?: string;
  description?: string;
  cap?: number;
  valid?: string;
  validTo?: string;
  start?: string;
  end?: string;
  fromValidTo?: string;
  everyDayofweek: string[];
  repeatAfter?: number;
  exclusives: {
    from?: string;
    to?: string;
  }[];
  constructor(
    inventoryId: number | undefined,
    type: EStockType | undefined,
    code: string | undefined,
    description: string | undefined,
    cap: number | undefined,
    valid: string | undefined,
    validTo: string | undefined,
    start: string | undefined,
    end: string | undefined,
    fromValidTo: string | undefined,
    everyDayofweek: string[],
    repeatAfter: number | undefined,
    exclusives: {
      from: string;
      to: string;
    }[],
  ) {
    this.inventoryId = inventoryId;
    this.type = type;
    this.code = code;
    this.description = description;
    this.cap = cap;
    this.valid = valid;
    this.validTo = validTo;
    this.start = start;
    this.end = end;
    this.fromValidTo = fromValidTo;
    this.everyDayofweek = everyDayofweek;
    this.repeatAfter = repeatAfter;
    this.exclusives = exclusives;
  }
}

export class StockConfirmFormData implements IStockConfirmPayload {
  recId: number;
  description: string;
  cap: number;
  valid?: string;
  validTo?: string;
  start?: string;
  end?: string;

  constructor(
    recId: number,
    description: string,
    cap: number,
    valid: string | undefined,
    validTo: string | undefined,
    start: string | undefined,
    end: string | undefined,
  ) {
    this.recId = recId;
    this.description = description;
    this.cap = cap;
    this.valid = valid;
    this.validTo = validTo;
    this.start = start;
    this.end = end;
  }
}

export class StockAdjustFormData implements IStockAdjustPayload {
  inventoryStockId?: number;
  rmk?: string;
  quantity?: number;

  constructor(inventoryStockId: number | undefined, rmk: string | undefined, quantity: number | undefined) {
    this.inventoryStockId = inventoryStockId;
    this.rmk = rmk;
    this.quantity = quantity;
  }
}
