// Set things up
window.addEventListener(
  "load",
  () => {
    const observer = createObserver();
    document
      .querySelectorAll("[data-observe-page-scroll]")
      .forEach((item) => observer.observe(item));
  },
  false
);

function generateTresholds(numberOfSteps) {
  let thresholds = [];

  for (let i = 1.0; i <= numberOfSteps; i++) {
    let ratio = i / numberOfSteps;
    thresholds.push(ratio);
  }

  thresholds.push(0);
  return thresholds;
}

function createObserver() {
  const handleObserve = (entries) => {
    entries.forEach((entry) => {
      entry.target.style.setProperty("--intersection-ratio", entry.intersectionRatio);
    });
  };

  return new IntersectionObserver(handleObserve, {
    root: null,
    rootMargin: "0px",
    threshold: generateTresholds(100),
  });
}

document.querySelectorAll(".portfolio-item__read-more-button").forEach((buttonItem) => {
  const labelItem = buttonItem.querySelector(".portfolio-item__read-more-button-label");
  const alternativeLabelItem = buttonItem.querySelector(
    ".portfolio-item__read-more-button-label-alternative"
  );

  if (alternativeLabelItem) {
    buttonItem.style.setProperty(
      "--calculated-text-width",
      `${alternativeLabelItem.getBoundingClientRect().width}px`
    );
  }

  if (!labelItem) {
    return;
  }

  const readMoreText = labelItem.textContent;
  const readLessText = alternativeLabelItem?.textContent ?? "Read less.";

  let isCollapsed = false;

  buttonItem.addEventListener("click", () => {
    buttonItem.dispatchEvent(new CustomEvent("toggle", { bubbles: true }));

    if (isCollapsed) {
      labelItem.textContent = readMoreText;
    } else {
      labelItem.textContent = readLessText;
    }

    isCollapsed = !isCollapsed;
  });
});

document.querySelectorAll(".portfolio-item").forEach((item) => {
  item.addEventListener("toggle", () => {
    if (item.hasAttribute("data-is-open")) {
      item.removeAttribute("data-is-open");
    } else {
      item.setAttribute("data-is-open", "");
    }
  });
});
