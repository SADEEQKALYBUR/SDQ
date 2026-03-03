function openService(type) {
  const modal = document.getElementById("serviceModal");
  const title = document.getElementById("serviceTitle");
  const desc = document.getElementById("serviceDesc");

  const services = {
    gym: {
      title: "Gym & Fitness",
      desc: "Modern gym equipment, personal training, weight loss and muscle building programs."
    },
    football: {
      title: "Football",
      desc: "Training sessions, pitch booking, friendly matches and tournaments."
    },
    swimming: {
      title: "Swimming Pool",
      desc: "Clean and safe swimming pool with adult and kids sessions."
    },
    game: {
      title: "Game Center",
      desc: "PS5 & PS4 games, FIFA, Call of Duty and multiplayer competitions."
    },
    barbing: {
      title: "Barbing Salon",
      desc: "Professional haircut, beard trim and modern grooming services."
    },
    massage: {
      title: "Massage",
      desc: "Relaxing body massage, stress relief and wellness therapy."
    },
    shisha: {
      title: "Shisha Lounge",
      desc: "Different flavors, calm environment and premium shisha experience."
    },
    restaurant: {
      title: "Restaurant",
      desc: "Delicious meals, drinks and comfortable dining environment."
    },
    yoga: {
      title: "Yoga",
      desc: "Yoga classes for flexibility, breathing and mental wellness."
    }
  };

  title.innerText = services[type].title;
  desc.innerText = services[type].desc;

  modal.classList.add("show");
}

function closeService() {
  document.getElementById("serviceModal").classList.remove("show");
}


const menuIcon = document.getElementById("menuIcon");
const navLinks = document.getElementById("navLinks");

menuIcon.addEventListener("click", () => {
  navLinks.classList.toggle("show");

  // canza icon
  menuIcon.innerHTML = navLinks.classList.contains("show") ? "✕" : "☰";
});

window.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const selectedService = params.get("service");

  if (selectedService) {
    const serviceSelect = document.getElementById("service");
    serviceSelect.value = selectedService;
  }
});

document.querySelector(".booking-form").addEventListener("submit", function(e){
  e.preventDefault();

  const service = document.getElementById("service").value;
  const date = document.getElementById("date").value;
  const time = document.getElementById("time").value;
  const name = document.getElementById("name").value;
  const phone = document.getElementById("phone").value;

  const msg =
`Booking Request
Service: ${service}
Date: ${date}
Time: ${time}
Name: ${name}
Phone: ${phone}`;

  window.open(
    `https://wa.me/2348012345678?text=${encodeURIComponent(msg)}`,
    "_blank"
  );
});


