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

async function loadRealmStatus() {
  const onlinePlayersText = document.getElementById("onlinePlayersText");
  const totalOnlineText = document.getElementById("totalOnlineText");
  const lastCheckedText = document.getElementById("lastCheckedText");
  const footerStatusText = document.getElementById("footerStatusText");

  try {
    const response = await fetch("status.json?v=" + Date.now());

    if (!response.ok) {
      throw new Error("Could not load status.json");
    }

    const status = await response.json();

    const players = Array.isArray(status.onlinePlayers)
      ? status.onlinePlayers
      : [];

    onlinePlayersText.innerHTML = players.length
      ? players.join("<br>")
      : "No players online.";

    totalOnlineText.textContent =
      String(status.totalOnline || 0) + " / " + String(status.maxPlayers || 10);

    lastCheckedText.textContent = status.lastChecked || "Unknown";

    footerStatusText.textContent =
      "Auto-updating Realm Status | " + (status.lastChecked || "Unknown");

    console.log("Loaded live Realm status.");
  } catch (error) {
    console.log(error.message);

    onlinePlayersText.textContent = "Could not load live status.";
    totalOnlineText.textContent = "Unavailable";
    lastCheckedText.textContent = "Unavailable";
    footerStatusText.textContent = "Auto-updating Realm Status";
  }
}

loadRealmStatus();

setInterval(loadRealmStatus, 60000);

console.log("StoneHaven dashboard loaded.");
