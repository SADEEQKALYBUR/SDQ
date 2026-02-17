const receipts = JSON.parse(localStorage.getItem("receipts")) || [];

const today = new Date().toLocaleDateString();
const month = new Date().getMonth();
const year = new Date().getFullYear();

let todayTotal = 0;
let monthTotal = 0;

const tbody = document.getElementById("receiptTable");

receipts.forEach(r => {
  // table
  const tr = document.createElement("tr");
  tr.innerHTML = `
    <td>FS-${r.id}</td>
    <td>${r.item}</td>
    <td>₦${r.price}</td>
    <td>${r.date}</td>
    <td>${r.time}</td>
  `;
  tbody.appendChild(tr);

  // totals
  if (r.date === today) {
    todayTotal += Number(r.price);
  }

  const rDate = new Date(r.date);
  if (rDate.getMonth() === month && rDate.getFullYear() === year) {
    monthTotal += Number(r.price);
  }
});

document.getElementById("todayTotal").textContent = "₦" + todayTotal;
document.getElementById("monthTotal").textContent = "₦" + monthTotal;

// ================= PDF REPORTS =================

function downloadDailyPDF() {
  generatePDF("DAILY SALES REPORT", receipts.filter(r => r.date === today));
}

function downloadMonthlyPDF() {
  generatePDF("MONTHLY SALES REPORT", receipts.filter(r => {
    const d = new Date(r.date);
    return d.getMonth() === month && d.getFullYear() === year;
  }));
}

function generatePDF(title, data) {
  const { jsPDF } = window.jspdf;
  const pdf = new jsPDF();

  pdf.text(title, 20, 20);

  let y = 30;
  let total = 0;

  data.forEach((r, i) => {
    pdf.text(
      `${i + 1}. ${r.item} - NGN ${r.price} (${r.date})`,
      20,
      y
    );
    total += Number(r.price);
    y += 8;
  });

  y += 10;
  pdf.text("Total: NGN " + total, 20, y);

  pdf.save(title.replaceAll(" ", "_") + ".pdf");
}
