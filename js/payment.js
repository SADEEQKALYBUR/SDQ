document.addEventListener("DOMContentLoaded", function () {
  // 1. Karbo bayanai daga localStorage
  let service = localStorage.getItem("service");
  let price = localStorage.getItem("price");
  let qty = localStorage.getItem("qty") || 1;

  // 2. Duba idan akwai kaya, idan babu, kada mu yi alert, mu tura shi Home kawai
  if (!service || !price) {
    console.log("No product in storage, redirecting...");
    window.location.href = "index.html"; 
    return;
  }

  // 3. Mayar da su lamba (Numbers)
  price = Number(price);
  qty = Number(qty);
  let total = price * qty;

  // 4. Nuna bayanan a shafin Payment
  if(document.getElementById("pName")) document.getElementById("pName").textContent = service;
  if(document.getElementById("pPrice")) document.getElementById("pPrice").textContent = "₦" + price.toLocaleString();
  if(document.getElementById("pQty")) document.getElementById("pQty").textContent = qty;
  if(document.getElementById("pTotal")) document.getElementById("pTotal").textContent = "₦" + total.toLocaleString();

  // 5. Button din biya
  const payBtn = document.querySelector(".payment-button");
  if (payBtn) {
    payBtn.addEventListener("click", function () {
      startPaystack(service, price, qty, total);
    });
  }
});

// 6. Function din biya guda daya kacal
function startPaystack(name, price, qty, total) {
  let handler = PaystackPop.setup({
    key: 'pk_test_78fff190640337a7124e226987296b71c97cdbcc', // Test key dinka
    email: 'customer@email.com',
    amount: total * 100, // Kobo (Naira * 100)
    currency: 'NGN',
    callback: function(response) {
      // Tura bayanan zuwa server dinka don tantancewa
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
        alert("Biya ya yi nasara! ✅ Receipt: " + (data.receiptNo || response.reference));
        window.location.href = "receipt.html?receipt=" + (data.receiptNo || response.reference);
      })
      .catch(err => {
        console.error(err);
        alert("An biya, amma an samu matsala wajen hadawa da server.");
      });
    },
    onClose: function() {
      alert("Ka fita ba tare da ka kammala biya ba.");
    }
  });

  handler.openIframe();
}