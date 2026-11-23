const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
if ("IntersectionObserver" in window && !reducedMotion.matches) {
  const observer = new IntersectionObserver(
    (entries) => {
      for (const { isIntersecting, target } of entries) {
        if (!isIntersecting) continue;
        target.classList.add("shown");
        observer.unobserve(target);
      }
    },
    { threshold: 0, rootMargin: "0px 0px 12px" },
  );
  for (const element of document.querySelectorAll("[data-reveal]")) {
    const siblings = [...element.parentElement.children];
    const index = element.parentElement.matches(".grid, .trust")
      ? siblings.indexOf(element)
      : 0;
    element.style.setProperty("--delay", (index % 3) * 65 + "ms");
    element.classList.add("reveal-ready");
    observer.observe(element);
  }
}
const navigation = document.querySelector(".navigation");
const menu = navigation.querySelector(".burger");
function setMenu(open) {
  navigation.classList.toggle("open", open);
  menu.setAttribute("aria-expanded", String(open));
}
menu.addEventListener("click", () =>
  setMenu(!navigation.classList.contains("open")),
);
document.addEventListener("click", (event) => {
  if (!navigation.contains(event.target) || event.target.closest("nav a"))
    setMenu(false);
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && navigation.classList.contains("open")) {
    setMenu(false);
    menu.focus();
  }
});
for (const button of document.querySelectorAll(".questions button")) {
  button.addEventListener("click", () => {
    const open = button.getAttribute("aria-expanded") === "false";
    button.setAttribute("aria-expanded", String(open));
    document
      .getElementById(button.getAttribute("aria-controls"))
      .setAttribute("aria-hidden", String(!open));
  });
}
const reviews = document.querySelector(".reviews");
const reviewToggle = reviews.querySelector(".review-toggle");
reviews.classList.add("with-motion");
reviewToggle.hidden = false;
reviewToggle.addEventListener("click", () => {
  const paused = reviews.classList.toggle("is-paused");
  reviewToggle.textContent = paused ? "Reprendre le défilement" : "Mettre en pause";
});
document.addEventListener("click", (event) => {
  const link = event.target.closest('a[href^="#"]');
  if (!link || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey)
    return;
  const dialog = document.getElementById(link.hash.slice(1));
  if (!(dialog instanceof HTMLDialogElement)) return;
  event.preventDefault();
  document.querySelector("dialog[open]")?.close();
  dialog.showModal();
});
const initial = document.getElementById(location.hash.slice(1));
if (initial instanceof HTMLDialogElement) initial.showModal();
const newsletter = document.querySelector("#newsletter form");
const input = newsletter.querySelector("input");
const status = document.querySelector('#newsletter [role="status"]');
input.addEventListener("invalid", () =>
  input.setCustomValidity(
    input.value
      ? "Veuillez saisir une adresse e-mail valide."
      : "Veuillez saisir votre adresse e-mail.",
  ),
);
input.addEventListener("input", () => {
  input.setCustomValidity("");
  status.hidden = true;
});
newsletter.addEventListener("submit", (event) => {
  event.preventDefault();
  status.hidden = false;
});
for (const dialog of document.querySelectorAll(".local-detail")) {
  function dismiss(event) {
    event.preventDefault();
    if (dialog.dataset.closing) return;
    if (reducedMotion.matches) {
      dialog.close();
      return;
    }
    dialog.dataset.closing = "true";
    const animation = dialog.animate(
      [
        { opacity: 1, transform: "none" },
        { opacity: 0, transform: "translateY(8px) scale(.98)" },
      ],
      { duration: 160, easing: "ease-in" },
    );
    animation.finished.then(() => {
      dialog.close();
      delete dialog.dataset.closing;
    });
  }
  dialog.addEventListener("cancel", dismiss);
  dialog
    .querySelector('form[method="dialog"]')
    .addEventListener("submit", dismiss);
}
