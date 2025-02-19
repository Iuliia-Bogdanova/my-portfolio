import "modern-normalize/modern-normalize.css";
import "../scss/style.scss";

import { initThemeSwitcher } from "./modules/theme-switcher";
import { initTitleAnimation } from "./modules/title-animation";
import { initArrowUp } from "./modules/arrow-up";
import { toggleScrollForPage } from "./modules/utils";
import { isCurrentPage } from "./modules/utils";
import { renderCards } from "./modules/cards";

initThemeSwitcher();
initTitleAnimation();
initArrowUp();
toggleScrollForPage("projects-page");

if (isCurrentPage("projects-page")) {
  renderCards(".cards");
}
