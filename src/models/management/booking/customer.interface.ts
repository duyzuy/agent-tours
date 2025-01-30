export interface ICustomerInformation {
  custName?: string;
  custPhoneNumber?: string;
  custEmail?: string;
  custAddress?: string;
  rmk?: string;
  referenceId?: string;
}

export class CustomerInformation implements ICustomerInformation {
  custName?: string;
  custPhoneNumber?: string;
  custEmail?: string;
  custAddress?: string;
  rmk?: string;
  referenceId?: string;

  constructor(
    custName: string | undefined,
    custPhoneNumber: string | undefined,
    custEmail: string | undefined,
    custAddress: string | undefined,
    rmk: string | undefined,
    referenceId: string | undefined,
  ) {
    this.custName = custName;
    this.custPhoneNumber = custPhoneNumber;
    this.custEmail = custEmail;
    this.custAddress = custAddress;
    this.rmk = rmk;
    this.referenceId = referenceId;
  }
}
