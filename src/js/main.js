import "modern-normalize/modern-normalize.css";
import "../scss/style.scss";

import { initThemeSwitcher } from "./modules/theme-switcher";
import { initAnimation } from "./modules/animation";
import { initArrowUp } from "./modules/arrow-up";
import { isCurrentPage } from "./modules/utils";
import { renderCards } from "./modules/cards";

initThemeSwitcher();
initAnimation();
initArrowUp();

document.addEventListener("DOMContentLoaded", () => {
  if (isCurrentPage("projects-page")) {
    renderCards(".cards");
  }
});