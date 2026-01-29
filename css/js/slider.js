const cards = document.querySelectorAll(".card");

cards.forEach(card => {
  const imgBox = card.querySelector(".card-img");
  const images = card.dataset.images.split(",");
  let index = 0;

  // first image
  imgBox.style.backgroundImage = `url(images/${images[index]})`;

  setInterval(() => {
    index = (index + 1) % images.length;
    imgBox.style.backgroundImage = `url(images/${images[index]})`;
  }, 3000);
});
