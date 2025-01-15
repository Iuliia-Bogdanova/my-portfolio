import { isCurrentPage } from "./utils.js";

export function initArrowUp() {
  if (!isCurrentPage("projects-page")) return;

  const initArrowUp = document.querySelector(".arrow-up");

  if (!initArrowUp) {
    console.error("Arrow-up button not found in the DOM");
    return;
  }

  const toggleButtonVisibility = () => {
    if (window.scrollY > 300) {
      initArrowUp.classList.add("visible");
    } else {
      initArrowUp.classList.remove("visible");
    }
  };

  toggleButtonVisibility();
  window.addEventListener("scroll", toggleButtonVisibility);
  window.addEventListener("resize", toggleButtonVisibility);

  initArrowUp.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
}
