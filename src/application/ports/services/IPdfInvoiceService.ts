import { Payment } from "@/domain/entities/billing/Payment";

export interface IPdfInvoiceService {
  generate(payment: Payment): Promise<Buffer>;
}
