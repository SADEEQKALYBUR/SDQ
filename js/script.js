

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
  const current = data[currentIndex];

  // 1. Canza Rubutu
  textEl.innerHTML = current.text;

  // 2. Canza Hotuna tare da Animation
  [imgBig, imgSmall1, imgSmall2].forEach(img => img.style.opacity = 0);

  setTimeout(() => {
    imgBig.src = current.imgs[0];
    imgSmall1.src = current.imgs[1];
    imgSmall2.src = current.imgs[2];
    [imgBig, imgSmall1, imgSmall2].forEach(img => img.style.opacity = 1);
  }, 500);

  currentIndex = (currentIndex + 1) % data.length;
}

// Kira aikin kowane sakan 4
setInterval(updateHero, 4000);
updateHero(); // Fara lokaci daya


function goToPayment(name, price) {
  window.location.href = "payment.html?item=" + 
    encodeURIComponent(name) + "&price=" + price;

}

 const items = document.querySelectorAll(".animate");

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }
    });
  }, { threshold: 0.2 });

  items.forEach(item => observer.observe(item));