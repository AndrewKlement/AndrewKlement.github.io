// One-time scroll reveals. The HTML remains fully usable without this script.
(() => {
  const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
  if (preference.matches || !("IntersectionObserver" in window)) return;
  const elements = document.querySelectorAll(
    ".section-heading, .publication, .thesis, .interests, .project-grid, .timeline-item, .article-row",
  );
  const show = (element) => element.classList.remove("reveal-pending");
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          show(entry.target);
          observer.unobserve(entry.target);
        }
      }
    },
    { threshold: 0, rootMargin: "0px 0px -24px 0px" },
  );
  for (const element of elements) {
    // Do not hide content already in view or above the current scroll position.
    if (element.getBoundingClientRect().top >= window.innerHeight) {
      element.classList.add("reveal-ready", "reveal-pending");
      observer.observe(element);
    }
  }
  preference.addEventListener("change", () => {
    if (preference.matches) {
      elements.forEach(show);
      observer.disconnect();
    }
  });
  // Anchor navigation should always expose its destination immediately.
  const showTarget = () => {
    const section = document.getElementById(location.hash.slice(1));
    if (section) {
      show(section);
      section.querySelectorAll(".reveal-pending").forEach(show);
    }
  };
  window.addEventListener("hashchange", showTarget);
  showTarget();
})();
