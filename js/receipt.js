const receipt = JSON.parse(localStorage.getItem("lastReceipt"));

document.getElementById("item").textContent = receipt.item;
document.getElementById("price").textContent = receipt.price;
document.getElementById("method").textContent = receipt.method;
document.getElementById("datetime").textContent =
  receipt.date + " | " + receipt.time;

new QRCode(document.getElementById("qrcode"), {
  text: "Food Store Receipt #" + receipt.id,
  width: 100,
  height: 100
});

function sendWhatsApp() {
  const msg =
    "RECEIPT\n\n" +
    "Item: " + receipt.item + "\n" +
    "Amount: ₦" + receipt.price + "\n" +
    "Date: " + receipt.date + "\n" +
    "Time: " + receipt.time;

  window.open(
    "https://wa.me/?text=" + encodeURIComponent(msg),
    "_blank"
  );
}

function sendEmail() {
  const subject = "Your Purchase Receipt";
  const body =
    "Item: " + receipt.item + "\n" +
    "Amount: ₦" + receipt.price + "\n" +
    "Date: " + receipt.date + "\n" +
    "Time: " + receipt.time;

  window.location.href =
    "mailto:?subject=" +
    encodeURIComponent(subject) +
    "&body=" +
    encodeURIComponent(body);
}

function printReceipt() {
  window.print();
}


document.getElementById("receiptId").textContent =
  "FS-" + receipt.id;

  function downloadPDF() {
  const { jsPDF } = window.jspdf;
  const pdf = new jsPDF();

  pdf.text("FOOD STORE RECEIPT", 20, 20);
  pdf.text("Receipt No: FS-" + receipt.id, 20, 30);
  pdf.text("Item: " + receipt.item, 20, 45);
  pdf.text("Amount: NGN " + receipt.price, 20, 55);
  pdf.text("Payment: " + receipt.method, 20, 65);
  pdf.text("Date: " + receipt.date, 20, 75);
  pdf.text("Time: " + receipt.time, 20, 85);

  pdf.save("receipt_FS-" + receipt.id + ".pdf");
}
