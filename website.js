
//Background image
const bgImageEl = document.getElementById("bg-image");

window.addEventListener("scroll", () => {
  updateImage();
});

function updateImage() {
  bgImageEl.style.opacity = 1 - window.pageYOffset / 900;
  bgImageEl.style.backgroundSize = 115 - window.pageYOffset / 30 + "%";
}




//NAV BAR
const bar = document.querySelector(".fa-bars");
const menu = document.querySelector(".menu");

bar.addEventListener("click", () => {
  menu.classList.toggle("show-menu");
});

function showSection(sectionId) {

    //Show the selected section

    if (sectionId === "projects") {

        document.getElementById("projects").style.display = "block";

        document.getElementById("about").style.display = "none";
        document.getElementById("resume").style.display = "none";

    } else {

        document.getElementById("about").style.display = "block";
        document.getElementById("resume").style.display = "block";

        document.getElementById("projects").style.display = "none";

    }


  }


  function openProject(projectName) {
    document.getElementById("project-modal").style.display = "flex"; //Show modal
    document.getElementById("project-frame").src = projectName; //Load project in iframe
    document.querySelector("nav").style.display = "none";
}

function closeModal() {
    document.getElementById("project-modal").style.display = "none"; //Hide modal
    document.getElementById("project-frame").src = ""; //Clear iframe source to stop loading
    document.querySelector("nav").style.display = "block";
}

//Closes if click outside box
document.addEventListener("click", function(event) {
  let modal = document.getElementById("project-modal");
  let modalContent = document.querySelector(".modal-content");

  //Close modal if clicked outside of the content box
  if (event.target === modal) {
      closeModal();
  }

});