const menuIcon = document.getElementById("menuIcon");
const navLinks = document.getElementById("navLinks");

menuIcon.onclick = () => {
  navLinks.classList.toggle("active");
};
