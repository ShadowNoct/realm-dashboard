function showSection(sectionId) {
  const pages = document.querySelectorAll(".page");
  const buttons = document.querySelectorAll(".navBtn");

  pages.forEach(page => {
    page.classList.remove("activePage");
  });

  buttons.forEach(button => {
    button.classList.remove("active");
  });

  document.getElementById(sectionId).classList.add("activePage");

  const clickedButton = Array.from(buttons).find(button =>
    button.getAttribute("onclick") === "showSection('" + sectionId + "')"
  );

  if (clickedButton) {
    clickedButton.classList.add("active");
  }

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}

function copyText(text) {
  navigator.clipboard.writeText(text).then(() => {
    alert("Copied.");
  }).catch(() => {
    alert("Copy failed. You can copy it manually.");
  });
}

function openLink(url) {
  window.open(url, "_blank");
}

console.log("StoneHaven dashboard loaded.");
