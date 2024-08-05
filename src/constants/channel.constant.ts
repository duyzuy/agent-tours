export enum EConfigChannel {
  AGENT = "AGENT",
  CUSTOMER = "CUSTOMER",
}
export enum ESellChannel {
  B2B = "B2B",
  B2C = "B2C",
}

export enum EConfigClass {
  A1 = "A1",
  A2 = "A2",
  A3 = "A3",
  AX1 = "AX1",
  C1 = "C1",
  C2 = "C2",
  C3 = "C3",
  C4 = "C4",
  C5 = "C5",
  CX1 = "CX1",
  CX2 = "CX2",
  SP1 = "SP1",
  SP2 = "SP2",
}

export type TConfigClassChannels = {
  [EConfigChannel.CUSTOMER]: [
    EConfigClass.C1,
    EConfigClass.C2,
    EConfigClass.C3,
    EConfigClass.C4,
    EConfigClass.C5,
    EConfigClass.CX1,
    EConfigClass.CX2,
    EConfigClass.SP1,
  ];
  [EConfigChannel.AGENT]: [EConfigClass.A1, EConfigClass.A2, EConfigClass.A3, EConfigClass.AX1, EConfigClass.SP2];
};

export const productTourClassChannels = {
  [EConfigChannel.CUSTOMER]: [
    EConfigClass.C1,
    EConfigClass.C2,
    EConfigClass.C3,
    EConfigClass.C4,
    EConfigClass.C5,
    EConfigClass.SP1,
  ],
  [EConfigChannel.AGENT]: [EConfigClass.A1, EConfigClass.A2, EConfigClass.A3, EConfigClass.SP2],
};

export const productExtraClassChannels = {
  [EConfigChannel.CUSTOMER]: [EConfigClass.CX1, EConfigClass.CX2],
  [EConfigChannel.AGENT]: [EConfigClass.AX1],
};

export const SELL_CHANNEL = [
  {
    label: "B2B",
    value: ESellChannel.B2B,
  },
  {
    label: "B2C",
    value: ESellChannel.B2C,
  },
];
