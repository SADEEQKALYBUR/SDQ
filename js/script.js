document.addEventListener("DOMContentLoaded", function () {

  /* ================= HERO SLIDER ================= */

  const data = [
    { text: "Gym Center", imgs: ["img/gym1.jpg", "img/gym2.jpg", "img/gym3.jpg"] },
    { text: "Football Pitch", imgs: ["img/foot1.jpg", "img/foot2.jpg", "img/foot3.jpg"] },
    { text: "Snooker Club", imgs: ["img/snook1.jpg", "img/snook2.jpg", "img/snook3.jpg"] },
    { text: "Barbing Salon", imgs: ["img/barb1.jpg", "img/barb2.jpg", "img/barb3.jpg"] }
  ];

  let currentIndex = 0;

  const textEl = document.getElementById("dynamic-text");
  const imgBig = document.getElementById("img-big");
  const imgSmall1 = document.getElementById("img-small-1");
  const imgSmall2 = document.getElementById("img-small-2");

  function updateHero() {

    if (!textEl) return;

    const current = data[currentIndex];

    textEl.innerHTML = current.text;

    [imgBig, imgSmall1, imgSmall2].forEach(img => {
      if (img) img.style.opacity = 0;
    });

    setTimeout(() => {

      if (imgBig) imgBig.src = current.imgs[0];
      if (imgSmall1) imgSmall1.src = current.imgs[1];
      if (imgSmall2) imgSmall2.src = current.imgs[2];

      [imgBig, imgSmall1, imgSmall2].forEach(img => {
        if (img) img.style.opacity = 1;
      });

    }, 400);

    currentIndex = (currentIndex + 1) % data.length;
  }

  if (textEl) {
    updateHero();
    setInterval(updateHero, 4000);
  }

  /* ================= ANIMATION ON SCROLL ================= */

  const items = document.querySelectorAll(".animate");

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }
    });
  }, { threshold: 0.2 });

  items.forEach(item => observer.observe(item));


  /* ================= BUY BUTTON ================= */

  document.querySelectorAll(".buy-btn").forEach(button => {
    button.addEventListener("click", function () {

      const name = this.dataset.name;
      const price = this.dataset.price;

      if (!name || !price) {
        alert("Product data missing!");
        return;
      }

      localStorage.setItem("service", name);
      localStorage.setItem("price", price);
      localStorage.setItem("qty", 1);

      window.location.href = "payment.html";
    });
  });


  /* ================= BOOK BUTTON ================= */

  document.querySelectorAll(".book-btn").forEach(button => {
    button.addEventListener("click", function (e) {

      e.preventDefault();

      const name = this.dataset.name;
      const price = this.dataset.price;

      if (!name || !price) {
        alert("Service data missing!");
        return;
      }

      localStorage.setItem("service", name);
      localStorage.setItem("price", price);
      localStorage.setItem("qty", 1);

      window.location.href = "payment.html";
    });
  });

});


/* ================= QUANTITY CONTROL ================= */

function changeQty(button, change) {

  let qtyElement = button.parentElement.querySelector(".qty");
  let qty = parseInt(qtyElement.innerText);

  qty += change;

  if (qty < 1) qty = 1;

  qtyElement.innerText = qty;
}


/* ================= SEND BOOKING TO NODE SERVER ================= */

async function sendBooking(event) {

  event.preventDefault();

  const bookingData = {
    service: document.getElementById('service')?.value,
    date: document.getElementById('date')?.value,
    time: document.getElementById('time')?.value,
    name: document.getElementById('name')?.value,
    phone: document.getElementById('phone')?.value,
    note: document.getElementById('note')?.value
  };

  try {

    const response = await fetch('http://localhost:3000/api/book', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(bookingData)
    });

    const result = await response.json();

    if (response.ok) {
      alert(result.message);
      event.target.reset();
    } else {
      alert("Kuskure: " + result.error);
    }

  } catch (error) {
    console.error("Server error:", error);
    alert("Ba a iya haɗuwa da Server ba.");
  }
}

document.addEventListener("DOMContentLoaded", function () {

  document.querySelectorAll(".book-btn").forEach(button => {
    button.addEventListener("click", function (e) {

      e.preventDefault();

      const name = this.dataset.name;
      const price = this.dataset.price;

      if (!name || !price) {
        alert("Service data missing!");
        return;
      }

      localStorage.setItem("service", name);
      localStorage.setItem("price", price);
      localStorage.setItem("qty", 1);

      window.location.href = "payment.html";
    });
  });

});
