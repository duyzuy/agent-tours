export interface IPassengerInformation {
    recId: number;
    paxTitle: string;
    paxLastname: string;
    paxMiddleFirstName: string;
    paxGender: string;
    paxBirthdate: string;
    paxBirthyear: number;
    paxPhoneNumber: string;
    paxAddress: string;
    paxIdNumber: string;
    paxNatinality: string;
    paxPassportNumber: string;
    paxPassortExpireddate: string;
    paxInfoJson: string;
}

export class PassengerInformationFormData implements IPassengerInformation {
    recId: number;
    paxTitle: string;
    paxLastname: string;
    paxMiddleFirstName: string;
    paxGender: string;
    paxBirthdate: string;
    paxBirthyear: number;
    paxPhoneNumber: string;
    paxAddress: string;
    paxIdNumber: string;
    paxNatinality: string;
    paxPassportNumber: string;
    paxPassortExpireddate: string;
    paxInfoJson: string;
    constructor(
        recId: number,
        paxTitle: string,
        paxLastname: string,
        paxMiddleFirstName: string,
        paxGender: string,
        paxBirthdate: string,
        paxBirthyear: number,
        paxPhoneNumber: string,
        paxAddress: string,
        paxIdNumber: string,
        paxNatinality: string,
        paxPassportNumber: string,
        paxPassortExpireddate: string,
        paxInfoJson: string,
    ) {
        this.recId = recId;
        this.paxTitle = paxTitle;
        this.paxLastname = paxLastname;
        this.paxMiddleFirstName = paxMiddleFirstName;
        this.paxGender = paxGender;
        this.paxBirthdate = paxBirthdate;
        this.paxBirthyear = paxBirthyear;
        this.paxPhoneNumber = paxPhoneNumber;
        this.paxAddress = paxAddress;
        this.paxIdNumber = paxIdNumber;
        this.paxNatinality = paxNatinality;
        this.paxPassportNumber = paxPassportNumber;
        this.paxPassortExpireddate = paxPassortExpireddate;
        this.paxInfoJson = paxInfoJson;
    }
}
