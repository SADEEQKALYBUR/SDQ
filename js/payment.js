const params = new URLSearchParams(window.location.search);

document.getElementById("item").textContent = params.get("item");
document.getElementById("price").textContent = params.get("price");

function payWithCard() {
  alert("Card payment coming soon (Paystack / Flutterwave)");
}

function payWithTransfer() {
  alert(
    "Transfer Details:\n\n" +
    "Bank: GTBank\n" +
    "Account No: 0123456789\n" +
    "Name: Food Store"
  );
}


function payWithCard() {
  createReceipt("Card");
}

function payWithTransfer() {
  createReceipt("Transfer");
}

function createReceipt(method) {
  const params = new URLSearchParams(window.location.search);

  const receipt = {
    id: Date.now(),
    item: params.get("item"),
    price: params.get("price"),
    method: method,
    date: new Date().toLocaleDateString(),
    time: new Date().toLocaleTimeString()
  };

  localStorage.setItem("lastReceipt", JSON.stringify(receipt));

  let allReceipts = JSON.parse(localStorage.getItem("receipts")) || [];
  allReceipts.push(receipt);
  localStorage.setItem("receipts", JSON.stringify(allReceipts));

  window.location.href = "receipt.html";
}
