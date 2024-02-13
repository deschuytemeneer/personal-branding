function generateTresholds(numberOfSteps) {
  let thresholds = [];

  for (let i = 1.0; i <= numberOfSteps; i++) {
    let ratio = i / numberOfSteps;
    thresholds.push(ratio);
  }

  thresholds.push(0);
  return thresholds;
}

let inFullViewDelayTimer;

const Handlers = {
  "store-ratio-as-css-var": (/** @type {IntersectionObserverEntry} */ observerEntry) => {
    observerEntry.target.style.setProperty("--intersection-ratio", observerEntry.intersectionRatio);
  },
  "in-full-view-delayed": (/** @type {IntersectionObserverEntry} */ observerEntry) => {
    observerEntry.target.setAttribute(
      "data-is-in-full-view",
      observerEntry.intersectionRatio > 0.99
    );

    console.log(observerEntry);

    if (!inFullViewDelayTimer) {
      inFullViewDelayTimer = setTimeout(() => {
        const isInFullView = observerEntry.target.getAttribute("data-is-in-full-view") === "true";
        if (isInFullView) {
          observerEntry.target.setAttribute("data-delayed-in-full-view-triggered", true);
        } else {
          observerEntry.target.removeAttribute("data-delayed-in-full-view-triggered");
        }

        inFullViewDelayTimer = false;
      }, 600);
    }
  },
};

function createObserver() {
  /** @type {IntersectionObserverCallback} */
  const handleObserve = (entries) => {
    entries.forEach((entry) => {
      const triggerType = entry.target.getAttribute("data-in-view-trigger");
      if (triggerType in Handlers) {
        Handlers[triggerType](entry);
      }
    });
  };

  return new IntersectionObserver(handleObserve, {
    root: null,
    rootMargin: "0px",
    threshold: generateTresholds(100),
  });
}

window.addEventListener(
  "load",
  () => {
    const observer = createObserver();
    document.querySelectorAll("[data-in-view-trigger]").forEach((item) => observer.observe(item));
  },
  false
);
