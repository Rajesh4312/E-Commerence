"use client";

export default function InvoiceButton({ order }: { order: any }) {
  const handleDownload = async () => {
    try {
      const res = await fetch("/api/invoice", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ order }),
      });

      if (!res.ok) throw new Error("Failed to generate invoice");

      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `invoice-${order.id}.pdf`;
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      alert("Failed to generate invoice");
    }
  };

  return (
    <button
      onClick={handleDownload}
      className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
    >
      Download Invoice (PDF)
    </button>
  );
}
