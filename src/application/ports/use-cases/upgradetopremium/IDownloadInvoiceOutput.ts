export interface DownloadInvoiceInput {
  paymentId: string;
  userId?: string;
}

export interface DownloadInvoiceOutput {
  fileName: string;
  pdfBuffer: Buffer;
}

export interface IDownloadInvoiceUseCase {
  execute(input: DownloadInvoiceInput): Promise<DownloadInvoiceOutput>;
}
