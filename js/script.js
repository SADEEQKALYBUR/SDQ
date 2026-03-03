document.addEventListener("DOMContentLoaded", function () {

  /* ================= HERO SLIDER ================= */
const data = [
  { 
    text: "Gym Center", 
    imgs: ["img/gym3.jpg", "img/gym1.jpg", "img/gym2.jpg"] 
  },
  { 
    text: "Football Pitch", 
    imgs: ["img/foot1.jpg", "img/foot2.jpg", "img/foot3.jpg"] // Tabbatar wadannan ma suna cikin folder img
  },
  { 
    text: "Snooker Club", 
    imgs: ["img/snook1.jpg", "img/snook2.jpg", "img/snook3.jpg"] 
  },
  { 
    text: "Barbing Salon", 
    imgs: ["img/barb1.jpg", "img/barb2.jpg", "img/barb3.jpg"] 
  }
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

    [imgBig, imgSmall1, imgSmall2].forEach(img => { if (img) img.style.opacity = 0; });

    setTimeout(() => {
      if (imgBig) imgBig.src = current.imgs[0];
      if (imgSmall1) imgSmall1.src = current.imgs[1];
      if (imgSmall2) imgSmall2.src = current.imgs[2];
      [imgBig, imgSmall1, imgSmall2].forEach(img => { if (img) img.style.opacity = 1; });
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
      if (entry.isIntersecting) entry.target.classList.add("show");
    });
  }, { threshold: 0.2 });
  items.forEach(item => observer.observe(item));

  /* ================= BUY & BOOK BUTTONS (GYARARRE) ================= */
  // Mun hada duka buttons din a nan don kaucewa maimaita code
  document.querySelectorAll(".buy-btn, .book-btn").forEach(button => {
    button.addEventListener("click", function (e) {
      // Wannan zai hana shafin refresh idan 'a' tag ne
      if(this.tagName === 'A') e.preventDefault(); 

      const name = this.getAttribute("data-name");
      const price = this.getAttribute("data-price");

      // Idan babu data, maimakon alert, zamu iya saita default
      if (!name || !price) {
        console.error("Data missing on button!");
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
  if(!qtyElement) return;
  let qty = parseInt(qtyElement.innerText);
  qty += change;
  if (qty < 1) qty = 1;
  qtyElement.innerText = qty;
}