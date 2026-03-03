document.addEventListener("DOMContentLoaded", function () {

  let service = localStorage.getItem("service");
  let price = localStorage.getItem("price");
  let qty = localStorage.getItem("qty") || 1;

  if (!service || !price) {
    alert("No product selected!");
    window.location.href = "index.html";
    return;
  }

  price = Number(price);
  qty = Number(qty);

  let total = price * qty;

  document.getElementById("pName").textContent = service;
  document.getElementById("pPrice").textContent = "₦" + price;
  document.getElementById("pQty").textContent = qty;
  document.getElementById("pTotal").textContent = "₦" + total;

  document.querySelector(".payment-button")
    .addEventListener("click", function () {
      payWithPaystack(service, price, qty, total);
    });

});

function payWithPaystack(name, price, qty, total) {

  let handler = PaystackPop.setup({
    key: "YOUR_PUBLIC_KEY",
    email: "customer@email.com",
    amount: total * 100,
    currency: "NGN",

    callback: function(response) {

      fetch("http://localhost:3000/api/verify-payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          reference: response.reference,
          product_name: name,
          price: price,
          qty: qty,
          total: total
        })
      })
      .then(res => res.json())
      .then(data => {
        alert("Payment Successful ✅ Receipt: " + data.receiptNo);
        window.location.href =
          "receipt.html?receipt=" + data.receiptNo;
      });

    },

    onClose: function() {
      alert("Payment cancelled");
    }
  });

  handler.openIframe();
}

function payWithPaystack() {
  let handler = PaystackPop.setup({
    key: 'pk_test_78fff190640337a7124e226987296b71c97cdbcc',
    email: 'customer@email.com',
    amount: 500000, // 5000 NGN (a kobo ake saka)
    currency: 'NGN',
    callback: function(response) {
      alert('Payment successful! Reference: ' + response.reference);
      window.location.href = "success.html";
    },
    onClose: function() {
      alert('Transaction was not completed');
    }
  });

  handler.openIframe();
}