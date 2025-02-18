


//Background image
const bgImageEl = document.getElementById("bg-image");

window.addEventListener("scroll", () => {
  updateImage();
});

function updateImage() {
  bgImageEl.style.opacity = 1 - window.pageYOffset / 900;
  bgImageEl.style.backgroundSize = 143 - window.pageYOffset / 10 + "%";
}




//NAV BAR
const bar = document.querySelector(".fa-bars");
const menu = document.querySelector(".menu");

bar.addEventListener("click", () => {
  menu.classList.toggle("show-menu");
});
