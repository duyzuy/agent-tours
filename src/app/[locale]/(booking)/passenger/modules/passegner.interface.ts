export class FePassengerInformationFormData {
    recId?: number;
    paxTitle?: string;
    paxLastname?: string;
    paxMiddleFirstName?: string;
    paxGender?: string;
    paxBirthDate?: string;
    paxBirthYear?: number;
    paxPhoneNumber?: string;
    paxAddress?: string;
    paxIdNumber?: string;
    paxNationality?: string;
    paxPassportNumber?: string;
    paxPassortExpiredDate?: string;

    constructor(
        recId: number | undefined,
        paxTitle: string | undefined,
        paxLastname: string | undefined,
        paxMiddleFirstName: string | undefined,
        paxGender: string | undefined,
        paxBirthDate: string | undefined,
        paxBirthYear: number | undefined,
        paxPhoneNumber: string | undefined,
        paxAddress: string | undefined,
        paxIdNumber: string | undefined,
        paxNationality: string | undefined,
        paxPassportNumber: string | undefined,
        paxPassortExpiredDate: string | undefined,
    ) {
        this.recId = recId;
        this.paxTitle = paxTitle;
        this.paxLastname = paxLastname;
        this.paxMiddleFirstName = paxMiddleFirstName;
        this.paxGender = paxGender;
        this.paxBirthDate = paxBirthDate;
        this.paxBirthYear = paxBirthYear;
        this.paxPhoneNumber = paxPhoneNumber;
        this.paxAddress = paxAddress;
        this.paxIdNumber = paxIdNumber;
        this.paxNationality = paxNationality;
        this.paxPassportNumber = paxPassportNumber;
        this.paxPassortExpiredDate = paxPassortExpiredDate;
    }
}
