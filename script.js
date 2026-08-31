const ringItems = document.querySelectorAll("[data-ring]");
const spiral = document.querySelector("[data-spiral]");
const segments = document.querySelectorAll("[data-segment]");

function activateRing(name) {
  if (!spiral) return;

  spiral.classList.add("has-active");
  segments.forEach((segment) => {
    segment.classList.toggle("is-active", segment.dataset.segment === name);
  });

  const heart = document.querySelector(".spiral-heart");
  if (heart) heart.classList.toggle("is-active", name === "spettacolo");
}

function clearRing() {
  if (!spiral) return;
  spiral.classList.remove("has-active");
  segments.forEach((segment) => segment.classList.remove("is-active"));
}

ringItems.forEach((item) => {
  item.addEventListener("mouseenter", () => activateRing(item.dataset.ring));
  item.addEventListener("mouseleave", clearRing);
  item.addEventListener("focus", () => activateRing(item.dataset.ring));
  item.addEventListener("blur", clearRing);
});

const internalLinks = document.querySelectorAll('a[href^="#"]');

internalLinks.forEach((link) => {
  link.addEventListener("click", () => {
    const target = document.querySelector(link.getAttribute("href"));
    if (!target) return;
    target.setAttribute("tabindex", "-1");
    window.setTimeout(() => target.focus({ preventScroll: true }), 450);
  });
});
