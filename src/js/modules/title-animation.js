import { isCurrentPage } from "./utils";

export function initTitleAnimation() {
  if (!isCurrentPage("home-page")) return;

  document.addEventListener("DOMContentLoaded", () => {
    const typewriter = document.getElementById("typewriter");
    const sections = document.querySelectorAll(".main, .footer");

    typewriter.addEventListener("animationstart", () => {
      typewriter.style.opacity = "1";
      typewriter.style.visibility = "visible";
    });

    typewriter.addEventListener("animationend", () => {
      typewriter.classList.add("finished");
      sections.forEach((section) => {
        section.style.opacity = "1";
        section.style.visibility = "visible";
        section.classList.add("finished");
      });
    });
  });
}
