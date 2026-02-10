document.addEventListener("DOMContentLoaded", () => {
  const menuIcon = document.getElementById("menuIcon");
  const navLinks = document.getElementById("navLinks");
  const video = document.getElementById("heroVideo");

  menuIcon.onclick = () => {
    navLinks.classList.toggle("show");
  };

  if(video){
    video.muted = true;
    video.play().catch(()=>{});
  }
});

let cart = [];

/* ADD TO CART */
function addToCart(name, price){
  cart.push({name, price});
  alert(name + " an saka shi a cart");
  openCheckout();
}

/* OPEN CHECKOUT */
function openCheckout(){
  const checkout = document.getElementById("checkout");
  const items = document.getElementById("cartItems");

  checkout.style.display = "block";
  items.innerHTML = "";

  let total = 0;

  cart.forEach(item => {
    total += item.price;
    items.innerHTML += `
      <div class="checkout-item">
        <span>${item.name}</span>
        <strong>₦${item.price}</strong>
      </div>
    `;
  });

  document.getElementById("total").innerText = "Jimla: ₦" + total;
  checkout.scrollIntoView({behavior:"smooth"});
}

/* SCROLL TO MENU */
function scrollToMenu(){
  document.getElementById("menu").scrollIntoView({
    behavior:"smooth"
  });
}
