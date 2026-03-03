// ===== LOAD BOOKINGS =====
fetch("/api/bookings")
  .then(res => res.json())
  .then(data => {
    const table = document.getElementById("receiptTable");
    table.innerHTML = "";

    data.forEach((b, index) => {
      table.innerHTML += `
        <tr>
          <td>#${index + 1}</td>
          <td>${b.service}</td>
          <td>—</td>
          <td>${b.booking_date}</td>
          <td>${b.booking_time}</td>
        </tr>
      `;
    });
  });


// ===== TODAY TOTAL =====
fetch("/api/today-total")
  .then(res => res.json())
  .then(data => {
    document.getElementById("todayTotal").innerText =
      data.total + " bookings";
  });


// ===== MONTH TOTAL =====
fetch("/api/month-total")
  .then(res => res.json())
  .then(data => {
    document.getElementById("monthTotal").innerText =
      data.total + " bookings";
  });


// ===== PDF DOWNLOADS =====
function downloadDailyPDF() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  doc.text("Daily Booking Report", 10, 10);
  doc.save("daily-bookings.pdf");
}

function downloadMonthlyPDF() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  doc.text("Monthly Booking Report", 10, 10);
  doc.save("monthly-bookings.pdf");
}


// ===== LOGOUT (OPTIONAL) =====
function logout() {
  window.location.href = "/";
}

function loadPayments() {
  fetch("http://localhost:3000/api/payments")
    .then(res => res.json())
    .then(data => {
      const table = document.getElementById("receiptTable");
      table.innerHTML = "";

      data.forEach(p => {
        table.innerHTML += `
          <tr>
            <td>${p.receipt_no}</td>
            <td>${p.product_name}</td>
            <td>${p.qty}</td>
            <td>₦${p.total}</td>
            <td>${new Date(p.created_at).toLocaleString()}</td>
          </tr>
        `;
      });
    });
}

setInterval(loadPayments, 5000);
loadPayments();