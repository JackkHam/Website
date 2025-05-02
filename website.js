
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
    monitorGodotGame();
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



//AI Generated to help with clean website function
function monitorGodotGame() {
  const iframe = document.getElementById("project-frame");

  // Wait for iframe to load content
  iframe.onload = () => {
    const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
    const canvas = iframeDoc.querySelector("canvas");

    if (!canvas) return;

    let lastFrameData;
    let stillCount = 0;

    function checkFrozen() {
      try {
        const context = canvas.getContext("2d");
        const frameData = context.getImageData(0, 0, 10, 10).data;

        if (lastFrameData && compareFrames(lastFrameData, frameData)) {
          stillCount++;
        } else {
          stillCount = 0;
        }

        lastFrameData = frameData;

        // If frame hasn't changed for 60 checks (~2s at 30fps), assume frozen
        if (stillCount > 60) {
          closeModal();
          return;
        }

        requestAnimationFrame(checkFrozen);
      } catch (e) {
        console.warn("Unable to read canvas data (CORS or timing issue):", e);
      }
    }

    function compareFrames(f1, f2) {
      for (let i = 0; i < f1.length; i++) {
        if (f1[i] !== f2[i]) return false;
      }
      return true;
    }

    // Start monitoring
    requestAnimationFrame(checkFrozen);
  };
}