import PDFDocument from "pdfkit";
import { Payment } from "@/domain/entities/billing/Payment";
import { IPdfInvoiceService } from "@/application/ports/services/IPdfInvoiceService";

export class PdfKitInvoiceGenerator implements IPdfInvoiceService {
  generate(payment: Payment): Promise<Buffer> {
    return new Promise((resolve, reject) => {
      const doc = new PDFDocument({
        size: "A4",
        margin: 50,
        layout: "portrait",
        bufferPages: true,
      });

      const chunks: Buffer[] = [];
      doc.on("data", (chunk) => chunks.push(chunk));
      doc.on("end", () => resolve(Buffer.concat(chunks)));
      doc.on("error", reject);

      // ────────────────────────────────────────────────
      // Color Palette (professional & modern)
      // ────────────────────────────────────────────────
      const colors = {
        primary: "#1e3a8a", // deep blue
        secondary: "#3b82f6",
        accent: "#eab308",
        text: "#111827",
        textLight: "#4b5563",
        border: "#d1d5db",
        background: "#f9fafb",
      };

      // Helper functions
      const drawHorizontalLine = (
        y: number,
        color = colors.border,
        thickness = 1
      ) => {
        doc
          .strokeColor(color)
          .lineWidth(thickness)
          .moveTo(50, y)
          .lineTo(545, y)
          .stroke();
      };

      // ─── Header ───────────────────────────────────────
      doc
        .font("Helvetica-Bold")
        .fontSize(28)
        .fillColor(colors.primary)
        .text("INVOICE", 50, 40);

      // Company/Your brand (right side)
      doc
        .font("Helvetica-Bold")
        .fontSize(16)
        .fillColor(colors.text)
        .text("Astra Team", 350, 40, { align: "right", width: 195 });

      doc
        .font("Helvetica")
        .fontSize(10)
        .fillColor(colors.textLight)
        .text("Street Address 123", 350, 62, { align: "right", width: 195 })
        .text("Kochi, Kerala 6820045", 350, 76, { align: "right", width: 195 })
        .text("GSTIN: 32ABCDE1234F1Z5", 350, 90, { align: "right", width: 195 })
        .text("contact@Astra-teams.com", 350, 104, {
          align: "right",
          width: 195,
        });

      drawHorizontalLine(135, colors.primary, 2);

      // ─── Invoice Info (two columns) ──────────────────
      const leftCol = 50;
      const rightCol = 320;

      doc.font("Helvetica-Bold").fontSize(11).fillColor(colors.text);

      // Left column - Bill To
      doc.text("BILL TO", leftCol, 155);
      doc
        .font("Helvetica")
        .fontSize(10)
        .fillColor(colors.textLight)
        .text(payment.billingSnapshot.userName || "—", leftCol, 172)
        .text(payment.billingSnapshot.userEmail || "—", leftCol, 188);
      // .text(payment.billingSnapshot.phone || '', leftCol, 204)
      // .text(payment.billingSnapshot.address || '', leftCol, 220);

      // Right column - Invoice details
      doc
        .font("Helvetica-Bold")
        .fontSize(11)
        .fillColor(colors.text)
        .text("INVOICE DETAILS", rightCol, 155);

      doc.font("Helvetica").fontSize(10).fillColor(colors.textLight);

      const detailsStartY = 172;
      const rowHeight = 16;

      doc.text(`Invoice No:`, rightCol, detailsStartY);
      doc.text(`Date:`, rightCol, detailsStartY + rowHeight);
      doc.text(`Due Date:`, rightCol, detailsStartY + rowHeight * 2);
      doc.text(`Payment Method:`, rightCol, detailsStartY + rowHeight * 3);

      // Values - right aligned
      const valueX = 460;
      doc
        .font("Helvetica-Bold")
        .fillColor(colors.text)
        .text(`#${payment.invoiceNumber || "—"}`, valueX, detailsStartY, {
          align: "right",
          width: 85,
        })
        .text(
          payment.createdAt?.toLocaleDateString("en-IN") || "—",
          valueX,
          detailsStartY + rowHeight,
          { align: "right", width: 85 }
        )

        .text(payment.method || "—", valueX, detailsStartY + rowHeight * 3, {
          align: "right",
          width: 85,
        });

      drawHorizontalLine(260);

      // ─── Items Table ─────────────────────────────────
      const tableTop = 285;
      const rowHeightTable = 28;

      // Table Header
      doc
        .font("Helvetica-Bold")
        .fontSize(11)
        .fillColor(colors.background)
        .rect(50, tableTop - 8, 495, 28)
        .fill(colors.primary);

      doc
        .fillColor("white")
        .text("Description", 60, tableTop)
        .text("Plan", 260, tableTop)
        .text("Amount", 450, tableTop, { width: 85, align: "right" });

      drawHorizontalLine(tableTop + 20, colors.border, 1.5);

      // Item row
      let currentY = tableTop + rowHeightTable;

      doc.font("Helvetica").fontSize(10).fillColor(colors.text);

      doc.text("Subscription Payment", 60, currentY);
      doc.text(payment.planName || "—", 260, currentY);
      doc
        .font("Helvetica-Bold")
        .text(
          `${payment.amount.toLocaleString("en-IN")} ${payment.currency}`,
          450,
          currentY,
          { width: 85, align: "right" }
        );

      currentY += rowHeightTable;

      drawHorizontalLine(currentY - 8);

      // ─── Total Section ───────────────────────────────
      const totalY = currentY + 20;

      doc.font("Helvetica-Bold").fontSize(12).fillColor(colors.text);

      doc.text("TOTAL", 380, totalY);
      doc
        .fontSize(14)
        .fillColor(colors.primary)
        .text(
          `${payment.amount.toLocaleString("en-IN", {
            minimumFractionDigits: 2,
          })} ${payment.currency}`,
          380,
          totalY,
          { align: "right", width: 165 }
        );

      drawHorizontalLine(totalY + 28, colors.primary, 2);

      // Thank you & Footer
      doc
        .font("Helvetica")
        .fontSize(10)
        .fillColor(colors.textLight)
        .text("Thank you for your business!", 50, 680, {
          align: "center",
          width: 495,
        })
        .text(
          "Payment received. This is a computer-generated invoice.",
          50,
          700,
          { align: "center", width: 495 }
        );

      // Optional: small logo / watermark / QR code area
      // doc.opacity(0.08).fontSize(80).fillColor(colors.primary).text('PAID', 150, 380, { align: 'center' });
      // doc.opacity(1);

      doc.end();
    });
  }
}
