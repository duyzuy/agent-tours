export interface IInvoice {
    invoiceName: string;
    invoiceCompanyName: string;
    invoiceAddress: string;
    invoiceTaxCode: string;
    invoiceEmail: string;
}

export class InvoiceFormData {
    invoiceName?: string;
    invoiceCompanyName?: string;
    invoiceAddress?: string;
    invoiceTaxCode?: string;
    invoiceEmail?: string;

    constructor(
        invoiceName: string | undefined,
        invoiceCompanyName: string | undefined,
        invoiceAddress: string | undefined,
        invoiceTaxCode: string | undefined,
        invoiceEmail: string | undefined,
    ) {
        this.invoiceName = invoiceName;
        this.invoiceCompanyName = invoiceCompanyName;
        this.invoiceAddress = invoiceAddress;
        this.invoiceTaxCode = invoiceTaxCode;
        this.invoiceEmail = invoiceEmail;
    }
}
