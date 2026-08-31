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

const interestTabs = [...document.querySelectorAll("[data-ignite-tab]")];
const interestPanels = [...document.querySelectorAll("[data-ignite-panel]")];
const interestSegments = document.querySelectorAll("[data-ignite-segment]");
const interestProgress = document.querySelector("[data-ignite-progress]");
const interestProgressLabel = document.querySelector("[data-ignite-progress-label]");
const interestVisualTitle = document.querySelector("[data-ignite-visual-title]");
const interestVisualRing = document.querySelector("[data-ignite-visual-ring]");

const ringLabels = {
  origine: "Origine",
  corpo: "Corpo",
  nutrizione: "Nutrizione",
  mente: "Mente",
  anima: "Anima",
  inclusione: "Inclusione",
  innovazione: "Innovazione",
  spettacolo: "Spettacolo",
};

function setInterestVisual({ title, ring, progress, progressLabel }) {
  if (interestProgress) {
    interestProgress.setAttribute("stroke-dasharray", `${progress} ${100 - progress}`);
  }
  if (interestProgressLabel) interestProgressLabel.textContent = progressLabel;
  if (interestVisualTitle) interestVisualTitle.textContent = title;
  if (interestVisualRing) interestVisualRing.textContent = ringLabels[ring] || ring;

  interestSegments.forEach((segment) => {
    segment.classList.toggle("is-active", segment.dataset.igniteSegment === ring);
  });
}

function setInterestAction(panel, summary, subject, lines) {
  const summaryElement = panel.querySelector("[data-interest-summary]");
  const action = panel.querySelector("[data-interest-cta]");
  if (summaryElement) summaryElement.textContent = summary;
  if (action) {
    const body = lines.join("\r\n");
    action.href = `mailto:info@armonicafestival.it?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }
}

function updateSupporterPanel(panel) {
  const level = panel.querySelector('input[name="support-level"]:checked');
  const ringSelect = panel.querySelector("[data-ignite-ring]");
  if (!level || !ringSelect) return;

  const levelName = level.value;
  const amount = level.dataset.amount;
  const progress = Number(level.dataset.progress);
  const ring = ringSelect.value;
  const ringName = ringLabels[ring];

  setInterestVisual({
    title: levelName,
    ring,
    progress,
    progressLabel: `${progress}% del gesto`,
  });
  setInterestAction(
    panel,
    `Un ${levelName} indicativo da ${amount} € per l'anello ${ringName}.`,
    `Armonica Festival - Vorrei accendere un ${levelName}`,
    [
      "Ciao Armonica Festival,",
      "",
      `vorrei manifestare il mio interesse per il livello ${levelName} (${amount} € indicativi), destinato all'anello ${ringName}.`,
      "",
      "So che questa è una manifestazione d'interesse e non comporta pagamenti o impegni.",
      "",
      "Il mio nome:",
      "Un recapito:",
    ],
  );
}

function updateCommunityPanel(panel) {
  const typeSelect = panel.querySelector("[data-experience-type]");
  const ringSelect = panel.querySelector("[data-ignite-ring]");
  if (!typeSelect || !ringSelect) return;

  const type = typeSelect.value;
  const ring = ringSelect.value;
  const ringName = ringLabels[ring];

  setInterestVisual({ title: "Esperienza", ring, progress: 68, progressLabel: "1 esperienza" });
  setInterestAction(
    panel,
    `Una proposta di ${type} per l'anello ${ringName}.`,
    `Armonica Festival - Proposta per l'anello ${ringName}`,
    [
      "Ciao Armonica Festival,",
      "",
      `vorrei proporre un'attività di tipo: ${type}.`,
      `L'anello che sento più vicino è: ${ringName}.`,
      "",
      "In breve, la mia idea:",
      "",
      "Organizzazione / realtà:",
      "Un recapito:",
    ],
  );
}

function updatePartnerPanel(panel) {
  const typeSelect = panel.querySelector("[data-partner-type]");
  const ringSelect = panel.querySelector("[data-ignite-ring]");
  if (!typeSelect || !ringSelect) return;

  const type = typeSelect.value;
  const ring = ringSelect.value;
  const ringName = ringLabels[ring];

  setInterestVisual({ title: "Un anello", ring, progress: 100, progressLabel: "Impatto di sistema" });
  setInterestAction(
    panel,
    `Una possibile collaborazione per l'anello ${ringName}: ${type}.`,
    `Armonica Festival - Dialogo partner per ${ringName}`,
    [
      "Ciao Armonica Festival,",
      "",
      `vorremmo approfondire una collaborazione attraverso: ${type}.`,
      `L'ambito di interesse è: ${ringName}.`,
      "",
      "Organizzazione:",
      "Referente:",
      "Un recapito:",
    ],
  );
}

function updateInterestPanel(panel) {
  if (!panel) return;
  if (panel.dataset.ignitePanel === "supporter") updateSupporterPanel(panel);
  if (panel.dataset.ignitePanel === "community") updateCommunityPanel(panel);
  if (panel.dataset.ignitePanel === "partner") updatePartnerPanel(panel);
}

function activateInterestTab(tab, moveFocus = false) {
  const targetName = tab.dataset.igniteTab;
  interestTabs.forEach((item) => {
    const isCurrent = item === tab;
    item.setAttribute("aria-selected", String(isCurrent));
    item.tabIndex = isCurrent ? 0 : -1;
  });

  let activePanel;
  interestPanels.forEach((panel) => {
    const isCurrent = panel.dataset.ignitePanel === targetName;
    panel.hidden = !isCurrent;
    if (isCurrent) activePanel = panel;
  });

  updateInterestPanel(activePanel);
  if (moveFocus) tab.focus();
}

interestTabs.forEach((tab, index) => {
  tab.addEventListener("click", () => activateInterestTab(tab));
  tab.addEventListener("keydown", (event) => {
    let nextIndex;
    if (event.key === "ArrowRight" || event.key === "ArrowDown") nextIndex = (index + 1) % interestTabs.length;
    if (event.key === "ArrowLeft" || event.key === "ArrowUp") nextIndex = (index - 1 + interestTabs.length) % interestTabs.length;
    if (event.key === "Home") nextIndex = 0;
    if (event.key === "End") nextIndex = interestTabs.length - 1;
    if (nextIndex === undefined) return;
    event.preventDefault();
    activateInterestTab(interestTabs[nextIndex], true);
  });
});

interestPanels.forEach((panel) => {
  panel.addEventListener("change", () => updateInterestPanel(panel));
});

const initialInterestPanel = interestPanels.find((panel) => !panel.hidden);
updateInterestPanel(initialInterestPanel);

const internalLinks = document.querySelectorAll('a[href^="#"]');

internalLinks.forEach((link) => {
  link.addEventListener("click", () => {
    const target = document.querySelector(link.getAttribute("href"));
    if (!target) return;
    target.setAttribute("tabindex", "-1");
    window.setTimeout(() => target.focus({ preventScroll: true }), 450);
  });
});
