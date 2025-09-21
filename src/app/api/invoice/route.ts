import { NextResponse } from "next/server";
import { PDFDocument, rgb } from "pdf-lib";
import * as fontkit from "fontkit";
import fs from "fs";
import path from "path";

export async function POST(req: Request) {
  try {
    const { order } = await req.json();

    if (!order) {
      return NextResponse.json({ error: "No order provided" }, { status: 400 });
    }

    // Load RobotoFlex font
    const fontPath = path.resolve("./public/fonts/RobotoFlex-VariableFont.ttf");
    const fontBytes = fs.readFileSync(fontPath);

    // Create PDF
    const pdfDoc = await PDFDocument.create();
    pdfDoc.registerFontkit(fontkit);

    const page = pdfDoc.addPage([600, 800]);
    const customFont = await pdfDoc.embedFont(fontBytes);

    let y = 750;

    // Header
    page.drawText("RadiShop", {
      x: 250,
      y,
      size: 24,
      font: customFont,
      color: rgb(0, 0.5, 0.8),
    });

    y -= 40;
    page.drawText("Invoice", {
      x: 260,
      y,
      size: 20,
      font: customFont,
      color: rgb(0, 0, 0),
    });

    // Order info
    y -= 50;
    page.drawText(`Order ID: ${order.id || "N/A"}`, {
      x: 50,
      y,
      size: 12,
      font: customFont,
    });

    y -= 20;
    page.drawText(`Customer: ${order.customer || "Guest"}`, {
      x: 50,
      y,
      size: 12,
      font: customFont,
    });

    y -= 20;
    page.drawText(`Date: ${new Date().toLocaleDateString()}`, {
      x: 50,
      y,
      size: 12,
      font: customFont,
    });

    // Items header
    y -= 50;
    page.drawText("Items", { x: 50, y, size: 14, font: customFont });
    page.drawText("Price", { x: 400, y, size: 14, font: customFont });
    y -= 10;
    page.drawLine({ start: { x: 50, y }, end: { x: 550, y }, thickness: 1 });

    // Items
    order.items.forEach((item: any, idx: number) => {
      y -= 30;
      page.drawText(`${idx + 1}. ${item.name} (x${item.quantity})`, {
        x: 50,
        y,
        size: 12,
        font: customFont,
      });
      page.drawText(`₹${(item.priceCents / 100).toFixed(2)}`, {
        x: 400,
        y,
        size: 12,
        font: customFont,
      });
    });

    // Total
    y -= 50;
    page.drawText(`Total: ₹${(order.totalCents / 100).toFixed(2)}`, {
      x: 400,
      y,
      size: 16,
      font: customFont,
    });

    // Footer
    y -= 80;
    page.drawText("Thank you for shopping with RadiShop!", {
      x: 150,
      y,
      size: 12,
      font: customFont,
      color: rgb(0.2, 0.2, 0.2),
    });

    const pdfBytes = await pdfDoc.save();

    return new NextResponse(pdfBytes, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename=invoice-${order.id || "order"}.pdf`,
      },
    });
  } catch (err: any) {
    console.error("Invoice error:", err);
    return NextResponse.json(
      { error: "Failed to generate invoice" },
      { status: 500 }
    );
  }
}
