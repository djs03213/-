const seasons = new Set(["spring", "summer", "autumn", "winter"]);

const links = [...document.querySelectorAll(".season-link")];
const scenes = [...document.querySelectorAll(".scene[data-scene]")];
const springStill = document.querySelector('.scene[data-scene="spring"]');
const springMotion = document.querySelector(".spring-motion");
const springVideoUi = [...document.querySelectorAll(".spring-video-ui")];
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
let activeSeason = "spring";
let springPlaybackToken = 0;

function showSpringMotion() {
  springMotion?.classList.add("is-active");
  springVideoUi.forEach((element) => element.classList.add("is-active"));
  springStill?.classList.remove("is-active");
}

function waitForFirstVideoFrame(video) {
  if ("requestVideoFrameCallback" in video) {
    return new Promise((resolve) => video.requestVideoFrameCallback(() => resolve()));
  }
  if (video.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) return Promise.resolve();
  return new Promise((resolve) => video.addEventListener("loadeddata", resolve, { once: true }));
}

function stopSpringMotion({ restoreStill = true } = {}) {
  if (!springMotion) return;
  springPlaybackToken += 1;
  springMotion.classList.remove("is-active");
  springVideoUi.forEach((element) => element.classList.remove("is-active"));
  springMotion.pause();
  springMotion.currentTime = 0;
  if (restoreStill && activeSeason === "spring") springStill?.classList.add("is-active");
}

async function playSpringMotion() {
  if (!springMotion || reduceMotion.matches) return;
  const playbackToken = ++springPlaybackToken;
  springMotion.currentTime = 0;
  try {
    await springMotion.play();
    await waitForFirstVideoFrame(springMotion);
    if (playbackToken !== springPlaybackToken || activeSeason !== "spring") return;
    showSpringMotion();
  } catch {
    if (playbackToken === springPlaybackToken) stopSpringMotion();
  }
}

function setSeason(season) {
  if (!seasons.has(season)) return;
  if (season !== "spring") stopSpringMotion({ restoreStill: false });
  if (season === activeSeason) return;
  activeSeason = season;

  scenes.forEach((scene) => scene.classList.toggle("is-active", scene.dataset.scene === season));
  links.forEach((link) => {
    const isActive = link.dataset.season === season;
    link.classList.toggle("is-active", isActive);
    link.setAttribute("aria-current", isActive ? "true" : "false");
  });
}

links.forEach((link) => {
  const activate = () => setSeason(link.dataset.season);
  link.addEventListener("pointerenter", () => {
    activate();
    if (link.dataset.season === "spring") playSpringMotion();
  });
  if (link.dataset.season === "spring") {
    link.addEventListener("pointerleave", () => stopSpringMotion());
  }
  link.addEventListener("focus", activate);
  link.addEventListener("click", () => {
    activate();
    if (link.dataset.season === "spring") window.location.assign("./spring/index.html");
  });
});

document.addEventListener("keydown", (event) => {
  if (!["ArrowLeft", "ArrowRight"].includes(event.key)) return;
  const currentIndex = links.findIndex((link) => link.dataset.season === activeSeason);
  const direction = event.key === "ArrowRight" ? 1 : -1;
  links[(currentIndex + direction + links.length) % links.length].focus();
});

links[0].setAttribute("aria-current", "true");
