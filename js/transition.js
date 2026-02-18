document.querySelectorAll('.view-btn').forEach(button => {
  button.addEventListener('click', function(e) {
    e.preventDefault();
    const link = this.getAttribute('href');

    document.body.classList.add('fade-out');

    setTimeout(() => {
      window.location.href = link;
    }, 800); // 0.8 second animation
  });
});

const menuIcon = document.getElementById("menuIcon");
const navLinks = document.getElementById("navLinks");

menuIcon.addEventListener("click", ()=>{
  navLinks.classList.toggle("active");
});