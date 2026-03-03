// Card Scroll Animation
const cards = document.querySelectorAll(".card");

window.addEventListener("scroll", () => {
  const trigger = window.innerHeight / 1.2;

  cards.forEach(card => {
    const cardTop = card.getBoundingClientRect().top;

    if(cardTop < trigger){
      card.style.opacity = "1";
      card.style.transform = "translateY(0)";
    }
  });
});

// Click Effect
document.querySelectorAll(".card").forEach(card => {
  card.addEventListener("click", () => {
    card.style.background = "#FFD700";
    card.style.color = "#000";
    setTimeout(()=>{
      card.style.background = "#111";
      card.style.color = "#fff";
    },300);
  });
});


const toggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("navLinks");

toggle.onclick = () => {
  navLinks.classList.toggle("active");
};