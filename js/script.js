document.addEventListener("DOMContentLoaded", function () {

  /* ================= HERO SLIDER (GYARARRE) ================= */
  const data = [
    { text: "Gym Center", imgs: ["img/gym1.jpg", "img/gym2.jpg", "img/gym3.jpg"] },
    { text: "Football Pitch", imgs: ["img/foot1.jpg", "img/foot2.jpg", "img/foot3.jpg"] },
    { text: "Snooker Club", imgs: ["img/snook1.jpg", "img/snook2.jpg", "img/snook3.jpg"] },
    { text: "Barbing Salon", imgs: ["img/barbing.jpg", "img/facial.png", "img/barbing.jpg"] }
  ];

  let currentIndex = 0;
  const textEl = document.getElementById("dynamic-text");
  const imgBig = document.getElementById("img-big");
  const imgSmall1 = document.getElementById("img-small-1");
  const imgSmall2 = document.getElementById("img-small-2");

  function updateHero() {
    if (!textEl || !imgBig) return;
    
    const current = data[currentIndex];
    textEl.textContent = current.text;

    // Canja hotuna kawai ba tare da daukewa ba (don rage flickering)
    if (current.imgs[0]) imgBig.src = current.imgs[0];
    if (imgSmall1 && current.imgs[1]) imgSmall1.src = current.imgs[1];
    if (imgSmall2 && current.imgs[2]) imgSmall2.src = current.imgs[2];

    currentIndex = (currentIndex + 1) % data.length;
  }

  if (textEl) {
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
  }, { threshold: 0.1 });
  items.forEach(item => observer.observe(item));

  /* ================= BUY & BOOK BUTTONS ================= */
  document.querySelectorAll(".buy-btn, .book-btn").forEach(button => {
    button.addEventListener("click", function (e) {
      e.preventDefault(); // Wannan zai hana shafin refresh

      const name = this.getAttribute("data-name");
      const price = this.getAttribute("data-price");

      if (name && price) {
        localStorage.setItem("service", name);
        localStorage.setItem("price", price);
        localStorage.setItem("qty", 1);
        
        // Tabbatar akwai payment.html kafin ka bude wannan
        window.location.href = "payment.html"; 
      }
    });
  });
});