document.addEventListener("DOMContentLoaded", () => {
  const video = document.getElementById("heroVideo");

  if (video) {
    video.muted = true;
    video.setAttribute("playsinline", "");
    video.play().catch(() => {});
  }
});
